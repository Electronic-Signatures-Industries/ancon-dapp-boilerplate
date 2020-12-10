<template>
  <v-container>
    <v-progress-linear
      indeterminate
      v-if="loading"
      color="indigo"
    ></v-progress-linear>
    <v-alert :type="alertType" v-if="alertMessage">{{ alertMessage }}</v-alert>
    <v-card>
      <v-card-title>
        <span class="headline">Signed document viewer</span>
      </v-card-title>

      <v-card-text>
        <v-form autocomplete="off">
          <v-row>
            <v-col cols="10" xs="10">
              <v-list two-line flat>
                <v-list-item-group>
                  <template v-for="(item, index) in verificationReport">
                    <v-list-item :key="index">
                      <v-list-item-content>
                        <v-list-item-title
                          v-if="item.isError"
                          v-text="item.title"
                          class="red--text font-weight-medium"
                        ></v-list-item-title>

                        <v-list-item-title
                          v-if="!item.isError"
                          v-text="item.title"
                          class="green--text font-weight-medium"
                        ></v-list-item-title>
                        <v-list-item-subtitle
                          class="text--primary"
                          v-text="item.headline"
                        ></v-list-item-subtitle>
                        <v-list-item-subtitle
                          v-text="item.subtitle"
                        ></v-list-item-subtitle>
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-list-item-action-text
                          v-text="item.action"
                        ></v-list-item-action-text>
                      </v-list-item-action>
                    </v-list-item>
                  </template>
                </v-list-item-group>
              </v-list>
            </v-col>
            <v-col cols="2" rows="2">
              <v-row>
                <v-col>
                  <v-tooltip top>
                    <span>Download file</span>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        fab
                        dark
                        v-on="on"
                        @click="download"
                        small
                        color="indigo accent-4"
                      >
                        <v-icon>mdi-file-download</v-icon>
                      </v-btn>
                    </template></v-tooltip
                  >
                </v-col>
              </v-row>
              <!-- <v-row>
                <v-col>
                  <v-tooltip top>
                    <span>Verify document signatures</span>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        fab
                        dark
                        v-on="on"
                        @click="verify"
                        small
                        color="indigo accent-4"
                      >
                        <v-icon>mdi-file-certificate</v-icon>
                      </v-btn>
                    </template></v-tooltip
                  >
                </v-col>
              </v-row> -->
            </v-col>
          </v-row>

          <v-row>
            <v-col md="12" cols="12">
              <v-alert text color="blue" v-if="loading">
                <v-progress-circular
                  indeterminate
                  v-if="loading"
                  color="blue darken-1"
                ></v-progress-circular>
                {{ operationType }} ...
              </v-alert>
              <v-alert text :color="alertType" v-if="alertMessage">
                {{ alertMessage }}
              </v-alert>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script lang="ts">
import {
  TypedRFE,
  Totales,
  DGen,
  Emisor,
  Receptor,
  DIDDocumentBuilder,
  X509Info,
  Wallet,
  LDCryptoTypes,
  KeyConvert,
  DIDNodeSchema,
  DIDDocument,
  DocumentNodeSchema,
  JOSEService,
  JWTService,
  PublicKey,
} from "xdvplatform-wallet/src";
import { SwarmFeed } from "xdvplatform-wallet/src/swarm/feed";
import { Component, Prop, Vue } from "vue-property-decorator";
import { KeystoreIndex } from "../shared/KeystoreIndex";
import moment from "moment";
import { createKeyPair, sign } from "@erebos/secp256k1";
import { ethers } from "ethers";
import { JWE, JWK } from "node-jose";
import { arrayify, BigNumber, base64, Interface } from "ethers/utils";
import { SwarmNodeSignedContent } from "../shared/SwarmNodeSignedContent";
import { forkJoin, from, Subject } from "rxjs";
import { Session } from "../shared/Session";
import { MessagingTimelineDuplexClient } from "../shared/MessagingTimelineDuplexClient";
import copy from "copy-to-clipboard";
import { PartialChapter } from "@erebos/timeline";
const bs58 = require("bs58");
import { SubscriptionManager } from "../shared/SubscriptionManager";
import { DriveSwarmManager } from "../shared/DriveSwarmManager";
import Unlock from "./Unlock.vue";
import { SigningOutput } from "../shared/SigningOutput";
import { create } from "xmlbuilder2";
import { ShareUtils, XDVFileFormat } from "../shared/ShareUtils";
import { ec, eddsa } from "elliptic";
import forge from "node-forge";
import {ACME_X3_CROSS_SIGNED} from './lets-encrypt-x3-cross-signeed.pem';
import { CAGOB } from "./cagob.pem";
import { CARAIZ } from "./caraiz.pem";
import { CAPC2 } from "./capc2.pem";
import { ACME_R3_CROSS_SIGNED } from "./lets-encrypt-r3-cross-signed.pem";
const cbor = require("cbor-sync");

