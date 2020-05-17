import base64url from "uport-base64url";
import { ethers, utils } from "ethers";
import * as EthrDID from "ethr-did";
import { Issuer } from "./did-vc-jwt-sep256k1";
import { Resolver } from "did-resolver";
import { base64 } from "ethers/utils";
import { DIDMiddleware, MiddlewareOptions } from '.';

const ethr = require("ethr-did-resolver");

export const initializeOffchainEthrDID = async (opts: MiddlewareOptions) => {
  const ethrResolver = ethr.getResolver(
    {
      networks: [
        { name: "mainnet", rpcUrl: "https://mainnet.infura.io/v3/92ed13edfad140409ac24457a9c4e22d" },
        { name: "rinkeby", rpcUrl: "https://rinkeby.infura.io/v3/92ed13edfad140409ac24457a9c4e22d" },
        { name: "ropsten", rpcUrl: "https://ropsten.infura.io/v3/92ed13edfad140409ac24457a9c4e22d" },
        { name: "kovan", rpcUrl: "https://kovan.infura.io/v3/92ed13edfad140409ac24457a9c4e22d" },
      ]
    },
    false
  );
  const resolver: any = new Resolver(ethrResolver);
  return { resolver };
}

export const initializeEthrDID = async ({
  ethereum: {
    network,
    account,
    web3,
    provider
  } }: MiddlewareOptions) => {
  const defaultAccount = account;
  const ethrResolver = ethr.getResolver(
    {
      networks: [
        { name: "mainnet", provider: web3.currentProvider },
        { name: network, provider: web3.currentProvider }
      ]
    },
    false
  );
  const resolver: any = new Resolver(ethrResolver);
  const issuer: Issuer = new EthrDID.default({
    address: defaultAccount,
    provider: web3.currentProvider,
    signer: async jwt => {
      const signature = await provider.getSigner().signMessage(jwt);
      const sig = ethers.utils.splitSignature(signature);
      return base64url.encode(ethers.utils.joinSignature(sig));
    },
    web3
  });

  const preferredDIDAddress = `did:ethr:${network}:${defaultAccount}`;
  return { resolver, issuer, preferredDIDAddress } as DIDMiddleware;
};
