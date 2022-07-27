import { ethers } from 'ethers';

export interface IConnector {
  /**
   * The account address discovered by querying the user's wallet in `IConnector#connect`
   */
  get address(): string | null;

  /**
   * @deprecated The provider for interacting with Web3 wallet features.
   * Use of the provider directly is discouraged in favor of existing abstractions.
   */
  get provider(): ethers.providers.Web3Provider | null;

  /**
   * Connect to the user wallet and query the address
   * @returns Account address
   */
  connect: () => Promise<string | null>;

  /**
   * Sign a message using the local signer
   */
  sign: (message: string) => Promise<string | null>;
}
