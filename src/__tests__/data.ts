export const test_apiUsers = [
  {
    key: '0000000-0000000-0000000-0000000',
    address: '0x0000000000000000000000000000000000000000',
    auth_code: '000000',
  },
  {
    key: '1111111-1111111-1111111-1111111',
    address: '0x1111111111111111111111111111111111111111',
    auth_code: '111111',
  },
];

export const test_items = [
  {
    collectionAddress: '0x8abc8abc8abc8abc8abc8abc8abc8abc8abc8abc',
    tokenId: 4,
    chainId: 56,
    name: 'Sasuke',
    description: '',
    owner: '0x1111111111111111111111111111111111111111',
    supply: 9,
    maxSupply: 10,
    properties: [
      {
        name: 'attack',
        value: 5,
        static: false,
      },
    ],
    imageHash: 'QmUSRR91MM8R5tf12DH2dvMRpxBFpJRPYTvk36sSs6mDwk',
    image: 'https://ipfs.io/ipfs/QmTKbzauwfm2co174Ew7xr3SwnEH7ghf3j7h3MrUmfvTFm',
    fileType: 'image/jpeg',
    isVideo: false,
    otherImages: [
      {
        imageHash: 'QmUSRR91MM8R5tf12DH2dvMRpxBFpJRPYTvk36sSs6mDwk',
        image: 'https://ipfs.io/ipfs/QmTKbzauwfm2co174Ew7xr3SwnEH7ghf3j7h3MrUmfvTFm',
        fileType: 'image/jpeg',
        isVideo: false,
      },
    ],
  },
  {
    collectionAddress: '0xe7f8ccdae7f8ccdae7f8ccdae7f8ccdae7f8ccda',
    tokenId: 103,
    chainId: 56,
    name: 'YO-YO #13',
    description: 'Simple harmonic motions, for a simple life.',
    owner: '0x0000000000000000000000000000000000000000',
    supply: 99,
    maxSupply: 100,
    properties: [
      {
        name: 'attack',
        value: 5,
        static: false,
      },
      {
        name: 'defence',
        value: 12,
        static: true,
      },
    ],
    imageHash: 'QmUSRR91MM8R5tf12DH2dvMRpxBFpJRPYTvk36sSs6mDwk',
    image: 'https://ipfs.io/ipfs/QmTKbzauwfm2co174Ew7xr3SwnEH7ghf3j7h3MrUmfvTFm',
    fileType: 'image/jpeg',
    isVideo: false,
    otherImages: [
      {
        imageHash: 'QmUSRR91MM8R5tf12DH2dvMRpxBFpJRPYTvk36sSs6mDwk',
        image: 'https://ipfs.io/ipfs/QmTKbzauwfm2co174Ew7xr3SwnEH7ghf3j7h3MrUmfvTFm',
        fileType: 'image/jpeg',
        isVideo: false,
      },
      {
        imageHash: 'QmUSRR91MM8R5tf12DH2dvMRpxBFpJRPYTvk36sSs6mDwk1',
        image: 'https://ipfs.io/ipfs/QmTKbzauwfm2co174Ew7xr3SwnEH7ghf3j7h3MrUmfvTFm1',
        fileType: 'image/jpeg',
        isVideo: false,
      },
    ],
  },
];

export const test_collections = [
  {
    holders: 1,
    volume_1d: 0,
    volume_1w: 0,
    volume_30d: 0,
    volume_all: 0,
    chainId: 56,
    address: '0x5f2cdf7616e148797e4212ac271fe6ead7fa1950',
    name: 'FARMZ',
    ownerAddress: '0x0000000000000000000000000000000000000000',
    image: '',
    imageUrl:
      'https://altura-marketplace-1.s3.us-east-2.amazonaws.com/56-0x067f95c8e2be7b590e3614b08d51355b85b8bd0e_6853f225-a1b9-415c-b0e8-c3b240e04539.png',
    imageHash: '',
    description: '',
    uri: 'https://api.alturanft.com/meta/farmz/',
    slug: 'farmz',
    website: '',
    genre: '',
    mintDate: '2022-05-25T18:34:22.281Z',
  },
  {
    holders: 1,
    volume_1d: 0,
    volume_1w: 0,
    volume_30d: 0,
    volume_all: 0,
    chainId: 56,
    address: '0x067f95c8e2be7b590e3614b08d51355b85b8bd0e',
    name: 'Pirate Monkeys',
    ownerAddress: '0x1111111111111111111111111111111111111111',
    image: 'https://ipfs.io/ipfs/QmNTsCDRnkbDMNmBr2nA3nK7kcmggzD7xFBWhGmxkwZU1M',
    imageHash: '',
    description:
      'A new breed of Pirate Monkeys ready to conquer the Altura space!\n\nThis Genesis Collection is only maxed at 200 supply. no other pirate monkeys will ever be minted. \n\nare you ready!?\nso get it while you can!!',
    uri: 'https://api.alturanft.com/meta/pirate-monkeys/',
    slug: 'pirate-monkeys',
    website: '',
    genre: '',
    mintDate: '2022-05-25T13:37:22.012Z',
    imageUrl:
      'https://altura-marketplace-1.s3.us-east-2.amazonaws.com/56-0x067f95c8e2be7b590e3614b08d51355b85b8bd0e_6853f225-a1b9-415c-b0e8-c3b240e04539.png',
  },
];