export interface ShareableSignedContent {
  sig: string;
  did: string;
}

@Component({})
export default class ViewerComponent extends Vue {
  loading = false;
  fromOwner = "";
  document: SwarmNodeSignedContent = null;
  sharedSignedDocument: XDVFileFormat = null;
  apiurl = `${(Vue as any).appconfig.CLIENT_API}xdv_verify`;
  validated: any = null;
  contentValidated: any;
  alertMessage: string = "";
  alertType: string = " ";
  linkJwt: string = "";
  verificationReport: any = null;
  downloadableContent: () => Promise<void>;
  operationType: string;
  payload: any;

  async mounted() {
    const currentLocation = location;
    this.linkJwt = location.hash.split("link=")[1];

    await this.loadLinkContents();
    await this.verify();
  }

  async download() {
    await this.downloadableContent();
  }

  /**
   * Opens as XDV compatible format and downloads document
   */
  async loadLinkContents() {
    this.alertMessage = "";
    this.alertType = "";
    this.loading = true;
    try {
      this.operationType = "Downloading...";
      const payload = await ShareUtils.openEphemeralLinkIndex(
        decodeURIComponent(this.linkJwt)
      );
      this.payload = payload;
      let documentSignature = payload.sig;
      let swarmContentIndex = payload.did.id.split(":");
      let swarmContent = {
        from: swarmContentIndex[2],
        txs: swarmContentIndex[3],
        hash: swarmContentIndex[4],
      };

      this.fromOwner = swarmContent.from;
      const res = await ShareUtils.openEphemeralLink(
        swarmContent.from,
        swarmContent.txs,
        null,
        swarmContent.hash
      );

      this.document = res.document;
      this.downloadableContent = res.downloadFile;
      this.sharedSignedDocument = {
        signature: this.document.documentSignature,
        pubCert: this.document.documentPubCert,
        content: this.document.content,
      };
    } catch (e) {
      console.log(e);
      this.alertType = "red";
      this.alertMessage = e.message;
    } finally {
      this.loading = false;
    }
  }

