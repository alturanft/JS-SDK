import { ApiCall } from './apiCall';
import { utf8ToHex } from 'web3-utils';
import { ethers } from 'ethers';
import axios from 'axios';

export class AlturaGuard {
  private token: string;
  private address: string;
  private apiCall: ApiCall;
  /**
   * Creates an instance of the AlturaGuard class.
   * @param _token The API token to use for authentication.
   * @param _address The address of the connected wallet.
   * @param _apiCall An instance of the ApiCall class used to make API calls.
   */
  constructor(_token: string, _address: string, _apiCall: ApiCall) {
    this.token = _token;
    this.address = _address;
    this.apiCall = _apiCall;
  }
  /**
   * Polls the Altura API for a response to a request with the given ID.
   * Waits 10 seconds between each API request until a response is received.
   * @param requestId The ID of the request to poll for a response.
   * @param token The token to use for the API request.
   * @returns The response data object from the API, or null if no response is received.
   */

  private async pollForResponse(requestId: string, token: string): Promise<any> {
    const body = {
      token,
      requestId,
    };
    let responseStatus = 204;
    while (responseStatus === 204) {
      const response = await axios.post('https://cloud.alturanft.com/api/alturaguard/getResponse', body);
      responseStatus = response.status;
      if (responseStatus !== 204) {
        return response?.data;
      } else {
        await new Promise((resolve) => setTimeout(resolve, 10000));
      }
    }
  }
  /**
   *  Check AlturaGuard session
   * @returns Promise that resolves with an object indicating success or failure.
   */
  public async checkSession(): Promise<any> {
    try {
      const body = {
        token: this.token,
      };
      await this.apiCall.post(`alturaguard/status`, {}, body);
      return { success: true };
    } catch (e: any) {
      return { error: 'Something Went wrong!' };
    }
  }

  /**
   *  revokes AlturaGuard session
   * @returns Promise that resolves with an object indicating success or failure.
   */
  public async revokeSession(): Promise<any> {
    try {
      const body = {
        token: this.token,
      };
      await this.apiCall.post(`alturaguard/delete`, {}, body);
      return { success: 'Revoked Session!' };
    } catch (e: any) {
      return { error: 'Something Went wrong!' };
    }
  }

  /**
   * Sends a request to AlturaGuard API to initiate a message signing request and returns a request ID.
   * @param message The message to sign, encoded in UTF-8 format.
   * @returns A Promise that resolves to an object containing a request ID.
   */
  public async signMessage(message: string): Promise<any> {
    const messageHex = utf8ToHex(message);

    try {
      const body = {
        token: this.token,
        reqParameters: ['signature', messageHex],
      };
      const request = await this.apiCall.post<{ requestId: string }>(`alturaguard/request`, {}, body);
      const result = await this.pollForResponse(request.requestId, this.token);
      if (result != 'Rejected') {
        return result;
      } else {
        return { error: 'User Rejected Request' };
      }
    } catch (e: any) {
      return { error: 'Request Expired', message: e };
    }
  }
  /**
   * Sends a request to AlturaGuard API to initiate a native token transfer and returns a request ID.
   * @param amount The amount of tokens to send, as a string.
   * @param chainID The ID of the blockchain to send the tokens on.
   * @param fromAddress The address of the sender's wallet.
   * @param toAddress The address of the recipient's wallet.
   * @returns A Promise that resolves to an object containing a request ID.
   */
  public async sendNativeToken(amount: string, chainID: number, toAddress: string): Promise<any> {
    const amountToSend = BigInt(amount);
    try {
      const body = {
        token: this.token,
        reqParameters: [
          'transaction',
          {
            from: this.address,
            to: toAddress,
            data: '0x',
            value: '0x' + amountToSend.toString(16),
          },
          chainID,
        ],
      };
      const request = await this.apiCall.post<{ requestId: string }>(`alturaguard/request`, {}, body);
      const result = await this.pollForResponse(request.requestId, this.token);
      if (result != 'Rejected') {
        return result;
      } else {
        return { error: 'User Rejected Request' };
      }
    } catch (e: any) {
      return { error: 'Request Expired', message: e };
    }
  }
  /**
   * Sends a transaction to approve a token contract for the connected user's address.
   * @param contractAddress The address of the token contract.
   * @param chainId The ID of the blockchain network to use (e.g. 97 for Binance Smart Chain Testnet).
   * @param data contract Data
   * @returns A promise that resolves with the response from the API, or an object with an error property if there was an error.
   */
  public async sendContractTransaction(
    contractAddress: string,
    chainId: number,
    data:string
  ): Promise<any> {
    const body = {
      token: this.token,
      reqParameters: [
        'transaction',
        {
          from: this.address,
          to: contractAddress,
          data: data,
          value: '0x0',
        },
        chainId,
      ],
    };
    try {
      const request = await this.apiCall.post<{ requestId: string }>(`alturaguard/request`, {}, body);
      const result = await this.pollForResponse(request.requestId, this.token);
      if (result !== 'Rejected') {
        return result;
      } else {
        return { error: 'User Rejected Request' };
      }
    } catch (e: any) {
      return { error: 'Request Expired', message: e };
    }
  }
}
