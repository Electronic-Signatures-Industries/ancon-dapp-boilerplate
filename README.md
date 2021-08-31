# XDV
## XDV v3.0.0 for Ancon Protocol


## Intro
**XDV 3.0 for Ancon Protocol** is a blockchain ready protocol and API that allows users to sign verifiable documents for legal tech, electronic invoicing or used with DIDs, Verified Credentials and Universal Wallets.

## Features

- Create NFT Tokens
- Anchor Documents

## Blockchain

### Binance Smart Chain Mainnet Contract Address

- **anchoring**: 0xee99adeb56b01b005ec24884f3f6e770e7e6f926

### Fee

- 1 DAI = 1 USD


### Blockchain anchoring


```typescript
      const document = await this.contract.methods.addDocument(this.did.id, this.indexes, 'dummy description')
        .send({ from: this.currentAddress, gasPrice: '22000000000', gas: 400000 });

```

### Read anchored documents

```typescript

  async fetchDocuments() {
    if(this.currentAddress.length > 0){
      const filter = this.contract.getPastEvents('DocumentAnchored',{ 
          toBlock: 'latest',
          fromBlock: 0,
          filter: { user: this.currentAddress } },
      );
      
      const response = await filter;
      console.log('response',response);
      this.ipfs = new IPFSManager();
      await this.ipfs.start();  
      const items = response.map((item) => this.ipfs.getObject(item.returnValues[2]));
      const forkedItems = forkJoin(items).pipe(debounce(x => x as any)).toPromise();
      
      this.items = (await forkedItems);
      this.items = this.items.map((folder, i) => ({folder: folder.value.documents, id: i}));
      console.log(this.items);
    }
  }
```

### PKCS#11

```typescript

    
    // TODO

```

### PKCS#12

```typescript
    try {
      // @ts-ignore
      let data = await this.value.files.arrayBuffer();

// Get key using get import key
        const rsaKeys: any = await this.wallet.getImportKey(
          `key:P12:${this.wallet.id}`
        );
        const keys = JSON.parse(rsaKeys.key);
     
     // Sign
        result = CMSSigner.sign(
          keys.certificate,
          keys.pvk,
          Buffer.from(data)
        );

        // store ref
        this.shareFormat = {
          content: base64.encode(Buffer.from(data)),
          pubCert: keys.certificate,
          signature: result,
        };
        this.value.output = SigningOutput.Base64;
 
      this.hasSignature = true;
      this.shareSignature(result);
    } catch (e) {
      console.log(e);
    }
```

### Support

`info@ifesa.tech`
