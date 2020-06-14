import { Issuer } from './did-vc-jwt-sep256k1';
import { merge } from 'rxjs';
import { Resolver } from 'did-resolver';
import { setupSolido, SetupSolidoOptions } from './setupSolido';

import {
  IpldClient,
  DIDDocumentBuilder,
  DIDMethodXDV,
} from 'xdvplatform-tools';

export interface StorageMiddleware {
  getUserModel: any;
  setUserModel: any;
  getIdCredential: any;
  setIdCredential: any;
  getDownloadURL: any;
  getBinaryData: any;
  setBinaryData: any;
}

export interface EthereumeMiddleware {
  contracts: any;
  account: string;
  networkId: number;
  network: string;
  web3: any;
  provider: any;
  signer?: any;
}

export interface DIDMiddleware {
  resolver: Resolver;
  preferredDIDAddress: string;
  issuer: Issuer;
}
export interface MiddlewareOptions {
  storage?: StorageMiddleware;
  ethereum?: EthereumeMiddleware;
  did?: DIDMiddleware;
  offchain?: boolean;
  secureLinkedStorage: any;
  xdv?: XDVMiddleware;
}

export interface XDVMiddleware {
  ipld: IpldClient;
  comm: Pubsub;
  didxdv: DIDMethodXDV;
}

export const initXdvMiddleware = async options => {

  // const config = {
  //   Addresses: {
  //     Swarm: [
  //       "/dns4/xdvmessaging.auth2factor.com/tcp/443/wss/p2p-webrtc-star/",
  //       '/ip4/0.0.0.0/tcp/0',
  //       '/ip4/190.34.226.207/tcp/4001/p2p/QmWquNJVDxGEefcyPLTULKwkgJEmMDjgurokma9Kwa7BME'
  //     ],
  //     API: '/dns4/ipfs.auth2factor.com/tcp/443',
  //     Gateway: '/dns4/ipfs.infura.io/tcp/5001'
  //   },
  //   Discovery: {
  //     webRTCStar: {
  //       Enabled: false
  //     }
  //   },
  //   "Bootstrap": [
  //       "/dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN",
  //       "/dnsaddr/bootstrap.libp2p.io/p2p/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa",
  //       "/dnsaddr/bootstrap.libp2p.io/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb",
  //       "/dnsaddr/bootstrap.libp2p.io/p2p/QmcZf59bWwK5XFi76CZX8cbJ4BhTzzA3gU1ZjYZcYW3dwt",
  //       "/ip4/104.131.131.82/tcp/4001/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ"
  //   ],
  //   AutoNAT: {},
  //   Pubsub: {
  //     Router: "gossipsub"
  //   },
  //   EXPERIMENTAL: {
  //     pubsub: false
  //   }

  // }
  // const ipld = new IpldClient();
  // const comm = new Pubsub(ipld);
  // // sawait comm.initialize(config);

  return {
    // ipld,
    // didxdv: new DIDMethodXDV(ipld),
    // comm,
    offchain: true
  };
}


export const initMiddleware = async options => {
  let mergeOptions = options;
  const solidoProps = await setupSolido(options);
  mergeOptions = {
    ...mergeOptions,
    ethereum: solidoProps
  };
  
  return { ...mergeOptions } as MiddlewareOptions;
};
