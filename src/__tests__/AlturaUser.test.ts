import { Altura } from '../index';
import { ConsoleHandler, Logger, LogLevel } from 'logging-library';

require('dotenv').config();

const logger = new Logger().addHandler(new ConsoleHandler(LogLevel.DEBUG));
const API_KEY = process.env.API_KEY || '';
const WALLET_ADDRESS = process.env.WALLET_ADDRESS || '';

const altura = new Altura(API_KEY, (arg: string) => logger.debug(arg));

// Test altura.getUser()
test('Altura User', async () => {
  const alturaUser = await altura.getUser(WALLET_ADDRESS);
  expect(alturaUser).toHaveProperty('name');
  expect(alturaUser).toHaveProperty('address');
});

// Test alturaUser.getItems()
test('Altura user items', async () => {
  const alturaUser = await altura.getUser(WALLET_ADDRESS);
  const data = await alturaUser.getItems();

  expect(data.items).toEqual(expect.any(Array));
  expect(data.items.length).toBeGreaterThanOrEqual(0);
  expect(data.count).toBeGreaterThanOrEqual(0);

  if (data.items.length > 0) {
    const item = data.items[0];

    console.log(item);

    expect(item).toHaveProperty('collectionAddress');
    expect(item).toHaveProperty('tokenId');
    expect(item).toHaveProperty('userBalance');
  }
});
