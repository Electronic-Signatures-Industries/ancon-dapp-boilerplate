# XDV
## XDV v1.0.0


## Introduccion
**XDV** es una solucion que permite firmar documentos con firmas calificadas y firmas de blockchain o identidad descentralizada.  

## Funcionalidades

- Firma y verifica documentos con Firma Calificada (smartcards ISO-7816) y compatible con PS/SC smartcards y PKCS#11
- Firma y verifica documentos con Firma blockchain
- Permite enlazar mas de una Firma calificada a una cartera
- Permite compartir documentos firmados por enlace web
- Bitacora de trazabilidad
- Almacenamiento seguro en la red descentralizada IPFS/IPLD
- Cartera digital encriptada en reposo
- Aplicaciones web y desktop, compatible con Chrome, Firefox, Linux, Windows y Mac
- Blockchain anchoring en Binance Smart Chain

## Aplicacion web

- https://firmas.auth2factor.com


## Firmador PKCS#11

- https://github.com/xdvplatform/com.xdv.client.wallet

## Trazabilidad

Cada vez que se sube documentos o contenido a Swarm, se crea un arbol de transacciones.

1 - Se obtiene el hash SHA-256 del documento y se solicita firmado
2 - La metadata y contenido incluyendo la firma se convierte a CBOR y es almacenada
3 - La referencia del contenido es agregada al arbol de transacciones con manifiesto (address, 'tx-document-tree')
4 - El modelo de datos almacenado es

```javascript
{
    block: current + 1,
    rootHash: current === 1 ? parentHash : rootHash,
    parentHash,
    xdv: 'prod',
    version: '1.0.0',
    documentSignatures,
    txs: underlyingHash,
    metadata: contents.map(i => i.reference),
    timestamp: moment().unix()
};
```

Esto permite obtener todas las interacciones de la direccion relacionada a una cartera en la red descentralizada Swarm, donde txs representa la referencia al contenido CBOR previamente almacenado. Esto adicionalmente permite busquedas por referencias o firmas.

5 - La referencia a `tx-document-tree` es retornada al cliente y se despliega el valor de `metadata` en la pantalla.


Conceptualmente, el modelo es similar a un DAG.

```
CBOR                 CBOR, CBOR, CBOR                                CBOR
 |                           |                                           |
 1                           2                                           3
 |                           |                                           |
 block 1, txs 0xce1         block 2, txs 0xaf2, parentHash 0xce1        block 2, txs 0x78c, parentHash 0xaf2, rootHash 0xce1      
```

## Protocolo Blockchain

### Binance Smart Chain Mainnet Contract Address

- 0xee99adeb56b01b005ec24884f3f6e770e7e6f926

### Precio por documento enlazado 

- 1 DAI = 1 USD
- Costos de gas en BNB por separado


### Almacenamiento en IPLD

Instanciar `IPFSManager` y `DIDManager`, estos dos usados para iniciar `DriveManager`.

Para crear un batch de documentos con firma simple, llamar `createDocumentSet`, que acepta un array de File objects.

```typescript
      this.ipfs = new IPFSManager();
      await this.ipfs.start();
      this.driveManager = new DriveManager(this.ipfs, this.did);
      this.indexes = await this.driveManager.createDocumentSet(this.files);
```

### Blockchain anchoring

Cada anchoring transaccion tiene el costo  de  1 DAI.

```typescript
      const document = await this.contract.methods.addDocument(this.did.id, this.indexes, 'dummy description')
        .send({ from: this.currentAddress, gasPrice: '22000000000', gas: 400000 });

```

### Lectura de contrato 

Para obtener los hashes de IPLD almacenados, llamar el evento `DocumentAnchored`

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

### Firmado PKCS#11

```typescript

    await this.sc.initialize();
    this.sc.subscribe
      .pipe(filter((i) => i && i.type === "signing"))
      .subscribe((result) => {
        // store ref
        this.shareFormat = {
          ...this.shareFormat,
          pubCert: result.publicKey,
          signature: result.signature,
        };
        this.value.output = SigningOutput.Base64;
        result = result.signature;
        this.hasSignature = true;
        this.shareSignature(result);
      });



    this.shareFormat = {
        content: base64.encode(Buffer.from(data)),
    };
    this.unlockPin = false;
    await this.sc.sign(
        currentKeystore.linkedExternalKeystores.pkcs11.tokenIndex,
        this.pin,
        Buffer.from(data)
    );

```

### Firmado PKCS#12

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

### Soporte

`info@ifesa.tech`