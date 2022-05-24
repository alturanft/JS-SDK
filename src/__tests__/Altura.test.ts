import { Altura } from '../index';
import { AlturaUser } from '../types';
import { ConsoleHandler, Logger, LogLevel } from 'logging-library';

const logger = new Logger().addHandler(new ConsoleHandler(LogLevel.DEBUG));

const altura = new Altura('123456789', (arg: string) => logger.info(arg));

test('Altura get users', () => {
  return altura.getUsers(1, 1, 'name', 'desc').then((data) => {
    expect(data.users[0]).toEqual(
      expect.objectContaining({
        address: expect.any(String),
        name: expect.any(String),
        bio: expect.any(String),
        profilePicUrl: expect.any(String),
        socialLink: expect.any(String),
      }),
    );
    expect(typeof data.count).toBe('number');
  });
});
