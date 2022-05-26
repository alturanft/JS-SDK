import { Altura } from '../index';
import { ConsoleHandler, Logger, LogLevel } from 'logging-library';
import { USERS } from './data';

const logger = new Logger().addHandler(new ConsoleHandler(LogLevel.DEBUG));

const altura = new Altura('123456789', (arg: string) => logger.debug(arg));
const apiCall = altura.apiCall;

let getSpy: jest.SpyInstance;

beforeAll(() => {
  getSpy = jest.spyOn(apiCall, 'get').mockImplementation(async (apiPath: string, query?: object) => {
    logger.info(`[apiPath]: ${apiPath}`);

    switch (apiPath) {
      case 'user':
        if (query) {
          throw new Error('Query required!');
        } else {
          if (!query['perPage']) throw new Error('Query perPage required');
          if (!query['page']) throw new Error('Query page required');
          if (!query['sortBy']) throw new Error('Query sortBy required');
          if (!query['sortDir']) throw new Error('Query sortDir required');
        }
        return {
          users: USERS,
          count: 4,
        };

      default:
        break;
    }
  });
});

afterAll(() => {
  getSpy.mockRestore();
});

// Test altura.getUsers();
test('Altura get users', async () => {
  // call method with no params
  let data = await altura.getUsers();

  expect(data.users).toEqual(expect.any(Array));
  expect(data.users.length).toBeGreaterThan(0);
  expect(data.count).toBeGreaterThan(0);

  if (data.users.length > 0) {
    const user = data.users[0];
    expect(user.address).toEqual(expect.any(String));
    expect(user.name).toEqual(expect.any(String));
  }
});

// // Test altura.getItems();
// test('Altura get items', async () => {
//   const data = await altura.getItems();
//   data.items.forEach((item) => {
//     expect(['string']).toContain(typeof item.collectionAddress);
//     expect(['number']).toContain(typeof item.tokenId);
//     expect(['number']).toContain(typeof item.chainId);
//     expect(['string']).toContain(typeof item.name);
//     expect(['string']).toContain(typeof item.description);
//     expect(['string']).toContain(typeof item.image);
//     expect(['string']).toContain(typeof item.imageUrl);
//     expect(['number', 'undefined']).toContain(typeof item.primaryImageIndex);
//     expect(['string']).toContain(typeof item.fileType);
//     expect(['boolean']).toContain(typeof item.isVideo);
//     expect(['string']).toContain(typeof item.creatorAddress);
//     expect(['number', 'undefined']).toContain(typeof item.like);
//     expect(['number']).toContain(typeof item.views);
//     expect(['string', 'undefined']).toContain(typeof item.mintDate);
//     expect(['number']).toContain(typeof item.royalty);
//     expect(['boolean']).toContain(typeof item.nsfw);
//     expect(['number']).toContain(typeof item.supply);
//     expect(['number']).toContain(typeof item.maxSupply);
//     expect(['boolean']).toContain(typeof item.stackable);
//     expect(['object']).toContain(typeof item.properties);
//     expect(['boolean']).toContain(typeof item.isListed);
//     expect(['number']).toContain(typeof item.holders);
//     expect(['boolean']).toContain(typeof item.hasUnlockableContent);
//     expect(['string', 'undefined']).toContain(typeof item.unlockableContent);
//     expect(['string']).toContain(typeof item.creatorName);
//     expect(['string']).toContain(typeof item.collectionName);
//     expect(['string']).toContain(typeof item.uri);
//     expect(['boolean']).toContain(typeof item.isVerified);
//     expect(['string']).toContain(typeof item.website);
//     expect(['string']).toContain(typeof item.slug);
//   });
//   expect(typeof data.count).toBe('number');
// });

// // Test altura.getCollections();
// test('Alturaa get collections', async () => {
//   const data = await altura.getCollections();
//   data.collections.forEach((collection) => {
//     expect(['string']).toContain(typeof collection.address);
//     expect(['string']).toContain(typeof collection.name);
//     expect(['string']).toContain(typeof collection.description);
//     expect(['string']).toContain(typeof collection.genre);
//     expect(['string']).toContain(typeof collection.image);
//     expect(['string', 'undefined']).toContain(typeof collection.imageUrl);
//     expect(['string']).toContain(typeof collection.ownerAddress);
//     expect(['string']).toContain(typeof collection.slug);
//     expect(['string']).toContain(typeof collection.uri);
//     expect(['string']).toContain(typeof collection.website);
//     expect(['string']).toContain(typeof collection.mintDate);
//     expect(['number']).toContain(typeof collection.chainId);
//     expect(['number']).toContain(typeof collection.holders);
//     expect(['number']).toContain(typeof collection.volume_1d);
//     expect(['number']).toContain(typeof collection.volume_1w);
//     expect(['number']).toContain(typeof collection.volume_30d);
//     expect(['number']).toContain(typeof collection.volume_all);
//   });
//   expect(typeof data.count).toBe('number');
// });

// // Test altura.authenticateUser()
// test('Altura authenticate user', async () => {
//   const data = await altura.authenticateUser('0x3472b26ce82496b253e55732d552d932f4b1092d', '2wkWET');
//   expect(typeof data.authenticated).toBe('boolean');
// });

// // Test altura.mintAdditionalSupply()
