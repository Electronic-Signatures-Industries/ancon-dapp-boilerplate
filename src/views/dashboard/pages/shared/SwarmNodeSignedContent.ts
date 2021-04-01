import { ec } from 'elliptic';
import { SigningOutput } from './SigningOutput';
import { IsEthereumAddress, IsNumber, IsString } from 'class-validator';

export class SwarmNodeSignedContent {
    @IsString()
    contentType: string;
    name: string;
    @IsNumber()
    created: number;
    signaturePreset?: SigningOutput;
    @IsNumber()
    lastModified: number;
    @IsNumber()
    size: number;
    content?: string
    hash: string;
    signature?: string | ec.Signature;
    cipher?: string;
    documentPubCert?: string;
    documentSignature?: string;
}