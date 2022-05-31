import { Altura } from '../index';
import { ConsoleHandler, Logger, LogLevel } from 'logging-library';
import { test_apiUsers, test_items, test_collections } from './data';

const logger = new Logger().addHandler(new ConsoleHandler(LogLevel.DEBUG));

// Test altura.getUsers();
test('Altura get users', async () => {
  const altura = new Altura('0000000-0000000-0000000-0000000', (arg: string) => logger.debug(arg));
  let data = await altura.getUsers();

  expect(data.users).toEqual(expect.any(Array));
  expect(data.users.length).toBe(24);
  expect(data.count).toBeGreaterThan(0);
  const user = data.users[0];
  expect(user).toHaveProperty('address');
});

// Test altura.getItems();
test('Altura get items', async () => {
  const altura = new Altura('0000000-0000000-0000000-0000000', (arg: string) => logger.debug(arg));
  const data = await altura.getItems();

  expect(data.items).toEqual(expect.any(Array));
  expect(data.items.length).toBe(24);
  expect(data.count).toBeGreaterThan(0);
  const item = data.items[0];
  expect(item).toHaveProperty('collectionAddress');
});

// Test altura.getCollections();
test('Alturaa get collections', async () => {
  const altura = new Altura('0000000-0000000-0000000-0000000', (arg: string) => logger.debug(arg));
  const data = await altura.getCollections();

  expect(data.collections).toEqual(expect.any(Array));
  expect(data.collections.length).toBe(24);
  expect(data.count).toBeGreaterThan(0);
  const collection = data.collections[0];
  expect(collection).toHaveProperty('address');
});

// Test altura.authenticateUser()
test('Altura authenticate user', async () => {
  const altura = new Altura('0000000-0000000-0000000-0000000', (arg: string) => logger.debug(arg));
  const spy = jest.spyOn(altura.apiCall, 'get').mockImplementation(async (apiPath: string, query?: object) => {
    const address = apiPath.split('/')[2];
    const auth_code = apiPath.split('/')[3];

    let authenticated = false;
    if (test_apiUsers.some((apiUser) => apiUser.address === address && apiUser.auth_code === auth_code))
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

// Test altura.transferItem()
test('Altura transfer item', async () => {
  const altura = new Altura('0000000-0000000-0000000-0000000', (arg: string) => logger.debug(arg));
  const spy = jest
    .spyOn(altura.apiCall, 'post')
    .mockImplementation(async (apiPath: string, query?: object, body?: object, opts?: RequestInit) => {
      const { apiKey } = query as { apiKey: string };
      const { address, tokenId } = body as {
        address: string;
        tokenId: number;
        amount: number;
        to: string;
      };

      const apiUser = test_apiUsers.find((user) => user.key === apiKey);
      if (!apiUser) throw new Error('API key is invalid');

      const test_item = test_items.find((item) => item.collectionAddress === address && item.tokenId === tokenId);

      if (!test_item) throw new Error('item does not exist');
      if (test_item.owner !== apiUser.address) throw new Error('permission denied');

      return {
        txHash: '111111111111111111111111111111111111111111111111111111111111111111111',
      };
    });

  let data: object;
  await expect(
    altura.transferItem(
      '0x8abc8abc8abc8abc8abc8abc8abc8abc8abc8abc',
      3,
      1,
      '0x1111111111111111111111111111111111111111',
    ),
  ).rejects.toThrow('item does not exist');

  await expect(
    altura.transferItem(
      '0x8abc8abc8abc8abc8abc8abc8abc8abc8abc8abc',
      4,
      1,
      '0x1111111111111111111111111111111111111111',
    ),
  ).rejects.toThrow('permission denied');

  data = await altura.transferItem(
    '0xe7f8ccdae7f8ccdae7f8ccdae7f8ccdae7f8ccda',
    103,
    1,
    '0x1111111111111111111111111111111111111111',
  );
  expect(data).toHaveProperty('txHash');

  spy.mockRestore();
});

// Test altura.mintAdditionalSupply()
test('Altura mint additional supply', async () => {
  const altura = new Altura('0000000-0000000-0000000-0000000', (arg: string) => logger.debug(arg));
  const spy = jest
    .spyOn(altura.apiCall, 'post')
    .mockImplementation(async (apiPath: string, query?: object, body?: object) => {
      const { apiKey } = query as { apiKey: string };
      const { address, tokenId, amount } = body as {
        address: string;
        tokenId: number;
        amount: number;
        to: string;
      };
      const apiUser = test_apiUsers.find((apiUser) => apiUser.key === apiKey);
      if (!apiUser) throw new Error('API key is invalid');

      logger.debug(`address: ${address}, tokenId: ${tokenId}`);
      const test_item = test_items.find((item) => item.collectionAddress === address && item.tokenId === tokenId);
      if (!test_item) throw new Error('item does not exist');

      if (test_item.owner !== apiUser.address) throw new Error('permission denied');
      if (test_item.supply + amount > test_item.maxSupply) throw new Error('max supply exceeded');

      return { txHash: '111111111111111111111111111111111111111111111111111111111' };
    });

  await expect(
    altura.mintAdditionalSupply(
      '0x8abc8abc8abc8abc8abc8abc8abc8abc8abc8abc',
      4,
      1,
      '0x1111111111111111111111111111111111111111',
    ),
  ).rejects.toThrow('permission denied');

  await expect(
    altura.mintAdditionalSupply(
      '0xe7f8ccdae7f8ccdae7f8ccdae7f8ccdae7f8ccda',
      103,
      5,
      '0x0000000000000000000000000000000000000000',
    ),
  ).rejects.toThrow('max supply exceeded');

  await expect(
    altura.mintAdditionalSupply(
      '0xe7f8ccdae7f8ccdae7f8ccdae7f8ccdae7f8ccda',
      1000,
      5,
      '0x0000000000000000000000000000000000000000',
    ),
  ).rejects.toThrow('item does not exist');

  const data = await altura.mintAdditionalSupply(
    '0xe7f8ccdae7f8ccdae7f8ccdae7f8ccdae7f8ccda',
    103,
    1,
    '0x0000000000000000000000000000000000000000',
  );
  expect(data).toHaveProperty('txHash');

  spy.mockRestore();
});
