<template>
  <v-card>
    <v-card-title>Event log</v-card-title>

    <v-card-text>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Nombre</v-list-item-title>
            <v-list-item-subtitle>{{ this.name }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Archivo</v-list-item-title>
            <v-list-item-subtitle>{{ this.contentType }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Timestamp</v-list-item-title>
            <v-list-item-subtitle>{{ this.timestamp }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>

    <v-card-actions>
      <v-spacer />

      <v-btn
        v-if="this.documentMetadata"
        @click="showShareQRDialog = true"
        data-cy="share-button"
        text
      >
        <v-icon>mdi-share</v-icon>
        Compartir
      </v-btn>

      <v-btn
        v-if="this.documentMetadata"
        @click="onDownload"
        data-cy="download-button"
        text
        >
          <v-icon>mdi-download</v-icon>
          Descargar Archivo
      </v-btn>
    </v-card-actions>

    <share-q-r-dialog
      v-if="this.did"
      :documentMetadata="this.documentMetadata"
      :show.sync="showShareQRDialog"
      :did="this.did"
    />
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Emit, Prop } from 'vue-property-decorator';
import Moment from "moment";
import { DocumentMetadata } from '@/views/dashboard/pages/wallet/IPFSManager';
import ShareQRDialog from "./ShareQRDialog.vue";
import { DID } from 'dids';

@Component({
  components: {
    ShareQRDialog
  }
})
export default class EventLog extends Vue {
  @Prop()
  readonly documentMetadata: DocumentMetadata | null;

  @Prop()
  readonly show: boolean;

  @Prop()
  readonly did?: DID;

  showShareQRDialog = false;

  @Emit('download')
  onDownload() {
    return this.documentMetadata;
  }

  get timestamp(): string {
    return this.documentMetadata ? Moment(1000 * this.documentMetadata.timestamp).toString() : '';
  }

  get name(): string {
    return this.documentMetadata?.name ?? '';
  }

  get contentType(): string {
    return this.documentMetadata?.contentType ?? '';
  }
}
</script>