import WalletConnectProvider from '@walletconnect/ethereum-provider';
import { ethers } from 'ethers';
import type { IConnector } from './type';

export interface WalletConnectV2ConnectorOptions {
  projectId: string;
  chains?: number[];
  rpc?: Record<number, string>;
  optionalChains?: number[];
}

export class WalletConnectV2Connector implements IConnector {
  private wcProvider: WalletConnectProvider | null = null;
  private _ethersProvider: ethers.providers.Web3Provider | null = null;
  private options: WalletConnectV2ConnectorOptions;
  private _address: string | null = null;

  constructor(options: WalletConnectV2ConnectorOptions) {
    if (!options.projectId) {
      throw new Error('WalletConnect v2 requires a valid projectId.');
    }
    this.options = options;
  }

  get address(): string | null {
    return this._address;
  }

  get provider(): ethers.providers.Web3Provider | null {
    return this._ethersProvider;
  }

  async connect(): Promise<string | null> {
    this.wcProvider = await WalletConnectProvider.init({
      projectId: this.options.projectId,
      chains: this.options.chains ?? [1],
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      optionalChains: (this.options.optionalChains ?? []) as unknown,
      rpcMap: this.options.rpc ?? {},
      showQrModal: true,
    });
    await this.wcProvider.enable();

    this._ethersProvider = new ethers.providers.Web3Provider(this.wcProvider);

    const accounts: string[] = await this.wcProvider.request({
      method: 'eth_accounts',
    });
    this._address = accounts[0] || null;
    return this._address;
  }

  async sign(message: string) {
    if (!this._ethersProvider) {
      throw new Error('Wallet not connected');
    }
    const signer = this._ethersProvider.getSigner();
    return await signer.signMessage(message);
  }

  async getBalance() {
    if (!this._ethersProvider || !this._address) {
      throw new Error('Wallet not connected');
    }
    return await this._ethersProvider.getBalance(this._address);
  }

  async sendTransaction(transaction: Record<string, unknown>) {
    if (!this._ethersProvider) {
      throw new Error('Wallet not connected');
    }
    const signer = this._ethersProvider.getSigner();
    return await signer.sendTransaction(transaction);
  }

  async getNetwork() {
    if (!this._ethersProvider) {
      throw new Error('Wallet not connected');
    }
    return await this._ethersProvider.getNetwork();
  }

  async getGasPrice() {
    if (!this._ethersProvider) {
      throw new Error('Wallet not connected');
    }
    return await this._ethersProvider.getGasPrice();
  }

  async getFeeData() {
    if (!this._ethersProvider) {
      throw new Error('Wallet not connected');
    }
    return await this._ethersProvider.getFeeData();
  }

  async getBlockNumber() {
    if (!this._ethersProvider) {
      throw new Error('Wallet not connected');
    }
    return await this._ethersProvider.getBlockNumber();
  }
}
