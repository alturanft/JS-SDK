import { ConsoleHandler, Logger, LogLevel } from 'logging-library';
import { Altura } from '../altura';

const logger = new Logger().addHandler(new ConsoleHandler(LogLevel.DEBUG));
const altura = new Altura('123456789', (arg: string) => logger.debug(arg));

const collectionAddress = '0x8adbfe4b2430baf33544f63a9958fa50247feaa0';
const tokenId = 4;

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
  expect(data.count).toEqual(expect.any(Number));

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
  const alturaItem = await altura.getItem(collectionAddress, tokenId);
  const updatedItem = await alturaItem.updateProperty('propertyName', 'propertyValue');
});
