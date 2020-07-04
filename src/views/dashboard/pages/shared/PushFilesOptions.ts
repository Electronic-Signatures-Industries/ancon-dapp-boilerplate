import { SigningOutput } from './SigningOutput';

export interface PushFilesOptions {
    encrypt?: boolean;
    files: File[] | File;
    queueName: string;
    address: string;
    documentSignature?: string;
    documentPubCert?: string;
    basicAuthentication?: string;
    signedPreset?: SigningOutput;
}
