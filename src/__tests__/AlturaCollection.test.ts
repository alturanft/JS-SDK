import { ConsoleHandler, Logger, LogLevel } from 'logging-library';
import { Altura } from '../index';
import { test_apiUsers, test_collections } from './data';

const logger = new Logger().addHandler(new ConsoleHandler(LogLevel.DEBUG));

test('Altura Collection Get', async () => {
  const altura = new Altura('0000000-0000000-0000000-0000000', (arg: string) => logger.debug(arg));
  const alturaCollection = await altura.getCollection('0xe7f8ccda432239dcb418e94d625bc2fe6350f6bb');
  expect(alturaCollection._address).toBe('0xe7f8ccda432239dcb418e94d625bc2fe6350f6bb');
  expect(alturaCollection._chainId).toEqual(expect.any(Number));
});

test('Altura Collection Update', async () => {
  const altura = new Altura('0000000-0000000-0000000-0000000', (arg: string) => logger.debug(arg));
  const spy = jest
    .spyOn(altura.apiCall, 'post')
    .mockImplementation(async (apiPath: string, query?: object, body?: object) => {
      const address = apiPath.split('/')[1];
      const { apiKey } = query as { apiKey: string };
      const { image, imageUrl, description, website, genre } = body as {
        image?: string;
        imageUrl?: string;
        description?: string;
        website?: string;
        genre?: string;
      };
      const apiUser = test_apiUsers.find((apiUser) => apiUser.key === apiKey);
      if (!apiUser) throw new Error('API key is invalid');

      logger.debug(`collection address: ${address}`);
      let test_collection = test_collections.find((item) => item.address === address);
      if (!test_collection) throw new Error('collection does not exist');

      if (test_collection.ownerAddress.toLowerCase() !== apiUser.address.toLowerCase())
        throw new Error('you do not own this collection');

      test_collection.image = image ? image.trim() : test_collection.image;
      test_collection.imageUrl = imageUrl ? imageUrl.trim() : test_collection.imageUrl;
      test_collection.description = description ? description.trim() : test_collection.description;
      test_collection.website = website ? website.trim() : test_collection.website;
      test_collection.genre = genre ? genre.trim() : test_collection.genre;
      return { collection: test_collection };
    });
  const testImage = 'https://test.com/image/x.png';

  let alturaCollection = await altura.getCollection('0x4717228da71a76022af89247e826330515ecb358');
  await expect(
    alturaCollection.update({
      image: testImage,
    }),
  ).rejects.toThrow('collection does not exist');

  alturaCollection = await altura.getCollection('0x067f95c8e2be7b590e3614b08d51355b85b8bd0e');
  await expect(
    alturaCollection.update({
      image: testImage,
    }),
  ).rejects.toThrow('you do not own this collection');

  alturaCollection = await altura.getCollection('0x5f2cdf7616e148797e4212ac271fe6ead7fa1950');
  const data = await alturaCollection.update({
    image: testImage,
  });

  expect(spy).toHaveBeenCalled();
  expect(data).toHaveProperty('collection');
  expect(data.collection.image).toBe(testImage);
  spy.mockRestore();
});
