/* tslint:disable:variable-name */
import { ApiCall } from './apiCall';
import { updatedCollectionInstanceFromJson } from './utils';
import { TAlturaCollection } from './types';

export class AlturaCollection {
  address: string;
  chainId: number;
  private apiCall: ApiCall;

  constructor(address: string, chainId: number, apiCall: ApiCall) {
    this.address = address;
    this.chainId = chainId;
    this.apiCall = apiCall;
  }

  /**
   * Takes properties to update and returns updated collection
   * @param params Object with field name and value you wish to update
   */
  public async update(params?: {
    image?: string;
    imageUrl?: string;
    description?: string;
    website?: string;
    genre?: string;
  }): Promise<AlturaCollection & TAlturaCollection> {
    let body = { address: this.address };
    if (params) body = { ...body, ...params };
    const json = await this.apiCall.post<{ collection: object }>(
      `v2/collection/update`,
      { apiKey: this.apiCall.apiKey },
      body,
    );
    return updatedCollectionInstanceFromJson(json.collection, this.apiCall);
  }

  /**
   * Get next item id for this collection
   */
  public async getNextItemId(): Promise<number> {
    const { success, nextItemId } = await this.apiCall.get<{ error: String; success: boolean; nextItemId: number }>(
      `v2/collection/${this.address}/nextId`,
      {
        apiKey: this.apiCall.apiKey,
        chainId: this.chainId,
      },
    );
    return success ? nextItemId : 0;
  }
}
