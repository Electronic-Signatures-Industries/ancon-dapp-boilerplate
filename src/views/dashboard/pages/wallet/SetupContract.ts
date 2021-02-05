import { ethers } from 'ethers'
import { DIDManager } from './DIDManager'
import { DriveManager } from './DriveManager'
import { IPFSManager } from './IPFSManager'

// @ts-ignore
const mainContracts = require('./abi/main')
const minterAbi = require('./abi/NFTDocumentMinter')

export const bindContracts = async (
  web3: any,
  address: string,
  didManager: DIDManager,
  ipfs: IPFSManager,
) => {
  const provider = new ethers.providers.Web3Provider(web3)
  const did = await didManager.create3ID(address)
  const driveManager = new DriveManager(ipfs, did)

  localStorage.setItem('did:' + address, did.id)
  const NFTManager = new ethers.Contract(
    mainContracts.NFTManager.address.bsctestnet,
    mainContracts.NFTManager.raw.abi,
    provider.getSigner(),
  );
  const NFTDocumentMinter = new ethers.Contract(
    mainContracts.NFTDocumentMinter.address.bsctestnet,
    mainContracts.NFTDocumentMinter.raw.abi,
    provider.getSigner(),
  );  
  const DocumentAnchoring = new ethers.Contract(
    mainContracts.DocumentAnchoring.address.bsctestnet,
    mainContracts.DocumentAnchoring.raw.abi,
    provider.getSigner(),
  );
  const DAI = new ethers.Contract(
    mainContracts.DAI.address.bsctestnet,
    mainContracts.DAI.raw.abi,
    provider.getSigner(),
  );

  return {
    driveManager,
    did,
    contracts: {
      NFTManager,
      DocumentAnchoring,
      DAI,
      NFTDocumentMinter,
    },
  }
}
