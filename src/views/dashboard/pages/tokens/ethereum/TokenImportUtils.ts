import { ContractImport } from '@decent-bet/solido';
import { ContractInterface } from './TokenABI';

export interface EthereumContractImportAddressList {
    'ropsten': string;
    'rinkeby': string;
    'mainnet': string;
}

export function createTokenContractImport(addresses: EthereumContractImportAddressList): ContractImport  {
    return ({
        raw: {
            abi: ContractInterface,
        },
        address: addresses
    });
};