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
- Almacenamiento seguro en la red descentralizada Swarm
- Cartera digital encriptada en reposo
- Aplicaciones web y desktop, compatible con Chrome, Firefox, Linux, Windows y Mac

## Aplicacion web

- https://xdv.auth2factor.com


## Agente para Smart Card

Valido hasta 1 de Agosto de 2020

- https://xdv.auth2factor.com/xdv-agent.zip

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


### Soporte

`info@auth2factor.com`