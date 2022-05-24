import { ApiCall } from './apiCall';

export class AlturaCollection {
  _address: string;
  _name: string;
  _description: string;
  _genre: string;
  _image: string;
  _imageUrl: string;
  _ownerAddress: string;
  _slug: string;
  _uri: string;
  _website: string;
  _mintDate: string;
  _chainId: number;
  _holders: number;
  _volume1d: number;
  _volume1w: number;
  _volume30d: number;
  _volumeall: number;
  apiCall: ApiCall;

  constructor(
    address: string,
    name: string,
    description: string,
    genre: string,
    image: string,
    imageUrl: string,
    ownerAddress: string,
    slug: string,
    uri: string,
    website: string,
    mintDate: string,
    chainId: number,
    holders: number,
    volume1d: number,
    volume1w: number,
    volume30d: number,
    volumeall: number,
    apiCall: ApiCall,
  ) {
    this._address = address;
    this._name = name;
    this._description = description;
    this._genre = genre;
    this._image = image;
    this._imageUrl = imageUrl;
    this._ownerAddress = ownerAddress;
    this._slug = slug;
    this._uri = uri;
    this._website = website;
    this._mintDate = mintDate;
    this._chainId = chainId;
    this._holders = holders;
    this._volume1d = volume1d;
    this._volume1w = volume1w;
    this._volume30d = volume30d;
    this._volumeall = volumeall;
    this.apiCall = apiCall;
  }
}