  async verify() {
    // verify content
    this.verificationReport = [];

    switch (this.document.signaturePreset) {
      case SigningOutput.Base64:
        this.loading = true;
        this.operationType = "Verifying...";
        try {
          const payload = {
            signature: this.sharedSignedDocument.signature,
            from: this.fromOwner,
            contents: ethers.utils
              .sha256(
                ethers.utils.base64.decode(this.sharedSignedDocument.content)
              )
              .replace("0x", ""),
            token: "12345",
            filename: this.document.name,
            certificate: this.sharedSignedDocument.pubCert,
          };
          const cert = this.sharedSignedDocument.pubCert;
          const caStore = forge.pki.createCaStore([CAGOB, CARAIZ, CAPC2, ACME_X3_CROSS_SIGNED, ACME_R3_CROSS_SIGNED]);
          const data = ethers.utils.sha256(
            ethers.utils.base64.decode(this.sharedSignedDocument.content)
          );

          const sig = ethers.utils.base64.decode(
            this.sharedSignedDocument.signature
              .replace("-----END PKCS7-----", "")
              .replace("-----BEGIN PKCS7-----", "")
          );
          // RSA signature generation
          const r = require("jsrsasign");
          const rsa = new r.Signature({ alg: "SHA256withRSA" });
          const pub = caStore.listAllCertificates()[3];
          rsa.init(cert);
          rsa.updateHex(data.replace("0x", ""));
          const isValid = rsa.verify(Buffer.from(sig).toString("hex"));

          const certificate = forge.pki.certificateFromPem(cert);
          forge.pki.verifyCertificateChain(
            caStore,
            [certificate],
            (vfd, depth, chain) => {
              const subjectCert = chain[0];
              if (isValid && subjectCert) {
                this.verificationReport.push({
                  title: `Verified document`,
                  subtitle: `Signed by ${subjectCert.subject.attributes[3].value}`,
                });
                this.verificationReport.push({
                  title: `Name`,
                  subtitle: `C=${subjectCert.subject.attributes[0].value}, O=${subjectCert.subject.attributes[1].value},
                  OU=${subjectCert.subject.attributes[2].value}, CN=${subjectCert.subject.attributes[3].value}`,
                });
              } else {
                this.verificationReport.push({
                  title: `Verified document`,
                  subtitle: `Signed by ${subjectCert.subject.attributes[0].value}`,
                });
                this.verificationReport.push({
                  title: `Name`,
                  subtitle: `CN=${subjectCert.subject.attributes[0].value}`,
                });
              }
              const vsubject = subjectCert.verifySubjectKeyIdentifier();
              if (vsubject) {
                const subjectKeyId = forge.pki.getPublicKeyFingerprint(
                  subjectCert.publicKey,
                  {
                    type: "SubjectPublicKeyInfo",
                    encoding: "hex",
                    delimiter: ":",
                  }
                );
                this.verificationReport.push({
                  title: `Verified subject key identifier`,
                  subtitle: `${subjectKeyId}`,
                });
              } else {
                this.verificationReport.push({
                  isError: true,
                  title: `Invalid subject key identifier`,
                });
              }
              if (vfd) {
                this.verificationReport.push({
                  title: `Verified certificate chain issued by`,
                  subtitle: `C=${subjectCert.issuer.attributes[0].value}, O=${subjectCert.issuer.attributes[1].value},
                   CN=${subjectCert.issuer.attributes[2].value}`,
                });
              } else {
                this.verificationReport.push({
                  isError: true,
                  title: `Invalid certificate chain`,
                });
              }
              this.contentValidated = this.sharedSignedDocument;
              return true;
            }
          );
        } catch (e) {
          console.log(e);
        }
        break;
      case SigningOutput.PKCS7PEM:
        this.loading = true;
        this.operationType = "Verifying...";
        try {
          const payload = {
            signature: this.sharedSignedDocument.signature,
            from: this.fromOwner,
            contents: this.sharedSignedDocument.content,
            token: "12345",
            filename: this.document.name,
            certificate: btoa(this.sharedSignedDocument.pubCert),
          };
          const res = await fetch(this.apiurl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          this.validated = null;

          const text = await res.text();
          this.validated = create(text).end({
            format: "object",
          });
          this.addVerificationReport(this.validated);
          this.contentValidated = this.sharedSignedDocument;
        } catch (e) {
          console.log(e);
        }
        break;
      case SigningOutput.XMLDSIG:
        this.loading = true;

        try {
          const payload = {
            signature: this.sharedSignedDocument.signature,
            from: this.fromOwner,
            token: "12345",
            certificate: btoa(this.sharedSignedDocument.pubCert),
            filename: "fe.xml",
          };
          const res = await fetch(this.apiurl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          this.validated = null;
          const text = await res.text();
          this.validated = create(text).end({
            format: "object",
          });
          this.addVerificationReport(this.validated);
          this.contentValidated = this.sharedSignedDocument;
        } catch (e) {
          alert(e.message);
        }
        break;
    }

    const eddsaImpl = new eddsa("ed25519");
    const pubKey = bs58.decode(this.payload.did.publicKey[0].publicKeyBase58);
    const pubString = Buffer.from(pubKey).toString("hex");
    const kp = eddsaImpl.keyFromPublic(pubString);
    const results = kp.verify(
      Buffer.from(atob(this.document.content)),
      this.payload.sig
    );
    const isVerified = results;
    this.verificationReport.push({
      title: `Valid content signed by ${this.fromOwner}`,
      subtitle: `Ed25519 public keys from ${this.payload.did.id}`,
      headline: `Signature ${this.payload.sig}`,
    });
    this.loading = false;
  }

  addVerificationReport({ SimpleReport }) {
    this.verificationReport = [
      {
        subtitle: `Signature Id ${SimpleReport.Signature["@Id"]}`,
        headline: `Signed by ${SimpleReport.Signature.CertificateChain.Certificate.qualifiedName} - Signed by ${SimpleReport.Signature.CertificateChain.Certificate.id}`,
      },
    ];
    this.verificationReport = [
      ...SimpleReport.Signature.Errors.map((e) => {
        return {
          isError: true,
          //subtitle: `Signature Id ${SimpleReport.Signature['@Id']}`,
          //headline: `Signed by ${SimpleReport.Signature.CertificateChain.Certificate.qualifiedName} - Signed by ${SimpleReport.Signature.CertificateChain.Certificate.id}`,
          title: e,
        };
      }),
      ...this.verificationReport,
    ];
  }
}
</script>
