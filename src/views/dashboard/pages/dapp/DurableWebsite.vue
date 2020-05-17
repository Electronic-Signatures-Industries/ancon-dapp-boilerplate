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

    <base-material-card icon="mdi-web" title="Sitio Durable" class="px-5 py-3">
      <v-card-text>
        <div color="blue" v-if="feed">
          Contenido de
          <a target="_blank" :href="feed.contentUrl">{{ feed.hostingName }}</a>
        </div>
        <v-treeview
          v-model="tree"
          :open="open"
          :items="items"
          activatable
          item-key="name"
          open-on-click
        >
          <template v-slot:prepend="{ item, open }">
            <v-icon v-if="!item.file">
              {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
            </v-icon>
            <v-icon v-else>
              {{ fileicons[item.contentType] }}
            </v-icon>
          </template>
        </v-treeview>
      </v-card-text>

      <v-card-actions>
        <v-list-item class="grow">
          <v-list-item-content>
            <v-list-item-title
              ><v-btn color="primary" @click="handleCreateDurableContent"
                >Publicar contenido</v-btn
              ></v-list-item-title
            >

            <v-col class="d-flex" cols="12" sm="12">
              <v-btn color="primary" @click="keyDialog = true">Ingresar</v-btn>
            </v-col>
          </v-list-item-content>
          <v-row align="center" justify="end" v-if="files.length > 0">
            <v-btn icon><v-icon class="mr-1">mdi-check-decagram</v-icon></v-btn>
            <span class="subheading mr-2">Exportar llave como hexadecimal</span>
            <span class="mr-1">·</span>
            <v-btn icon><v-icon class="mr-1">mdi-certificate</v-icon></v-btn>
            <span class="subheading">Exportar llave como DER</span>
          </v-row>
        </v-list-item>
      </v-card-actions>
    </base-material-card>
    <v-row justify="center">
      <v-dialog v-model="keyDialog" max-width="500px">
        <qrcode-stream @decode="onDecode"></qrcode-stream>
      </v-dialog>
      <v-dialog v-model="dialog" max-width="500px">
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Crear sitio web durable
            </div>
          </template>

          <v-form ref="form" lazy-validation>
            <v-col class="d-flex" cols="12" sm="12" v-if="!currentPvk">
              <qrcode :value="pvk" :options="{ width: 200 }"></qrcode>
            </v-col>

            <v-col class="d-flex" cols="12" sm="12">
              <v-text-field v-model="name" label="Nombre de sitio" />
            </v-col>

            <v-col class="d-flex" cols="12" sm="12">
              <v-text-field v-model="defaultPath" label="Pagina inicial" />
            </v-col>
            <v-col class="d-flex" cols="12" sm="12">
              <div class="drag-drop">
                <div class="upload">
                  <div v-if="files.length">
                    {{ files.length }} archivos por subir
                  </div>
                  <ul v-else>
                    <td colspan="7">
                      <div class="text-center p-5">
                        <h4>Drag y drop contenido</h4>
                      </div>
                    </td>
                  </ul>
                </div>
                <div class="drag-btn">
                  <file-upload
                    max-width="200px"
                    class="btn btn-primary purple"
                    :multiple="true"
                    :drop="true"
                    :drop-directory="true"
                    v-model="files"
                    ref="upload"
                  ></file-upload>
                </div>
              </div>
            </v-col>
            <v-btn
              :disabled="loading"
              color="success"
              class="mr-4"
              @click="handleEncryptedFileUpload"
            >
              Subir
            </v-btn>
          </v-form>
        </base-material-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import VueQrcode from '@chenfengyuan/vue-qrcode';

import { ethers } from 'ethers';
import { EventFilter } from '@decent-bet/solido';
import { filter } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { BigNumber } from 'ethers/utils';
import { SolidoSingleton } from '../../components/core/SolidoSingleton';
import {
  generateKeyPair,
  publishDirectory,
  getContents,
} from '../../../../libs/durable-hosting/index';
import { MiddlewareOptions } from '../../../../libs';
import 'share-api-polyfill';
import * as moment from 'moment';
import { FeedID } from '@erebos/bzz-feed';
const PromiseFileReader = require('promise-file-reader');
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader';
import FileUpload from 'vue-upload-component';

@Component({
  name: 'DurableWebsite',
  components: {
    FileUpload,
    QrcodeStream,
    QrcodeDropZone,
    QrcodeCapture,
    [VueQrcode.name]: VueQrcode,
  },
})
export default class DurableWebsite extends Vue {
  dialog = false;
  loading = false;
  files = [];
  name = '';
  pvk = '';
  currentPvk = '';
  host = '';
  solidoProps: MiddlewareOptions;
  feed: any = {};
  defaultPath = 'index.html';
  open = ['public'];
  fileicons = {
    'text/html': 'mdi-language-html5',
    'application/javascript': 'mdi-nodejs',
    'application/json': 'mdi-json',
    'text/markdown': 'mdi-markdown',
    'application/pdf': 'mdi-file-pdf',
    'image/png': 'mdi-file-image',
    'text/plain': 'mdi-file-document-outline',
    'application/vnd.ms-excel': 'mdi-file-excel',
  };
  tree = [];
  items = [];
  keyDialog = false;

  onDecode(decodedString) {
    if (decodedString.length > 0) {
      this.currentPvk = decodedString;
      this.keyDialog = false;
    }
  }

  loadTreeView() {
    const contents = Object.keys(this.feed.displayFeedDirectory).map((i) => {
      const { name, url, contentType, size } = this.feed.displayFeedDirectory[
        i
      ];
      return {
        name,
        file: true,
        contentType,
      };
    });

    this.items = [
      {
        name: this.feed.hostingName,
        children: contents,
      },
    ];
  }
  exitDialog() {
    this.dialog = false;
  }

  async handleCreateDurableContent() {
    if (!this.currentPvk) {
      this.createKey();
    } else {
      this.pvk = this.currentPvk;
    }
    this.dialog = true;
  }

  async handleEncryptedFileUpload() {
    this.loading = true;
    const temp = this.files.map(async i => {
      i.file.filename = i.name;
      return i.file;
    });
    this.files = await forkJoin(temp).toPromise();
    const hostingConfig = await publishDirectory({
      name: this.name,
      pvk: this.pvk,
      defaultPath: this.defaultPath,
      contents: this.files,
    });
    this.feed = hostingConfig;
    localStorage.setItem(
      'durable:hosting:config',
      JSON.stringify(hostingConfig)
    );
    this.loading = false;
    this.$router.go(0);
  }

  createKey() {
    this.pvk = generateKeyPair();
  }

  async mounted() {
    let config = {};
    try {
      config = JSON.parse(localStorage.getItem('durable:hosting:config'));
    } catch (e) {}
    this.feed = config;
    this.loadTreeView();
    this.loading = true;
    this.solidoProps = await SolidoSingleton.getProps();
    this.host = (Vue as any).appconfig.API_URL;

    this.loading = false;
    // await this.signClaim();
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
