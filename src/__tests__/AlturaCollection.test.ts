import { ConsoleHandler, Logger, LogLevel } from 'logging-library';
import { Altura } from '../index';

const logger = new Logger().addHandler(new ConsoleHandler(LogLevel.DEBUG));
const altura = new Altura('0000000-0000000-0000000-0000000', (arg: string) => logger.debug(arg));

test('Altura Collection', async () => {
  const alturaCollection = await altura.getCollection('0xe7f8ccda432239dcb418e94d625bc2fe6350f6bb');
  expect(alturaCollection._address).toBe('0xe7f8ccda432239dcb418e94d625bc2fe6350f6bb');
});
