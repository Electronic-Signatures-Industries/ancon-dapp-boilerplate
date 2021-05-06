<template>
  <v-dialog v-model="show" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Upload and sign documents</span>
      </v-card-title>

      <v-card-text>
        <v-form autocomplete="off">
          <v-row>
            <v-col cols="1" xs="1">
              <v-progress-circular
                indeterminate v-if="loading"
                color="primary"
              ></v-progress-circular>
            </v-col>
            <v-col cols="11" xs="11">
              <v-file-input
                prepend-icon="mdi-paperclip"
                v-model="files"
                multiple
                show-size
                label="Files"
              ></v-file-input>
            </v-col>
            <v-col cols="12" xs="12">
              <!--TODO poner descripcion-->
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" xs="12">
              {{ uploadStatus }}
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          text
          data-cy="cancel-button"
          @click="updateShow(false)"
          :disabled="loading"
          >
            Cancel
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          data-cy="ok-button"
          @click="sendFiles"
          :disabled="loading"
          >
            OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Emit, Prop } from 'vue-property-decorator';

@Component({
  name: 'xdv-upload',
})
export default class UploadDialog extends Vue {
  @Prop()
  readonly show: string;

  @Prop()
  readonly loading: boolean;

  @Prop()
  readonly uploadStatus: string;

  files: File[] = [];

  @Emit('update:show')
  updateShow(newValue: boolean) {
    return newValue;
  }

  @Emit('result')
  sendFiles() {
    return this.files;
  }
}
</script>
