import { ApiCall } from './apiCall';
import { AlturaItem } from './item';
import { TAlturaUserItem, TAlturaUserItemSlim, TAlturaUserItemState } from './types';
import { userItemInstanceFromJson } from './utils';

export class AlturaUser {
  name: string;
  address: string;
  private apiCall: ApiCall;

  constructor(_address: string, _name: string, _apiCall: ApiCall) {
    this.address = _address;
    this.name = _name;
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
   * @param stateOnly Returns only the information required to identify a known item's state: properties, and imageIndex (default: false)
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
      stateOnly?: boolean;
    },
    searchQuery?: object,
  ): Promise<{
    items: (
      | (AlturaItem & TAlturaUserItemState)
      | (AlturaItem & TAlturaUserItemSlim)
      | (AlturaItem & TAlturaUserItem)
    )[];
    count: number;
  }> {
    let query = {
      perPage: params && params.perPage ? params.perPage : 24,
      page: params && params.page ? params.page : 1,
      sortBy: params && params.sortBy ? params.sortBy : 'mintDate',
      sortDir: params && params.sortDir ? params.sortDir : 'desc',
      includeListed: params && params.includeListed ? params.includeListed : true,
      slim: params && params.slim ? params.slim : false,
      stateOnly: params && params.stateOnly ? params.stateOnly : false,
    };
    if (searchQuery) query = { ...query, ...searchQuery };

    const json = await this.apiCall.get<{ items: object[]; count: number }>(`user/items/${this.address}`, query);

    return {
      items: json.items.map((item) => userItemInstanceFromJson(item, this.apiCall, query)),
      count: json.count,
    };
  }
}
