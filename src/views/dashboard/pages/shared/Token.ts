import { IsEthereumAddress, IsNumber, IsString } from 'class-validator';

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