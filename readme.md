<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://alturanft.com">
    <img src="https://www.alturanft.com/images/logo_500x500.png" alt="Logo" width="80" height="80">
  </a>

  <h2 align="center">Javascript SDK for Altura NFT</h2>

  <p align="center">
    The #1 Cross-Chain Gaming NFT Marketplace
    <p>Powering the Future of Gaming</p>
    <br />
    <a href="https://docs.v2.alturanft.com/"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://app.alturanft.com/">View Demo</a>
    ·
    <a href="https://github.com/alturanft/JS-SDK/issues">Report Bug</a>
    ·
    <a href="https://github.com/alturanft/JS-SDK/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#getting-your-api-key">Getting Your API Key</a></li>
        <li><a href="#your-developer-wallet">Your Developer Wallet</a></li>
        <li><a href="#funding-your-developer-wallet">Funding Your Developer Wallet</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li>
          <a href="#altura">Altura</a>
          <ul><li><a href="#authenticate-user">authenticateUser()</a></li></ul>
          <ul><li><a href="#get-all-users">getUsers()</a></li></ul>
          <ul><li><a href="#get-all-items">getItems()</a></li></ul>
          <ul><li><a href="#get-all-collections">getCollections()</a></li></ul>
          <ul><li><a href="#transfer-single-item">transferItem()</a></li></ul>
          <ul><li><a href="#transfer-several-items">transferItems()</a></li></ul>
          <ul><li><a href="#mint-additional-supply">mintAdditionalSupply()</a></li></ul>
        </li>
        <li>
          <a href="#altura-user">Altura User</a>
          <ul><li><a href="#get-users-items">getItems()</a></li></ul>
        </li>
        <li>
          <a href="#altura-item">Altura Item</a>
          <ul><li><a href="#get-items-holders">getHolders()</a></li></ul>
          <ul><li><a href="#get-items-history">getHistory()</a></li></ul>
          <ul><li><a href="#update-items-property">updateProperty()</a></li></ul>
          <ul><li><a href="#update-items-primary-image">updatePrimaryImage()</a></li></ul>
        </li>
        <li>
          <a href="#altura-collection">Altura Collection</a>
          <ul><li><a href="#update-property">update()</a></li></ul>
        </li>
        <li>
          <a href="#type-definitions">Type Definitions</a>
          <ul><li><a href="#ialturauser">IAlturaUser</a></li></ul>
          <ul><li><a href="#ialturaitem">IAlturaItem</a></li></ul>
          <ul><li><a href="#ialturacollection">IAlturaCollection</a></li></ul>
          <ul><li><a href="#ialturaevent">IAlturaEvent</a></li></ul>
        </li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>

<!-- ABOUT THE PROJECT -->

## About The Project

Altura provides the tools and infrastructure for developers to create and integrate Smart NFTs in their video games and applications. With Altura, developers can program dynamic functionality in their NFTs.

Here's why:

- **Simple Integration**  
  Altura makes it possible to integrate web3 technology and harness the power of blockchain-backed assets without the need for any web3 knowledge.
- **Multi-Chain**  
  Altura gives you the freedom to choose what blockchain you want to use and does not pose any limitations to your stack of choice.
- **Cross-Platform Items**  
  Altura allows developers to utilize blockchain-backed items of other projects within their own; this allows for cross-game items and multi-game economies.
- **Launchpad**  
  Altura provides a launchpad, initial exposure and an ever-growing community to help kickstart your new web3 game.
- **Powerful APIs & SDKs**  
  Altura's feature-packed developer tools and clear documentation make integrating blockchain-backed assets into your projects seamless and straightforward.

<p align="right"><a href="#top">back to top</a></p>

<!-- GETTING STARTED -->

## **Getting Started**

### _Installation_

In your project, run:

```sh
npm install --save altura-js
```

### _Getting Your API Key_

An API key is required for all POST requests and is provided via the query parameters

```sh
?apiKey=XXXXXXX-XXXXXXX-XXXXXXX-XXXXXXX
```

