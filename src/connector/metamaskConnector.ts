import { IConnector } from './type';
import { ethers } from 'ethers';

export class MetamaskConnector implements IConnector {
  private _provider: ethers.providers.Web3Provider | null = null;
  private _address: string | null = null;

  public get provider() {
    return this._provider;
  }
  public get address() {
    return this._address;
  }

  /**
   * A basic constructor for connecting to MetaMask
   * @param ethereum The `window.ethereum` MetaMask instance
   */
  constructor(ethereum: ethers.providers.ExternalProvider | ethers.providers.JsonRpcFetchFunc) {
    this._provider = new ethers.providers.Web3Provider(ethereum);
  }

  public async connect(): Promise<string | null> {
    await this.provider?.send('eth_requestAccounts', []);
    this._address = (await this.provider?.getSigner()?.getAddress()) || null;
    return this.address;
  }

  public async sign(message: string): Promise<string | null> {
    return this.provider?.getSigner()?.signMessage(message) || null;
  }
}
