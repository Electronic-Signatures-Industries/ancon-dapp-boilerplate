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
            <v-col cols="10" md="10">
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

                    <v-divider
                      v-if="index + 1 < verificationReport.length"
                      :key="index"
                    ></v-divider>
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
              <v-row>
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
              </v-row>
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
  IpldClient,
  DIDDocumentBuilder,
  DIDMethodXDV,
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
} from 'xdvplatform-wallet';
import { SwarmFeed } from 'xdvplatform-wallet/src/swarm/feed';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { KeystoreIndex } from './KeystoreIndex';
import moment from 'moment';
import { createKeyPair, sign } from '@erebos/secp256k1';
import { MiddlewareOptions, XDVMiddleware } from '../../../libs';
import { SolidoSingleton } from '../components/core/SolidoSingleton';
import { ethers } from 'ethers';
import { JWE, JWK } from 'node-jose';
import { arrayify, BigNumber, base64, Interface } from 'ethers/utils';
import { SwarmNodeSignedContent } from './SwarmNodeSignedContent';
import { forkJoin, Subject } from 'rxjs';
import { Session } from './Session';
import { MessagingTimelineDuplexClient } from './MessagingTimelineDuplexClient';
import copy from 'copy-to-clipboard';
import { PartialChapter } from '@erebos/timeline';
const bs58 = require('bs58');
import { SubscriptionManager } from './SubscriptionManager';
import { DriveSwarmManager } from './DriveSwarmManager';
import Unlock from './Unlock.vue';
import { SigningOutput } from './SigningOutput';
import { create } from 'xmlbuilder2';
import { ShareUtils, XDVFileFormat } from './ShareUtils';
const cbor = require('cbor-sync');

export interface ShareableSignedContent {
  sig: string;
  did: string;
}

@Component({})
export default class ViewerComponent extends Vue {
  loading = false;
  fromOwner = '';
  document: SwarmNodeSignedContent = null;
  sharedSignedDocument: XDVFileFormat = null;
  apiurl = `${(Vue as any).appconfig.API_URL}xdv_verify`;
  validated: any = null;
  contentValidated: any;
  alertMessage: string = '';
  alertType: string = ' ';
  linkJwt: string = '';
  verificationReport: any = null;
  downloadableContent: () => Promise<void>;
  operationType: string;

  async mounted() {
    const currentLocation = location;
    this.linkJwt = location.hash.split('link=')[1];

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
    this.alertMessage = '';
    this.alertType = '';
    this.loading = true;
    try {
        this.operationType = 'Downloading...';
      const { payload } = JWTService.decodeWithSignature(this.linkJwt);
      let documentSignature = payload.sig;
      let swarmContentIndex = payload.did.id.split(':');
      let swarmContent = {
        from: swarmContentIndex[2],
        txs: swarmContentIndex[3],
        entryIndex: parseInt(swarmContentIndex[4], 10) as number,
      };
      this.fromOwner = swarmContent.from;
      const res = await ShareUtils.openEphimeralLink(
        swarmContent.from,
        swarmContent.txs,
        swarmContent.entryIndex
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
      this.alertType = 'red';
      this.alertMessage = e.message;
    } finally {
      this.loading = false;
    }
  }

  async verify() {
    // verify content
    switch (this.document.signaturePreset) {
      case SigningOutput.PKCS7PEM:
        this.loading = true;
        this.operationType = 'Verifying...';
        try {
          const payload = {
            signature: this.sharedSignedDocument.signature,
            from: this.fromOwner,
            contents: this.sharedSignedDocument.content,
            token: '12345',
            filename: this.document.name,
            certificate: btoa(this.sharedSignedDocument.pubCert),
          };
          const res = await fetch(this.apiurl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
          this.validated = null;

          const text = await res.text();
          this.validated = create(text).end({
            format: 'object',
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
            token: '12345',
            certificate: btoa(this.sharedSignedDocument.pubCert),
            filename: 'fe.xml',
          };
          const res = await fetch(this.apiurl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
          this.validated = null;
          const text = await res.text();
          this.validated = create(text).end({
            format: 'object',
          });
          this.addVerificationReport(this.validated);
          this.contentValidated = this.sharedSignedDocument;
        } catch (e) {
          alert(e.message);
        }
        break;
      default:
        return;
    }

    this.loading = false;
  }

  addVerificationReport({ SimpleReport }) {
    this.verificationReport = [];
    this.verificationReport = SimpleReport.Signature.Errors.map((e) => {
      return {
        isError: true,
        subtitle: `Signature Id ${SimpleReport.Signature['@Id']}`,
        headline: `Signed by ${SimpleReport.Signature.CertificateChain.Certificate.qualifiedName} - Signed by ${SimpleReport.Signature.CertificateChain.Certificate.id}`,
        title: e,
      };
    });
  }
}
</script>
