<template>
  <v-row>
    <v-progress-linear
      indeterminate
      v-if="loading"
      color="teal"
    ></v-progress-linear>
    <v-col cols="6">
      <v-col class="d-flex" cols="12" sm="12">
        <v-text-field
          v-model="version"
          @change="saveVersion"
        ></v-text-field>
      </v-col>
      <v-list dense>
        <v-list-item-group
          v-model="selected"
          multiple
          active-class="pink--text"
        >
          <template v-for="i in buildMessages">
            <v-list-item :key="i">
              <template>
                <v-list-item-content class="text--primary">
                  <v-list-item-title class="pink--text">{{
                    i
                  }}</v-list-item-title>
                </v-list-item-content>
              </template>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>
      <codemirror
        v-model="cmd"
        @input="onCmChange"
        :options="cmOptions"
      ></codemirror>
    </v-col>
    <v-col cols="6">
      <codemirror
        v-model="compilerOutput"
        :options="cmOutputOptions"
      ></codemirror>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { codemirror } from 'vue-codemirror';
import 'codemirror/lib/codemirror.css';
require('./solidity');
import { DeploymentManager } from './DeploymentManager';
import 'codemirror/theme/base16-light.css';
import 'codemirror/addon/search/search.js';
import 'codemirror/addon/search/searchcursor.js';
import 'codemirror/addon/edit/trailingspace.js';
import 'codemirror/addon/comment/comment.js';
import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/fold/foldcode.js';
import 'codemirror/addon/runmode/colorize.js';
import { executeWorker, SolWasmWorker } from './SolWasmWorker';
import { js_beautify } from 'js-beautify';
import { EditorStorage } from './EditorStorage';

@Component({
  components: {
    codemirror,
  },
})
export default class SolModelEditor extends Vue {
  direction = 'top';
  fab = false;
  fling = false;
  hover = false;
  tabs = null;
  top = true;
  right = true;
  bottom = false;
  left = false;
  transition = 'slide-y-reverse-transition';

  cmd = '';
  compilerOutput = '';

  cmOptions = {
    matchBrackets: true,
    theme: 'base16-light',
    indentUnit: 4,
    lineNumbers: true,
    tabSize: 8,
    indentWithTabs: true,
    mode: 'text/x-solidity',
  };

  cmOutputOptions = {
    matchBrackets: true,
    theme: 'base16-light',
    indentUnit: 4,
    lineNumbers: true,
    tabSize: 8,
    indentWithTabs: true,
    mode: 'text/plain',
  };
  search = null;
  config = {
    theme: 'neutral',
  };
  versions: any;
  version: string | null = '';

  buildMessages = [];
  loading = false;
  deploymentManager: DeploymentManager = new DeploymentManager(
    `${location.protocol}://${location.host}`
  );

  compileWorker: any;

  saveVersion() {
    localStorage.setItem('solcversion', this.version);
  }

  async mounted() {
    this.loading = true;
    this.versions = await this.deploymentManager.versions();
    if (localStorage.getItem('solcversion')) {
      this.version = localStorage.getItem('solcversion');
    } else {
      this.version = 'soljson-v0.6.6+commit.6c089d02.js'; 
    }
    this.cmd = await this.deploymentManager.fromHttp('examples/RecetaModel.sol');
    if (this.version) {
      await this.handleCompilation(this.version, this.cmd);
    }
    this.loading = false;
  }

  async handleCompilation(version: string, code: string) {
    this.loading = true;
    const input = await this.deploymentManager.getSources(version, code);

    // @ts-ignore
    const out = await executeWorker(this.$worker.run, [input, version, this.deploymentManager.systemLibs]);
    const obj = JSON.parse(out);
    const output = obj.errors.map((i) => {
      return i.formattedMessage;
    });
    this.compilerOutput = js_beautify(out);
    this.buildMessages = output;
    if (obj.contracts && Object.keys(obj.contracts).length > 0) {
      this.buildMessages = [];

      // save contract to local storage
      EditorStorage.modelTemplate = code;

      EditorStorage.abi = JSON.stringify(obj.contracts);
    }

    this.loading = false;
  }

  async onCmChange() {
    if (this.version) {
      await this.handleCompilation(this.version, this.cmd);
    }
  }
}
</script>

<style>
.CodeMirror {
  border: 1px solid #eee;
  height: auto;
  width: 100%;
}
</style>
