import { ApiCall } from '../apiCall';
import { AlturaCollection } from '../collection';
import { AlturaItem } from '../item';
import {
  IAlturaEvent,
  TAlturaCollection,
  TAlturaHolder,
  TAlturaItem,
  TAlturaItemSlim,
  TAlturaUser,
  TAlturaUserItem,
  TAlturaUserItemSlim,
  TAlturaGuard
} from '../types';
import { AlturaUser } from '../user';
import { AlturaGuard } from '../alturaGuard';

export const alturaGuardInstanceFromJson = (data: object, apiCall: ApiCall): AlturaGuard & TAlturaGuard=> {
  const alturaGuardInstance: AlturaGuard = new AlturaGuard(data[`token`],data[`address`], apiCall);
  const alturaGuard: TAlturaGuard = userFromJson(data);

  Object.entries(alturaGuard).forEach(([key, value]) => {
    alturaGuard[`${key}`] = value;
  });

  return alturaGuardInstance as AlturaGuard & TAlturaGuard;
};

export const userInstanceFromJson = (user: object, apiCall: ApiCall): AlturaUser & TAlturaUser => {
  const userInstance: AlturaUser = new AlturaUser(user[`address`], apiCall);
  const alturaUser: TAlturaUser = userFromJson(user);

  Object.entries(alturaUser).forEach(([key, value]) => {
    userInstance[`${key}`] = value;
  });

  return userInstance as AlturaUser & TAlturaUser;
};

export const holderInstanceFromJson = (user: object, apiCall: ApiCall): AlturaUser & TAlturaHolder => {
  const userInstance: AlturaUser = new AlturaUser(user[`address`], apiCall);
  const alturaHolder: TAlturaHolder = holderFromJson(user);

  Object.entries(alturaHolder).forEach(([key, value]) => {
    userInstance[`${key}`] = value;
  });

  return userInstance as AlturaUser & TAlturaHolder;
};

export const updatedItemInstanceFromJson = (item: object, apiCall: ApiCall): AlturaItem & TAlturaItem => {
  const itemInstance: AlturaItem = new AlturaItem(item[`collectionAddress`], item[`tokenId`], apiCall);
  const updatedItem = itemFromJson(item);

  Object.entries(updatedItem).forEach(([key, value]) => {
    itemInstance[`${key}`] = value;
  });

  return itemInstance as AlturaItem & TAlturaItem;
};

export const itemInstanceFromJson = (
  item: object,
  apiCall: ApiCall,
  query: { slim: boolean },
): (AlturaItem & TAlturaItemSlim) | (AlturaItem & TAlturaItem) => {
  const itemInstance: AlturaItem = new AlturaItem(item[`collectionAddress`], item[`tokenId`], apiCall);

  let alturaItem: TAlturaItem | TAlturaItemSlim;
  if (query.slim) {
    alturaItem = itemSlimFromJson(item);
  } else {
    alturaItem = itemFromJson(item);
  }

  Object.entries(alturaItem).forEach(([key, value]) => {
    itemInstance[`${key}`] = value;
  });

  return itemInstance as (AlturaItem & TAlturaItemSlim) | (AlturaItem & TAlturaItem);
};

export const userItemInstanceFromJson = (
  item: object,
  apiCall: ApiCall,
  query: { slim: boolean },
): (AlturaItem & TAlturaUserItemSlim) | (AlturaItem & TAlturaUserItem) => {
  const itemInstance: AlturaItem = new AlturaItem(item[`collectionAddress`], item[`tokenId`], apiCall);

  let alturaItem: TAlturaItem | TAlturaItemSlim;
  if (query.slim) {
    alturaItem = itemSlimFromJson(item);
  } else {
    alturaItem = itemFromJson(item);
  }

  Object.entries(alturaItem).forEach(([key, value]) => {
    itemInstance[`${key}`] = value;
  });
  itemInstance[`userBalance`] = item[`userBalance`];

  return itemInstance as (AlturaItem & TAlturaUserItemSlim) | (AlturaItem & TAlturaUserItem);
};

