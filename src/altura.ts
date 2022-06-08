import { ApiCall } from './apiCall';
import { AlturaUser } from './user';
import { AlturaItem } from './item';
import { AlturaCollection } from './collection';
import { IAlturaCollection, IAlturaUser } from './types';
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
    return userFromJson(json.user, this.apiCall);
  }

  /**
   * Takes a item's collection address and tokenId and returns the instance of Item class
   * @param collectionAddress Collection Address of item
   * @param tokenId Token ID of item in collection
   */
  public async getItem(collectionAddress: string, tokenId: number): Promise<AlturaItem> {
    const json = await this.apiCall.get<{ item: any }>(`item/${collectionAddress}/${tokenId}`);
    return itemFromJson(json.item, this.apiCall);
  }

  /**
   * Takes a collection's address and returns the instance of Collection class
   * @param address Address of collection
   */
  public async getCollection(address: string): Promise<AlturaCollection> {
    const json = await this.apiCall.get<{ collection: IAlturaCollection }>(`collection/${address}`);
    return collectionFromJson(json.collection, this.apiCall);
  }

  /**
   * Takes any query and returns an array of users that match that query
   * @param perPage The number of users to show in one page (default: 24)
   * @param page The offset for returned users. Calculated as (page - 1) * perpage (default: 1)
   * @param sortBy The field to sort the users by (any field in the user schema may be used) (default: "name")
   * @param sortDir Choose to sort in ascending(asc) or descending(desc) order (default: 'desc')
   * @param searchQuery Object of search fields and values to get filterd users array
   * @returns An array of users
   */
  public async getUsers(
    params?: {
      perPage?: number;
      page?: number;
      sortBy?: string;
      sortDir?: 'desc' | 'asc';
    },
    searchQuery?: object,
  ): Promise<{ users: AlturaUser[]; count: number }> {
    let query = {
      perPage: params && params.perPage ? params.perPage : 24,
      page: params && params.page ? params.page : 1,
      sortBy: params && params.sortBy ? params.sortBy : 'name',
      sortDir: params && params.sortDir ? params.sortDir : 'desc',
    };
    if (searchQuery) query = { ...query, ...searchQuery };
    const json = await this.apiCall.get<{ users: object[]; count: number }>('user', query);

    return {
      users: json.users.map((j) => userFromJson(j, this.apiCall)),
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
   * @param searchQuery Object of search fields and values to get filterd items array
   */
  public async getItems(
    params?: {
      perPage?: number;
      page?: number;
      sortBy?: string;
      sortDir?: 'desc' | 'asc';
      slim?: boolean;
      stateOnly?: boolean;
    },
    searchQuery?: object,
  ): Promise<{ items: object[]; count: number }> {
    let query = {
      perPage: params && params.perPage ? params.perPage : 24,
      page: params && params.page ? params.page : 1,
      sortBy: params && params.sortBy ? params.sortBy : 'mintDate',
      sortDir: params && params.sortDir ? params.sortDir : 'desc',
      slim: params && params.slim ? params.slim : false,
      stateOnly: params && params.stateOnly ? params.stateOnly : false,
    };
    if (searchQuery) query = { ...query, ...searchQuery };

    const json = await this.apiCall.get<{ items: any[]; count: number }>('item', query);

    return {
      items: json.items.map((item) => itemFromJson(item, this.apiCall)),
      count: json.count,
    };
  }

  /**
   * Takes any query and returns an array of collections that match that query
   * @param perPage The number of collections to show in one page (default: 24)
   * @param page The offset for returned collections. Calculated as (page - 1) * perpage (default: 1)
   * @param sortBy The field to sort the collections by (any field in the collection schema may be used) (default: "name")
   * @param sortDir Choose to sort in ascending(asc) or descending(desc) order (default: 'desc')
   * @param searchQuery Object of search fields and values to get filterd collections array
   */
  public async getCollections(
    params?: {
      perPage?: number;
      page?: number;
      sortBy?: string;
      sortDir?: 'desc' | 'asc';
    },
    searchQuery?: object,
  ): Promise<{ collections: AlturaCollection[]; count: number }> {
    let query = {
      perPage: params && params.perPage ? params.perPage : 24,
      page: params && params.page ? params.page : 1,
      sortBy: params && params.sortBy ? params.sortBy : 'mintDate',
      sortDir: params && params.sortDir ? params.sortDir : 'desc',
    };
    if (searchQuery) query = { ...query, ...searchQuery };

    const json = await this.apiCall.get<{ collections: IAlturaCollection[]; count: number }>('collection', query);

    return {
      collections: json.collections.map((c) => collectionFromJson(c, this.apiCall)),
      count: json.count,
    };
  }

  /**
   * Transfers a single NFT from your developer wallet to another user
   * @param collectionAddress The item's collection address
   * @param tokenId The item's tokenId
   * @param amount The quantity of this particular item you wish to transfer.
   * This operation will fail if you try to transfer more than your balance.
   * @param to The recipient's EVM-compatible address (0x...)
   */
  public async transferItem(
    collectionAddress: string,
    tokenId: number,
    amount: number,
    to: string,
  ): Promise<{ txHash: string }> {
    const data = await this.apiCall.post<{ txHash: string }>(
      'item/transfer',
      { apiKey: this.apiCall.apiKey },
      { address: collectionAddress, tokenId, amount, to },
    );
    return { txHash: data.txHash };
  }

  /**
   * Transfers several items of a particular collection from your developer wallet to another user
   * @param collectionAddress The item's collection address
   * @param tokenIds An array of the token Ids you wish to transfer from the specified collection
   * @param amounts An array of the amount of each tokenId you wish to transfer
   * This array must be the same length as the tokenIds array
   * @param to The recipient's EVM-compatible address (0x...)
   */
  public async transferItems(
    collectionAddress: string,
    tokenIds: number[],
    amounts: number[],
    to: string,
  ): Promise<{ txHash: string }> {
    const data = await this.apiCall.post<{ txHash: string }>(
      'item/transfer',
      { apiKey: this.apiCall.apiKey },
      { address: collectionAddress, tokenIds, amounts, to },
    );
    return { txHash: data.txHash };
  }

  /**
   * Mints additional supply of an existent NFT
   *
   * Takes an item's collection address, tokenId, amount to mint, address to mint to (to) and your API key and mints additional supply of the specified NFT to the specified address.
   * Only works if the circulating supply is less than the maximum supply
   * @param addresss The item's collection address
   * @param tokenId The item's tokenId
   * @param amount The amount of additional supply you want to mint
   * @param to The address you want to mint the additional supply to.
   * You do not need to mint the additional supply to your own wallet, instead, you can mint them to someone else's wallt right away
   */
  public async mintAdditionalSupply(
    address: string,
    tokenId: number,
    amount: number,
    to: string,
  ): Promise<{ txHash: string }> {
    const data = await this.apiCall.post<{ txHash: string }>(
      'item/mint',
      { apiKey: this.apiCall.apiKey },
      { address, tokenId, amount, to },
    );

    return {
      txHash: data.txHash,
    };
  }
}
