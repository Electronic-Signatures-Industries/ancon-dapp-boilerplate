import { SolidoModule, ContractImport } from "@decent-bet/solido";
import { EthersPlugin, DispatcherArgs } from "solido-provider-ethers";
import { ethers, utils } from "ethers";
import { of } from "rxjs";
import { map } from "rxjs/operators";
import { EthereumeMiddleware } from '.';
const WFactory = require("./contracts/WFactory");
const ethrDIDRegistryABI = require("./eth-did-registry");
const ExtensionEventRegistry = require('./contracts/ExtensionEventRegistry');
const ethrDIDImport: ContractImport = {
  raw: {
    abi: [ethrDIDRegistryABI]
  },
  address: {
    mainnet: "0xdCa7EF03e98e0DC2B855bE647C39ABe984fcF21B",
    ropsten: "0xdCa7EF03e98e0DC2B855bE647C39ABe984fcF21B"
  }
};

export interface SetupSolidoOptions {
  networkId: number;
  account: string;
}

export const setupSolido = async (options: SetupSolidoOptions) => {
  // const networks: any = {
  //   3: 'ropsten',
  //   1: 'mainnet',
  //   4: 'rinkeby',
  // }
  // Create Solido Module
  const contractMappings = [
    {
      name: "ExtensionEventRegistry",
      import: ExtensionEventRegistry.ExtensionEventRegistry,
      provider: EthersPlugin,
      enableDynamicStubs: true
    },
    {
      name: "WFactory",
      import: WFactory.WFactory,
      provider: EthersPlugin,
      enableDynamicStubs: true
    },
    {
      name: "EthrDIDRegistry",
      import: ethrDIDImport,
      provider: EthersPlugin,
      enableDynamicStubs: true
    }
  ];

  // Create Solido Module
  const solido = new SolidoModule(contractMappings);
  //  const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545')
  const { web3 } = window as any;
  const defaultAccount = options.account;

  //  const Gsn = require('@openeth/gsn')
  //  const gsn = new Gsn.RelayProvider(web3.currentProvider,  { verbose: true, force_gasprice: 100000000, force_gaslimit: 1000000000000  }  )
  const provider = new ethers.providers.Web3Provider(web3.currentProvider);

  let network = "rinkeby"; //  rinkeby - 2JsonRpcProvider
  if (options.networkId === 1) {
    network = "mainnet";
  } else if (options.networkId === 3) {
    network = "ropsten";
  }

  // Configure reactive solido store
  const store = {
    state: {
      currentTransaction: {
        txhash: ""
      }
    },
    mutations: {
      ADD_DOCUMENT: (e: DispatcherArgs, contract: EthersPlugin) => {
        return of(e as any[]).pipe(
          map(items => {
            return {
              id: items[0],
              supplier: items[1],
              debtor: items[2],
              status: "CREATED"
            };
          })
        );
      }
    },
    mapEvents: {
      LogAddInvoice: {
        getter: "currentInvoice",
        mutation: "ADD_DOCUMENT"
      }
    },
    mapActions: {
      addInvoice: {
        getter: "currentInvoice",
        onFilter: "LogAddInvoice",
        mutation: "ADD_DOCUMENT"
      }
    }
  };
  const contracts = solido
    .bindContracts({
      ethers: {
        provider,
        options: {
          privateKey: "provider",
          defaultAccount: defaultAccount,
          provider,
          network,
          store
        }
      }
    })
    .connect();
  return { contracts, web3, account: defaultAccount, network, networkId: options.networkId, provider } as EthereumeMiddleware;
};