To get your API key, visit the [Altura's Developer Portal](https://developer.alturanft.com), connect your wallet, and click create in the API Key section.

<img src="https://1149877842-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fhh0EEO8VjaoTnh4KSaXS%2Fuploads%2FxQkE3oaD6ZOKStP2t9UF%2FScreen%20Shot%202022-05-08%20at%208.01.44%20PM.png?alt=media&token=2f75bba4-9837-41bf-8a8a-b28d92423421"/>

> Do not share your API key with anyone otherwise, they will be able to spend the NFTs and funds in your API account which may result in financial loss.
>
> If your API key gets compromised, regenerate it immediately. This will invalidate the old API key.

<p align="right"><a href="#top">back to top</a></p>

### _Your Developer Wallet_

A developer account is automatically made for you when you connect your web3 wallet to [Altura's Developer Portal](https://developer.alturanft.com). Your developer account also has a unique wallet address and corresponding private key. This wallet address is different from the address used to log into your developer account.

> Developer wallet: the wallet generated for you via the developer portal

Your developer wallet should be used to create all collections and NFTs you want to use the API with. This is because when you want to use an API endpoint that requires a blockchain transaction (such as transferring an NFT or minting NFTs), the private key of the collection owner is required to sign the transaction.

> Make sure to mint collections and NFTs using your developer wallet

<p align="right"><a href="#top">back to top</a></p>

### _Funding Your Developer Wallet_

All blockchain transactions require gas fees. To use the endpoints, such as transferring NFTs and minting additional supply, you need to deposit gas into your developer account.  
Altura currently supports three blockchains: Ethereum, BNB Smart Chain, and Polygon. Depending on what chain your collection exists on, you will need to deposit the appropriate gas type.

> Ethereum -> ETH  
> BNB Smart Chain -> BNB  
> Polygon -> MATIC

When using Altura's API you do not need to worry about specifying which chain your collection exists on. Altura's system will use the appropriate gas type to complete the transaction depending on the blockchain.  
To fund your developer account, log into the Developer Portal and click on deposit. You will then be presented with your developer wallet's public address to which you can send BNB, ETH, or MATIC.

> If you deposit $ALU to your developer account, it will automatically be converted into BNB on the BNB Smart Chain. This feature only works for BSC

<p align="right"><a href="#top">back to top</a></p>

<!-- USAGE EXAMPLES -->

## **Usage**

### _Altura_

You can get instance of `Altura` with your API key.

```Typescript
import { Altura } from "altura-js";

const altura = new Altura(YOUR_API_KEY);
```

**NOTE:** You can get your API key from [Altura's Developer Portal](https://developer.alturanft.com)

- #### Authenticate user

  **Altura Guard**  
  Altura guard is a system that allows you to verify the ownership of an EVM-compatible address in any application without the need for any web3 code.

  > Altura guard is a way of authenticating users; however, you may use an alternative method if you choose to.

  **Using Altura Guard**

  - A user inputs their wallet address in your application.
  - Your application should then prompt the user for their Altura Guard code obtained from the Altura marketplace.
  - The user then visits the Altura marketplace, connects their wallet, and obtains their Altura Guard code from their profile page.
  - The user then inputs their Altura Guard code into your application.
  - Your application makes a request to our system, passing in the user's address and Altura Guard Code.
  - Our system then checks if the code is valid for the user's address and returns a response to your application.

  **Authenticating a user**  
  You can verify if a user's inputted Altura Guard code matches their wallet address using `authenticateUser` method of `Altura`

  ```Typescript
  const response: { authenticated: boolean } = await altura.authenticateUser(WALLET_ADDRESS, ALTURA_GUARD);

  const { authenticated } = response;
  ```

  > Altura Guard codes are renewed every 60 seconds

  <img src="https://1149877842-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fhh0EEO8VjaoTnh4KSaXS%2Fuploads%2Fftre8H7xTGgYITN2BKfi%2FScreen%20Shot%202022-05-08%20at%203.13.07%20PM.png?alt=media&token=3bbbe453-c191-4235-82f1-64df6b308a85" >

<p align="right"><a href="#top">back to top</a></p>

- #### Get all users

  You can fetch all users using `getUsers` method of `Altura`, which will return an array of users with pagination and sort and count of users.

  ```Typescript
  const response: { users: IAlturaUser[], count: number } = await altura.getUsers();

  // Customize pagination and sort
  const response: { users: IAlturaUser[], count: number } = await altura.getUsers({
    perPage: 20,
    page: 1,
    sortBy: 'name',
    sortDir: 'asc'
  });

  // Get filtered result
  const resonse: { users: IAlturaUser[], count: number } = await altura.getUsers(
    {}, // Default pagination
    {
      name: 'AlturaNFT'
    } // Search query here
  )

  const users = response.users;
  const userCount = response.count;
  ```

  | No  | Parameter | Datatype            | Description                                                               | Default |
  | --- | --------- | ------------------- | ------------------------------------------------------------------------- | ------- |
  | 1   | perPage   | number              | The number of users to return                                             | 24      |
  | 2   | page      | number              | The offset for returned users.Calculated as (page - 1) \* perPage         | 1       |
  | 3   | sortBy    | string              | The field to sort the users by (any field in the user schema may be used) | 'name'  |
  | 4   | sortDir   | 'asc' &#124; 'desc' | Choose to sort in ascending (asc) or descending (desc) order              | 'desc'  |

<p align="right"><a href="#top">back to top</a></p>

- #### Get all items

  You can fetch all items using `getItems` method of `Altura`, which will return an array of items with pagination and sort and count of items.

  ```Typescript
  const response: { items: IAlturaItem[], count: number } = await altura.getItems();

  // Customize pagination, sort and return result
  const response: { items: IAlturaItem[], count: number } = await altura.getItems({
    perPage: 20,
    page: 1,
    sortBy: 'name',
    sortDir: 'asc',
    slim: true,
    stateOnly: true
  });

  // Get filtered result
  const response: { items: IAlturaItem[], count: number } = await altura.getItems(
    {}, // Default pagination
    {
      collectionAddress: COLLECTION_ADDRESS
    } // Search query here
  )

  const items = response.items;
  const itemCount = response.count;
  ```

  | No  | Parameter | Datatype            | Description                                                                                                                                       | Default    |
  | --- | --------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
  | 1   | perPage   | number              | The number of items to return                                                                                                                     | 24         |
  | 2   | page      | number              | The offset for returned items. Calculated as (page - 1) \* perPage                                                                                | 1          |
  | 3   | sortBy    | string              | The field to sort the items by (any field in the item schema may be used)                                                                         | 'mintDate' |
  | 4   | sortDir   | 'asc' &#124; 'desc' | Choose to sort in ascending (asc) or descending (desc) order                                                                                      | 'desc'     |
  | 5   | slim      | boolean             | Returns a more condensed version of the items. Limits the item schema to : collectionAddress, tokenId, name, description, imageUrl and properties | false      |
  | 6   | stateOnly | Boolean             | Returns only the information required to identity a known item's state: properties and imageIndex                                                 | false      |

<p align="right"><a href="#top">back to top</a></p>

- #### Get all collections

  You can fetch all collections using `getCollections` method of `Altura`, which will return an array of collections with pagination and sort and count of collections.

  ```Typescript
  const response: { collections: IAlturaCollection[], count: number } = await altura.getCollections();

  // Customize pagination and sort
  const response: { collections: IAlturaCollection[], count: number } = await altura.getCollections({
    perPage: 20,
    page: 1,
    sortBy: 'name',
    sortDir: 'asc'
  });

  // Get filtered result
  const response: { collections: IAlturaCollection[], count: number } = await altura.getCollections(
    {}, // Default pagination
    {
      isVerified: true
    } // Search query here
  );

  const collections = response.collections;
  const collectionCount = response.count;
  ```

  | No  | Parameter | Datatype            | Description                                                                           | Default    |
  | --- | --------- | ------------------- | ------------------------------------------------------------------------------------- | ---------- |
  | 1   | perPage   | number              | The number of collections to return                                                   | 24         |
  | 2   | page      | number              | the offset for returned collections                                                   | 1          |
  | 3   | sortBy    | string              | The field to sort the collections by (any field in the collection schema may be used) | 'mintDate' |
  | 4   | sortDir   | 'asc' &#124; 'desc' | Choose to sort in ascending (asc) or descending (desc) order                          | 'desc'     |

<p align="right"><a href="#top">back to top</a></p>

- #### Transfer Single Item

  You can a item using `transferItem` method of `Altura` which will return transaction hash.

  ```Typescript
  const response: { txHash: string } = altura.transferItem(COLLECTION_ADDRESS, TOKEN_ID, AMOUNT, TO_ADDRESS);

  const { txHash } = response;
  ```

  | No  | Parameter          | Datatype | Description                                                                                                                       |
  | --- | ------------------ | -------- | --------------------------------------------------------------------------------------------------------------------------------- |
  | 1   | collection_address | string   | The item's collection address                                                                                                     |
  | 2   | token_id           | number   | The item's tokenId                                                                                                                |
  | 3   | amount             | number   | The quantity of this particular item you wish to transfer. This operation will fail if you try to transfer more than your balance |
  | 4   | to                 | string   | The recipient's EVM-compatible address (0x...)                                                                                    |

  <p align="right"><a href="#top">back to top</a></p>

- #### Transfer Several Items

  You can transfer several items of particullar collection address using `transferItems` of `Altura` which return s transaction Hash;

  ```Typescript
  const response: { txHash: string } = await transferItems(
    COLLECTION_ADDRESS,
    TOKEN_IDS,
    AMOUNTS,
    TO_ADDRESS
  );

  const { txHash } = response;
  ```

  | No  | Parameter          | Datatype | Description                                                                                                           |
  | --- | ------------------ | -------- | --------------------------------------------------------------------------------------------------------------------- |
  | 1   | collection_address | string   | The item's collection address                                                                                         |
  | 2   | token_ids          | number[] | An array of the token Id's you wish to transfer from the specified collection                                         |
  | 3   | amounts            | number[] | An array of the amount of each tokenId you wish to transfer. This array must be the same length as the tokenIds array |
  | 4   | to                 | string   | The recipient's EVM-compatible address (0x...)                                                                        |

  > The length of TOKEN_IDS must be same with length of AMOUNTS

  <p align="right"><a href="#top">back to top</a></p>

- #### Mint Additional Supply

  You can mint additional supply of particullar item using `mintAdditionalSupply` method of `Altura` which will return transaction hash.

  ```Typescript
  const response: { txHash: string } = altura.mintAdditionalSupply(
    COLLECTION_ADDRESS,
    TOKEN_ID,
    AMOUNT,
    TO_ADDRESS
  );
  ```

  | No  | Parameter          | Datatype | Description                                                                                                                                                                             |
  | --- | ------------------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | 1   | collection_address | string   | The item's collection address                                                                                                                                                           |
  | 2   | token_id           | number   | The item's tokenId                                                                                                                                                                      |
  | 3   | amount             | number   | The amount of additional supply you want to mint                                                                                                                                        |
  | 4   | to                 | string   | The address you want to mint the additional supply to. You do not need to mint the additional supply to your own wallet, instead, you can mint them to someone else's wallet right away |

  <p align="right"><a href="#top">back to top</a></p>

### _Altura User_

You can get instance of `AlturaUser` using `getUser` method of `Altura` with the user's wallet address.

```Typescript
const alturaUser = await altura.getUser(WALLET_ADDRESS);
```

- #### Get user's items

  You can get items belongs to current user using `getItems` method of `AlturaUser`, which returns an array of items with pagination and sort, and count of items.

  ```Typescript
  const response: { items: IAlturaItem[], count: number } = await alturaUser.getItems();

  // Customize pagination, sort and return result
  const response: { items: IAlturaItem[], count: number } = await alturaUser.getItems({
    perPage: 20,
    page: 1,
    sortBy: 'mintDate',
    sortDir: 'desc',
    includeListed: false;
    slim: true;
    stateOnly: false;
  });

  // Get filtered result
  const response: { items: IAlturaItem[], count: number } = await alturaUser.getItems(
    {}, // Default pagination
    {
      collectionAddress: COLLECTION_ADDRESS
    } // Search query here
  )

  const items = response.items;
  const itemCount = response.count;
  ```

  | No  | Parameter     | Datatype            | Description                                                                                                                                                     | Default    |
  | --- | ------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
  | 1   | perPage       | number              | The number of items to return                                                                                                                                   | 24         |
  | 2   | page          | number              | The offset for returned items. Calculated as (page - 1) \* perPage                                                                                              | 1          |
  | 3   | sortBy        | string              | The field to sort the items by (any field in the item model may be used)                                                                                        | 'mintDate' |
  | 4   | sortDir       | 'asc' &#124; 'desc' | Choose to sort in ascending (asc) or descending (desc) order                                                                                                    | 'desc'     |
  | 5   | includeLIsted | boolean             | If the user's listed NFTs should be included (listed NFTs are still owned by the user, however on the blockchain they are held by a marketplace smart contract) | true       |
  | 6   | slim          | boolean             | Returns a more condensed version of the items. Limits the item fields to: collectionAddress, tokenId, name, description, imageUrl and properties                | false      |
  | 7   | stateOnly     | boolean             | Returns only the information required to identify a known item's state: properties, and imageIndex                                                              | false      |

<p align="right"><a href="#top">back to top</a></p>

### _Altura Item_

You can get item with specific collection address and token ID using `getItem` of `Altura`, which will return instance of `AlturaItem`.

```Typescript
const alturaItem = await altura.getItem(COLLECTION_ADDRESS, TOKEN_ID);
```

- #### Get item's holders

  You can get holders of current item using `getHolders` method of `AlturaUser`, which returns an array of holders.

  ```Typescript
  const response: { holders: IAlturaUser[] } = await alturaItem.getHolders();

  // Customize pagination and result
  const response: { holders: IAlturaUser[] } = await alturaItem.getHolders({
    perPage: 20,
    page: 1,
    includeListed: false
  });

  const holders = response.holders;
  ```

  | No  | Parameter     | Datatype | Description                                                                                                                                                                | Default |
  | --- | ------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
  | 1   | perPage       | number   | The number of users to return                                                                                                                                              | 24      |
  | 2   | page          | number   | The offset for returned items. Calculated as (page - 1) \* perPage                                                                                                         | 1       |
  | 3   | includeListed | boolean  | If user's who have their item listed should be included (listed NFTs are still owned by the user, however on the blockchain they are held by a marketplace smart contract) | true    |

  <p align="right"><a href="#top">back to top</a></p>

- #### Get item's history

  You can get history of current item using `getHistory` method of `AlturaItem` which return an array of events.

  ```Typescript
  const response: { events: IAlturaEvent[] } = await alturaItem.getHistory();

  // Customize pagination
  const response: { eventa: IAlturaEvent[] } = await alturaItem.getHistory({
    perPage: 20,
    page: 1
  });

  const history = response.events;
  ```

  | No  | Parameter | Datatype | Description                                                        | Default |
  | --- | --------- | -------- | ------------------------------------------------------------------ | ------- |
  | 1   | perPage   | number   | The number of events to return                                     | 24      |
  | 2   | page      | number   | The offset for returned items. Calculated as (page - 1) \* perPage | 1       |

  <p align="right"><a href="#top">back to top</a></p>

- #### Update item's property

  You can update property of current item using `updateProperty` method of `AlturaItem` which will return the updated item.

  ```Typescript
  const response: { item: IAlturaItem } = await alturaItem.updateProperty(PROPERTY_NAME, PROPERTY_VALUE);

  const updatedItem = response.item;
  ```

  <p align="right"><a href="#top">back to top</a></p>

- #### Update item's primary image

  Every item has an `imageIndex` property which represents the index of the selected image amongst all the provided images.
  You can update primary image index using `updatePrimaryImage` method of `AlturaItem` which will return the updated item.

  ```Typescript
  const response: { item: IAlturaItem } = await alturaItem.updatePrimaryImage(IMAGE_INDEX);

  const updatedItem = response.item;
  ```

  > Remember that imageIndex starts at 0 and NOT 1

  <p align="right"><a href="#top">back to top</a></p>

### _Altura Collection_

You can get collection with specific address using `getCollection` of `Altura`, which will return instance of `AlturaCollection`.

```Typescript
const alturaCollection = await altura.getCollection(WALLET_ADDRESS);
```

- #### Update property

You can update properties of collection using `update` method of `AlturaCollection` which will return updated collection.

```Typescript
// Update collection description
const response: { collection: IAlturaCollection } = await alturaCollection.update(
  {
    description: NEW_DESCRIPTION
  } // Properties to update here
);

const updateCollection = response.collection;
```

<p align="right"><a href="#top">back to top</a></p>

### _Type Definitions_

#### `IAlturaUser`

Users are represented by the `IAlturaUser` interface

```Typescript
export interface IAlturaUser {
  // The user's wallet address
  address: string;
  // The user's name
  name: string;
  // The user's bio
  bio: string;
  // The user's social link
  socialLink: string;
  // Url of the user's profile image
  profilePicUrl: string;
}
```

<p align="right"><a href="#top">back to top</a></p>

#### `IAlturaItem`

Items are represented by the `IAlturaItem` interface

```Typescript
export interface IAlturaItem {
  collectionAddress: string;
  tokenId: number;
  chainId: number;
  name: string;
  description: string;
  image: string;
  imageUrl: string;
  primaryImageIndex?: number;
  otherImages: {
    imageHash: string;
    image: string;
    fileType: string;
    isVideo: boolean
  }[];
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
    static: boolean
  }[];
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
```

<p align="right"><a href="#top">back to top</a></p>

#### `IAlturaCollection`

Collections are represented by the `IAlturaCollection` interface

```Typescript
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
```

<p align="right"><a href="#top">back to top</a></p>

#### `IAlturaEvent`

History events are represented by the `IAlturaEvents` interface

```Typescript
export interface IAlturaEvevnt {
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
```
