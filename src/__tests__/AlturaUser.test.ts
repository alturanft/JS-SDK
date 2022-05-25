import { Altura } from '../index';
import { ConsoleHandler, Logger, LogLevel } from 'logging-library';

const logger = new Logger().addHandler(new ConsoleHandler(LogLevel.DEBUG));
const altura = new Altura('123456789', (arg: string) => logger.debug(arg));

const address = '0x3472b26ce82496b253e55732d552d932f4b1092d';

test('Altura User', async () => {
  const alturaUser = await altura.getUser(address);
  expect(typeof alturaUser._address).toBe('string');
  expect(typeof alturaUser._name).toBe('string');
});

test('Altura user items', async () => {
  const alturaUser = await altura.getUser(address);
  const data = await alturaUser.getItems();

  expect(data.items).toEqual(expect.any(Array));
  expect(data.count).toEqual(expect.any(Number));

  const item = data.items[0];
  expect(item.collectionAddress).toEqual(expect.any(String));
  expect(item.tokenId).toEqual(expect.any(Number));
  expect(item.name).toEqual(expect.any(String));
});
