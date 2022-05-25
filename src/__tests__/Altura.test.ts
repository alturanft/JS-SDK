import { Altura } from '../index';
import { ConsoleHandler, Logger, LogLevel } from 'logging-library';

const logger = new Logger().addHandler(new ConsoleHandler(LogLevel.DEBUG));

const altura = new Altura('123456789', (arg: string) => logger.debug(arg));

test('Altura get users', async () => {
  const data = await altura.getUsers();
  data.users.forEach((user) => {
    expect(['string']).toContain(typeof user.address);
    expect(['string']).toContain(typeof user.name);
    expect(['string']).toContain(typeof user.bio);
    expect(['string']).toContain(typeof user.profilePicUrl);
    expect(['string']).toContain(typeof user.socialLink);
  });
  expect(typeof data.count).toBe('number');
});

test('Altura get items', async () => {
  const data = await altura.getItems();
  data.items.forEach((item) => {
    expect(['string']).toContain(typeof item.collectionAddress);
    expect(['number']).toContain(typeof item.tokenId);
    expect(['number']).toContain(typeof item.chainId);
    expect(['string']).toContain(typeof item.name);
    expect(['string']).toContain(typeof item.description);
    expect(['string']).toContain(typeof item.image);
    expect(['string']).toContain(typeof item.imageUrl);
    expect(['number', 'undefined']).toContain(typeof item.primaryImageIndex);
    expect(['string']).toContain(typeof item.fileType);
    expect(['boolean']).toContain(typeof item.isVideo);
    expect(['string']).toContain(typeof item.creatorAddress);
    expect(['number', 'undefined']).toContain(typeof item.like);
    expect(['number']).toContain(typeof item.views);
    expect(['string', 'undefined']).toContain(typeof item.mintDate);
    expect(['number']).toContain(typeof item.royalty);
    expect(['boolean']).toContain(typeof item.nsfw);
    expect(['number']).toContain(typeof item.supply);
    expect(['number']).toContain(typeof item.maxSupply);
    expect(['boolean']).toContain(typeof item.stackable);
    expect(['object']).toContain(typeof item.properties);
    expect(['boolean']).toContain(typeof item.isListed);
    expect(['number']).toContain(typeof item.holders);
    expect(['boolean']).toContain(typeof item.hasUnlockableContent);
    expect(['string', 'undefined']).toContain(typeof item.unlockableContent);
    expect(['string']).toContain(typeof item.creatorName);
    expect(['string']).toContain(typeof item.collectionName);
    expect(['string']).toContain(typeof item.uri);
    expect(['boolean']).toContain(typeof item.isVerified);
    expect(['string']).toContain(typeof item.website);
    expect(['string']).toContain(typeof item.slug);
  });
  expect(typeof data.count).toBe('number');
});

test('Alturaa get collections', async () => {
  const data = await altura.getCollections();
  data.collections.forEach((collection) => {
    expect(['string']).toContain(typeof collection.address);
    expect(['string']).toContain(typeof collection.name);
    expect(['string']).toContain(typeof collection.description);
    expect(['string']).toContain(typeof collection.genre);
    expect(['string']).toContain(typeof collection.image);
    expect(['string', 'undefined']).toContain(typeof collection.imageUrl);
    expect(['string']).toContain(typeof collection.ownerAddress);
    expect(['string']).toContain(typeof collection.slug);
    expect(['string']).toContain(typeof collection.uri);
    expect(['string']).toContain(typeof collection.website);
    expect(['string']).toContain(typeof collection.mintDate);
    expect(['number']).toContain(typeof collection.chainId);
    expect(['number']).toContain(typeof collection.holders);
    expect(['number']).toContain(typeof collection.volume_1d);
    expect(['number']).toContain(typeof collection.volume_1w);
    expect(['number']).toContain(typeof collection.volume_30d);
    expect(['number']).toContain(typeof collection.volume_all);
  });
  expect(typeof data.count).toBe('number');
});

test('Altura authenticate user', async () => {
  const data = await altura.authenticateUser('0x3472b26ce82496b253e55732d552d932f4b1092d', '2wkWET');
  expect(typeof data.authenticated).toBe('boolean');
});
