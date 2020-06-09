import { ec } from 'elliptic';

export class SwarmNodeSignedContent {
    contentType: string;
    name: string;
    lastModified: number;
    size: number;
    content: string
    hash: string;
    signature?: string | ec.Signature;
    cipher?: string;
}