<template>
  <v-row>
    <v-progress-linear
      indeterminate
      v-if="loading"
      color="teal"
    ></v-progress-linear>

    <v-col cols="12">
      <vue-form-json-schema
        v-model="model"
        :schema="schema"
        :ui-schema="uiSchema"
        :options="options"
        v-on:state-change="onChangeState"
        v-on:validated="onValidated"
        ref="form"
      ></vue-form-json-schema>
    </v-col>

    <v-col cols="6">
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
import { TypedRFE, TypedRFESchema } from '@xdvplatform/fe-builder';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { codemirror } from 'vue-codemirror';
import 'codemirror/lib/codemirror.css';
// require('./typescript');
import { DeploymentManager } from './DeploymentManager';
import 'codemirror/theme/base16-dark.css';
import 'codemirror/addon/search/search.js';
import 'codemirror/addon/search/searchcursor.js';
import 'codemirror/addon/edit/trailingspace.js';
import 'codemirror/addon/comment/comment.js';
import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/fold/foldcode.js';
import 'codemirror/addon/runmode/colorize.js';
import { js_beautify } from 'js-beautify';

// Import VueFormJsonSchema
import VueFormJsonSchema from 'vue-form-json-schema/dist/vue-form-json-schema.esm.js';

@Component({
  components: {
    VueFormJsonSchema,
    codemirror,
  },
})
export default class TemplateEditor extends Vue {
  model = {};
  state = {};
  valid = false;
  options = {
    castToSchemaType: true,
  };

  schema = TypedRFESchema;
  uiSchema = [];
  cmd = '';
  compilerOutput = '';

  cmOptions = {
    matchBrackets: true,
    theme: 'base16-dark',
    indentUnit: 4,
    lineNumbers: true,
    tabSize: 8,
    indentWithTabs: true,
    mode: 'text/typescript',
  };

  cmOutputOptions = {
    matchBrackets: true,
    theme: 'base16-dark',

    indentUnit: 4,
    lineNumbers: true,
    tabSize: 8,
    indentWithTabs: true,
    mode: 'text/typescript',
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
  onChangeState(value) {
    this.state = value;
  }
  onValidated(value) {
    this.valid = value;
  }
  async mounted() {
    this.loading = true;

    this.cmd = `[
  {
    "component": "div",
    "fieldOptions": {
      "class": [
        "form-group"
      ]
    },
    "children": [
      {
        "component": "label",
        "fieldOptions": {
          "attrs": {
            "for": "first-name"
          },
          "class": [
            "font-weight-bold"
          ],
          "domProps": {
            "innerHTML": "First name"
          }
        }
      },
      {
        "component": "input",
        "model": "firstName",
        "errorOptions": {
          "class": [
            "is-invalid"
          ]
        },
        "fieldOptions": {
          "attrs": {
            "id": "first-name"
          },
          "class": [
            "form-control"
          ],
          "on": [
            "input"
          ]
        }
      },
      {
        "component": "small",
        "fieldOptions": {
          "class": [
            "text-muted"
          ],
          "domProps": {
            "innerHTML": "Please enter your first name"
          }
        }
      }
    ]
  }]`;
    this.compilerOutput = js_beautify(JSON.stringify(this.schema));
    await this.handleCompilation(null, this.cmd);
    this.loading = false;
  }

  async handleCompilation(version: string, code: string) {
    this.loading = true;
    this.uiSchema = JSON.parse(code);
    this.loading = false;
  }

  async onCmChange() {
    await this.handleCompilation(null, this.cmd);
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
