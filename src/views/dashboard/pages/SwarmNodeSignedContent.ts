import { ec } from 'elliptic';
import { SigningOutput } from './SigningOutput';

export class SwarmNodeSignedContent {
    contentType: string;
    name: string;
    created: number;
    signaturePreset?: SigningOutput;
    lastModified: number;
    size: number;
    content?: string
    hash: string;
    signature?: string | ec.Signature;
    cipher?: string;
    documentPubCert?: string;
    documentSignature?: string;
}