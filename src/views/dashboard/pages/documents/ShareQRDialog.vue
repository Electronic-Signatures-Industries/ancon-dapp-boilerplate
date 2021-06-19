<template>
  <v-dialog
    persistent
    max-width="700px"
    :value="show"
    @update:value="updateShow"
  >
    <v-card>
      <v-card-title>Compartir Documento</v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="4">
            <qrcode
              v-if="this.documentMetadata && this.valueString"
              v-model="this.valueString"
            />
          </v-col>

          <v-col cols="8">
            <v-list>
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title>DID</v-list-item-title>
                  <v-list-item-subtitle>{{ this.didID }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title>IPLD Content ID</v-list-item-title>
                  <v-list-item-subtitle>{{ this.contentRef }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn
          text
          @click="() => updateShow(false)"
        >
          Cerrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped>
.v-list-item__subtitle {
  white-space: normal;
}
</style>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import { Emit, Prop } from 'vue-property-decorator';
import VueQrcode from '@chenfengyuan/vue-qrcode';
import { DocumentMetadata } from '../wallet/IPFSManager';
import { DID } from 'dids';

@Component({
  components: {
    [VueQrcode.name]: VueQrcode
  }
})
export default class ShareQRDialog extends Vue {
  @Prop()
  readonly show: boolean;

  @Prop()
  readonly documentMetadata?: DocumentMetadata;

  @Prop()
  readonly did?: DID;

  @Emit("update:show")
  updateShow(newValue: boolean) {
    return newValue;
  }

  get contentRef(): string {
    return this.documentMetadata?.contentRef ?? '';
  }

  get valueString(): string | null {
    if (!this.did) return null;
    return `ipld:${this.contentRef}|${this.didID}`;
  }

  get didID(): string {
    return this.did?.id ?? '';
  }
}
</script>