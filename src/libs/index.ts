import { setupSolido, SetupSolidoOptions } from "./setupSolido";
import { initializeEthrDID, initializeOffchainEthrDID } from "./ethrdid";
import { initIPFS, initSwarm } from "./userconfig";
import { Issuer } from 'did-jwt-vc';
import { Resolver } from 'did-resolver';
import { merge } from 'rxjs';


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
