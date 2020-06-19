import {
    isBase64,
    IsBase64,
    IsString,
    validate,
    validateOrReject
    } from 'class-validator';

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