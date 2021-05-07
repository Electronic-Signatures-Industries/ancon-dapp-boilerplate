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
        @click="onDownload"
        data-cy="download-button"
        text
        >
          <v-icon>mdi-download</v-icon>
          Descargar Archivo
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Emit, Prop } from 'vue-property-decorator';
import Moment from "moment";
import { DocumentMetadata } from '@/views/dashboard/pages/wallet/IPFSManager';

@Component({})
export default class EventLog extends Vue {
  @Prop()
  readonly documentMetadata: DocumentMetadata | null;

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