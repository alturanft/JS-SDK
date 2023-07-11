import { ApiCall } from './apiCall';
import { AlturaItem } from './item';
import { TAlturaUserItem, TAlturaUserItemSlim } from './types';
import { userItemInstanceFromJson } from './utils';

export class AlturaUser {
  address: string;
  private apiCall: ApiCall;

  constructor(_address: string, _apiCall: ApiCall) {
    this.address = _address;
    this.apiCall = _apiCall;
  }

  /**
   *
   * @param perPage The number of items to return (default: 24)
   * @param page The offset for returned items. Calculated as (page - 1) * perPage (default: 1)
   * @param sortBy The field to sort the items by (any field in the item model may be used) (default: mintDate)
   * @param sortDir Choose to sort in ascending (asc) or descending (desc) order (default: desc)
   * @param includeListed If the user's listed NFTs should be included
   * (listed NFTs are still owned by the user, however on the blockchain they are held by a marketplace smart contract)
   * (default:: true)
   * @param slim Returns a more condensed version of the items. Limits the item fields to: collectionAddress, tokenId, name, description, imageUrl and properties (default: false)
   * @param searchQuery Object of search fields and values to get filterd user's items array
   */
  public async getItems(
    params?: {
      perPage?: number;
      page?: number;
      sortBy?: string;
      sortDir?: 'desc' | 'asc';
      includeListed?: boolean;
      slim?: boolean;
    },
    searchQuery?: object,
  ): Promise<{
    items: ((AlturaItem & TAlturaUserItemSlim) | (AlturaItem & TAlturaUserItem))[];
    count: number;
  }> {
    let query = {
      perPage: params && params.perPage ? params.perPage : 24,
      page: params && params.page ? params.page : 1,
      sortBy: params && params.sortBy ? params.sortBy : 'mintDate',
      sortDir: params && params.sortDir ? params.sortDir : 'desc',
      includeListed: params && params.hasOwnProperty('includeListed') ? params.includeListed : true,
      slim: params && params.slim ? params.slim : false,
    };
    if (searchQuery) query = { ...query, ...searchQuery };

    const json = await this.apiCall.get<{ items: object[]; count: number }>(`v2/user/items/${this.address}`, query);

    return {
      items: json.items.map((item) => userItemInstanceFromJson(item, this.apiCall, query)),
      count: json.count,
    };
  }

  /**
   * get item balance of the user
   * @param collectionAddress the item's collection address
   * @param tokenId tokenId of the item
   * @param chainId the collection network
   */
  public async getUserItemBalance(
    collectionAddress: string,
    chainId: number,
    tokenId: number,
  ): Promise<{ balance: number }> {
    const query = {
      chainId,
      userAddress: this.address,
      collectionAddress,
      tokenId,
    };
    const json = await this.apiCall.get<{ balance: number }>(`v2/item/balance/`, query);

    return {
      balance: json.balance,
    };
  }

  /**
   * get User balance
   * @param chainId the network id by default is 56
   */
  public async getNativeBalance(chainId?: number): Promise<{ balance: number }> {
    const query = {
      chainId: chainId ? chainId : 56,
      userAddress: this.address,
    };
    const json = await this.apiCall.get<{ balance: number }>(`v2/native/balance/`, query);

    return {
      balance: json.balance,
    };
  }
  /**
   * get User ERC20 balance
   * @param chainId the network id by default is 56
   */
  public async getERC20Balance(tokenAddress: string, chainId?: number): Promise<{ balance: number }> {
    const query = {
      chainId: chainId ? chainId : 56,
      userAddress: this.address,
      tokenAddress: '{tokenAddress}',
    };
    const json = await this.apiCall.get<{ balance: number }>(`v2/erc20/balance/`, query);

    return {
      balance: json.balance,
    };
  }
}
