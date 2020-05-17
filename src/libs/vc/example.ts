// import {
//     VerifiableCredentialPayload,
//     createVerifiableCredential,
//     PresentationPayload,
//     createPresentation,
//     verifyCredential,
//     verifyPresentation
// } from "../../libs/did-vc-jwt-sep256k1";
// import { Person, WithContext } from "schema-dts";
// import * as moment from "moment";

// export async function signClaim() {
//     const { resolver, contracts, issuer, preferredDIDAddress } = this.solidoProps;

//     const didDocDefault = {
//         "@context": "https://w3id.org/did/v1",
//         id: preferredDIDAddress,
//         publicKey: [
//             {
//                 id: `${preferredDIDAddress}#owner`,
//                 type: "Secp256k1VerificationKey2018",
//                 owner: preferredDIDAddress,
//                 ethereumAddress: contracts.Documents.defaultAccount
//             }
//         ],
//         authentication: [
//             {
//                 type: "Secp256k1SignatureAuthentication2018",
//                 publicKey: `${preferredDIDAddress}#owner`
//             }
//         ]
//     };
//     const vcPayload: VerifiableCredentialPayload = {
//         sub: this.solidoProps.issuer.did,
//         nbf: moment().unix(),
//         vc: {
//             "@context": ["https://www.w3.org/2018/credentials/v1"],
//             type: ["VerifiableCredential"],
//             credentialSubject: {
//                 degree: {
//                     type: "BachelorDegree",
//                     name: "Baccalauréat en musiques numériques"
//                 }
//             }
//         }
//     };

//     // "@context": [
//     //     "https://www.w3.org/2018/credentials/v1",
//     //     "https://www.w3.org/2018/credentials/examples/v1"
//     //   ],
//     //   "id": "http://example.edu/credentials/3732",
//     //   "type": ["VerifiableCredential", "AgeCredential", "RelationshipCredential"],
//     //   "issuer": "https://example.edu/issuers/14",
//     //   "issuanceDate": "2010-01-01T19:23:24Z",
//     //   "credentialSubject": {
//     //     "id": "did:example:ebfeb1f712ebc6f1c276e12ec21",
//     //     "ageUnder": 16,
//     //     "parent": {
//     //       "id": "did:example:ebfeb1c276e12ec211f712ebc6f",
//     //       "type": "Mother"
//     //     }
//     //   },

//     const p: WithContext<Person> = {
//         "@context": "https://schema.org",
//         "@type": "Person",
//         name: "Eve",
//         affiliation: {
//             type: "School",
//             name: "Nice School"
//         }
//     };

//     vcPayload.vc["@context"].push(p["@context"]);
//     vcPayload.vc["@context"].push(didDocDefault["@context"]);
//     vcPayload.publicKey = didDocDefault.publicKey;
//     vcPayload.authentication = didDocDefault.authentication;
//     vcPayload.vc["type"].push(`${p["@type"]}Credential`);
//     vcPayload.vc.credentialSubject = {
//         ...vcPayload.vc.credentialSubject,
//         name: p.name,
//         affiliation: p.affiliation
//     };
//     const vcJwt = await createVerifiableCredential(
//         vcPayload,
//         this.solidoProps.issuer,
//         preferredDIDAddress
//     );

//     const vpPayload: PresentationPayload = {
//         vp: {
//             "@context": ["https://www.w3.org/2018/credentials/v1"],
//             type: ["VerifiablePresentation"],
//             verifiableCredential: [vcJwt]
//         }
//     };
//     const vpJwt = await createPresentation(vpPayload, issuer, preferredDIDAddress);

//     const verifiedVC = await verifyCredential(vcJwt, resolver);
//     console.log(verifiedVC);

//     const verifiedVP = await verifyPresentation(vpJwt, resolver);
//     console.log(verifiedVP);
// }
