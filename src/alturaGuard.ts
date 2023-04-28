import { ApiCall } from './apiCall';
import { utf8ToHex } from "web3-utils";
import { ethers } from "ethers";
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
  constructor(_token: string,_address: string, _apiCall: ApiCall) {
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
    let responseStatus = 204;
    let result: any = null;
    const body ={
      token,
      requestId,
    };
    while (responseStatus === 204) {
      result = await this.apiCall.post<{ data: object, status:number }>(`alturaguard/getResponse`,  {},body
      );

      responseStatus = result.status;

      if (responseStatus === 204) {
        await new Promise((resolve) => setTimeout(resolve, 10000));
      }
    }

    return result?.data;
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
      reqParameters: ["signature", messageHex],
    };
    const request = await this.apiCall.post<{ data: { requestId: string } }>(`alturaguard/request`,  {}, body);
    const result = await this.pollForResponse(request.data.requestId, this.token);

    if (result != "Rejected") {
      return result;
    } else {
      return {error:"User Rejected Request"};
    }
  } catch (e: any) {
    return {error:"Request Expired",message:e};
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
  public async sendNativeToken(amount: string, chainID: number, fromAddress: string, toAddress: string): Promise<any> {
    const amountToSend = BigInt(amount);
    try {
      const body =         {
        token: this.token,
        reqParameters: [
          "transaction",
          {
            from: fromAddress,
            to: toAddress,
            data: "0x",
            value: "0x" + amountToSend.toString(16),
          },
          chainID,
        ],
      };
      const request = await this.apiCall.post<{ data: { requestId: string } }>(`alturaguard/request`,   {},body);
      const result = await this.pollForResponse(request.data.requestId, this.token);
      if (result != "Rejected") {
        return result;
      } else {
        return {error:"User Rejected Request"};
      }
    } catch (e: any) {
      return {error:"Request Expired",message:e};
    }
  }
  /**
 * Sends a transaction to approve a token contract for the connected user's address.
 * @param contractAddress The address of the token contract.
 * @param amount The amount of tokens to approve, in the token's smallest denomination (e.g. 0.1 BUSD = 100000000000000000).
 * @param chainId The ID of the blockchain network to use (e.g. 97 for Binance Smart Chain Testnet).
 * @returns A promise that resolves with the response from the API, or an object with an error property if there was an error.
 */
  public async sendContractTransaction(contractAddress:string, amount: string,chainId: number): Promise<any> {
      const abi = [
        {
          inputs: [
            { internalType: "address", name: "spender", type: "address" },
            { internalType: "uint256", name: "amount", type: "uint256" },
          ],
          name: "approve",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          stateMutability: "nonpayable",
          type: "function",
        },
      ];
      const contract = new ethers.Contract(contractAddress, abi);
      const body = {
        token: this.token,
        reqParameters: [
          "transaction",
          {
            from: this.address,
            to: contractAddress,
            data: contract.interface.encodeFunctionData("approve", [
              this.address,
              amount,
            ]),
            value: "0x0",
          },
          chainId,
        ],
      };
      try {
      const request = await this.apiCall.post<{ data: { requestId: string } }>(`alturaguard/request`,  {},body);
      const result = await this.pollForResponse(request.data.requestId, this.token);
        if (result !== "Rejected") {
          return result;
        } else {
          return {error:"User Rejected Request"};
        }
      } catch (e: any) {
        return {error:"Request Expired",message:e};
      }
  }
  
}
