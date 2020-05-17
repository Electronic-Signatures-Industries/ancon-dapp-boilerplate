import { BzzBrowser } from "@erebos/bzz-browser";
import { StorageMiddleware, MiddlewareOptions } from '.';

const BZZ_URL = "https://swarm-gateways.net/";

const { BufferList } = require("bl");
const IPFS = require("ipfs-http-client");


export const initSwarm = async (opts: MiddlewareOptions) => {
  const bzz = new BzzBrowser({ url: BZZ_URL });

  async function setJsonData(key, content) {
    const uploadUrl = await bzz.uploadData(content, {
      encrypt: true,
      // pin: true
    });
    return uploadUrl;
  }
  async function getJsonData(key) {
    try {
      const tag = await bzz.getTag(key);
      const data = await bzz.downloadData(key);
      return data;
    } catch (e) {
    }
    return {};
  }

  async function setBinaryData(data: any, contentType) {
    const uploadUrl = await bzz.uploadFile(data, {
      encrypt: true,
      contentType
      // pin: true
    });
    return uploadUrl;
  }
  async function getBinaryData(key) {
    try {
      const data = await bzz.download(key);
      return data;
    } catch (e) {
    }
    return {};
  }
  async function getDownloadURL(hash, contentType) {
    try {
      const data = await bzz.getDownloadURL(hash, { contentType });
      return data;
    } catch (e) {
    }
    return {};
  }
  return { setJsonData, getJsonData, setBinaryData, getBinaryData, getDownloadURL };
};

// // value must be hex
// export const createIPNSRecord =
//   (opts: MiddlewareOptions) => async (value, sequenceNumber, lifetime) => {
//     try {
//       const entryData = await ipns.create(opts.ethereum.provider.getSigner().privateKey,
//         value,
//         sequenceNumber,
//         lifetime);

//       return entryData
//     }
//     catch (e) {
//       return null;
//     }
//   }


// // returns hex
// export const readIPNSRecord = async (entryData) => {
//   const buf = await ipns.marshal(entryData)
//   return hexlify(buf);
// }

// export const initSecureLinkableStorage = async (opts: MiddlewareOptions) => {

//   // initialize swarm
//   const swarm = await initSwarm(opts);
//   const ipfsContent = await initIPFS(opts);

//   // upload files and concat results
//   const uploadJsonFile = async (key, data) => {
//     const swarmFileRef = await swarm.setJsonData(key, data);

//     // send results to IPNS record
//     const ipfsEntry = await ipfsContent.setContent('', {
//       ref: swarmFileRef,
//     })
//     // store IPNS in local storage, later we'll use DNSLink
//     localStorage.setItem(key, ipfsEntry.path);

//     // create record 
//     const record = await createIPNSRecord(opts)(`/ipfs/${ipfsEntry.path}`, 0, 30 * 24 * 60 * 1000);

//   };


//   // upload files and concat results
//   const readJsonFile = async (key) => {
//     const buffer = await readIPNSRecord(key);
//     return arrayify(buffer).toString();
//   };

//   return { uploadJsonFile };
// }

export const initIPFS = async ({ ethereum, did }: MiddlewareOptions) => {
  const account = ethereum.account;
  const issuer = did.issuer;
  const ipfs = new IPFS({
    host: "ipfs.infura.io",
    port: "5001",
    protocol: "https"
  });

  const userModelKey = `db:user-model:${account}.json`;
  const idCardKey = `db:id-card-credential:${account}.json`;

  async function getContent(key) {
    try {
      const items = [];
      for await (const item of ipfs.get(key)) {
        const b = new BufferList();
        for await (const chunk of item.content) {
          b.append(chunk);
        }
        const content = b.toString();
        items.push(content);
      }
      return items[0].trim();
    } catch (e) {
      return {};
    }
  }
  async function setContent(key, model) {
    let res;
    for await (const file of ipfs.add(model)) {
      res = file;
    }
    return res;
  }
  async function setMutableContent(key, model) {
    await ipfs.files.write(`/${key}`, JSON.stringify(model));
  }
  async function getMutableContent(key) {
    const stats = await ipfs.files.stat(`/${key}`);
    const buf = await ipfs.files.read(`/${key}`);
    return JSON.parse(buf.toString() || {});
  }

  const getUserModel = async () => {
    const data = await getContent(localStorage.getItem(userModelKey));
    return JSON.parse(data);
  }

  const setUserModel = async model => {
    const res = await setContent(userModelKey, JSON.stringify(model));
    localStorage.setItem(userModelKey, res.cid);
  }
  const getIdCredential = async () => {
    const res = await getContent(localStorage.getItem(idCardKey));
    return res;
  }
  const setIdCredential = async model => {
    const res = await setContent(idCardKey, model);
    localStorage.setItem(idCardKey, res.cid)
  }

  return {
    ipfs,
    getContent,
    setContent,
    getIdCredential,
    setIdCredential,
    getUserModel,
    setUserModel
  };
};
