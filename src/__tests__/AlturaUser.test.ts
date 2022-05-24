import { Altura } from '../index';
import { ConsoleHandler, Logger, LogLevel } from 'logging-library';

const logger = new Logger().addHandler(new ConsoleHandler(LogLevel.DEBUG));

const altura = new Altura('123456789', (arg: string) => logger.debug(arg));

test('Altura User', async () => {
  const alturaUser = await altura.getUser('0x3472b26ce82496b253e55732d552d932f4b1092d');
  expect(alturaUser._address).toBe('0x3472b26ce82496b253e55732d552d932f4b1092d');
});
