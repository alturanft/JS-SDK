import { Altura } from '../index';
import { AlturaUser } from '../types';
import { ConsoleHandler, Logger, LogLevel } from 'logging-library';

const logger = new Logger().addHandler(new ConsoleHandler(LogLevel.DEBUG));

const altura = new Altura('123456789', (arg: string) => logger.info(arg));

const user: AlturaUser = {
  address: '0x79c670b2dc9aff7d0c1a4c8a9a3a4b9a3ce0c071',
  name: '📊',
  bio: '🎨🧑‍🎨🖼',
  profilePicUrl:
    'https://altura-marketplace-1.s3.us-east-2.amazonaws.com/0x79c670b2dc9aff7d0c1a4c8a9a3a4b9a3ce0c071_98ba883f-0c1e-41ba-b8b6-a30515684dd0.png',
  socialLink: '',
};

test('Altura get users', () => {
  return altura.getUsers(1, 1, 'name', 'desc').then((data) => {
    expect(data.users[0]).toStrictEqual(user);
    expect(data.count).toBe(41893);
  });
});
