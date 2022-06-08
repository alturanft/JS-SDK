import { ApiCall } from '../apiCall';
import { AlturaCollection } from '../collection';
import { AlturaItem } from '../item';
import { IAlturaCollection, IAlturaEvent, IAlturaItem, IAlturaUser } from '../types';
import { AlturaUser } from '../user';

export const userFromJson = (user: any, apiCall: ApiCall): AlturaUser => {
  const fromJson: AlturaUser = new AlturaUser(
    user.address,
    user.name,
    user.bio || '',
    user.profilePicUrl || '',
    user.socialLink || '',
    apiCall,
  );

  return fromJson;
};

export const itemFromJson = (item: any, apiCall: ApiCall): AlturaItem => {
  const fromJson: AlturaItem = new AlturaItem(
    item.collectionAddress,
    item.tokenId,
    item.chainId,
    item.name,
    item.description,
    item.image,
    item.imageUrl,
    item.fileType,
    item.isVideo,
    item.creatorAddress,
    item.views,
    item.royalty,
    item.nsfw,
    item.supply,
    item.maxSupply,
    item.stackable,
    item.properties,
    item.isListed,
    item.holders,
    item.properties,
    item.hasUnlockableContent ? item.unlockableContent : undefined,
    item.creatorName,
    item.collectionName,
    item.uri,
    item.isVerified,
    item.website,
    item.slug,
    item.primaryImageIndex,
    item.like,
    item.mintdate,
    item.otherImages,
    apiCall,
  );

  return fromJson;
};

export const collectionFromJson = (collection: any, apiCall: ApiCall): AlturaCollection => {
  const fromJson: AlturaCollection = new AlturaCollection(
    collection.address,
    collection.name,
    collection.description,
    collection.genre,
    collection.image,
    collection.imageUrl,
    collection.ownerAddress,
    collection.slug,
    collection.uri,
    collection.website,
    collection.mintDate,
    collection.chainId,
    collection.holders,
    collection.volume_1d,
    collection.volume_1w,
    collection.volume_30d,
    collection.volume_all,
    apiCall,
  );

  return fromJson;
};

export const eventFromJson = (event: any): IAlturaEvent => {
  const fromJson: IAlturaEvent = {
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
