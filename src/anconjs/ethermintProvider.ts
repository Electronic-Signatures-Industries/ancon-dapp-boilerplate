import { TxBody } from 'cosmjs-types/cosmos/tx/v1beta1/tx'
import { CosmJSWeb3Provider } from './base'
import { queryClient } from './store/generated/tharsis/ethermint/ethermint.evm.v1/module'
import { Keplr } from '@keplr-wallet/types'
import {
  BroadcastMode,
  encodeSecp256k1Pubkey,
  encodeSecp256k1Signature,
} from '@cosmjs/launchpad'
import { Int53 } from '@cosmjs/math'
import {
  EncodeObject,
  encodePubkey,
  makeAuthInfoBytes,
  makeSignDoc,
} from '@cosmjs/proto-signing'
import { ExtendedSecp256k1Signature } from '@cosmjs/crypto'
import { LegacyTx } from './store/generated/tharsis/ethermint/ethermint.evm.v1'
import { MsgEthereumTx } from './store/generated/tharsis/ethermint/ethermint.evm.v1/module/types/ethermint/evm/v1/tx'
import { ethers } from 'ethers'
import Web3 from 'web3'
import { arrayify, hexlify } from '@ethersproject/bytes'
import { toUtf8Bytes, toUtf8String } from '@ethersproject/strings'
import { fromBase64 } from '@cosmjs/encoding'
export class EthermintWeb3Provider extends CosmJSWeb3Provider {
  constructor(cosmosChainId: string, evmChainId: number, keplr: Keplr) {
    super(cosmosChainId, evmChainId, keplr)
  }

  /**
   * Sign and broadcast dual chain (EVM / Cosmos), used only for Cosmos Msgs
   * @param msg Message to encode
   * @param fee Fee
   * @returns
   */
  async signSendTransaction(msg: string, fee: any, opts) {
    let msgeth = MsgEthereumTx.fromPartial({
      data: {
        value: LegacyTx.encode(
          LegacyTx.fromPartial({
            value: msg,
            ...opts,
          }),
        ).finish(),
      },
    })

    let encoded = {
      typeUrl: '/ethermint.evm.v1.MsgEthereumTx',
      value: MsgEthereumTx.encode(msgeth).finish(),
    } as EncodeObject

    const pubkey = encodePubkey(
      encodeSecp256k1Pubkey(this.cosmosAccount.pubKey),
    )

    const { sequence, account_number } = await this.getEthAccountInfo(
      this.ethAccount,
    )
    const gasLimit = Int53.fromString(fee.gas).toNumber()
    const authInfoBytes = makeAuthInfoBytes(
      [{ pubkey, sequence: sequence }],
      fee.amount,
      gasLimit,
    )
    const txBodyEncodeObject = TxBody.fromPartial({
      messages: [encoded],
      memo: '',
    })

    const doc = makeSignDoc(
      TxBody.encode(txBodyEncodeObject).finish(),
      authInfoBytes,
      this.cosmosChainId,
      account_number,
    )
    const { signature, signed } = await this.keplr.signDirect(
      this.cosmosChainId,
      this.cosmosAccount.bech32Address,
      doc,
    )

    const rsv = new ExtendedSecp256k1Signature(
      fromBase64(signature.signature).slice(0, 31),
      fromBase64(signature.signature).slice(32, 63),
      0,
    )

    let data = LegacyTx.fromPartial({
      value: msg,
      r: rsv.r(32),
      s: rsv.s(32),
      v: arrayify(rsv.recovery),
      ...opts,

      // nonce: 1,
    })
    data.r = rsv.r(32)
    data.s = rsv.s(32)
    data.v = arrayify(rsv.recovery)
    msgeth = MsgEthereumTx.fromPartial({
      data: {
        value: LegacyTx.encode(data).finish(),
      },
    })

    encoded = {
      typeUrl: '/ethermint.evm.v1.MsgEthereumTx',
      value: msgeth,
    }
    
    return this.keplr.sendTx(
      this.cosmosChainId,
      MsgEthereumTx.encode(msgeth).finish(),
      BroadcastMode.Sync,
    )
  }
  connectProvider(): Promise<this> {
    return super.connect(queryClient)
  }
}
