<template>
  <v-container id="regular-tables" fluid tag="section">
    <v-row>
      <v-col>
        <div>
          <v-progress-linear
            :active="loading"
            indeterminate
            color="teal"
          ></v-progress-linear>
        </div>
      </v-col>
    </v-row>

    <base-material-card
      icon="mdi-clipboard-text"
      title="Solicitudes notariales"
      class="px-5 py-3"
    >
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Buscar"
        single-line
        hide-details
      ></v-text-field>
      <v-data-table
        :loading="loading"
        :headers="this.headers"
        v-model="selected"
        :items="items"
        :search="search"
        sort-by="Tx"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="newDialog" max-width="500px">
              <template v-slot:activator="{ on }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-on="on"
                  @click="fillForm()"
                  >Nueva solicitud</v-btn
                >
              </template>
              <base-material-card>
                <template v-slot:heading>
                  <div class="display-2 font-weight-light">
                    Enviar solicitud notarial
                  </div>
                </template>

                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-col class="d-flex" cols="12" sm="12">
                    <v-text-field
                      v-model="notary"
                      label="Enviar a"
                      required
                    />
                  </v-col>
                  <v-col class="d-flex" cols="12" sm="12">
                    <v-text-field v-model="nombre" label="Nombre" required />
                  </v-col>

                  <v-col class="d-flex" cols="12" sm="12">
                    <v-text-field
                      v-model="apellido"
                      label="Apellido"
                      required
                    />
                  </v-col>

                  <v-col class="d-flex" cols="12" sm="12">
                    <v-text-field v-model="email" label="Correo" required />
                  </v-col>

                  <v-col class="d-flex" cols="12" sm="12">
                    <v-text-field
                      v-model="description"
                      label="Descripcion"
                      required
                    />
                  </v-col>

                  <v-col class="d-flex" cols="12" sm="12">
                    <v-file-input
                      chips
                      multiple
                      accept="application/pdf"
                      v-model="files"
                      label="Archivos"
                    ></v-file-input>
                  </v-col>
                  <v-btn
                    :disabled="loading"
                    color="success"
                    class="mr-4"
                    @click="handleEncryptedFileUpload"
                  >
                    Subir archivos
                  </v-btn>

                  <v-btn
                    color="success"
                    class="mr-4"
                    :disabled="loading"
                    @click="handleAddDocuments"
                  >
                    Publicar
                  </v-btn>
                </v-form>
              </base-material-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.files="{ item }">
          <v-btn icon color="blue" @click.stop="handleFiles(item.decoded)">
            <v-icon>mdi-file</v-icon>
          </v-btn>
        </template>
        <template v-slot:item.certfiles="{ item }">
          <v-col
            v-if="!!getActions(item).find(i => i.text.indexOf('cert') > -1)"
          >
            <v-btn
              icon
              color="pink"
              @click.stop="handleCertFiles(item.decoded)"
            >
              <v-icon>mdi-file-check</v-icon>
            </v-btn>
          </v-col>
        </template>
        <template v-slot:item.action="{ item }">
          <v-row>
            <v-col class="d-flex" cols="12" sm="6">
              <v-select
                v-model="action"
                :items="getActions(item).filter(i => !!i.skipTasks === false)"
                item-text="text"
                item-value="callback"
                single-line
                label="Tarea"
                @change="handleAction(item.decoded)"
              />
            </v-col>
          </v-row>
        </template>
        <template v-slot:no-data>
          No hay registros
        </template>
      </v-data-table>
    </base-material-card>
    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="500" persistent>
        <v-card>
          <v-card-title class="headline">Archivos</v-card-title>

          <v-card-text>
            <v-list-item v-for="f in files" v-bind:key="f.hash">
              <v-list-item-content>
                <v-row>
                  <v-btn
                    v-if="f.path === 'PKCS7'"
                    color="blue"
                    @click="handleSignedValidation(f.hash)"
                    >Validar firma</v-btn
                  >
                  <v-col>
                    <router-link
                      v-if="f.path !== 'PKCS7'"
                      target="_blank"
                      :to="{
                        name: 'Navegador PDF',
                        params: { name: f.path, id: f.hash }
                      }"
                      >{{ f.path }}</router-link
                    >
                  </v-col>
                </v-row>
              </v-list-item-content>
            </v-list-item>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false">
              OK
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="certDialog" max-width="500" persistent>
        <v-card>
          <v-card-title class="headline">Certificar</v-card-title>

          <v-card-text>
            <v-text-field
              v-model="debtFlowID"
              label="Debt Flow ID"
            ></v-text-field>
            <v-text-field v-model="amount" label="Monto"></v-text-field>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              text
              @click="certifyInvoice(null, true)"
            >
              OK
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { ethers } from "ethers";
import EthCrypto from "eth-crypto";
import * as ipfs from "ipfs-http-client";
import { EventFilter } from "@decent-bet/solido";
import { filter } from "rxjs/operators";
import { forkJoin } from "rxjs";
import { BigNumber } from "ethers/utils";
import {
  SolidoSingleton,
} from "../../components/core/SolidoSingleton";

