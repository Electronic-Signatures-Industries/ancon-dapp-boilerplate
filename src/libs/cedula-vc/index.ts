import {
  VerifiableCredentialPayload,
  createVerifiableCredential,
  PresentationPayload,
  createPresentation,
  verifyCredential,
  verifyPresentation
} from "../did-vc-jwt-sep256k1";
import moment from "moment";
import { Issuer } from "did-jwt-vc";
import { Resolver } from "did-resolver";
import { keccak256, arrayify } from "ethers/utils";
import { utils } from "ethers";

interface NationalIDCard {
  name: string;
  lastname: string;
  hash: string;
}

interface DidConfig {
  address: string;
  resolver: Resolver;
  issuer: Issuer;
  ethereumAddress: string;
}

export class CedulaVC {
  async issueCredential(id: NationalIDCard, did: DidConfig) {
    const vc = {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://vc.auth2factor.com/panama-tribunal-electoral-id-credential/v1"
      ],
      type: ["VerifiableCredential", "PanamaTribunalElectoralIDCredential"],
      credentialSubject: {
        //  id: `https://vc.auth2factor.com/panama-tribunal-electoral-id-credential/${did.address}:cedula`,
        name: id.name,
        familyName: id.lastname,

        hash: keccak256(utils.toUtf8Bytes(id.hash))
      }
    };

    const vcPayload: VerifiableCredentialPayload = {
      sub: did.address,
      nbf: moment().unix(),
      vc
    };
    const vcJwt = await createVerifiableCredential(
      vcPayload,
      did.issuer,
      did.address
    );

    const verifiedVC = await verifyCredential(vcJwt, did.resolver);

    return vcJwt;
  }

  verify(jwt: string, did: DidConfig) {
    return verifyPresentation(jwt, did.resolver);
  }

  async createVerifier(jwt: string, did: DidConfig) {
    const vpPayload: PresentationPayload = {
      exp: moment()
        .add(15, "minutes")
        .unix(),
      audience: location.host,
      vp: {
        "@context": ["https://www.w3.org/2018/credentials/v1"],
        type: ["VerifiablePresentation"],
        verifiableCredential: [jwt]
      }
    };
    const vpJwt = await createPresentation(vpPayload, did.issuer, did.address);
    return vpJwt;
  }
}

export async function vcSigned() {
  // const jsigs = require('jsonld-signatures');
  // const { Ed25519KeyPair } = require('crypto-ld');
  // const keyPair = await Ed25519KeyPair.generate();
  // // sign the document for the purpose of authentication
  // const { Ed25519Signature2018 } = jsigs.suites;
  // const { AuthenticationProofPurpose } = jsigs.purposes;
  // const { extendContextLoader } = require('jsonld-signatures');
  // const { defaultDocumentLoader } = require('vc-js');
  // //        const { documentLoaders, extendContextLoader } = require('jsonld');
  // const documentLoader = extendContextLoader(async url => {
  //     console.log(url)
  //     if (url === "https://vc.auth2factor.com/panama-tribunal-electoral-id-credential/v1") {
  //         return {
  //             contextUrl: null,
  //             documentUrl: url,
  //             document: require('./PanamaTribunalElectoralIDCredential')
  //         };
  //     }
  //     return defaultDocumentLoader(url);
  // });
  // const signed = await jsigs.sign(vc, {
  //     documentLoader,
  //     suite: new Ed25519Signature2018({
  //         verificationMethod: keyPair.id,
  //         key: keyPair //new Ed25519KeyPair({ privateKeyBase58 })
  //     }),
  //     purpose: new AuthenticationProofPurpose({
  //         challenge: id.hash,
  //         domain: 'auth2factor.com'
  //     })
  // });
  // vcPayload.proof = {
  //     "type": "Ed25519Signature2018",
  //     "created": moment().unix(),
  //     "proofPurpose": "assertionMethod",
  //     "verificationMethod": "https://example.com/jdoe/keys/1",
  //     "jws": signed
  // }
  // console.log('Signed document:', signed);
  // // we will need the documentLoader to verify the controller
  // const {node: documentLoader} = documentLoaders;
  // // verify the signed document
  // const result = await jsigs.verify(signed, {
  //   documentLoader,
  //   suite: new Ed25519Signature2018({
  //     key: new Ed25519KeyPair(publicKey)
  //   }),
  //   purpose: new AuthenticationProofPurpose({
  //     controller,
  //     challenge: 'abc',
  //     domain: 'example.com'
  //   })
  // });
  // if(result.verified) {
  //   console.log('Signature verified.');
  // } else {
  //   console.log('Signature verification error:', result.error);
  // }
}
export async function signClaim() {
  // vcPayload.vc["@context"].push(p["@context"]);
  // vcPayload.vc["@context"].push(didDocDefault["@context"]);
  // vcPayload.publicKey = didDocDefault.publicKey;
  // vcPayload.authentication = didDocDefault.authentication;
  // vcPayload.vc["type"].push(`${p["@type"]}Credential`);
  // vcPayload.vc.credentialSubject = {
  //     ...vcPayload.vc.credentialSubject,
  //     name: p.name,
  //     affiliation: p.affiliation
  // };
  // const vcJwt = await createVerifiableCredential(
  //     vcPayload,
  //     this.solidoProps.issuer,
  //     preferredDIDAddress
  // );
  // const vpPayload: PresentationPayload = {
  //     vp: {
  //         "@context": ["https://www.w3.org/2018/credentials/v1"],
  //         type: ["VerifiablePresentation"],
  //         verifiableCredential: [vcJwt]
  //     }
  // };
  // const vpJwt = await createPresentation(vpPayload, issuer, preferredDIDAddress);
  // const verifiedVC = await verifyCredential(vcJwt, resolver);
  // console.log(verifiedVC);
  // const verifiedVP = await verifyPresentation(vpJwt, resolver);
  // console.log(verifiedVP);
}
