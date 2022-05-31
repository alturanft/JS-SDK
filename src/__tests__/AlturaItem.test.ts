import { ConsoleHandler, Logger, LogLevel } from 'logging-library';
import { Altura } from '../altura';
import { AlturaItem } from '../item';
import { test_apiUsers, test_items, test_collections } from './data';

const logger = new Logger().addHandler(new ConsoleHandler(LogLevel.DEBUG));
const altura = new Altura('0000000-0000000-0000000-0000000', (arg: string) => logger.debug(arg));

const collectionAddress = '0xe7f8ccda432239dcb418e94d625bc2fe6350f6bb';
const tokenId = 103;

test('Altura Item', async () => {
  const alturaItem = await altura.getItem(collectionAddress, tokenId);
  expect(alturaItem._collectionAddress).toEqual(expect.any(String));
  expect(alturaItem._collectionName).toEqual(expect.any(String));
  expect(alturaItem._tokenId).toEqual(expect.any(Number));
});

test('Altura Item holders', async () => {
  const alturaItem = await altura.getItem(collectionAddress, tokenId);
  const data = await alturaItem.getHolders();

  expect(data.holders).toEqual(expect.any(Array));
  expect(data.count).toBeGreaterThan(0);

  const holder = data.holders[0];
  expect(holder.address).toEqual(expect.any(String));
  expect(holder.name).toEqual(expect.any(String));
});

test('Altura Item history', async () => {
  const alturaItem = await altura.getItem(collectionAddress, tokenId);
  const data = await alturaItem.getHistory();

  expect(data.events).toEqual(expect.any(Array));

  const event = data.events[0];
  expect(event.id).toEqual(expect.any(String));
});

test('Altura Item update property', async () => {
  const spy = jest
    .spyOn(altura.apiCall, 'post')
    .mockImplementation(async (apiPath: string, query?: object, body?: object, opts?: RequestInit) => {
      const { apiKey } = query as { apiKey: string };
      const { address, tokenId, propertyName, propertyValue } = body as {
        address: string;
        tokenId: number;
        propertyName: string;
        propertyValue: string;
      };

      const apiUser = test_apiUsers.find((user) => user.key === apiKey);
      if (!apiUser) throw new Error('API key is invalid');

      const test_item = test_items.find((item) => item.collectionAddress === address && item.tokenId === tokenId);

      if (!test_item) throw new Error('item does not exist');
      if (test_item.owner !== apiUser.address) throw new Error('permission denied');

      const property = test_item.properties.find((x) => x.name === propertyName);

      if (!property) throw new Error('property not found');
      if (property.static) throw new Error('cannot update static property');

      property.value = Number(propertyValue);

      return {
        item: test_item,
      };
    });

  let alturaItem = await altura.getItem(collectionAddress, tokenId);
  await expect(alturaItem.updateProperty('speed', '3')).rejects.toThrow('item does not exist');

  alturaItem._collectionAddress = '0x8abc8abc8abc8abc8abc8abc8abc8abc8abc8abc';
  alturaItem._tokenId = 4;
  await expect(alturaItem.updateProperty('speed', '3')).rejects.toThrow('permission denied');

  alturaItem._collectionAddress = '0xe7f8ccdae7f8ccdae7f8ccdae7f8ccdae7f8ccda';
  alturaItem._tokenId = 103;
  await expect(alturaItem.updateProperty('speed', '3')).rejects.toThrow('property not found');

  await expect(alturaItem.updateProperty('defence', '3')).rejects.toThrow('cannot update static property');

  const data = await alturaItem.updateProperty('attack', '3');
  expect(data).toHaveProperty('item');

  const item = data.item;
  expect(item.collectionAddress).toEqual(expect.any(String));
  expect(item.tokenId).toEqual(expect.any(Number));
  expect(item.properties).toEqual(expect.any(Array));

  const property = item.properties.find((x) => x.name === 'attack');
  if (property) {
    expect(property.value).toEqual(3);
  }

  spy.mockRestore();
});

test('Altura Item update primary image', async () => {
  const spy = jest
    .spyOn(altura.apiCall, 'post')
    .mockImplementation(async (apiPath: string, query?: object, body?: object, opts?: RequestInit) => {
      const { apiKey } = query as { apiKey: string };
      const { address, tokenId, imageIndex } = body as {
        address: string;
        tokenId: number;
        imageIndex: number;
      };

      const apiUser = test_apiUsers.find((user) => user.key === apiKey);
      if (!apiUser) throw new Error('API key is invalid');

      const test_item = test_items.find((item) => item.collectionAddress === address && item.tokenId === tokenId);

      if (!test_item) throw new Error('item does not exist');
      if (test_item.owner !== apiUser.address) throw new Error('permission denied');

      if (test_item.otherImages.length <= 0 || imageIndex >= test_item.otherImages.length) {
        throw new Error('image index out of bounds');
      }

      test_item.image = test_item.otherImages[imageIndex].image;
      test_item.imageHash = test_item.otherImages[imageIndex].imageHash;
      test_item.fileType = test_item.otherImages[imageIndex].fileType;
      test_item.isVideo = test_item.otherImages[imageIndex].isVideo;

      return {
        item: test_item,
      };
    });

  let alturaItem = await altura.getItem(collectionAddress, tokenId);
  await expect(alturaItem.updatePrimaryImage(0)).rejects.toThrow('item does not exist');

  alturaItem._collectionAddress = '0x8abc8abc8abc8abc8abc8abc8abc8abc8abc8abc';
  alturaItem._tokenId = 4;
  await expect(alturaItem.updatePrimaryImage(0)).rejects.toThrow('permission denied');

  alturaItem._collectionAddress = '0xe7f8ccdae7f8ccdae7f8ccdae7f8ccdae7f8ccda';
  alturaItem._tokenId = 103;
  await expect(alturaItem.updatePrimaryImage(2)).rejects.toThrow('image index out of bounds');

  const data = await alturaItem.updatePrimaryImage(1);
  expect(data).toHaveProperty('item');

  const item = data.item;
  expect(item.collectionAddress).toEqual(expect.any(String));
  expect(item.tokenId).toEqual(expect.any(Number));
  expect(item.otherImages).toEqual(expect.any(Array));
  expect(item.image).toEqual(item.otherImages[1].image);

  spy.mockRestore();
});
