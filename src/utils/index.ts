import { IAlturaCollection, IAlturaEvevnt, IAlturaItem, IAlturaUser } from '../types';

export const userFromJson = (user: any): IAlturaUser => {
  const fromJson: IAlturaUser = {
    address: user.address,
    name: user.name,
    bio: user.bio || '',
    socialLink: user.socialLink || '',
    profilePicUrl: user.profilePicUrl || '',
  };

  return fromJson;
};

export const itemFromJson = (item: any): IAlturaItem => {
  const fromJson: IAlturaItem = {
    collectionAddress: item.collectionAddress,
    tokenId: item.tokenId,
    chainId: item.chainId,
    name: item.name,
    description: item.description,
    image: item.image,
    imageUrl: item.imageUrl,
    fileType: item.fileType,
    isVideo: item.isVideo,
    creatorAddress: item.creatorAddress,
    views: item.views,
    royalty: item.royalty,
    nsfw: item.nsfw,
    supply: item.supply,
    maxSupply: item.maxSupply,
    stackable: item.stackable,
    properties: item.properties,
    isListed: item.isListed,
    holders: item.holders,
    hasUnlockableContent: false,
    unlockableContent: item.hasUnlockableContent ? item.unlockableContent : undefined,
    creatorName: item.creatorName,
    collectionName: item.collectionName,
    uri: item.uri,
    isVerified: item.isVerified,
    website: item.website,
    slug: item.slug,
    primaryImageIndex: item.primaryImageIndex,
    like: item.like,
    mintDate: item.mintdate,
    otherImages: item.otherImages,
  };

  return fromJson;
};

export const collectionFromJson = (collection: any): IAlturaCollection => {
  const fromJson = {
    address: collection.address,
    name: collection.name,
    description: collection.description,
    genre: collection.genre,
    image: collection.image,
    imageUrl: collection.imageUrl,
    ownerAddress: collection.ownerAddress,
    slug: collection.slug,
    uri: collection.uri,
    website: collection.website,
    mintDate: collection.mintDate,
    chainId: collection.chainId,
    holders: collection.holders,
    volume_1d: collection.volume_1d,
    volume_1w: collection.volume_1w,
    volume_30d: collection.volume_30d,
    volume_all: collection.volume_all,
  };

  return fromJson;
};

export const eventFromJson = (event: any): IAlturaEvevnt => {
  const fromJson = {
    id: event.id,
    amount: event.amount,
    blockNumber: event.blockNumber,
    chainId: event.chainId,
    event: event.event,
    from: event.from,
    itemCollection: event.itemCollection,
    itemRef: event.itemRef,
    timestamp: event.timestamp,
    to: event.to,
    tokenId: event.tokenId,
    transactionHash: event.transactionHash,
  };

  return fromJson;
};
