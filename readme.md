<div id="top"></div>

[![MIT License][license-shield]][license-url]

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
          <a href="#altura">Altura
          <ul><li><a href="#authenticate-user">authenticateUser()</a</li></ul>
          <ul><li><a href="#get-all-users">getUsers()</a</li></ul>
          <ul><li><a href="#get-all-items">getItems()</a</li></ul>
          <ul><li><a href="#get-all-collections">getCollections()</a</li></ul>
        </li>
        <li><a href="#altura-user">Altura User</li>
        <li><a href="#altura-item">Altura Item</li>
        <li><a href="#altura-collection">Altura Collection</li>
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

You can get instance of `Altura` using your API key.
```Typescript
import {Altura} from "altura-js";

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

const {authenticated} = response;
```  
> Altura Guard codes are renewed every 60 seconds

<img src="https://1149877842-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fhh0EEO8VjaoTnh4KSaXS%2Fuploads%2Fftre8H7xTGgYITN2BKfi%2FScreen%20Shot%202022-05-08%20at%203.13.07%20PM.png?alt=media&token=3bbbe453-c191-4235-82f1-64df6b308a85" >


- #### Get all users

You can fetch all users using `getUsers` method of `Altura`, which will return an array of users with pagination and sort and count of users.

```Typescript
const response = { users: IAlturaUser[], count: number } = await altura.getUsers();

// Customize pagination and sort
const response = { users: IAlturaUser[], count: number } = await altura.getUsers({
  perPage: 20,
  page: 1,
  sortBy: 'name',
  sortDir: 'asc'
});

const users = response.users;
const userCount = response.count;
```
 # | Parameter | Datatype | Default
 --- | --- | --- | ---
 1 | perPage | number | 24
 2 | page | number | 1
 3 | sortBy | string | 'name'
 4 | sortDir | 'asc' &#124; 'desc' | 'desc'

<p align="right"><a href="#top">back to top</a></p>

- #### Get all items
You can fetch all items using `getItems` method of `Altura`, which will return an array of items with pagination and sort and count of items.

```Typescript
const response = { items: IAlturaItem[], count: number } = await altura.getItems();

// Customize pagination and sort
const response = { items: IAlturaItem[], count: number } = await altura.getItems({
  perPage: 20,
  page: 1,
  sortBy: 'name',
  sortDir: 'asc'
});

const items = response.items;
const itemCount = response.count;
```
 # | Parameter | Datatype | Default
 --- | --- | --- | ---
 1 | perPage | number | 24
 2 | page | number | 1
 3 | sortBy | string | 'mintDate'
 4 | sortDir | 'asc' &#124; 'desc' | 'desc'

- #### Get all collections
You can fetch all collections using `getCollections` method of `Altura`, which will return an array of collections with pagination and sort and count of collections.

```Typescript
const response = { collections: IAlturaCollection[], count: number } = await altura.getCollections();

// Customize pagination and sort
const response = { collections: IAlturaCollection[], count: number } = await altura.getCollections({
  perPage: 20,
  page: 1,
  sortBy: 'name',
  sortDir: 'asc'
});

const collections = response.collections;
const collectionCount = response.count;
```
 # | Parameter | Datatype | Default
 --- | --- | --- | ---
 1 | perPage | number | 24
 2 | page | number | 1
 3 | sortBy | string | 'mintDate'
 4 | sortDir | 'asc' &#124; 'desc' | 'desc'

<p align="right"><a href="#top">back to top</a></p>

### _Altura User_

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



- #### Get user by wallet address

You can get user with specific wallet address using `getUser` in `Altura`, which will return instance of `AlturaUser`.

```Typescript
const alturaUser = altura.getUser(WALLET_ADDRESS);
```

<!-- ROADMAP -->

## Roadmap

- [x] Add Changelog
- [x] Add back to top links
- [ ] Add Additional Templates w/ Examples
- [ ] Add "components" document to easily copy & paste sections of the readme
- [ ] Multi-language Support
  - [ ] Chinese
  - [ ] Spanish

See the [open issues](https://github.com/othneildrew/Best-README-Template/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Your Name - [@your_twitter](https://twitter.com/your_username) - email@example.com

Project Link: [https://github.com/your_username/repo_name](https://github.com/your_username/repo_name)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

- [Choose an Open Source License](https://choosealicense.com)
- [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
- [Malven's Flexbox Cheatsheet](https://flexbox.malven.co/)
- [Malven's Grid Cheatsheet](https://grid.malven.co/)
- [Img Shields](https://shields.io)
- [GitHub Pages](https://pages.github.com)
- [Font Awesome](https://fontawesome.com)
- [React Icons](https://react-icons.github.io/react-icons/search)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
