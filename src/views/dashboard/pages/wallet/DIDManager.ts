
import { Ed25519Provider } from "key-did-provider-ed25519";
import KeyResolver from "@ceramicnetwork/key-did-resolver";
import { DID } from "dids";
import { arrayify, mnemonicToSeed } from "ethers/lib/utils";

export class DIDManager {
  /**
   * Create 3ID
   * using XDV
   * @param wallet
   * @param messageNotify
   */
  async create3ID(wallet) {
    let seed = arrayify(mnemonicToSeed(wallet.mnemonic));
    seed = seed.slice(0, 32);
    const provider = new Ed25519Provider(seed);
    const did = new DID({ provider, resolver: KeyResolver.getResolver() });
    await did.authenticate();
    return did;
  }
}
