import { ApiCall } from './apiCall';

export class AlturaGuard {
    private token: string;
    private address: string;
    private apiCall: ApiCall;

  constructor(_token: string,_address: string, _apiCall: ApiCall) {
    this.token = _token; 
    this.address = _address; 
    this.apiCall = _apiCall;
  }


  public async getUserItemBalance(
    collectionAddress: string,
    chainId: number,
    tokenId: number,
  ): Promise<{ balance: number }> {
    const query = {
      chainId: '{chainId}',
      userAddress: this.address,
      collectionAddress: '{collectionAddress}',
      tokenId: '{tokenId}',
    };
    const json = await this.apiCall.get<{ balance: number }>(`item/balance/`, query);

    return {
      balance: json.balance,
    };
  }


}
