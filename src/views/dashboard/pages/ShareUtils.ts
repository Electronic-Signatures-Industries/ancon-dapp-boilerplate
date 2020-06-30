import {
    isBase64,
    IsBase64,
    IsString,
    validate,
    validateOrReject
    } from 'class-validator';
import { JWTService, Wallet } from 'xdvplatform-wallet/src';
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
     * Creates a XDV Link 
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
        if (link.split(';').length < 2) return;
        const wallet = new Wallet();
        const swarmFeed = await wallet.getSwarmNodeQueryable(link.split(';')[0]);
        // get document from reference
        const jwt = await swarmFeed.bzz.downloadData(
            link.split(';')[1]
        );
   

        const { payload } = JWTService.decodeWithSignature(jwt);

        return payload;
    }
    static async openEphemeralLink(address: string, txs: string, entry: number) {
        const wallet = new Wallet();
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
            const temp  = await swarmFeed.bzz.download(
                indexDocument.entries[entry].hash,
                {
                    mode: 'raw'
                }
            );
            const buf = await temp.arrayBuffer();
            document = cbor.decode(Buffer.from(buf));
        } catch(e) {
            documentCbor = await swarmFeed.bzz.download(
                ref.entries[0].hash,
                {
                    mode: 'raw'
                }
            );
     
            indexDocument = await documentCbor.arrayBuffer();
            document = cbor.decode(Buffer.from(indexDocument));
        }
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