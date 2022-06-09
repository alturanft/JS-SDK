import { ConsoleHandler, Logger, LogLevel } from 'logging-library';
import { Altura } from '../altura';

require('dotenv').config();
const API_KEY = process.env.API_KEY || '';
const COLLECTION_ADDRESS = process.env.COLLECTION_ADDRESS || '';
const TOKEN_ID = process.env.TOKEN_ID || '0';

const logger = new Logger().addHandler(new ConsoleHandler(LogLevel.INFO));
const altura = new Altura(API_KEY, (arg: string) => logger.info(arg));

test('Altura Item Normal', async () => {
  const alturaItem = await altura.getItem(COLLECTION_ADDRESS, parseInt(TOKEN_ID));

  expect(alturaItem).toHaveProperty('collectionAddress');
  expect(alturaItem).toHaveProperty('tokenId');
});

test('Altura Item Slim', async () => {
  const alturaItem = await altura.getItem(COLLECTION_ADDRESS, parseInt(TOKEN_ID), { slim: true });

  expect(alturaItem).toHaveProperty('collectionAddress');
  expect(alturaItem).toHaveProperty('tokenId');
});

test('Altura Item State', async () => {
  const alturaItem = await altura.getItem(COLLECTION_ADDRESS, parseInt(TOKEN_ID), { stateOnly: true });

  expect(alturaItem).toHaveProperty('collectionAddress');
  expect(alturaItem).toHaveProperty('tokenId');
});

test('Altura Item holders', async () => {
  const alturaItem = await altura.getItem(COLLECTION_ADDRESS, parseInt(TOKEN_ID));
  const data = await alturaItem.getHolders();

  expect(data.holders).toEqual(expect.any(Array));
  expect(data.count).toBeGreaterThan(0);

  const holder = data.holders[0];
  expect(holder).toHaveProperty('address');
  expect(holder).toHaveProperty('name');
  expect(holder).toHaveProperty('balance');
});

test('Altura Item history', async () => {
  const alturaItem = await altura.getItem(COLLECTION_ADDRESS, parseInt(TOKEN_ID));
  const data = await alturaItem.getHistory();

  expect(data.events).toEqual(expect.any(Array));

  console.log(data.events[0], data.events[1]);

  const event = data.events[0];
  expect(event.id).toEqual(expect.any(String));
});

test('Altura Item update property', async () => {
  const alturaItem = await altura.getItem(COLLECTION_ADDRESS, parseInt(TOKEN_ID));
  const data = await alturaItem.updateProperty('id', '5');

  const updatedItem = data.item;

  console.log(updatedItem);

  expect(updatedItem.collectionAddress).toEqual(expect.any(String));
  expect(updatedItem.tokenId).toEqual(expect.any(Number));
  expect(updatedItem.properties).toEqual(expect.any(Array));

  const property = updatedItem.properties.find((x) => x.name === 'id');
  if (property) {
    expect(property.value).toEqual('5');
  }
});

test('Altura Item update primary image', async () => {
  const alturaItem = await altura.getItem(COLLECTION_ADDRESS, parseInt(TOKEN_ID));
  const data = await alturaItem.updatePrimaryImage(0);

  const updatedItem = data.item;
  expect(updatedItem.collectionAddress).toEqual(expect.any(String));
  expect(updatedItem.tokenId).toEqual(expect.any(Number));
  expect(updatedItem.properties).toEqual(expect.any(Array));
});
