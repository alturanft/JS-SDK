import { ConsoleHandler, Logger, LogLevel } from 'logging-library';
import { Altura } from '../index';

const logger = new Logger().addHandler(new ConsoleHandler(LogLevel.DEBUG));
const altura = new Altura('123456789', (arg: string) => logger.debug(arg));

test('Altura Collection', async () => {
  const alturaCollection = await altura.getCollection('0x8adbfe4b2430baf33544f63a9958fa50247feaa0');
  expect(typeof alturaCollection._address).toBe('string');
  expect(typeof alturaCollection._name).toBe('string');
  expect(typeof alturaCollection._description).toBe('string');
  expect(typeof alturaCollection._ownerAddress).toBe('string');
});
