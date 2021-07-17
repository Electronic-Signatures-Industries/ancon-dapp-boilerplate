<template>
  <v-dialog v-model="show" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Upload and sign documents</span>
      </v-card-title>

      <v-card-text>
        <v-form v-model="form" autocomplete="off">
          <v-row>
            <v-col cols="12" md="12">
              <v-file-input
                prepend-icon="mdi-paperclip"
                v-model="value"
                multiple
                show-size
                label="Files"
              ></v-file-input>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="show = false">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="change">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'xdv-upload',
  props: ['value', 'show'],
})
export default class Upload extends Vue {
  value: string = '';
  show = false;
   change() {
    this.$emit('input', this.value);
  }
}
</script>
