import { ApiCall } from '../apiCall';
import { AlturaCollection } from '../collection';
import { AlturaItem } from '../item';
import {
  IAlturaEvent,
  TAlturaCollection,
  TAlturaHolder,
  TAlturaItem,
  TAlturaItemSlim,
  TAlturaItemState,
  TAlturaUpdatedCollection,
  TAlturaUpdatedItem,
  TAlturaUser,
  TAlturaUserItem,
  TAlturaUserItemSlim,
  TAlturaUserItemState,
} from '../types';
import { AlturaUser } from '../user';

export const userInstanceFromJson = (user: object, apiCall: ApiCall): AlturaUser & TAlturaUser => {
  const userInstance: AlturaUser = new AlturaUser(user[`address`], user[`name`], apiCall);
  const alturaUser: TAlturaUser = userFromJson(user);

  Object.entries(alturaUser).forEach(([key, value]) => {
    userInstance[`${key}`] = value;
  });

  return userInstance as AlturaUser & TAlturaUser;
};

export const holderInstanceFromJson = (user: object, apiCall: ApiCall): AlturaUser & TAlturaHolder => {
  const userInstance: AlturaUser = new AlturaUser(user[`address`], user[`name`], apiCall);
  const alturaHolder: TAlturaHolder = holderFromJson(user);

  Object.entries(alturaHolder).forEach(([key, value]) => {
    userInstance[`${key}`] = value;
  });

  return userInstance as AlturaUser & TAlturaHolder;
};

export const updatedItemInstanceFromJson = (item: object, apiCall: ApiCall): AlturaItem & TAlturaUpdatedItem => {
  const itemInstance: AlturaItem = new AlturaItem(item[`itemCollection`], item[`tokenId`], apiCall);
  const updateItem = updatedItemFromJson(item);

  Object.entries(updateItem).forEach(([key, value]) => {
    itemInstance[`${key}`] = value;
  });

  return itemInstance as AlturaItem & TAlturaUpdatedItem;
};

export const itemInstanceFromJson = (
  item: object,
  apiCall: ApiCall,
  query: { slim: boolean; stateOnly: boolean },
): (AlturaItem & TAlturaItemState) | (AlturaItem & TAlturaItemSlim) | (AlturaItem & TAlturaItem) => {
  const itemInstance: AlturaItem = new AlturaItem(item[`collectionAddress`], item[`tokenId`], apiCall);

  let alturaItem: TAlturaItem | TAlturaItemSlim | TAlturaItemState;
  if (query.slim) alturaItem = itemSlimFromJson(item);
  if (query.stateOnly) alturaItem = itemStateFromJson(item);
  alturaItem = itemFromJson(item);

  Object.entries(alturaItem).forEach(([key, value]) => {
    itemInstance[`${key}`] = value;
  });

  return itemInstance as (AlturaItem & TAlturaItemState) | (AlturaItem & TAlturaItemSlim) | (AlturaItem & TAlturaItem);
};

export const userItemInstanceFromJson = (
  item: object,
  apiCall: ApiCall,
  query: { slim: boolean; stateOnly: boolean },
): (AlturaItem & TAlturaUserItemState) | (AlturaItem & TAlturaUserItemSlim) | (AlturaItem & TAlturaUserItem) => {
  const itemInstance: AlturaItem = new AlturaItem(item[`collectionAddress`], item[`tokenId`], apiCall);

  let alturaItem: TAlturaItem | TAlturaItemSlim | TAlturaItemState;
  if (query.slim) alturaItem = itemSlimFromJson(item);
  if (query.stateOnly) alturaItem = itemStateFromJson(item);
  alturaItem = itemFromJson(item);

  Object.entries(alturaItem).forEach(([key, value]) => {
    itemInstance[`${key}`] = value;
  });
  itemInstance[`userBalance`] = item[`userBalance`];

  return itemInstance as
    | (AlturaItem & TAlturaUserItemState)
    | (AlturaItem & TAlturaUserItemSlim)
    | (AlturaItem & TAlturaUserItem);
};

