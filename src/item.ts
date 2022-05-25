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
  apiCall: ApiCall;

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

  get collectionAddress(): string {
    return this._collectionAddress;
  }

  get tokenId(): number {
    return this._tokenId;
  }

  get chainId(): number {
    return this._chainId;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get image(): string {
    return this._image;
  }

  get imageUrl(): string {
    return this._imageUrl;
  }

  get primaryImageIndex(): number | undefined {
    return this._primaryImageIndex;
  }

  get fileType(): string {
    return this._fileType;
  }

  get isVideo(): boolean {
    return this._isVideo;
  }

  get creatorAddress(): string {
    return this._creatorAddress;
  }

  get like(): number | undefined {
    return this._like;
  }

  get views(): number {
    return this._views;
  }

  get mintDate(): string | undefined {
    return this._mintDate;
  }

  get royalty(): number {
    return this._royalty;
  }

  get nsfw(): boolean {
    return this._nsfw;
  }

  get supply(): number {
    return this._supply;
  }

  get maxSupply(): number {
    return this._maxSupply;
  }

  get stackable(): boolean {
    return this._stackable;
  }

  get properties(): IItemProperty[] {
    return this._properties;
  }

  get isListed(): boolean {
    return this._isListed;
  }

  get holders(): number {
    return this._holders;
  }

  get hasUnlockableContent(): boolean {
    return this._hasUnlockableContent;
  }

  get unlockableContent(): string | undefined {
    return this._unlockableContent;
  }

  get creatorName(): string {
    return this._creatorName;
  }

  get collectionName(): string {
    return this._collectionName;
  }

  get uri(): string {
    return this._uri;
  }

  get isVerified(): boolean {
    return this._isVerified;
  }

  get website(): string {
    return this._website;
  }

  get slug(): string {
    return this._slug;
  }

  /**
   *
   * @param address
   * @param tokenId
   * @param perPage
   * @param page
   * @param includeListed
   * @returns
   */
  public async getHolders(
    address: string,
    tokenId: number,
    params?: {
      perPage?: number;
      page?: number;
      includeListed?: boolean;
    },
  ): Promise<{ holders: IAlturaUser[]; count: number }> {
    // Implement code here.
    return {
      holders: [],
      count: 0,
    };
  }

  /**
   *
   * @param address
   * @param tokenId
   * @param perPage
   * @param page
   * @returns
   */
  public async getHistory(
    address: string,
    tokenId: number,
    params?: {
      perPage?: number;
      page?: number;
    },
  ): Promise<{ events: IAlturaEvevnt[] }> {
    // Implement code here
    return {
      events: [],
    };
  }

  /**
   *
   * @param addresss
   * @param tokenId
   * @param propertyName
   * @param propertyValue
   * @returns
   */
  public async updateProperty(
    addresss: string,
    tokenId: number,
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
   * @param address
   * @param tokenId
   * @param imageIndex
   * @returns
   */
  public async updatePrimaryImage(
    address: string,
    tokenId: number,
    imageIndex: number,
  ): Promise<{
    // return type
  }> {
    // Implement code here
    return {};
  }
}
