import { IsEthereumAddress, IsNumber, IsString } from 'class-validator';

/**
 * Interface for an ERC-20 Token
 * TODO: Add ERC-721 and ERC-
 */
export class Token {
    @IsString()
    name: string;
    
    @IsString()
    symbol: string;
    
    @IsNumber()
    decimals: number;
    
    @IsString()
    chain: string;

    @IsEthereumAddress()
    address: string;

    @IsString()
    network: string;

    totalSupply: number;

    icon: string;
    
    constructor() {}
}