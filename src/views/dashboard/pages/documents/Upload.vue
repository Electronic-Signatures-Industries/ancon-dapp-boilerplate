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
                v-model="value"
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
        <v-btn color="blue darken-1" text @click="show = false" :disabled="loading">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="change" :disabled="loading">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'xdv-upload',
  props: ['show', 'value', 'loading', 'uploadStatus'],
})
export default class Upload extends Vue {
  value: string;
  show;
  
  change() {
    this.$emit('input', this.value);
    this.show = false;
  }
}
</script>
