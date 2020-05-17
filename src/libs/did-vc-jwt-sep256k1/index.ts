import base64url from "uport-base64url";

const JWT_ALG = "ES256K";
const DID_FORMAT = /^did:([a-zA-Z0-9_]+):([:[a-zA-Z0-9_.-]+)(\/[^#]*)?(#.*)?$/;
const JWT_FORMAT = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;
const DEFAULT_CONTEXT = "https://www.w3.org/2018/credentials/v1";
const DEFAULT_VC_TYPE = "VerifiableCredential";
const DEFAULT_VP_TYPE = "VerifiablePresentation";

import { Signer } from "did-jwt/src";

export interface CredentialSubject {
  [x: string]: any;
}

export interface VC {
  "@context": string[];
  type: string[];
  credentialSubject: CredentialSubject;
}

export interface VerifiableCredentialPayload {
  sub: string;
  vc: VC;
  nbf?: number;
  aud?: string;
  exp?: number;
  jti?: string;
  [x: string]: any;
}

export interface VP {
  "@context": string[];
  type: string[];
  verifiableCredential: string[];
}

export interface PresentationPayload {
  vp: VP;
  aud?: string;
  nbf?: number;
  exp?: number;
  jti?: string;
  [x: string]: any;
}

export interface Issuer {
  did: string;
  signer: Signer;
}

import { DIDDocument } from "did-resolver";
import { verifyJWT, createJWT } from "./JWT";
import { async } from "rxjs/internal/scheduler/async";
import { ethers } from "ethers";
import { keccak256, base64, hexlify, arrayify, sha256 } from "ethers/utils";

interface Resolvable {
  resolve: (did: string) => Promise<DIDDocument | null>;
}

export async function createVerifiableCredential(
  payload: VerifiableCredentialPayload,
  issuer: Issuer,
  did: string
): Promise<string> {
  validateVerifiableCredentialAttributes(payload);
  return createJWT(payload, {
    issuer: did || issuer.did,
    signer: issuer.signer,
    alg: JWT_ALG
  });
}

export async function createPresentation(
  payload: PresentationPayload,
  issuer: Issuer,
  did: string
): Promise<string> {
  validatePresentationAttributes(payload);
  return createJWT(payload, {
    issuer: did || issuer.did,
    signer: issuer.signer,
    alg: JWT_ALG
  });
}

export function validateVerifiableCredentialAttributes(
  payload: VerifiableCredentialPayload
): void {
  validateContext(payload.vc["@context"]);
  validateVcType(payload.vc.type);
  validateCredentialSubject(payload.vc.credentialSubject);
  if (payload.nbf) validateTimestamp(payload.nbf);
  if (payload.exp) validateTimestamp(payload.exp);
}

export function validatePresentationAttributes(
  payload: PresentationPayload
): void {
  validateContext(payload.vp["@context"]);
  validateVpType(payload.vp.type);
  if (payload.vp.verifiableCredential.length < 1) {
    throw new TypeError("vp.verifiableCredential must not be empty");
  }
  for (const vc of payload.vp.verifiableCredential) {
    validateJwtFormat(vc);
  }
  if (payload.exp) validateTimestamp(payload.exp);
}

function isLegacyAttestationFormat(payload: any): boolean {
  // payload is an object and has all the required fields of old attestation format
  return (
    payload instanceof Object &&
    payload.sub &&
    payload.iss &&
    payload.claim &&
    payload.iat
  );
}

function attestationToVcFormat(payload: any): VerifiableCredentialPayload {
  const { iat, nbf, claim, vc, ...rest } = payload;
  const result: VerifiableCredentialPayload = {
    ...rest,
    nbf: nbf ? nbf : iat,
    vc: {
      "@context": [DEFAULT_CONTEXT],
      type: [DEFAULT_VC_TYPE],
      credentialSubject: payload.claim
    }
  };
  if (vc) payload.issVc = vc;
  return result;
}

export async function verifyCredential(
  vc: string,
  resolver: Resolvable
): Promise<any> {
  const verified = await verifyJWT(vc, verifier, { resolver });
  if (isLegacyAttestationFormat(verified.payload)) {
    verified.payload = attestationToVcFormat(verified.payload);
  }
  validateVerifiableCredentialAttributes(verified.payload);
  return verified;
}

export async function verifyPresentation(
  presentation: string,
  resolver: Resolvable
): Promise<any> {
  const verified = await verifyJWT(presentation, verifier, { resolver });
  validatePresentationAttributes(verified.payload);
  return verified;
}

export async function verifier(data, sig, authenticators) {
  // ??
  const digest = ethers.utils.toUtf8Bytes(data);
  const signature = base64url.decode(sig);
  // const fullPublicKeys = authenticators.filter(({ publicKeyHex }) => { return typeof publicKeyHex !== 'undefined' })
  const ethAddressKeys = authenticators.filter(({ ethereumAddress }) => {
    return typeof ethereumAddress !== "undefined";
  });
  const pub = ethers.utils.recoverPublicKey(digest, signature);
  let signer;
  if (ethAddressKeys.length > 0 && pub) {
    const addr = ethers.utils.verifyMessage(data, signature);

    signer = authenticators.find(
      ({ publicKeyHex, ethereumAddress }) =>
        publicKeyHex === pub.replace("0x", "") ||
        ethereumAddress.toLowerCase() === addr.toLowerCase()
    );
  }

  return signer;
}

export function validateJwtFormat(value: string): void {
  if (!value.match(JWT_FORMAT)) {
    throw new TypeError(`"${value}" is not a valid JWT format`);
  }
}

// The main scenario we want to guard against is having a timestamp in milliseconds
// instead of seconds (ex: from new Date().getTime()).
// We will check the number of digits and assume that any number with 12 or more
// digits is a millisecond timestamp.
// 10 digits max is 9999999999 -> 11/20/2286 @ 5:46pm (UTC)
// 11 digits max is 99999999999 -> 11/16/5138 @ 9:46am (UTC)
// 12 digits max is 999999999999 -> 09/27/33658 @ 1:46am (UTC)
export function validateTimestamp(value: number): void {
  if (!(Number.isInteger(value) && value < 100000000000)) {
    throw new TypeError(`"${value}" is not a unix timestamp in seconds`);
  }
}

export function validateContext(value: string[]): void {
  if (value.length < 1 || !value.includes(DEFAULT_CONTEXT)) {
    throw new TypeError(
      `@context is missing default context "${DEFAULT_CONTEXT}"`
    );
  }
}

export function validateVcType(value: string[]): void {
  if (value.length < 1 || !value.includes(DEFAULT_VC_TYPE)) {
    throw new TypeError(`type is missing default "${DEFAULT_VC_TYPE}"`);
  }
}

export function validateVpType(value: string[]): void {
  if (value.length < 1 || !value.includes(DEFAULT_VP_TYPE)) {
    throw new TypeError(`type is missing default "${DEFAULT_VP_TYPE}"`);
  }
}

export function validateCredentialSubject(value: CredentialSubject): void {
  if (Object.keys(value).length === 0) {
    throw new TypeError("credentialSubject must not be empty");
  }
}
