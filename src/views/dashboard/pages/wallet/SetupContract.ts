import { DIDManager } from "./DIDManager";

    // @ts-ignore
    const mainContracts = require('./abi/main');
    const minterAbi = require('./abi/NFTDocumentMinter');
    export const bindContracts = async (web3: any, address: string, didManager: DIDManager) =>  {
        const provider = new ethers.providers.Web3Provider(web3);
        this.did = await didManager.create3ID(address);
    
        this.driveManager = new DriveManager(this.ipfs,this.did);

        localStorage.setItem("did:" + this.currentAccount, this.did.id);
    // wallet.connect()
    const NFTFactory = new ethers.Contract(
      mainContracts.NFTFactory.address.bsctestnet,
      mainContracts.NFTFactory.raw.abi,
      provider.getSigner()
    );
    const DocumentAnchoring = new ethers.Contract(
      mainContracts.DocumentAnchoring.address.bsctestnet,
      mainContracts.DocumentAnchoring.raw.abi,
      provider.getSigner()
    );
    const DAI = new ethers.Contract(
      mainContracts.TestDAI.address.bsctestnet,
      mainContracts.TestDAI.raw.abi,
      provider.getSigner()
    );
    const getNFTDocumentMinter = (address) => new ethers.Contract(
      address,
      minterAbi,
      provider.getSigner()
    );
    return {
        NFTFactory,
        DocumentAnchoring,
        DAI,
        getNFTDocumentMinter

    }


  }
    