export const collectionInstanceFromJson = (
  collection: object,
  apiCall: ApiCall,
): AlturaCollection & TAlturaCollection => {
  const collectionInstance = new AlturaCollection(
    collection[`address`],
    collection[`volume_1d`],
    collection[`volume_1w`],
    collection[`volume_30d`],
    collection[`volume_all`],
    apiCall,
  );

  const alturaCollection = collectionFromJson(collection);

  Object.entries(alturaCollection).forEach(([key, value]) => {
    collectionInstance[`${key}`] = value;
  });

  return collectionInstance as AlturaCollection & TAlturaCollection;
};

export const updatedCollectionInstanceFromJson = (
  collection: object,
  apiCall: ApiCall,
): AlturaCollection & TAlturaUpdatedCollection => {
  const collectionInstance = new AlturaCollection(
    collection[`address`],
    collection[`volume_1d`],
    collection[`volume_1w`],
    collection[`volume_30d`],
    collection[`volume_all`],
    apiCall,
  );

  const alturaCollection = UpdatedCollectionFromJson(collection);

  Object.entries(alturaCollection).forEach(([key, value]) => {
    collectionInstance[`${key}`] = value;
  });

  return collectionInstance as AlturaCollection & TAlturaUpdatedCollection;
};

export const eventFromJson = (event: object): IAlturaEvent => {
  const fromJson: IAlturaEvent = {
    id: event[`id`],
    amount: event[`amount`],
    blockNumber: event[`blockNumber`],
    chainId: event[`chainId`],
    event: event[`event`],
    from: event[`from`],
    itemCollection: event[`itemCollection`],
    itemRef: event[`itemRef`],
    timestamp: event[`timestamp`],
    to: event[`to`],
    tokenId: event[`tokenId`],
    transactionHash: event[`transactionHash`],
  };

  return fromJson;
};

const userFromJson = (user: object): TAlturaUser => {
  return {
    name: user[`name`],
    address: user[`address`],
    bio: user[`bio`],
    socialLink: user[`socialLink`],
    profilePicUrl: user[`profilePicUrl`],
  };
};

const holderFromJson = (user: object): TAlturaHolder => {
  return {
    name: user[`name`],
    address: user[`address`],
    bio: user[`bio`],
    socialLink: user[`socialLink`],
    profilePicUrl: user[`profilePicUrl`],
    balance: user[`balance`],
  };
};

const itemSlimFromJson = (item: object): TAlturaItemSlim => {
  return {
    collectionAddress: item[`collectionAddress`],
    tokenId: item[`tokenId`],
    name: item[`name`],
    properties: item[`properties`],
    imageUrl: item[`imageUrl`],
    description: item[`description`],
    holders: item[`holders`],
    listers: item[`listers`],
    imageIndex: item[`imageIndex`],
  };
};

const itemStateFromJson = (item: object): TAlturaItemState => {
  return {
    collectionAddress: item[`collectionAddress`],
    tokenId: item[`tokenId`],
    properties: item[`properties`],
    holders: item[`holders`],
    listers: item[`listers`],
    imageIndex: item[`imageIndex`],
  };
};

