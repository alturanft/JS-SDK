/* tslint:disable:variable-name */
import { ApiCall } from './apiCall';
import { updatedCollectionInstanceFromJson } from './utils';
import { TAlturaCollection } from './types';

export class AlturaCollection {
  address: string;
  private apiCall: ApiCall;

  constructor(address: string, apiCall: ApiCall) {
    this.address = address;
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
  }): Promise<{
    collection: AlturaCollection & TAlturaCollection;
  }> {
    const json = await this.apiCall.post<{ collection: object }>(
      `collection/update`,
      { apiKey: this.apiCall.apiKey },
      params,
    );
    return {
      collection: updatedCollectionInstanceFromJson(json.collection, this.apiCall),
    };
  }
}
