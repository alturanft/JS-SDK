import WalletConnectProvider from '@walletconnect/web3-provider';
import { ethers } from 'ethers';
import { IConnector } from './type';

export class TrustwalletConnector implements IConnector {
  private _provider: ethers.providers.Web3Provider | null = null;
  private _address: string | null = null;

  public get provider() {
    return this._provider;
  }
  public get address() {
    return this._address;
  }

  /**
   * A basic constructor for connecting to wallets with WalletConnect
   * @param walletConnectProvider The provider used to connect using WalletConnect
   */
  constructor(walletConnectProvider: WalletConnectProvider) {
    this._provider = new ethers.providers.Web3Provider(walletConnectProvider);
  }

  public async connect(): Promise<string | null> {
    this._address = (await this.provider?.getSigner()?.getAddress()) || null;
    return this.address;
  }

  public async sign(message: string): Promise<string | null> {
    return this.provider?.getSigner()?.signMessage(message) || null;
  }
}