import { MiddlewareOptions } from "../../../../libs";
const PromiseFileReader = require("promise-file-reader");

const md5 = require("js-md5");

@Component({
  name: "ClientDashboard"
})
export default class ClientDashboard extends Vue {
  valid = false;
  action = null;
  actions = [
    {
      state: -1,
      skipTasks: true,
      text: "Ver archivos",
      callback: this.handleFiles
    },
    {
      state: 6,
      text: "Ver archivos certificados",
      callback: this.handleCertFiles,
      skipTasks: true
    },
    {
      state: 3,
      text: "Enviar pago de certificado",
      callback: this.paymentSent
    },
    // {
    //   state: 6,
    //   text: "Certificados recibidos",
    //   callback: this.documentsReceived
    // },
    {
      state: 1,
      text: "Cancelar",
      callback: this.cancelRequest
    }
  ];

  nombre = "";
  apellido = "";
  email = "";
  description = "";

  notary = "";
  notaries = [];

  selected = [];

  items: any = [];
  newDialog: boolean = false;
  dialog: any = false;
  headers: any = [];
  documentHeaders: any = [];
  loading: boolean = false;
  debtFlowID = 0;
  currentInvoice: object = {};
  certDialog = false;
  amount = 0;
  currentItem = null;

  files: any = [];
  search = "";

  ipfsFiles: any;
  host: string;

  solidoProps: any;

  getActions(item) {
    return this.actions.filter(
      i => i.state === -1 || i.state === item.decoded.statusInt
    );
  }

  hasStatus(status) {
    return !!this.actions.filter(i => i.state === status);
  }

  exitDialog() {
    this.dialog = false;
    this.action = null;
  }

  async fillForm() {
    const {
      address,
      email,
      name,
      lastname
    } = await this.solidoProps.storage.getUserModel();
    this.email = email;
    this.nombre = name;
    this.apellido = lastname;
  }

  handleFiles(item) {
    this.dialog = true;
    this.files = item.files;
  }

  handleCertFiles(item) {
    this.dialog = true;
    this.files = item.certFiles;
  }

  async handleAction(item) {
    if (this.action) {
      await Promise.resolve(this.action(item));
    }
    this.action = null;
  }

  async mounted() {
    this.loading = true;
    this.solidoProps = await SolidoSingleton.getProps();
    this.host = (Vue as any).appconfig.API_URL;

    this.headers = [
      {
        text: "Tx",
        align: "left",
        sortable: true,
        value: "txShort"
      },
      { text: "Id", value: "decoded.id" },
      { text: "Estado", value: "decoded.status" },
      { text: "Correo", value: "decoded.email" },
      { text: "Nombre", value: "decoded.name" },
      { text: "Apellido", value: "decoded.lastName" },
      { text: "Docs", value: "files", sortable: false },
      { text: "Docs Cert", value: "certfiles", sortable: false },
      { text: "Tareas", value: "action", sortable: false }
    ];

    this.documentHeaders = [{ text: "Archivo", value: "name" }];
    await this.fetchDocuments();


    this.loading = false;
    // await this.signClaim();
  }
  async encrypt(values: string) {
    // Must be done by backend API
    const contract = this.solidoProps.contracts.Documents.instance;
    const signer = contract.provider.getSigner();

    const hash = await ethers.utils.keccak256(
      this.solidoProps.contracts.Documents.defaultAccount
    );
    const sig = await signer.signMessage(ethers.utils.arrayify(hash));
    const publicKey = ethers.utils.recoverPublicKey(hash, sig);

    const data: any = await EthCrypto.encryptWithPublicKey(
      publicKey.replace("0x", ""),
      values
    );

    return EthCrypto.cipher.stringify(data);
  }
  async handleEncryptedFileUpload() {
    this.loading = true;
    const { setBinaryData } = this.solidoProps.storage;
    const files = await forkJoin(
      this.files.map(async (file: File) => {
        const ab = await PromiseFileReader.readAsArrayBuffer(file);
        const res = await setBinaryData(ab, 'application/pdf');
        const hash = res;
        const path = file.name;
        return { hash, path };
      })
    ).toPromise();

    this.ipfsFiles = files;
    this.loading = false;
  }

