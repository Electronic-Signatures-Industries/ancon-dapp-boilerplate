export class KeystoreIndex {
    static getIndex(): KeystoreIndex[] {
        const idx = localStorage.getItem('xdv:index:keys');
        if (idx && JSON.parse(idx)) {
            return JSON.parse(idx);
        } else {
            return [];
        }
    }

    static setIndex(index: KeystoreIndex[]) {
        localStorage.setItem('xdv:index:keys',JSON.stringify(index));
    }

    publicKeyFromDID?: any;
    address?: string;
    keystore: string;
    name: string;
    created: Date = new Date();
}