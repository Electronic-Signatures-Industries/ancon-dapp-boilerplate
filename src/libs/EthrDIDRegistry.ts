import { SolidoContract } from "@decent-bet/solido";
import { EthersPlugin } from "solido-provider-ethers";
import { ethers, providers } from "ethers";
import { arrayify, keccak256, hexlify } from "ethers/utils";

export type EthrRegistryMethodName = {
  ChangeOwner: "changeOwner";
  AddDelegate: "addDelegate";
  RevokeDelegate: "revokeDelegate";
  SetAttribute: "setAttribute";
  RevokeAttribute: "revokeAttribute";
};

export class EthrDIDRegistry {
  signer: ethers.Signer;
  constructor(private didRegistryContract: SolidoContract & EthersPlugin) {
    this.signer = (didRegistryContract as any).instance.provider.getSigner();
  }
  stripHexPrefix(str) {
    if (str.startsWith("0x")) {
      return str.slice(2);
    }
    return str;
  }

  leftPad(data, size = 64) {
    if (data.length === size) return data;
    return "0".repeat(size - data.length) + data;
  }

  // byte(0x19), byte(0), address of registry, nonce[currentOwner], identity, "changeOwner", newOwner
  // byte(0x19), byte(0), address of registry, nonce[currentOwner], identity, "addDelegate", delegateType, delegate, validity
  // byte(0x19), byte(0), address of registry, nonce[currentOwner], identity, "revokeDelegate", delegateType, delegate
  // byte(0x19), byte(0), address of registry, nonce[currentOwner], identity, "setAttribute", name, value, validity
  // byte(0x19), byte(0), address of registry, nonce[currentOwner], identity, "revokeAttribute", name, value

  async signDataForEthrRegistry(
    identity,
    signer,
    methodName: string,
    data: string[]
  ) {
    const nonce = await this.didRegistryContract.methods.nonce(signer);
    const paddedNonce = this.leftPad(Buffer.from([nonce], 64).toString("hex"));
    const dataToSign =
      "1900" +
      this.stripHexPrefix(this.didRegistryContract.address) +
      paddedNonce +
      this.stripHexPrefix(identity) +
      hexlify(methodName) +
      data.join();
    const hash = await this.signer.signMessage(arrayify(keccak256(dataToSign)));
    const signature = await this.signer.signMessage(hash);
    const { r, s, v } = ethers.utils.splitSignature(signature);
    return { r, s, v };
  }
}
