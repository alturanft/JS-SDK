import { ApiCall } from './apiCall';
import { IAlturaEvevnt, IAlturaItem, IAlturaUser, IItemProperty } from './types';
import { eventFromJson, itemFromJson, userFromJson } from './utils';

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
  }): Promise<{ holders: IAlturaUser[]; count: number }> {
    const query = {
      perPage: params && params.perPage ? params.perPage : 24,
      page: params && params.page ? params.page : 1,
      includeListed: params && params.includeListed ? params.includeListed : true,
    };

    const data = await this.apiCall.get<{ holders: object[]; count: number }>(
      `item/holders/${this._collectionAddress}/${this._tokenId}`,
      query,
    );

    return {
      holders: data.holders.map((h) => userFromJson(h)),
      count: data.count,
    };
  }

  /**
   * Returns the blockchain history of an item
   * @param perPage The number of users to return (default: 24)
   * @param page The offset for returned users. Calculated as (page -1) * perPage (default: 1)
   */
  public async getHistory(params?: { perPage?: number; page?: number }): Promise<{ events: IAlturaEvevnt[] }> {
    const query = {
      perPage: params && params.perPage ? params.perPage : 24,
      page: params && params.page ? params.page : 1,
    };

    const data = await this.apiCall.get<{ events: object[] }>(
      `item/events/${this._collectionAddress}/${this._tokenId}`,
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
  public async updateProperty(propertyName: string, propertyValue: string): Promise<{ item: IAlturaItem }> {
    const json = await this.apiCall.post<{ item: object }>(
      'item/update_property',
      { apiKey: this.apiCall.apiKey },
      {
        address: this._collectionAddress,
        tokenId: this._tokenId,
        chainId: this._chainId,
        propertyName,
        propertyValue,
      },
    );
    return {
      item: itemFromJson(json.item),
    };
  }

  /**
   *
   * @param imageIndex The index of the image you wish to change to (index starts at 0)
   * @returns
   */
  public async updatePrimaryImage(imageIndex: number): Promise<{ item: IAlturaItem }> {
    const json = await this.apiCall.post<{ item: object }>(
      'item/update_primary_image',
      { apiKey: this.apiCall.apiKey },
      {
        address: this._collectionAddress,
        tokenId: this._tokenId,
        chainId: this._chainId,
        imageIndex,
      },
    );

    return {
      item: itemFromJson(json.item),
    };
  }
}
