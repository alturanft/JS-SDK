import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";

export interface IConnector {
    /**
     * The account address discovered by querying the user's wallet in `IConnector#connect`
     */
    get address(): string | null

    /**
     * @deprecated The provider for interacting with Web3 wallet features. 
     * Use of the provider directly is discouraged in favor of existing abstractions.
     */
    get provider(): ethers.providers.Web3Provider | null

    /**
     * Connect to the user wallet and query the address
     * @returns Account address
     */
    connect: () => Promise<string | null>

    /**
     * Sign a message using the local signer
     */
    sign: (message: string) => Promise<string | null>
}

export class MetamaskConnector implements IConnector {
    private _provider: ethers.providers.Web3Provider | null = null
    private _address: string | null = null;

    public get provider() { return this._provider }
    public get address() { return this._address }
     
    /**
     * A basic constructor for connecting to MetaMask
     * @param ethereum The `window.ethereum` MetaMask instance
     */
    constructor(ethereum: ethers.providers.ExternalProvider | ethers.providers.JsonRpcFetchFunc) {
        this._provider = new ethers.providers.Web3Provider(ethereum)
    }

    public async connect(): Promise<string | null> {
        await this.provider?.send("eth_requestAccounts", []);
        this._address = await this.provider?.getSigner()?.getAddress() || null;
        return this.address;
    }

    public async sign(message: string): Promise<string | null> {
        return this.provider?.getSigner()?.signMessage(message) || null;
    }
}

export class TrustwalletConnector implements IConnector {
    private _provider: ethers.providers.Web3Provider | null = null
    private _address: string | null = null;

    public get provider() { return this._provider }
    public get address() { return this._address }
     
    /**
     * A basic constructor for connecting to wallets with WalletConnect
     * @param walletConnectProvider The provider used to connect using WalletConnect
     */
    constructor(walletConnectProvider: WalletConnectProvider) {
        this._provider = new ethers.providers.Web3Provider(walletConnectProvider)
    }

    public async connect(): Promise<string | null> {
        this._address = await this.provider?.getSigner()?.getAddress() || null;
        return this.address;
    }

    public async sign(message: string): Promise<string | null> {
        return this.provider?.getSigner()?.signMessage(message) || null;
    }
}