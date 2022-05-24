export interface IAlturaUser {
  address: string;
  name: string;
  bio: string;
  socialLink: string;
  profilePicUrl: string;
}

export interface IItemProperty {
  name: string;
  value: string;
  static: boolean;
}

export interface IAlturaItem {
  collectionAddress: string;
  tokenId: number;
  chainId: number;
  name: string;
  description: string;
  image: string;
  imageUrl: string;
  primaryImageIndex: number;
  fileType: string;
  isVideo: boolean;
  creatorAddress: string;
  like: number;
  views: number;
  mintDate: string;
  royalty: number;
  nsfw: boolean;
  supply: number;
  maxSupply: number;
  stackable: boolean;
  properties: IItemProperty[];
  isListed: boolean;
  holders: number;
  hasUnlockableContent: boolean;
  unlockableContent: string | undefined;
  creatorName: string;
  collectionName: string;
  uri: string;
  isVerified: boolean;
  website: string;
  slug: string;
}

export interface IAlturaCollection {
  address: string;
  name: string;
  description: string;
  genre: string;
  image: string;
  imageUrl: string;
  ownerAddress: string;
  slug: string;
  uri: string;
  website: string;
  mintDate: string;
  chainId: number;
  holders: number;
  volume_1d: number;
  volume_1w: number;
  volume_30d: number;
  volume_all: number;
}
