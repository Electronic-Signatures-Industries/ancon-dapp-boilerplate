import { initializeEthrDID, initializeOffchainEthrDID } from './ethrdid';
import { initIPFS, initSwarm } from './userconfig';
import { Issuer } from 'did-jwt-vc';
import { merge } from 'rxjs';
import { Resolver } from 'did-resolver';
import { setupSolido, SetupSolidoOptions } from './setupSolido';

import {
  IpldClient,
  DIDDocumentBuilder,
  DIDMethodXDV,
  Pubsub,
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

interface XDVMiddleware {
  ipld: IpldClient;
  comm: Pubsub;
  didxdv: DIDMethodXDV;
}

export const initXdvMiddleware = async options => {
  const ipld = new IpldClient();
  const comm = new Pubsub(ipld);
  await comm.initialize();

  return {
    ipld,
    didxdv: new DIDMethodXDV(ipld),
    comm,
    offchain: true
  };
}

export const initOffchainMiddleware = async options => {
  const did = await initializeOffchainEthrDID(options);
  const storage = await initSwarm(options);
  return {
    did,
    storage,
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
  const ethrDIDOptions = await initializeEthrDID(mergeOptions);
  mergeOptions = {
    did: ethrDIDOptions,
    ...mergeOptions
  };

  const swarmOptions = await initSwarm(mergeOptions);
  
  const ipfsOptions = await initIPFS(mergeOptions);
  mergeOptions = {
    ...mergeOptions,
    storage: {
      ...ipfsOptions,
      ...swarmOptions,
    }
  };

  // const secureStorage = await initSecureLinkableStorage(mergeOptions);
  // mergeOptions = {
  //   ...mergeOptions,
  //   secureLinkedStorage: secureStorage,
  // };

  return { ...mergeOptions } as MiddlewareOptions;
};
