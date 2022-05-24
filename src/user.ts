import { ApiCall } from './apiCall';

export class AlturaUser {
  _name: string;
  _address: string;
  _bio: string;
  _profilePicUrl: string;
  _socialLink: string;
  apiCall: ApiCall;

  constructor(address: string, name: string, bio: string, profilePicUrl: string, socialLink: string, apiCall: ApiCall) {
    this._address = address;
    this._name = name;
    this._socialLink = socialLink;
    this._profilePicUrl = profilePicUrl;
    this._bio = bio;
    this.apiCall = apiCall;
  }

  get name(): string {
    return this._name;
  }

  get address(): string {
    return this._address;
  }

  get profilePicUrl(): string {
    return this._profilePicUrl;
  }

  get bio(): string {
    return this._bio;
  }

  get socialLink(): string {
    return this._socialLink;
  }
}
