import { ApiCall } from './apiCall';
import { IAlturaEvevnt, IAlturaUser, IItemProperty } from './types';

export class AlturaItem {
  _collectionAddress: string;
  _tokenId: number;
  _chainId: number;
  _name: string;
  _description: string;
  _image: string;
  _imageUrl: string;
  _primaryImageIndex: number | undefined;
  _fileType: string;
  _isVideo: boolean;
  _creatorAddress: string;
  _like: number | undefined;
  _views: number;
  _mintDate: string | undefined;
  _royalty: number;
  _nsfw: boolean;
  _supply: number;
  _maxSupply: number;
  _stackable: boolean;
  _properties: IItemProperty[];
  _isListed: boolean;
  _holders: number;
  _hasUnlockableContent: boolean;
  _unlockableContent: string | undefined;
  _creatorName: string;
  _collectionName: string;
  _uri: string;
  _isVerified: boolean;
  _website: string;
  _slug: string;
  private apiCall: ApiCall;

  constructor(
    collectionAddress: string,
    tokenId: number,
    chainId: number,
    name: string,
    description: string,
    image: string,
    imageUrl: string,
    primaryImageIndex: number | undefined,
    fileType: string,
    isVideo: boolean,
    creatorAddress: string,
    like: number | undefined,
    views: number,
    mintDate: string | undefined,
    royalty: number,
    nsfw: boolean,
    supply: number,
    maxSupply: number,
    stackable: boolean,
    properties: IItemProperty[],
    isListed: boolean,
    holders: number,
    hasUnlockableContent: boolean,
    unlockableContent: string | undefined,
    creatorName: string,
    collectionName: string,
    uri: string,
    isVerified: boolean,
    website: string,
    slug: string,
    apiCall: ApiCall,
  ) {
    this._collectionAddress = collectionAddress;
    this._tokenId = tokenId;
    this._chainId = chainId;
    this._name = name;
    this._description = description;
    this._image = image;
    this._imageUrl = imageUrl;
    this._primaryImageIndex = primaryImageIndex;
    this._fileType = fileType;
    this._isVideo = isVideo;
    this._creatorAddress = creatorAddress;
    this._like = like;
    this._views = views;
    this._mintDate = mintDate;
    this._royalty = royalty;
    this._nsfw = nsfw;
    this._supply = supply;
    this._maxSupply = maxSupply;
    this._stackable = stackable;
    this._properties = properties;
    this._isListed = isListed;
    this._holders = holders;
    this._hasUnlockableContent = hasUnlockableContent;
    this._unlockableContent = unlockableContent;
    this._creatorName = creatorName;
    this._collectionName = collectionName;
    this._uri = uri;
    this._isVerified = isVerified;
    this._website = website;
    this._slug = slug;
    this.apiCall = apiCall;
  }

  /**
   *
   * @param perPage
   * @param page
   * @param includeListed
   * @returns
   */
  public async getHolders(params?: {
    perPage?: number;
    page?: number;
    includeListed?: boolean;
  }): Promise<{ holders: IAlturaUser[]; count: number }> {
    // Implement code here.
    return {
      holders: [],
      count: 0,
    };
  }

  /**
   *
   * @param perPage
   * @param page
   * @returns
   */
  public async getHistory(params?: { perPage?: number; page?: number }): Promise<{ events: IAlturaEvevnt[] }> {
    // Implement code here
    return {
      events: [],
    };
  }

  /**
   *
   * @param propertyName
   * @param propertyValue
   * @returns
   */
  public async updateProperty(
    propertyName: string,
    propertyValue: string,
  ): Promise<{
    // return type
  }> {
    // Implement code here
    return {};
  }

  /**
   *
   * @param imageIndex
   * @returns
   */
  public async updatePrimaryImage(imageIndex: number): Promise<{
    // return type
  }> {
    // Implement code here
    return {};
  }
}