const itemFromJson = (item: object): TAlturaItem => {
  return {
    collectionAddress: item[`collectionAddress`],
    tokenId: item[`tokenId`],
    chainId: item[`chainId`],
    name: item[`name`],
    description: item[`description`],
    image: item[`image`],
    imageUrl: item[`imageUrl`],
    primaryImageIndex: item[`primaryImageIndex`],
    fileType: item[`fileType`],
    isVideo: item[`isVideo`],
    creatorAddress: item[`creatorAddress`],
    like: item[`like`],
    views: item[`views`],
    mintDate: item[`mintDate`],
    royalty: item[`royalty`],
    nsfw: item[`nsfw`],
    supply: item[`supply`],
    maxSupply: item[`maxSupply`],
    stackable: item[`stackable`],
    properties: item[`properties`],
    isListed: item[`isListed`],
    holders: item[`holders`],
    hasUnlockableContent: item[`hasUnlockableContent`],
    unlockableContent: item[`unlockableContent`],
    creatorName: item[`creatorName`],
    collectionName: item[`collectionName`],
    uri: item[`uri`],
    isVerified: item[`isVerified`],
    website: item[`website`],
    slug: item[`slug`],
    otherImages: item[`otherImages`],
  };
};

const updatedItemFromJson = (item: object): TAlturaUpdatedItem => {
  return {
    otherImageVisibility: item[`otherImageVisibility`],
    likes: item[`likes`],
    allViews: item[`allViews`],
    uniqueViews: item[`uniqueViews`],
    isListed: item[`isListed`],
    nsfw: item[`nsfw`],
    isVerified: item[`isVerified`],
    isSmartNFT: item[`isSmartNFT`],
    isLootBoxKey: item[`isLootBoxKey`],
    restrictSecondarySales: item[`restrictSecondarySales`],
    featured: item[`featured`],
    deleted: item[`deleted`],
    tokenId: item[`tokenId`],
    itemCollection: item[`itemCollection`],
    chainId: item[`chainId`],
    itemRef: item[`itemRef`],
    creatorAddress: item[`creatorAddress`],
    itemCollectionName: item[`itemCollectionName`],
    name: item[`name`],
    description: item[`description`],
    properties: item[`properties`],
    supply: item[`supply`],
    maxSupply: item[`maxSupply`],
    nonStackableSupply: item[`nonStackableSupply`],
    stackable: item[`stackable`],
    image: item[`image`],
    imageHash: item[`imageHash`],
    fileType: item[`fileType`],
    isVideo: item[`isVideo`],
    royalty: item[`royalty`],
    holders: item[`holders`],
    listers: item[`listers`],
    mintId: item[`mintId`],
    mintDate: item[`mintDate`],
    otherImages: item[`otherImages`],
    unlockableContent: item[`unlockableContent`],
  };
};

const collectionFromJson = (collection: object) => {
  return {
    address: collection[`address`],
    name: collection[`name`],
    description: collection[`description`],
    genre: collection[`genre`],
    image: collection[`image`],
    imageUrl: collection[`imageUrl`],
    ownerAddress: collection[`ownerAddress`],
    slug: collection[`slug`],
    uri: collection[`uri`],
    website: collection[`website`],
    mintDate: collection[`mintDate`],
    chainId: collection[`chainId`],
    holders: collection[`holders`],
    volume_1d: collection[`volume_1d`],
    volume_1w: collection[`volume_1w`],
    volume_30d: collection[`volume_30d`],
    volume_all: collection[`volume_all`],
  };
};

const UpdatedCollectionFromJson = (collection: object) => {
  return {
    isPublic: collection[`sPublic`],
    holders: collection[`olders`],
    volume_1d: collection[`olume_1d`],
    volume_1w: collection[`olume_1w`],
    volume_30d: collection[`olume_30d`],
    volume_all: collection[`olume_all`],
    isVerified: collection[`sVerified`],
    featured: collection[`eatured`],
    featuredMain: collection[`eaturedMain`],
    chainId: collection[`hainId`],
    address: collection[`ddress`],
    name: collection[`ame`],
    ownerAddress: collection[`wnerAddress`],
    image: collection[`mage`],
    imageHash: collection[`mageHash`],
    description: collection[`escription`],
    uri: collection[`ri`],
    slug: collection[`lug`],
    website: collection[`ebsite`],
    genre: collection[`enre`],
    version: collection[`ersion`],
    mintDate: collection[`intDate`],
    imageUrl: collection[`mageUrl`],
  };
};
