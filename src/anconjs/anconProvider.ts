import { CosmJSWeb3Provider } from './base'
import {
  queryClient,
  registry,
} from './store/generated/Electronic-Signatures-Industries/ancon-protocol/ElectronicSignaturesIndustries.anconprotocol.anconprotocol/module'
import { Keplr } from '@keplr-wallet/types'
export class AnconWeb3Provider extends CosmJSWeb3Provider {
  constructor(
    cosmosChainId: string,
    evmChainId: number,
    keplr: Keplr,
  ) {
    super(cosmosChainId, evmChainId, keplr)
  }

  connectProvider(): Promise<this> {
    return super.connect(queryClient)
  }
}
