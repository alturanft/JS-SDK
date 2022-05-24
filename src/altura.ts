import { ApiCall } from './apiCall';
import { AlturaUser } from './user';
import { AlturaItem } from './item';
import { AlturaCollection } from './collection';
import { IAlturaCollection, IAlturaItem, IAlturaUser } from './types';
import { collectionFromJson, itemFromJson, userFromJson } from './utils';

export class Altura {
  apiCall: ApiCall;

  constructor(apiKey: string, logger?: (arg: string) => void) {
    this.apiCall = new ApiCall({ apiKey }, logger || ((arg: string) => arg));
  }

  /**
   * Takes a user's address and Altura Guard code and returns true if the code is valid and false otherwise
   * @param address The user's wallet address
   * @param code The user's inputted Altura Guard code
   */
  public async authenticateUser(address: string, code: string): Promise<{ authenticated: boolean }> {
    const json = await this.apiCall.get<{ authenticated: boolean }>(`user/verify_auth_code/${address}/${code}`);

    return {
      authenticated: json.authenticated,
    };
  }

  /**
   * Takes a user's wallet address and returns the instance of User class
   * @param address The user's wallet address
   */
  public async getUser(address: string): Promise<AlturaUser> {
    const json = await this.apiCall.get<{ user: IAlturaUser }>(`user/${address}`);
    const user = userFromJson(json.user);

    return new AlturaUser(user.address, user.name, user.bio, user.profilePicUrl, user.socialLink, this.apiCall);
  }

  /**
   * Takes a item's collection address and tokenId and returns the instance of Item class
   * @param collectionAddress Collection Address of item
   * @param tokenId Token ID of item in collection
   */
  public async getItem(collectionAddress: string, tokenId: number): Promise<AlturaItem> {
    const json = await this.apiCall.get<{ item: IAlturaItem }>(`item/${collectionAddress}/${tokenId}`);
    const item = itemFromJson(json.item);

    return new AlturaItem(
      item.collectionAddress,
      item.tokenId,
      item.chainId,
      item.name,
      item.description,
      item.image,
      item.imageUrl,
      item.primaryImageIndex,
      item.fileType,
      item.isVideo,
      item.creatorAddress,
      item.like,
      item.views,
      item.mintDate,
      item.royalty,
      item.nsfw,
      item.supply,
      item.maxSupply,
      item.stackable,
      item.properties,
      item.isListed,
      item.holders,
      item.hasUnlockableContent,
      item.unlockableContent,
      item.creatorName,
      item.collectionName,
      item.uri,
      item.isVerified,
      item.website,
      item.slug,
      this.apiCall,
    );
  }

  /**
   * Takes a collection's address and returns the instance of Collection class
   * @param address Address of collection
   */
  public async getCollection(address: string): Promise<AlturaCollection> {
    const json = await this.apiCall.get<{ collection: IAlturaCollection }>(`collection/${address}`);
    const collection = collectionFromJson(json.collection);

    return new AlturaCollection(
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
      this.apiCall,
    );
  }

  /**
   * Takes any query and returns an array of users that match that query
   * @param perPage The number of users to show in one page (default: 24)
   * @param page The offset for returned users. Calculated as (page - 1) * perpage (default: 1)
   * @param sortBy The field to sort the users by (any field in the user schema may be used) (default: "name")
   * @param sortDir Choose to sort in ascending(asc) or descending(desc) order (default: 'desc')
   * @returns An array of users
   */
  public async getUsers(params?: {
    perPage?: number;
    page?: number;
    sortBy?: string;
    sortDir?: 'desc' | 'asc';
  }): Promise<{ users: IAlturaUser[]; count: number }> {
    const _perPage = params && params.perPage ? params.perPage : 24;
    const _page = params && params.page ? params.page : 1;
    const _sortBy = params && params.sortBy ? params.sortBy : 'name';
    const _sortDir = params && params.sortDir ? params.sortDir : 'desc';
    const json = await this.apiCall.get<{ users: IAlturaUser[]; count: number }>('user', {
      perPage: _perPage,
      page: _page,
      sortBy: _sortBy,
      sortDir: _sortDir,
    });

    return {
      users: json.users.map((j) => userFromJson(j)),
      count: json.count,
    };
  }

  /**
   * Takes any query and returns an array of items that match that query
   * @param perPage The number of items to show in one page (default: 24)
   * @param page The offset for returned items. Calculated as (page - 1) * perpage (default: 1)
   * @param sortBy The field to sort the items by (any field in the item schema may be used) (default: "name")
   * @param sortDir Choose to sort in ascending(asc) or descending(desc) order (default: 'desc')
   * @param slim Returns a more condensed version of the items. Limits the item schema to: collectionAddress, tokenId, name, description, imageUrl and properties (default: false)
   * @param stateOnly Returns only the information required to identify a known item's state: properties, and imageIndex (default: false)
   */
  public async getItems(params?: {
    perPage?: number;
    page?: number;
    sortBy?: string;
    sortDir?: 'desc' | 'asc';
    slim?: boolean;
    stateOnly?: boolean;
  }): Promise<{ items: IAlturaItem[]; count: number }> {
    const _perPage = params && params.perPage ? params.perPage : 24;
    const _page = params && params.page ? params.page : 1;
    const _sortBy = params && params.sortBy ? params.sortBy : 'mintDate';
    const _sortDir = params && params.sortDir ? params.sortDir : 'desc';
    const _slim = params && params.slim ? params.slim : false;
    const _stateOnly = params && params.stateOnly ? params.stateOnly : false;

    const json = await this.apiCall.get<{ items: IAlturaItem[]; count: number }>('item', {
      perPage: _perPage,
      page: _page,
      sortBy: _sortBy,
      sortDir: _sortDir,
      slim: _slim,
      stateOnly: _stateOnly,
    });

    return {
      items: json.items.map((item) => itemFromJson(item)),
      count: json.count,
    };
  }
}