  async handleAddDocuments() {
    let { nombre, apellido, email, notary, description } = this.$data;

    const { web3 } = window as any;

    this.loading = true;
    email = ethers.utils.formatBytes32String(email);
    nombre = ethers.utils.formatBytes32String(nombre);
    apellido = ethers.utils.formatBytes32String(apellido);
    const docFiles = JSON.stringify(this.ipfsFiles);
    const estimate = await this.solidoProps.ethereum.contracts.Documents.instance.estimate.addDocument(
      notary,
      docFiles,
      description,
      email,
      nombre,
      apellido
    );

    const gas = estimate.toNumber();

    const res = await this.solidoProps.ethereum.contracts.Documents.instance.functions.addDocument(
      notary,
      docFiles,
      description,
      email,
      nombre,
      apellido,
      {
        gasLimit: gas,
        gasPrice: 20000000000 // 10 Gwei
      }
    );

    await res.wait(2);
    this.loading = false;
    await this.fetchDocuments();
  }

  async documentsReceived({ id }) {
    this.loading = true;

    const estimate = await this.solidoProps.ethereum.contracts.Documents.instance.estimate.setDocumentRejected(
      id
    );

    const gas = estimate.toNumber();
    const res = await this.solidoProps.ethereum.contracts.Documents.instance.functions.setDocumentRejected(
      id,
      {
        gasLimit: gas,
        gasPrice: 10000000000 // 10 Gwei
      }
    );

    await res.wait(3);
    this.loading = false;

    this.fetchDocuments();
  }

  async paymentSent({ id, recipient }) {
    this.loading = true;

    const estimate = await this.solidoProps.ethereum.contracts.Documents.instance.estimate.setServiceFeeSent(
      id,
      recipient
    );

    const gas = estimate.toNumber();
    const res = await this.solidoProps.ethereum.contracts.Documents.instance.functions.setServiceFeeSent(
      id,
      recipient,
      {
        gasLimit: gas,
        gasPrice: 10000000000 // 10 Gwei
      }
    );

    await res.wait(3);
    this.loading = false;

    this.fetchDocuments();
  }

  async cancelRequest({ id, recipient }) {
    this.loading = true;

    const estimate = await this.solidoProps.ethereum.contracts.Documents.instance.estimate.setUserCanceled(
      id,
      recipient
    );

    const gas = estimate.toNumber();
    const res = await this.solidoProps.ethereum.contracts.Documents.instance.functions.setUserCanceled(
      id,
      recipient,
      {
        gasLimit: gas,
        gasPrice: 10000000000 // 10 Gwei
      }
    );

    await res.wait(3);
    this.loading = false;

    this.fetchDocuments();
  }

  getStatus(value) {
    switch (value) {
      case 0:
        return "Ninguno";
      case 1:
        return "Creado";
      case 2:
        return "Aceptado";
      case 3:
        return "Certificado";
      case 4:
        return "Pago de certificado enviado";
      case 5:
        return "Pago recibido, esperando liberacion";
      case 6:
        return "Certificados liberados";
      // case 7:
      //   return "Certificados recibidos";
      case 8:
        return "Rechazado";
      case 9:
        return "Cancelado";
      default:
        return "None";
    }
  }

  async fetchDocuments() {
    const filterOptions: EventFilter<any> = {
      pageOptions: {
        limit: 100,
        offset: 0
      }
    };
    const { Documents } = this.solidoProps.ethereum.contracts;

    const filter = await Documents.instance.filters.LogAddDocument(
      null,
      Documents.defaultAccount,
      null
    );

    filter.fromBlock = 0;
    filter.toBlock = "latest";

    const logs = await Documents.instance.provider.getLogs(filter);
    const interfaceUtils = new ethers.utils.Interface(Documents.abi);
    const parsed = logs.map(async l => {
      const { values } = interfaceUtils.parseLog(l);
      const doc = await Documents.methods.recipientDocuments(
        values.recipient,
        values.id
      );
      let files = JSON.parse(doc.fileIpfsJson);

      let certFiles = null;
      if (doc.certifiedFilesIpfsJson) {
        certFiles = JSON.parse(doc.certifiedFilesIpfsJson);
      }

      return {
        ...l,
        txShort: `${l.transactionHash.substring(
          0,
          5
        )}...${l.transactionHash.substring(
          l.transactionHash.length - 5,
          l.transactionHash.length
        )}`,
        decoded: {
          ...doc,
          id: values.id,
          recipient: values.recipient,
          status: this.getStatus(new BigNumber(doc.status).toNumber()),
          email: ethers.utils.parseBytes32String(doc.email),
          name: ethers.utils.parseBytes32String(doc.name),
          lastName: ethers.utils.parseBytes32String(doc.lastName),
          files,
          certFiles,
          statusInt: new BigNumber(doc.status).toNumber()
        }
      };
    });
    this.items = await forkJoin(parsed).toPromise();
  }
}

// handle.sed'
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#create .v-speed-dial {
  position: absolute;
}

#create .v-btn--floating {
  position: relative;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
