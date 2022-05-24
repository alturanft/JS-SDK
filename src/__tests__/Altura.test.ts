import { Altura } from '../index';
import { ConsoleHandler, Logger, LogLevel } from 'logging-library';

const logger = new Logger().addHandler(new ConsoleHandler(LogLevel.DEBUG));

const altura = new Altura('123456789', (arg: string) => logger.debug(arg));

test('Altura get users', async () => {
  const data = await altura.getUsers({ perPage: 1 });
  expect(data.users[0]).toEqual(
    expect.objectContaining({
      address: expect.any(String),
      name: expect.any(String),
      bio: expect.any(String),
      profilePicUrl: expect.any(String),
      socialLink: expect.any(String),
    }),
  );
  expect(typeof data.count).toBe('number');
});

test('Altura get items', async () => {
  const data = await altura.getItems({ perPage: 1 });
  expect(data.items[0]).toEqual(
    expect.objectContaining({
      collectionAddress: expect.any(String),
      tokenId: expect.any(Number),
      chainId: expect.any(Number),
      name: expect.any(String),
      description: expect.any(String),
      image: expect.any(String),
      imageUrl: expect.any(String),
      primaryImageIndex: expect.any(Number),
      fileType: expect.any(String),
      isVideo: expect.any(Boolean),
      creatorAddress: expect.any(String),
      like: expect.any(Number),
      views: expect.any(Number),
      mintDate: expect.any(String),
      royalty: expect.any(Number),
      nsfw: expect.any(Boolean),
      supply: expect.any(Number),
      maxSupply: expect.any(Number),
      stackable: expect.any(Boolean),
      properties: expect.any(Array),
      isListed: expect.any(Boolean),
      holders: expect.any(Number),
      hasUnlockableContent: expect.any(Boolean),
      unlockableContent: expect.any(String),
      creatorName: expect.any(String),
      collectionName: expect.any(String),
      uri: expect.any(String),
      isVerified: expect.any(Boolean),
      website: expect.any(String),
      slug: expect.any(String),
    }),
  );
  expect(typeof data.count).toBe('number');
});

test('Altura authenticate user', async () => {
  const data = await altura.authenticateUser('0x3472b26ce82496b253e55732d552d932f4b1092d', '2wkWET');
  expect(typeof data.authenticated).toBe('boolean');
});
