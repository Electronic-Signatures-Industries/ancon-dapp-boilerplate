export enum Capability {
    Any,
    Sign,
    Encrypt
}

export class LinkedExternalKeystores {
    walletconnect?: {
        address: string;
        chain: number;
        capability: Capability;
        connected: boolean;
    };
    ledger?: {
        path: string;
        address: string;
        chain: number;
        connected: boolean;
        capability: Capability;
    };
    u2f?: {
        address: string;
        chain: number;
        capability: Capability;
    };
    pkcs12?: {
        name: string;
        capability: Capability;
    };
    pkcs11?: {
        tokenIndex: string;
        capability: Capability;
    };
}

export enum DIDSigner {
    Walletconnect,
    Ledger,
    XDV
}

export enum X509Signer {
    PKCS11,
    PKCS12,
    XDV
}
export class KeystoreIndex {
    isDefault?: boolean;
    linkedExternalKeystores?: LinkedExternalKeystores;
    defaultDIDSigner?: DIDSigner;
    defaultX509Signer?: X509Signer;
    publicKeyFromDID?: any;
    address?: string;
    keystore: string;
    description: string;
    name: string;
    created: Date = new Date();
}