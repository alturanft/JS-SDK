/* tslint:disable:variable-name */
import { ApiCall } from './apiCall';
import { TAlturaUpdatedCollection } from './types';
import { updatedCollectionInstanceFromJson } from './utils';

export class AlturaCollection {
  address: string;
  volume_1d: number;
  volume_1w: number;
  volume_30d: number;
  volume_all: number;
  private apiCall: ApiCall;

  constructor(
    address: string,
    _volume_1d: number,
    _volume_1w: number,
    _volume_30d: number,
    _volume_all: number,
    apiCall: ApiCall,
  ) {
    this.address = address;
    this.volume_1d = _volume_1d;
    this.volume_1w = _volume_1w;
    this.volume_30d = _volume_30d;
    this.volume_all = _volume_all;
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
    collection: AlturaCollection & TAlturaUpdatedCollection;
  }> {
    const json = await this.apiCall.post<{ collection: object }>(
      `collection/${this.address}/update`,
      { apiKey: this.apiCall.apiKey },
      params,
    );
    return {
      collection: updatedCollectionInstanceFromJson(json.collection, this.apiCall),
    };
  }
}
