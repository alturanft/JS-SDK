import { ApiCall } from './apiCall';
import { AlturaUser } from './user';
import { AlturaItem } from './item';
import { AlturaCollection } from './collection';
import { TAlturaCollection, TAlturaItem, TAlturaItemSlim, TAlturaUser } from './types';
import { collectionInstanceFromJson, itemInstanceFromJson, userInstanceFromJson } from './utils';
import { IConnector } from './connector';

export class Altura {
  apiCall: ApiCall;
  connector?: IConnector;

  constructor(apiKey?: string, logger?: (arg: string) => void, connector?: IConnector) {
    this.apiCall = new ApiCall({ apiKey }, logger || ((arg: string) => arg));
    connector
      ?.connect()
      ?.then(() => 0)
      ?.catch(() => 0);
    this.connector = connector;
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
   * Takes a user's connected wallet and Altura Guard code and returns true if the code is valid and false otherwise
   * @param code The user's inputted Altura Guard code
   */
  public async authenticateWallet(code: string): Promise<{ authenticated: boolean }> {
    const json = await this.apiCall.get<{ authenticated: boolean }>(
      `user/verify_auth_code/${this.connector?.address}/${code}`,
    );

    return {
      authenticated: json.authenticated,
    };
  }
  /**
   * Takes a user's connected wallet and Altura Guard2 code and returns token and address of user
   * @param code The user's inputted Altura Guard2 code
   */
  public async alturaGuard(code: string): Promise<{ token: string, address:string }> {
    const result = await this.apiCall.post<{ data: { token: string; address: string } }>(
      'alturaguard/addRequest',
      { apiKey: this.apiCall.apiKey },
      { code },
    );
    return {
      token: result.data.token, address: result.data.address,
    };
  }

  /**
   * Takes a user's wallet address and returns the instance of User class
   * @param address The user's wallet address; if null will fallback to the address of the connected wallet
   */
  public async getUser(address?: string): Promise<AlturaUser & TAlturaUser> {
    const json = await this.apiCall.get<{ user: object }>(`user/${address || this.connector?.address}`);
    return userInstanceFromJson(json.user, this.apiCall);
  }

  /**
   * Takes a item's collection address and tokenId and returns the instance of Item class
   * @param collectionAddress Collection Address of item
   * @param tokenId Token ID of item in collection
   * @param options Set slim to get simplified result
   */
  public async getItem(
    collectionAddress: string,
    tokenId: number,
    options?: {
      slim?: boolean;
    },
  ): Promise<(AlturaItem & TAlturaItemSlim) | (AlturaItem & TAlturaItem)> {
    let query = { slim: false };
    if (options && options.slim) query = { ...query, slim: true };

    const json = await this.apiCall.get<{ item: any }>(`item/${collectionAddress}/${tokenId}`, query);
    return itemInstanceFromJson(json.item, this.apiCall, query);
  }

  /**
   * Takes a collection's address and returns the instance of Collection class
   * @param address Address of collection
   */
  public async getCollection(address: string): Promise<AlturaCollection & TAlturaCollection> {
    const json = await this.apiCall.get<{ collection: TAlturaCollection }>(`collection/${address}`);
    return collectionInstanceFromJson(json.collection, this.apiCall);
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
  ): Promise<{ users: (AlturaUser & TAlturaUser)[]; count: number }> {
    let query = {
      perPage: params && params.perPage ? params.perPage : 24,
      page: params && params.page ? params.page : 1,
      sortBy: params && params.sortBy ? params.sortBy : 'name',
      sortDir: params && params.sortDir ? params.sortDir : 'desc',
    };
    if (searchQuery) query = { ...query, ...searchQuery };
    const json = await this.apiCall.get<{ users: object[]; count: number }>('user', query);

    return {
      users: json.users.map((j) => userInstanceFromJson(j, this.apiCall)),
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
   * @param searchQuery Object of search fields and values to get filterd items array
   */
  public async getItems(
    params?: {
      perPage?: number;
      page?: number;
      sortBy?: string;
      sortDir?: 'desc' | 'asc';
      slim?: boolean;
    },
    searchQuery?: object,
  ): Promise<{
    items: ((AlturaItem & TAlturaItemSlim) | (AlturaItem & TAlturaItem))[];
    count: number;
  }> {
    let query = {
      perPage: params && params.perPage ? params.perPage : 24,
      page: params && params.page ? params.page : 1,
      sortBy: params && params.sortBy ? params.sortBy : 'mintDate',
      sortDir: params && params.sortDir ? params.sortDir : 'desc',
      slim: params && params.slim ? params.slim : false,
    };
    if (searchQuery) query = { ...query, ...searchQuery };

    const json = await this.apiCall.get<{ items: any[]; count: number }>('item', query);

    return {
      items: json.items.map((item) => itemInstanceFromJson(item, this.apiCall, query)),
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

    const json = await this.apiCall.get<{ collections: TAlturaCollection[]; count: number }>('collection', query);

    return {
      collections: json.collections.map((c) => collectionInstanceFromJson(c, this.apiCall)),
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
   * Burns a single NFT from your developer wallet
   * @param collectionAddress The item's collection address
   * @param tokenId The item's tokenId
   * @param amount The quantity of this particular item you wish to transfer.
   * This operation will fail if you try to transfer more than your balance.
   */
  public async burnItem(collectionAddress: string, tokenId: number, amount: number): Promise<{ txHash: string }> {
    const data = await this.apiCall.post<{ txHash: string }>(
      'item/burn',
      { apiKey: this.apiCall.apiKey },
      { address: collectionAddress, tokenId, amount },
    );
    return { txHash: data.txHash };
  }

  /**
   * Burns several items of a particular collection from your developer wallet
   * @param collectionAddress The item's collection address
   * @param tokenIds An array of the token Ids you wish to transfer from the specified collection
   * @param amounts An array of the amount of each tokenId you wish to transfer
   * This array must be the same length as the tokenIds array
   */
  public async burnItems(
    collectionAddress: string,
    tokenIds: number[],
    amounts: number[],
  ): Promise<{ txHash: string }> {
    const data = await this.apiCall.post<{ txHash: string }>(
      'item/burn',
      { apiKey: this.apiCall.apiKey },
      { address: collectionAddress, tokenIds, amounts },
    );
    return { txHash: data.txHash };
  }

  /**
   * Transfers a single ERC721 token from your developer wallet to another user
   * @param collectionAddress The ERC721 collection address
   * @param tokenId The ERC721 tokenId
   * @param to The recipient's EVM-compatible address (0x...)
   */
  public async transferErc721(collectionAddress: string, tokenId: number, to: string): Promise<{ txHash: string }> {
    const data = await this.apiCall.post<{ txHash: string }>(
      'erc721/transfer',
      { apiKey: this.apiCall.apiKey },
      { address: collectionAddress, tokenId, to },
    );
    return { txHash: data.txHash };
  }

  /**
   * burns a single ERC721 token from your developer wallet
   * @param collectionAddress The ERC721 collection address
   * @param tokenId The ERC721 tokenId
   */
  public async burnErc721(collectionAddress: string, tokenId: number): Promise<{ txHash: string }> {
    const data = await this.apiCall.post<{ txHash: string }>(
      'erc721/burn',
      { apiKey: this.apiCall.apiKey },
      { address: collectionAddress, tokenId },
    );
    return { txHash: data.txHash };
  }

  /**
   * Transfers ERC20 tokens from your developer wallet to another user
   * @param contractAddress The contract address
   * @param chainId Network ID of the collection
   * @param amount the amount of tokens to be sended
   * @param to The recipient's EVM-compatible address (0x...)
   */
  public async transferErc20(
    contractAddress: string,
    CHAIN_ID: number,
    amount: number,
    to: string,
  ): Promise<{ txHash: string }> {
    const data = await this.apiCall.post<{ txHash: string }>(
      'erc20/transfer',
      { apiKey: this.apiCall.apiKey },
      { address: contractAddress, chainId: CHAIN_ID, to, amount },
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

  /**
   * Consume (burn) a consumable item directly from its owner wallet
   *
   * Takes an item's collection address, tokenId, amount to consume, address to consume from (from) and your API key and consume a given amount of the specified NFT from the specified address.
   * Only works if the item was created as consumable
   * @param addresss The item's collection address
   * @param tokenId The item's tokenId
   * @param amount The amount of item to consume
   * @param from The address you want to consume an item from
   */
  public async consumeItem(
    address: string,
    tokenId: number,
    amount: number,
    from: string,
  ): Promise<{ txHash: string }> {
    const data = await this.apiCall.post<{ txHash: string }>(
      'item/consume',
      { apiKey: this.apiCall.apiKey },
      { address, tokenId, amount, from },
    );

    return {
      txHash: data.txHash,
    };
  }
}
