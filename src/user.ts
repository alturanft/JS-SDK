import { ApiCall } from './apiCall';
import { IAlturaItem } from './types';

export class AlturaUser {
  _name: string;
  _address: string;
  _bio: string;
  _profilePicUrl: string;
  _socialLink: string;
  private apiCall: ApiCall;

  constructor(address: string, name: string, bio: string, profilePicUrl: string, socialLink: string, apiCall: ApiCall) {
    this._address = address;
    this._name = name;
    this._socialLink = socialLink;
    this._profilePicUrl = profilePicUrl;
    this._bio = bio;
    this.apiCall = apiCall;
  }

  /**
   *
   * @param perPage
   * @param page
   * @param sortBy
   * @param sortDir
   * @param includeListed
   * @param slim
   * @param stateOnly
   */
  public async getItems(params?: {
    perPage?: number;
    page?: number;
    sortBy?: string;
    sortDir?: 'desc' | 'asc';
    includeListed?: boolean;
    slim?: boolean;
    stateOnly?: boolean;
  }): Promise<{ items: IAlturaItem[]; count: number }> {
    // Implement code here.
    return {
      items: [],
      count: 0,
    };
  }
}
