var org_w3__2000__09_xmldsig__Module_Factory = function () {
  var org_w3__2000__09_xmldsig_ = {
    name: 'org_w3__2000__09_xmldsig_',
    defaultElementNamespaceURI: 'http:\/\/www.w3.org\/2000\/09\/xmldsig#',
    typeInfos: [{
        localName: 'TransformType',
        propertyInfos: [{
            name: 'content',
            collection: true,
            elementName: 'XPath',
            type: 'elementRef'
          }, {
            name: 'algorithm',
            required: true,
            attributeName: {
              localPart: 'Algorithm'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'KeyInfoType',
        propertyInfos: [{
            name: 'content',
            collection: true,
            elementTypeInfos: [{
                elementName: 'PGPData',
                typeInfo: '.PGPDataType'
              }, {
                elementName: 'X509Data',
                typeInfo: '.X509DataType'
              }, {
                elementName: 'KeyValue',
                typeInfo: '.KeyValueType'
              }, {
                elementName: 'RetrievalMethod',
                typeInfo: '.RetrievalMethodType'
              }, {
                elementName: 'MgmtData'
              }, {
                elementName: 'KeyName'
              }, {
                elementName: 'SPKIData',
                typeInfo: '.SPKIDataType'
              }],
            type: 'elementRefs'
          }, {
            name: 'id',
            typeInfo: 'ID',
            attributeName: {
              localPart: 'Id'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'X509DataType',
        propertyInfos: [{
            name: 'x509IssuerSerialOrX509SKIOrX509SubjectName',
            required: true,
            collection: true,
            mixed: false,
            elementTypeInfos: [{
                elementName: 'X509IssuerSerial',
                typeInfo: '.X509IssuerSerialType'
              }, {
                elementName: 'X509Certificate',
                typeInfo: 'Base64Binary'
              }, {
                elementName: 'X509CRL',
                typeInfo: 'Base64Binary'
              }, {
                elementName: 'X509SubjectName'
              }, {
                elementName: 'X509SKI',
                typeInfo: 'Base64Binary'
              }],
            type: 'elementRefs'
          }]
      }, {
        localName: 'SignaturePropertiesType',
        propertyInfos: [{
            name: 'signatureProperty',
            required: true,
            collection: true,
            elementName: 'SignatureProperty',
            typeInfo: '.SignaturePropertyType'
          }, {
            name: 'id',
            typeInfo: 'ID',
            attributeName: {
              localPart: 'Id'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'ReferenceType',
        propertyInfos: [{
            name: 'transforms',
            elementName: 'Transforms',
            typeInfo: '.TransformsType'
          }, {
            name: 'digestMethod',
            required: true,
            elementName: 'DigestMethod',
            typeInfo: '.DigestMethodType'
          }, {
            name: 'digestValue',
            required: true,
            elementName: 'DigestValue',
            typeInfo: 'Base64Binary'
          }, {
            name: 'id',
            typeInfo: 'ID',
            attributeName: {
              localPart: 'Id'
            },
            type: 'attribute'
          }, {
            name: 'uri',
            attributeName: {
              localPart: 'URI'
            },
            type: 'attribute'
          }, {
            name: 'type',
            attributeName: {
              localPart: 'Type'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'ObjectType',
        propertyInfos: [{
            name: 'content',
            collection: true,
            type: 'anyElement'
          }, {
            name: 'id',
            typeInfo: 'ID',
            attributeName: {
              localPart: 'Id'
            },
            type: 'attribute'
          }, {
            name: 'mimeType',
            attributeName: {
              localPart: 'MimeType'
            },
            type: 'attribute'
          }, {
            name: 'encoding',
            attributeName: {
              localPart: 'Encoding'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'SignatureType',
        propertyInfos: [{
            name: 'signedInfo',
            required: true,
            elementName: 'SignedInfo',
            typeInfo: '.SignedInfoType'
          }, {
            name: 'signatureValue',
            required: true,
            elementName: 'SignatureValue',
            typeInfo: '.SignatureValueType'
          }, {
            name: 'keyInfo',
            elementName: 'KeyInfo',
            typeInfo: '.KeyInfoType'
          }, {
            name: 'object',
            minOccurs: 0,
            collection: true,
            elementName: 'Object',
            typeInfo: '.ObjectType'
          }, {
            name: 'id',
            typeInfo: 'ID',
            attributeName: {
              localPart: 'Id'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'X509IssuerSerialType',
        propertyInfos: [{
            name: 'x509IssuerName',
            required: true,
            elementName: 'X509IssuerName'
          }, {
            name: 'x509SerialNumber',
            required: true,
            elementName: 'X509SerialNumber',
            typeInfo: 'Integer'
          }]
      }, {
        localName: 'SignatureValueType',
        propertyInfos: [{
            name: 'value',
            typeInfo: 'Base64Binary',
            type: 'value'
          }, {
            name: 'id',
            typeInfo: 'ID',
            attributeName: {
              localPart: 'Id'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'RSAKeyValueType',
        propertyInfos: [{
            name: 'modulus',
            required: true,
            elementName: 'Modulus',
            typeInfo: 'Base64Binary'
          }, {
            name: 'exponent',
            required: true,
            elementName: 'Exponent',
            typeInfo: 'Base64Binary'
          }]
      }, {
        localName: 'PGPDataType',
        propertyInfos: [{
            name: 'content',
            required: true,
            collection: true,
            mixed: false,
            elementTypeInfos: [{
                elementName: 'PGPKeyID',
                typeInfo: 'Base64Binary'
              }, {
                elementName: 'PGPKeyPacket',
                typeInfo: 'Base64Binary'
              }],
            type: 'elementRefs'
          }]
      }, {
        localName: 'SignedInfoType',
        propertyInfos: [{
            name: 'canonicalizationMethod',
            required: true,
            elementName: 'CanonicalizationMethod',
            typeInfo: '.CanonicalizationMethodType'
          }, {
            name: 'signatureMethod',
            required: true,
            elementName: 'SignatureMethod',
            typeInfo: '.SignatureMethodType'
          }, {
            name: 'reference',
            required: true,
            collection: true,
            elementName: 'Reference',
            typeInfo: '.ReferenceType'
          }, {
            name: 'id',
            typeInfo: 'ID',
            attributeName: {
              localPart: 'Id'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'SPKIDataType',
        propertyInfos: [{
            name: 'spkiSexpAndAny',
            required: true,
            collection: true,
            mixed: false,
            elementName: 'SPKISexp',
            typeInfo: 'Base64Binary',
            type: 'elementRef'
          }]
      }, {
        localName: 'SignatureMethodType',
        propertyInfos: [{
            name: 'content',
            collection: true,
            allowDom: false,
            elementName: 'HMACOutputLength',
            typeInfo: 'Integer',
            type: 'elementRef'
          }, {
            name: 'algorithm',
            required: true,
            attributeName: {
              localPart: 'Algorithm'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'SignaturePropertyType',
        propertyInfos: [{
            name: 'content',
            collection: true,
            type: 'anyElement'
          }, {
            name: 'target',
            required: true,
            attributeName: {
              localPart: 'Target'
            },
            type: 'attribute'
          }, {
            name: 'id',
            typeInfo: 'ID',
            attributeName: {
              localPart: 'Id'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'CanonicalizationMethodType',
        propertyInfos: [{
            name: 'content',
            collection: true,
            allowDom: false,
            type: 'anyElement'
          }, {
            name: 'algorithm',
            required: true,
            attributeName: {
              localPart: 'Algorithm'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'DigestMethodType',
        propertyInfos: [{
            name: 'content',
            collection: true,
            type: 'anyElement'
          }, {
            name: 'algorithm',
            required: true,
            attributeName: {
              localPart: 'Algorithm'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'KeyValueType',
        propertyInfos: [{
            name: 'content',
            collection: true,
            elementTypeInfos: [{
                elementName: 'DSAKeyValue',
                typeInfo: '.DSAKeyValueType'
              }, {
                elementName: 'RSAKeyValue',
                typeInfo: '.RSAKeyValueType'
              }],
            type: 'elementRefs'
          }]
      }, {
        localName: 'ManifestType',
        propertyInfos: [{
            name: 'reference',
            required: true,
            collection: true,
            elementName: 'Reference',
            typeInfo: '.ReferenceType'
          }, {
            name: 'id',
            typeInfo: 'ID',
            attributeName: {
              localPart: 'Id'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'RetrievalMethodType',
        propertyInfos: [{
            name: 'transforms',
            elementName: 'Transforms',
            typeInfo: '.TransformsType'
          }, {
            name: 'uri',
            attributeName: {
              localPart: 'URI'
            },
            type: 'attribute'
          }, {
            name: 'type',
            attributeName: {
              localPart: 'Type'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'TransformsType',
        propertyInfos: [{
            name: 'transform',
            required: true,
            collection: true,
            elementName: 'Transform',
            typeInfo: '.TransformType'
          }]
      }, {
        localName: 'DSAKeyValueType',
        propertyInfos: [{
            name: 'p',
            required: true,
            elementName: 'P',
            typeInfo: 'Base64Binary'
          }, {
            name: 'q',
            required: true,
            elementName: 'Q',
            typeInfo: 'Base64Binary'
          }, {
            name: 'g',
            elementName: 'G',
            typeInfo: 'Base64Binary'
          }, {
            name: 'y',
            required: true,
            elementName: 'Y',
            typeInfo: 'Base64Binary'
          }, {
            name: 'j',
            elementName: 'J',
            typeInfo: 'Base64Binary'
          }, {
            name: 'seed',
            required: true,
            elementName: 'Seed',
            typeInfo: 'Base64Binary'
          }, {
            name: 'pgenCounter',
            required: true,
            elementName: 'PgenCounter',
            typeInfo: 'Base64Binary'
          }]
      }],
    elementInfos: [{
        typeInfo: 'Base64Binary',
        elementName: 'SPKISexp',
        scope: '.SPKIDataType'
      }, {
        typeInfo: '.KeyValueType',
        elementName: 'KeyValue'
      }, {
        elementName: 'XPath',
        scope: '.TransformType'
      }, {
        typeInfo: '.PGPDataType',
        elementName: 'PGPData'
      }, {
        typeInfo: '.SignatureType',
        elementName: 'Signature'
      }, {
        typeInfo: '.DigestMethodType',
        elementName: 'DigestMethod'
      }, {
        typeInfo: '.X509IssuerSerialType',
        elementName: 'X509IssuerSerial',
        scope: '.X509DataType'
      }, {
        typeInfo: '.RetrievalMethodType',
        elementName: 'RetrievalMethod'
      }, {
        typeInfo: '.SignaturePropertiesType',
        elementName: 'SignatureProperties'
      }, {
        elementName: 'X509SubjectName',
        scope: '.X509DataType'
      }, {
        typeInfo: '.SPKIDataType',
        elementName: 'SPKIData'
      }, {
        typeInfo: '.DSAKeyValueType',
        elementName: 'DSAKeyValue'
      }, {
        typeInfo: '.SignatureValueType',
        elementName: 'SignatureValue'
      }, {
        elementName: 'MgmtData'
      }, {
        elementName: 'KeyName'
      }, {
        typeInfo: 'Base64Binary',
        elementName: 'X509SKI',
        scope: '.X509DataType'
      }, {
        typeInfo: '.RSAKeyValueType',
        elementName: 'RSAKeyValue'
      }, {
        typeInfo: 'Base64Binary',
        elementName: 'X509Certificate',
        scope: '.X509DataType'
      }, {
        typeInfo: '.SignatureMethodType',
        elementName: 'SignatureMethod'
      }, {
        typeInfo: 'Base64Binary',
        elementName: 'PGPKeyPacket',
        scope: '.PGPDataType'
      }, {
        typeInfo: '.TransformType',
        elementName: 'Transform'
      }, {
        typeInfo: '.KeyInfoType',
        elementName: 'KeyInfo'
      }, {
        typeInfo: 'Base64Binary',
        elementName: 'DigestValue'
      }, {
        typeInfo: '.X509DataType',
        elementName: 'X509Data'
      }, {
        typeInfo: 'Base64Binary',
        elementName: 'X509CRL',
        scope: '.X509DataType'
      }, {
        typeInfo: '.ManifestType',
        elementName: 'Manifest'
      }, {
        typeInfo: '.CanonicalizationMethodType',
        elementName: 'CanonicalizationMethod'
      }, {
        typeInfo: '.SignaturePropertyType',
        elementName: 'SignatureProperty'
      }, {
        typeInfo: '.TransformsType',
        elementName: 'Transforms'
      }, {
        typeInfo: 'Integer',
        elementName: 'HMACOutputLength',
        scope: '.SignatureMethodType'
      }, {
        typeInfo: 'Base64Binary',
        elementName: 'PGPKeyID',
        scope: '.PGPDataType'
      }, {
        typeInfo: '.SignedInfoType',
        elementName: 'SignedInfo'
      }, {
        typeInfo: '.ObjectType',
        elementName: 'Object'
      }, {
        typeInfo: '.ReferenceType',
        elementName: 'Reference'
      }]
  };
  return {
    org_w3__2000__09_xmldsig_: org_w3__2000__09_xmldsig_
  };
};
if (typeof define === 'function' && define.amd) {
  define([], org_w3__2000__09_xmldsig__Module_Factory);
}
else {
  var org_w3__2000__09_xmldsig__Module = org_w3__2000__09_xmldsig__Module_Factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports.org_w3__2000__09_xmldsig_ = org_w3__2000__09_xmldsig__Module.org_w3__2000__09_xmldsig_;
  }
  else {
    var org_w3__2000__09_xmldsig_ = org_w3__2000__09_xmldsig__Module.org_w3__2000__09_xmldsig_;
  }
}