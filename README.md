# XDV
## XDV v3.0.0 for Ancon Protocol


## Intro
**XDV 3.0 for Ancon Protocol** is a blockchain ready protocol and API that allows users to sign verifiable documents for legal tech, electronic invoicing or used with DIDs, Verified Credentials and Universal Wallets.

## Features

- Create NFT Tokens
- Anchor Documents

### Binance Smart Chain Testnet Contract Address

- **anchoring**: 0xe0b39cCDa6550d4a2f7CFaBEa2bC8f60e3994172
- **NFT**: 0x07028Cb6c74eE7C8Bb193f8CFC6f4eBA1e121197

## Metadata creation code sample
### Ancon Client initialize
```ts
import { AnconClient } from 'anconjs'

//Create new ancon client
this.anconClient = new AnconClient(
    true,
    "ws://rpcancon.dao.pa:26657",
    "https://apiancon.dao.pa",
)
//Create new ancon wallet
this.anconAPI = await this.anconClient.create(
    'ancon_manager_acct',
    passphrase,
    passphrase,
)
//Getting the current address
this.account = this.anconClient.account[0].address

```
### Upload CIDs with Ancon
```ts
// Upload CIDs
import {
    AnconClient
} from 'anconjs'
// Upload CIDs

const file = this.files[index];
let result = await blobToKeccak256(file);
const msg = {
    path: file.name,
    time: file.lastModified.toString(),
    content: base64.encode(result.content),
    contentType: file.type,
    creator: this.ancon.account,
};
const {
    transaction,
    cid
}: any = await this.anconClient.addFile({
    did: this.ancon.did.id,
    file: msg,
    fee,
});


```
### Upload with IPFS
```ts
client = IPFSClient({ url: `https://ipfs.xdv.digital` });

const {
    cid
} = await client.add({
    path: file.name,
    content: base64.encode(result.content),
});
```


### Upload with Web3.storage
```ts
import { Web3Storage, getFilesFromPath } from 'web3.storage'

const token = process.env.API_TOKEN
const client = new Web3Storage({ token })

async function storeFiles () {
  const files = await getFilesFromPath('/path/to/file')
  const cid = await client.put(files)
  console.log(cid)
}

storeFiles()

```
        
### Create and store Ancon metadata
```ts
// Create and store Ancon metadata
const {
    transaction,
    cid
}: any =
    await this.anconClient.executeMetadata({
        name: "Simple signing",
        description: "Description",
        image: `https://gateway/${cid}/${file.name}`,
        sources: [cid],
        owner: this.account,
        creator: this.account,
        fee
    }, );
```

### Support

`info@ifesa.tech`