export const collectionInstanceFromJson = (
  collection: object,
  apiCall: ApiCall,
): AlturaCollection & TAlturaCollection => {
  const collectionInstance = new AlturaCollection(collection[`address`], apiCall);

  const alturaCollection = collectionFromJson(collection);

  Object.entries(alturaCollection).forEach(([key, value]) => {
    collectionInstance[`${key}`] = value;
  });

  return collectionInstance as AlturaCollection & TAlturaCollection;
};

export const updatedCollectionInstanceFromJson = (
  collection: object,
  apiCall: ApiCall,
): AlturaCollection & TAlturaCollection => {
  const collectionInstance = new AlturaCollection(collection[`address`], apiCall);

  const alturaCollection = collectionFromJson(collection);

  Object.entries(alturaCollection).forEach(([key, value]) => {
    collectionInstance[`${key}`] = value;
  });

  return collectionInstance as AlturaCollection & TAlturaCollection;
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
    address: user[`address`],
    name: user[`name`],
    bio: user[`bio`],
    profilePic: user[`profilePicUrl`],
    socialLink: user[`socialLink`],
    profilePicUrl: user[`profilePicUrl`],
  };
};

const holderFromJson = (user: object): TAlturaHolder => {
  return {
    address: user[`address`],
    balance: user[`balance`],
    name: user[`name`],
    profilePic: user[`profilePic`],
    profilePicUrl: user[`profilePicUrl`],
  };
};

const itemSlimFromJson = (item: object): TAlturaItemSlim => {
  return {
    name: item[`name`],
    properties: item[`properties`],
    tokenId: item[`tokenId`],
    collectionAddress: item[`collectionAddress`],
    supply: item[`supply`],
    maxSupply: item[`maxSupply`],
    image: item[`image`],
    imageUrl: item[`imageUrl`],
    imageIndex: item[`imageIndex`],
    imageCount: item[`imageCount`],
  };
};

const itemFromJson = (item: object): TAlturaItem => {
  return {
    name: item[`name`],
    description: item[`description`],
    properties: item[`properties`],
    chainId: item[`chainId`],
    royalty: item[`royalty`],
    creatorAddress: item[`creatorAddress`],
    mintDate: item[`mintDate`],
    stackable: item[`stackable`],
    supply: item[`supply`],
    maxSupply: item[`maxSupply`],
    image: item[`image`],
    imageHash: item[`imageHash`],
    imageUrl: item[`imageUrl`],
    fileType: item[`fileType`],
    isVideo: item[`isVideo`],
    otherImageVisibility: item[`otherImageVisibility`],
    holders: item[`holders`],
    listers: item[`listers`],
    likes: item[`likes`],
    views: item[`views`],
    isListed: item[`isListed`],
    mostRecentListing: item[`mostRecentListing`],
    cheapestListingPrice: item[`cheapestListingPrice`],
    cheapestListingCurrency: item[`cheapestListingCurrency`],
    cheapestListingUSD: item[`cheapestListingUSD`],
    nsfw: item[`nsfw`],
    isVerified: item[`isVerified`],
    hasUnlockableContent: item[`hasUnlockableContent`],
    imageIndex: item[`imageIndex`],
    imageCount: item[`imageCount`],
    totalListings: item[`totalListings`],
  };
};

const collectionFromJson = (collection: object) => {
  return {
    address: collection[`address`],
    name: collection[`name`],
    description: collection[`description`],
    genre: collection[`genre`],
    image: collection[`image`],
    imageHash: collection[`imageHash`],
    ownerAddress: collection[`ownerAddress`],
    slug: collection[`slug`],
    uri: collection[`uri`],
    website: collection[`website`],
    holders: collection[`holders`],
    volume_1d: collection[`volume_1d`],
    volume_1w: collection[`volume_1w`],
    volume_30d: collection[`volume_30d`],
    volume_all: collection[`volume_all`],
    imageUrl: collection[`imageUrl`],
    chainId: collection[`chainId`],
    mintDate: collection[`mintDate`],
  };
};
