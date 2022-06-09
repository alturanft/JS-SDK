export type TAlturaUser = {
  address: string;
  name: string;
  bio?: string;
  socialLink?: string;
  profilePicUrl?: string;
};

export type TAlturaHolder = {
  address: string;
  name: string;
  balance: number;
  bio?: string;
  socialLink?: string;
  profilePicUrl?: string;
};

export type TAlturaItemState = {
  collectionAddress: string;
  tokenId: number;
  properties: {
    name: string;
    value: string;
    static: boolean;
  }[];
  holders: number;
  listers: number;
  imageIndex: number;
};

export type TAlturaItemSlim = {
  collectionAddress: string;
  tokenId: number;
  name: string;
  properties: {
    name: string;
    value: string;
    static: boolean;
  }[];
  imageUrl: string;
  description: string;
  holders: number;
  listers: number;
  imageIndex: number;
};

export type TAlturaItem = {
  collectionAddress: string;
  tokenId: number;
  chainId: number;
  name: string;
  description: string;
  image: string;
  imageUrl?: string;
  primaryImageIndex?: number;
  fileType: string;
  isVideo: boolean;
  creatorAddress: string;
  like?: number;
  views: number;
  mintDate?: string;
  royalty: number;
  nsfw: boolean;
  supply: number;
  maxSupply: number;
  stackable: boolean;
  properties: {
    name: string;
    value: string;
    static: boolean;
  }[];
  isListed: boolean;
  holders: number;
  hasUnlockableContent: boolean;
  unlockableContent?: string;
  creatorName: string;
  collectionName: string;
  uri: string;
  isVerified: boolean;
  website: string;
  slug: string;
  otherImages: {
    imageHash: string;
    image: string;
    fileType: string;
    isVideo: boolean;
  }[];
};

export type TAlturaUserItem = {
  collectionAddress: string;
  tokenId: number;
  chainId: number;
  name: string;
  description: string;
  image: string;
  imageHash: string;
  imageUrl: string;
  fileType: string;
  isVideo: boolean;
  creatorAddress: string;
  likes: number;
  views: number;
  mintDate: string;
  royalty: number;
  nsfw: boolean;
  supply: number;
  maxSupply: number;
  stackable: boolean;
  properties: {
    key: string;
    value: string;
    static: boolean;
  }[];
  allImages: {
    _id: string;
    imageHash: string;
    image: string;
    fileType: string;
    isVideo: boolean;
  }[];
  otherImageVisibility: string;
  isListed: boolean;
  mostRecentListing: string;
  cheapestListingUSD: number;
  cheapestListingPrice: string;
  cheapestListingCurrency: string;
  isLootBoxKey: boolean;
  isSmartNFT: boolean;
  holders: number;
  listers: number;
  featured: boolean;
  restrictSecondarySales: boolean;
  deleted: boolean;
  hasUnlockableContent: boolean;
  didLike: boolean;
  imageIndex: number;
  userBalance: number;
  totalListings: number;
  cheapestPriceUSD: number;
  creatorName: string;
  creatorProfilePic: string;
  collectionName: string;
  uri: string;
  isVerified: boolean;
  genre: string;
  website: string;
  version: number;
  collectionImage: string;
  collectionImageUrl: string;
  slug: string;
};

export type TAlturaUserItemSlim = {
  collectionAddress: string;
  tokenId: number;
  name: string;
  properties: {
    name: string;
    value: string;
    static: boolean;
  }[];
  imageUrl: string;
  description: string;
  holders: number;
  listers: number;
  imageIndex: number;
  userBalance: number;
};

export type TAlturaUserItemState = {
  collectionAddress: string;
  tokenId: number;
  properties: {
    name: string;
    value: string;
    static: boolean;
  }[];
  holders: number;
  listers: number;
  imageIndex: number;
  userBalance: number;
};

export type TAlturaUpdatedItem = {
  otherImageVisibility: string;
  likes: number;
  allViews: number;
  uniqueViews: number;
  isListed: boolean;
  nsfw: boolean;
  isVerified: boolean;
  isSmartNFT: boolean;
  isLootBoxKey: boolean;
  restrictSecondarySales: boolean;
  featured: boolean;
  deleted: boolean;
  tokenId: number;
  itemCollection: string;
  chainId: number;
  itemRef: string;
  creatorAddress: string;
  itemCollectionName: string;
  name: string;
  description: string;
  properties: {
    name: string;
    value: string;
    static: boolean;
  }[];
  supply: number;
  maxSupply: number;
  nonStackableSupply: number;
  stackable: boolean;
  image: string;
  imageHash: string;
  fileType: string;
  isVideo: boolean;
  royalty: number;
  holders: {
    address: string;
    balance: number;
  }[];
  listers: number;
  mintId: number;
  mintDate: string;
  otherImages: {
    imageHash: string;
    image: string;
    fileType: string;
    isVideo: boolean;
  }[];
  unlockableContent: string;
};

export type TAlturaCollection = {
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
};

export type TAlturaUpdatedCollection = {
  isPublic: boolean;
  holders: number;
  volume_1d: number;
  volume_1w: number;
  volume_30d: number;
  volume_all: number;
  isVerified: boolean;
  featured: boolean;
  featuredMain: boolean;
  chainId: number;
  address: string;
  name: string;
  ownerAddress: string;
  image: string;
  imageHash: string;
  description: string;
  uri: string;
  slug: string;
  website: string;
  genre: string;
  version: number;
  mintDate: string;
  imageUrl: string;
};

export interface IAlturaEvent {
  id: string;
  amount: string;
  blockNumber: number;
  chainId: number;
  event: string;
  from: string;
  itemCollection: string;
  itemRef: string;
  timestamp: number;
  to: string;
  tokenId: number;
  transactionHash: string;
}
