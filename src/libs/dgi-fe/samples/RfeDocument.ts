
import { Parse, SignedXml, Select } from 'xadesjs';

export class RfeDocument {   
    private document: any;
    constructor(private xml: string) {
        this.document = Parse(xml);
    }
    async verify() {
        var xmlSignatures = Select(this.document, 
            "//*[local-name(.)='Signature' and namespace-uri(.)='http://www.w3.org/2000/09/xmldsig#']");
console.log(xmlSignatures.length)
        if (!(xmlSignatures && xmlSignatures.length))
            throw new Error("Cannot get XML signature from XML document");
const signature = new SignedXml(this.document)
        signature.LoadXml(xmlSignatures[0]);
        const res = await signature.Verify();
        return res;  
    }
}