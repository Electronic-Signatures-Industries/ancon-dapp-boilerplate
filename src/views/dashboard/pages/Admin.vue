<template>
  <div>
    <v-progress-linear
      indeterminate
      v-if="loading"
      color="teal"
    ></v-progress-linear>
<v-row>
  <v-col>
     <v-alert v-model="alert"
      dense transition="fade-transition"
      type="success"
    >
      {{ message }}
    </v-alert>
  </v-col>
</v-row>
    <v-expansion-panels multiple v-model="panel">
      <v-expansion-panel>
        <v-expansion-panel-header disable-icon-rotate class="subtitle-1">
          Set workflow template owner
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
                   v-model="templateAddress"
                  label="Workflow Template Address"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4">
                <div class="my-2">
                  <v-btn
                    @click="handleSetOwner"
                    :disabled="loading"
                    color="primary"
                    >Publish</v-btn
                  >
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header disable-icon-rotate class="subtitle-1">
          Create new account
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
                  v-model="userAddress"
                  label="User Address"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="expires"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="expires"
                      label="Expires"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="expires" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false"
                      >Cancelar</v-btn
                    >
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menu.save(expires)"
                      >OK</v-btn
                    >
                  </v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="templateAddress"
                  label="Workflow Template Address"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4">
                <div class="my-2">
                  <v-btn
                    @click="handleNewUserAccess"
                    :disabled="loading"
                    color="primary"
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
  menu = '';
  message = '';
  alert = false;
  step1 = 1;
  step2 = 1;
  step3 = 1;
  panel = [0];
  userAddress = '';
  loading = false;
  templateAddress = '';
  expires: any = new Date().toISOString().substr(0, 10);

  async handleSetOwner() {
    this.loading = true;
    await DeploymentManager.setTemplateOwner(this.templateAddress);
    this.alert = true;
    this.message = `Account Manager Owner set to workflow template for address ${this.templateAddress}`;
    setTimeout(() => {
      this.alert = false;
    }, 5000);
      this.panel = [1];
    this.step1 = 0;
    this.loading = false;
  }

  async handleNewUserAccess() {
    this.loading = true;
    await DeploymentManager.createUserAccess({
      templateAddress: this.templateAddress,
      expires: new Date(this.expires),
      userAddress: this.userAddress,
    });
    this.alert = true;
    this.message = `User account created for address ${this.userAddress}`;
    setTimeout(() => {
      this.alert = false;
    }, 5000);
    //  this.panel = [2];
    this.step2 = 0;
    this.loading = false;
  }

  mounted() {}

  onCmChange() {}
}
</script>
