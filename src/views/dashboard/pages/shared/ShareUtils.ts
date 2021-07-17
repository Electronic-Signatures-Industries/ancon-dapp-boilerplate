import { forkJoin } from 'rxjs';
import {
    isBase64,
    IsBase64,
    IsString,
    validate,
    validateOrReject
    } from 'class-validator';
    
const cbor = require('cbor-sync');
export class XDVFileFormat {
    @IsBase64()
    content: string;

    @IsString()
    signature: string;

    @IsString()
    pubCert: string;
}

export class ShareUtils {


    /**
     * Opens an XDV shared link
     * @param blob 
     * @param name 
     */
    static async openXDVLink(blob: Blob, name: string) {
        try {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = name;
            document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
            a.click();
            a.remove();
        } catch (e) {
            throw new Error('No se pudo convertir el archivo');
        }
    }

    /**
     * Creates a XDV shared link 
     * @param blob 
     * @param name 
     */
    static async shareXDVLink(blob: Blob, name: string) {
        try {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = name;
            document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
            a.click();
            a.remove();
        } catch (e) {
            throw new Error('No se pudo convertir el archivo');
        }
    }

    /**
     * Downloads a File object
     * @param blob File
     * @param name name
     */
    static async downloadFile(blob: Blob, name: string) {
        try {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = name;
            document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
            a.click();
            a.remove();
        } catch (e) {
            throw new Error('No se pudo convertir el archivo');
        }
    }

    static async openEphemeralLinkIndex(link: string) {
     
    }

    
    static async getDocument(wallet, address: string, txs: string, entry: string, hash: string) {
        const swarmFeed = await wallet.getSwarmNodeQueryable(address);

        // get document from reference
        const ref = await swarmFeed.bzz.downloadData(
            txs
        );
        // download ref raw
        let documentCbor: any = await swarmFeed.bzz.download(
            ref.entries[0].hash,
            {
                mode: 'raw'
            }
        );

        let indexDocument;
        let document;
        try {
            indexDocument = await documentCbor.json();
            if (entry) {
                hash = indexDocument.entries[entry].hash;
                const temp = await swarmFeed.bzz.download(
                    hash,
                    {
                        mode: 'raw'
                    }
                );
                const buf = await temp.arrayBuffer();
                document = cbor.decode(Buffer.from(buf));
            } else {
                const query = indexDocument.entries.map(async (i) => {
                    const temp = await swarmFeed.bzz.download(i.hash, { mode: 'raw' });
                    const buf = await temp.arrayBuffer();
                    const info = cbor.decode(Buffer.from(buf));
                    
                    if (info.hash === hash) {
                        document = info;
                    }
                });
                await forkJoin(query).toPromise();
            }

        } catch (e) {
            documentCbor = await swarmFeed.bzz.download(
                ref.entries[0].hash,
                {
                    mode: 'raw'
                }
            );

            indexDocument = await documentCbor.arrayBuffer();
            document = cbor.decode(Buffer.from(indexDocument));
        }

        return document;
    }
    static async openEphemeralLink(address: string, txs: string, entry: number, hash?: string) {
        const wallet = new Wallet();
        const document = await ShareUtils.getDocument(
            wallet,
            address,
            txs,
            entry,
            hash
        );
        const base64Content = (document).content;


        const arr = Uint8Array.from(atob(base64Content), c => c.charCodeAt(0))
        const buf = Buffer.from(arr);

        // send to viewer
        const blob = new Blob(
            [buf],
            { type: document.contentType }
        );

        // const f = new File([blob], document.name);

        return {
            document,
            downloadFile: () => ShareUtils.openXDVLink(blob, document.name)
        };
    }

    /**
     * Downloads a File object
     * @param o XDV File Share Format 
     * @param name name
     */
    static async downloadFileFromObject(o: XDVFileFormat, name: string) {
        try {
            const url = window.URL.createObjectURL(
                new Blob(
                    [JSON.stringify(o, null, 2)],
                    { type: 'application/xdv-attached-sig' }
                )
            );
            const a = document.createElement('a');
            a.href = url;
            a.download = name;
            document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
            a.click();
            a.remove();
        } catch (e) {
            throw new Error('No se pudo convertir el archivo');
        }
    }
}