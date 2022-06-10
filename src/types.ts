export type TAlturaUser = {
  address: string;
  name: string;
  bio?: string;
  profilePic?: string;
  socialLink?: string;
  profilePicUrl?: string;
};

export type TAlturaHolder = {
  address: string;
  balance: number;
  name: string;
  profilePic?: string,
  profilePicUrl?: string;
};

export type TAlturaItemSlim = {
  name: string;
  properties: {
    name: string;
    value: string;
    static: boolean;
  }[];
  tokenId: number;
  collectionAddress: string;
  supply: number;
  maxSupply: number;
  image: string,
  imageUrl: string;
  imageIndex: number;
  imageCount: number;
};

export type TAlturaItem = {
  name: string;
  description: string;
  properties: {
    name: string;
    value: string;
    static: boolean;
  },
  tokenId: number;
  collectionAddress: string;
  chainId: number;
  royalty: number;
  creatorAddress: string;
  mintDate: string;
  stackable: boolean;
  supply: number;
  maxSupply: number;
  image: string;
  imageHash: string;
  imageUrl: string;
  fileType: string;
  isVideo: boolean;
  otherImageVisibility: string;
  holders: number;
  listers: number;
  likes: number;
  views: number;
  isListed: boolean;
  mostRecentListing: string;
  cheapestListingPrice: number;
  cheapestListingCurrency: string;
  cheapestListingUSD: number;
  nsfw: boolean;
  isVerified: boolean;
  hasUnlockableContent: boolean;
  imageIndex: number;
  imageCount: number;
  totalListings: number;
};

export type TAlturaUserItem = {
  name: string;
  description: string;
  properties: {
    name: string;
    value: string;
    static: boolean;
  },
  tokenId: number;
  collectionAddress: string;
  chainId: number;
  royalty: number;
  creatorAddress: string;
  mintDate: string;
  stackable: boolean;
  supply: number;
  maxSupply: number;
  image: string;
  imageHash: string;
  imageUrl: string;
  fileType: string;
  isVideo: boolean;
  otherImageVisibility: string;
  holders: number;
  listers: number;
  likes: number;
  views: number;
  isListed: boolean;
  mostRecentListing: string;
  cheapestListingPrice: number;
  cheapestListingCurrency: string;
  cheapestListingUSD: number;
  nsfw: boolean;
  isVerified: boolean;
  hasUnlockableContent: boolean;
  imageIndex: number;
  imageCount: number;
  userBalance: number;
  totalListings: number;
};

export type TAlturaUserItemSlim = {
  name: string;
  properties: {
    name: string;
    value: string;
    static: boolean;
  }[];
  tokenId: number;
  collectionAddress: string;
  supply: number;
  maxSupply: number;
  imageUrl: string;
  imageIndex: number;
  imageCount: number;
  userBalance: number
};

export type TAlturaCollection = {
  address: string;
  name: string;
  description?: string;
  genre?: string;
  image?: string;
  imageHash?: string;
  ownerAddress: string;
  slug: string;
  uri: string;
  website?: string;
  holders: number;
  volume_1d?: number;
  volume_1w?: number;
  volume_30d?: number;
  volume_all?: number;
  imageUrl?: string;
  chainId: number;
  mintDate: string;
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
