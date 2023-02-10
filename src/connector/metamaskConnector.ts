import { IConnector } from './type';
import { ethers } from 'ethers';
import { BigNumber } from 'ethers';
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
  public async getBalance(): Promise<BigNumber | null> {
    return this.address ? this.provider?.getBalance(this.address) || null : null;
  }
  public async sendTransaction(transaction: any): Promise<any | null> {
    return this.provider?.getSigner()?.sendTransaction(transaction) || null;
  }
  public async getNetwork(): Promise<any | null> {
    return this.provider?.getNetwork() || null;
  }
  public async getGasPrice(): Promise<BigNumber | null> {
    return this.provider?.getGasPrice() || null;
  }
  public async getFeeData(): Promise<any | null> {
    return this.provider?.getFeeData() || null;
  }
  public async getBlockNumber(): Promise<number | null> {
    return this.provider?.getBlockNumber() || null;
  }
}
