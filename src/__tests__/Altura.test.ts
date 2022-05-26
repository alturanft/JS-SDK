import { Altura } from '../index';
import { ConsoleHandler, Logger, LogLevel } from 'logging-library';
import { apiUsers } from './data';

const logger = new Logger().addHandler(new ConsoleHandler(LogLevel.DEBUG));
const altura = new Altura('0000000-0000000-0000000-0000000', (arg: string) => logger.debug(arg));

// Test altura.getUsers();
test('Altura get users', async () => {
  let data = await altura.getUsers();

  expect(data.users).toEqual(expect.any(Array));
  expect(data.users.length).toBe(24);
  expect(data.count).toBeGreaterThan(0);
  const user = data.users[0];
  expect(user).toHaveProperty('address');
});

// Test altura.getItems();
test('Altura get items', async () => {
  const data = await altura.getItems();

  expect(data.items).toEqual(expect.any(Array));
  expect(data.items.length).toBe(24);
  expect(data.count).toBeGreaterThan(0);
  const item = data.items[0];
  expect(item).toHaveProperty('collectionAddress');
});

// Test altura.getCollections();
test('Alturaa get collections', async () => {
  const data = await altura.getCollections();

  expect(data.collections).toEqual(expect.any(Array));
  expect(data.collections.length).toBe(24);
  expect(data.count).toBeGreaterThan(0);
  const collection = data.collections[0];
  expect(collection).toHaveProperty('address');
});

// Test altura.authenticateUser()
test('Altura authenticate user', async () => {
  const spy = jest.spyOn(altura.apiCall, 'get').mockImplementation(async (apiPath: string, query?: object) => {
    const address = apiPath.split('/')[2];
    const auth_code = apiPath.split('/')[3];

    let authenticated = false;
    if (apiUsers.some((apiUser) => apiUser.address === address && apiUser.auth_code === auth_code))
      authenticated = true;
    return {
      authenticated,
    };
  });

  let data: { authenticated: boolean };
  data = await altura.authenticateUser('0x0000000000000000000000000000000000000000', '111111');
  expect(data.authenticated).toBe(false);
  data = await altura.authenticateUser('0x0000000000000000000000000000000000000000', '000000');
  expect(data.authenticated).toBe(true);

  spy.mockRestore();
});

// Test altura.mintAdditionalSupply()
test('Altura mint additional supply', async () => {});

// Test altura.transferItem()
test('Altura transfer item', async () => {});
