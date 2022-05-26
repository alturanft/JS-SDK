import { ConsoleHandler, Logger, LogLevel } from 'logging-library';
import { Altura } from '../index';

const logger = new Logger().addHandler(new ConsoleHandler(LogLevel.DEBUG));
const altura = new Altura('0000000-0000000-0000000-0000000', (arg: string) => logger.debug(arg));

test('Altura Collection', async () => {
  const alturaCollection = await altura.getCollection('0x0000000000000000000000000000000000000000');
  expect(typeof alturaCollection._address).toBe('string');
  expect(typeof alturaCollection._name).toBe('string');
  expect(typeof alturaCollection._description).toBe('string');
  expect(typeof alturaCollection._ownerAddress).toBe('string');
});

test('Altura Collection update', async () => {});
