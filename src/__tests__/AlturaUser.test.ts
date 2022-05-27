import { Altura } from '../index';
import { ConsoleHandler, Logger, LogLevel } from 'logging-library';

const logger = new Logger().addHandler(new ConsoleHandler(LogLevel.DEBUG));
const altura = new Altura('0000000-0000000-0000000-0000000', (arg: string) => logger.debug(arg));

const address = '0x0000000000000000000000000000000000000000';

// Test altura.getUser()
test('Altura User', async () => {
  const alturaUser = await altura.getUser(address);
  expect(alturaUser._address).toBe('0x0000000000000000000000000000000000000000');
});

// Test alturaUser.getItems()
test('Altura user items', async () => {
  const alturaUser = await altura.getUser(address);
  const data = await alturaUser.getItems();

  expect(data.items).toEqual(expect.any(Array));
  expect(data.items.length).toBeGreaterThanOrEqual(0);
  expect(data.count).toBeGreaterThanOrEqual(0);

  if (data.items.length > 0) {
    const item = data.items[0];
    expect(item).toHaveProperty('collectionAddress');
    expect(item).toHaveProperty('tokenId');
  }
});
