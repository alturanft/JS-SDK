import { ApiCall } from './apiCall';
import { IAlturaEvent, TAlturaHolder, TAlturaItem } from './types';
import { AlturaUser } from './user';
import { eventFromJson, holderInstanceFromJson, updatedItemInstanceFromJson } from './utils';

export class AlturaItem {
  collectionAddress: string;
  tokenId: number;

  private apiCall: ApiCall;

  constructor(_collectionAddress: string, _tokenId: number, _apiCall: ApiCall) {
    this.collectionAddress = _collectionAddress;
    this.tokenId = _tokenId;
    this.apiCall = _apiCall;
  }

  /**
   * returns an item's holders and their balances
   * @param perPage The number of users to return (default: 24)
   * @param page The offset for returned users. Calculated as (page - 1) * perPage (default: 1)
   * @param includeListed If user's who have item listed should be included
   * (listed NFTs are still owned by the user, however on the blockchain they are held by a marketplace smart contract)
   * (default: true)
   */
  public async getHolders(params?: {
    perPage?: number;
    page?: number;
    includeListed?: boolean;
  }): Promise<{ holders: (AlturaUser & TAlturaHolder)[]; count: number }> {
    const query = {
      perPage: params && params.perPage ? params.perPage : 24,
      page: params && params.page ? params.page : 1,
      includeListed: params && params.hasOwnProperty('includeListed') ? params.includeListed : true,
    };

    const data = await this.apiCall.get<{ holders: object[]; count: number }>(
      `item/holders/${this.collectionAddress}/${this.tokenId}`,
      query,
    );

    return {
      holders: data.holders.map((h) => holderInstanceFromJson(h, this.apiCall)),
      count: data.count,
    };
  }

  /**
   * Returns the blockchain history of an item
   * @param perPage The number of users to return (default: 24)
   * @param page The offset for returned users. Calculated as (page -1) * perPage (default: 1)
   */
  public async getHistory(params?: { perPage?: number; page?: number }): Promise<{ events: IAlturaEvent[] }> {
    const query = {
      perPage: params && params.perPage ? params.perPage : 24,
      page: params && params.page ? params.page : 1,
    };

    const data = await this.apiCall.get<{ events: object[] }>(
      `item/events/${this.collectionAddress}/${this.tokenId}`,
      query,
    );
    return {
      events: data.events.map((e) => eventFromJson(e)),
    };
  }

  /**
   * Updates the value of an item's property
   * @param propertyName The name (key) of the property you want to change
   * @param propertyValue The new value you want to set the property to
   * @returns updated item
   */
  public async updateProperty(
    propertyName: string,
    propertyValue: string,
  ): Promise<AlturaItem & TAlturaItem> {
    const json = await this.apiCall.post<{ item: object }>(
      'item/update_property',
      { apiKey: this.apiCall.apiKey },
      {
        address: this.collectionAddress,
        tokenId: this.tokenId,
        propertyName,
        propertyValue,
      },
    );
    return updatedItemInstanceFromJson(json.item, this.apiCall)

  }

  /**
   *
   * @param imageIndex The index of the image you wish to change to (index starts at 0)
   * @returns
   */
  public async updatePrimaryImage(imageIndex: number): Promise<AlturaItem & TAlturaItem> {
    const json = await this.apiCall.post<{ item: object }>(
      'item/update_primary_image',
      { apiKey: this.apiCall.apiKey },
      {
        address: this.collectionAddress,
        tokenId: this.tokenId,
        imageIndex,
      },
    );

    return updatedItemInstanceFromJson(json.item, this.apiCall)

  }
}
