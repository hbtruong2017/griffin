import ProviderEngine from "web3-provider-engine";
import { JSONRPCRequestPayload, JSONRPCErrorCallback } from "ethereum-protocol";
import { Callback, JsonRPCResponse } from "web3/providers";
declare class HDWalletProvider {
    private hdwallet?;
    private walletHdpath;
    private wallets;
    private addresses;
    engine: ProviderEngine;
    constructor(mnemonic: string | string[], provider: string | any, addressIndex?: number, numAddresses?: number, shareNonce?: boolean, walletHdpath?: string);
    send(payload: JSONRPCRequestPayload, callback: JSONRPCErrorCallback | Callback<JsonRPCResponse>): void;
    sendAsync(payload: JSONRPCRequestPayload, callback: JSONRPCErrorCallback | Callback<JsonRPCResponse>): void;
    getAddress(idx?: number): string;
    getAddresses(): string[];
    static isValidProvider(provider: string | any): boolean;
}
export = HDWalletProvider;
