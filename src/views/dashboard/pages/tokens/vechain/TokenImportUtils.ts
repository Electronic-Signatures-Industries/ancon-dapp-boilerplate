import { ContractImport } from '@decent-bet/solido';
import { ContractInterface } from './TokenABI';

export interface VechainContractImportAddressList {
    '0x27': string;
    '0x4a': string;
}

export function createTokenContractImport(addresses: VechainContractImportAddressList): ContractImport  {
    return ({
        raw: {
            abi: ContractInterface,
        },
        address: addresses
    });
};