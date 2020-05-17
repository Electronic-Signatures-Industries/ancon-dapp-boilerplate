<template>
  <div>
    <v-progress-linear
      indeterminate
      v-if="loading"
      color="teal"
    ></v-progress-linear>
    <v-expansion-panels multiple v-model="panel">
      <v-expansion-panel>
        <v-expansion-panel-header disable-icon-rotate class="subtitle-1">
          Create Workflow Template
          <template v-slot:actions>
            <v-icon v-if="step2 === 0" color="teal">mdi-check</v-icon>
            <v-icon v-if="step2 === 1" color="primary">$expand</v-icon>
            <v-icon v-if="step2 === 2" color="error">mdi-alert-circle</v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-container>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  :disabled="canEditAddress"
                  v-model="modelTemplateAddress"
                  label="Model Template Address"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="actorCount"
                  label="Actor Count"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="stateCount"
                  label="State Count"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="stepCount"
                  label="Step Count"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="currentContract"
                  label="Contract Name"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  readonly
                  v-model="templateAddress"
                  label="Workflow Template Address"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4">
                <div class="my-2">
                  <v-btn @click="handlePublishWFTemplate" :disabled="loading" color="primary"
                    >Publish</v-btn
                  >
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { codemirror } from 'vue-codemirror';
import 'codemirror/lib/codemirror.css';
require('./solidity');
import 'codemirror/theme/base16-light.css';
import { EditorStorage } from './EditorStorage';
import { DeploymentManager } from './DeploymentManager';

@Component({
  name: 'TemplateDeployment',
  components: {
    codemirror,
  },
})
export default class TemplateDeployment extends Vue {
  modelTemplateAddress: string = '';

  modelTemplateKey = 'ModelTemplate.sol';
  step1 = 1;
  step2 = 1;
  step3 = 1;
  panel = [0];
  canEditAddress: boolean = false;
  currentContract = '';
  loading = false;
  templateAddress = '';
  actorCount = 0;
  stateCount = 0;
  stepCount = 0;

  async handlePublishModelTemplate() {
    this.loading = true;
    EditorStorage.deployedModelTemplateAddress = this.modelTemplateAddress;
    // this.currentContract = EditorStorage.deployedModelTemplateAddress;

    this.panel = [1];
    this.step1 = 0;
    this.loading = false;
  }

  async handlePublishWFTemplate() {
    this.loading = true;
    this.templateAddress = await DeploymentManager.publishWorkflow();

    //  this.panel = [2];
    this.step2 = 0;
    this.loading = false;
  }

  mounted() {
    this.currentContract = 'RecetaModel'; //DeploymentManager.getModelTemplate().name;
    const inputs = JSON.parse(EditorStorage.wfTemplate);
    this.stepCount = inputs.steps.length;
    this.actorCount = inputs.actors.length;
    this.stateCount = inputs.states.length;
  }

  onCmChange() {}
}
</script>
