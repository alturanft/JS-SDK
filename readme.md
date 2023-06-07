<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://alturanft.com">
    <img src="https://www.alturanft.com/logo-svg.svg" alt="Logo" width="80" height="80">
  </a>

  <h2 align="center">Javascript SDK for AlturaNFT</h2>

  <p align="center">
    <p>Powering the Future of Gaming</p>
    <br />
    <a href="https://alturanft.com/">Landing Page</a>
    ·
    <a href="https://app.alturanft.com/">Marketplace</a>
    ·
    <a href="https://github.com/alturanft/JS-SDK/issues">Report Bug</a>
    ·
    <a href="https://github.com/alturanft/JS-SDK/issues">Request Feature</a>
  </p>
</div>
<br />
<br />
<br />

## **Description**
Using our JS/TS SDK, you can interact with Altura's services, such as authenticating users using [Altura Guard](https://docs.alturanft.com/altura-developer-api/getting-started/altura-guard), fetching user and NFT data, and transferring, minting, and updating NFTs.

## **Installation**
Install the `altura-js` package with NPM:
```sh
npm install @altura/altura-js
```

or

Install the `altura-js` package with YARN:
```sh
yarn add @altura/altura-js
```

## **Importing**
To use the Altura SDK in your code, you need to import as follows.
```javascript
const { Altura } = require("@altura/altura-js")

const altura = new Altura(API_KEY); // API_KEY is optional
```
> API key is optional, which means you are able to user only read functions without putting an API key

## **Documentation**
To learn more about the `altura-js` SDK function, please visit our official documentation via: 

https://docs.alturanft.com/
