<template>
  <v-container fluid>
    <vue-mermaid
      :nodes="model"
      @nodeClick="handleClick"
      type="graph LR"
      :config="config"
    ></vue-mermaid>
    <v-row>
      <v-col>
        <v-chip
          class="ma-2"
          color="indigo"
          label
          v-for="actor in modelActors"
          text-color="white"
          :key="actor"
        >
          <v-icon left>mdi-account</v-icon>
          {{ actor }}
        </v-chip>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-chip
          class="ma-2"
          color="pink"
          label
          v-for="state in modelStates"
          text-color="white"
          :key="state"
        >
          <v-icon left>mdi-state-machine</v-icon>
          {{ state }}
        </v-chip>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6">
        <codemirror
          v-model="cmd"
          @input="onCmChange"
          :options="cmOptions"
        ></codemirror>
      </v-col>

      <v-col cols="6">
        <codemirror v-model="code" :options="cmOptions"></codemirror>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { codemirror } from 'vue-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/theme/base16-dark.css';
import { WorkflowBuilder, WStep } from 'mdv-workflow-client-types';
import { js_beautify } from 'js-beautify';
import { EditorStorage } from './EditorStorage';

@Component({
  components: {
    codemirror,
  },
})
export default class WorkflowEditor extends Vue {
  @Prop() private msg!: string;

  model: any = [];

  wfBuilder = new WorkflowBuilder();

  cmd = '';
  code = '';
  cmOptions = {
    tabSize: 4,
    mode: 'text/javascript',
    theme: 'base16-dark',
    lineNumbers: false,
    line: true,
  };
  modelStates = [];
  state = '';

  modelActors = ['dr', 'rx'];
  actor = '';

  search = null;
  wfTemplate = {
    actors: [],
    states: [],
    steps: [],
  };

  config = {
    theme: 'neutral',
  };

  mounted() {
    const model = {
      actors: ['DR', 'RX', 'PATIENT'],

      states: [
        'NONE',
        'PRESCRIPTION_SENT',
        'RX_REQUEST',
        'RX_ACCEPT',
        'RX_REJECT',
        'PATIENT_PAYMENT_SENT',
        'PAYMENT_RCV',
        'COMPLETED',
      ],
      steps: [
        {
          currentActor: 'DR',
          current: 'NONE',
          next: 'PRESCRIPTION_SENT',
          description: '-- envia receta -->',
          mappingType: 0,
        },
        {
          currentActor: 'PATIENT',
          current: 'PRESCRIPTION_SENT',
          next: 'RX_REQUEST',
          mappingType: 2,
          description: '-- solicita medicamentos -->',
          stepValidations: ['PRESCRIPTION_SENT'],
        },
        {
          currentActor: 'RX',
          current: 'RX_REQUEST',
          next: 'RX_ACCEPT',
          mappingType: 2,
          forkId: 'RX_REJECT',
          stepValidations: ['RX_REQUEST'],
        },
        {
          currentActor: 'RX',
          current: 'RX_REJECT',
          next: 'COMPLETED',
          description: '-- rechazada -->',
          mappingType: 2,
          stepValidations: ['RX_REQUEST'],
        },
        {
          currentActor: 'PATIENT',
          current: 'RX_ACCEPT',
          next: 'PATIENT_PAYMENT_SENT',
          description: '-- aceptada, esperando pago -->',
          mappingType: 2,
          stepValidations: ['RX_ACCEPT'],
        },
        {
          currentActor: 'RX',
          current: 'PATIENT_PAYMENT_SENT',
          next: 'PAYMENT_RCV',
          description: '-- pago recibido -->',
          mappingType: 2,
          stepValidations: ['PATIENT_PAYMENT_SENT'],
        },
        {
          currentActor: 'PATIENT',
          current: 'PAYMENT_RCV',
          description: '-- medicamentos recibido -->',
          next: 'COMPLETED',
          mappingType: 2,
          stepValidations: ['PAYMENT_RCV'],
        },
      ],
    };
    this.cmd = js_beautify(JSON.stringify(model));
  }

  toMermaidModel(steps) {
    return steps.map((s) => {
      const step = new WStep();
      step.next = this.wfBuilder.getState(s.next);
      const fork = !!s.forkId ? this.wfBuilder.getState(s.forkId) : -1;
      const next = fork > 0 ? [step.next + 1, fork + 1] : [step.next + 1];
      step.currentActor = this.wfBuilder.getActor(s.currentActor);

      step.current = this.wfBuilder.getState(s.current);

      step.forkId = fork > 0 ? fork : null;
      step.mappingType = s.mappingType;

      step.stepValidations = !!s.stepValidations
        ? s.stepValidations.map((i) => this.wfBuilder.getState(i))
        : null;
      step.senderValidations = !!s.senderValidations
        ? s.senderValidations
        : null;
      step.recipientValidations = !!s.recipientValidations
        ? s.recipientValidations
        : null;
      if (!!step.forkId) {
        delete step.forkId;
      }
      if (!!step.senderValidations) {
        delete step.senderValidations;
      }
      if (!!step.recipientValidations) {
        delete step.recipientValidations;
      }
      if (!!step.stepValidations) {
        delete step.stepValidations;
      }
      this.wfTemplate.steps.push(step);
      // this.wfBuilder.createStep(step);
      return {
        id: step.current + 1,
        next,
        editable: true,
        text: s.current,
        group: s.currentActor,
        link: s.description || '-->',
      };
    });
  }
  onCmChange() {
    const c = JSON.parse(this.cmd);
    this.wfBuilder = new WorkflowBuilder();
    this.modelStates = c.states;
    this.modelActors = c.actors;
    this.wfBuilder.createActors(c.actors);
    this.wfBuilder.createStates(c.states);
    this.wfTemplate.actors = c.actors;
    this.wfTemplate.states = c.states;

    this.model = this.toMermaidModel(c.steps);
    const temp = JSON.stringify({
      actors: c.actors,
      states: c.states,
      steps: this.wfTemplate.steps
    });
    

    this.code = js_beautify(temp);
    EditorStorage.wfTemplate = temp;
    EditorStorage.wfTemplateDesigner = JSON.stringify(this.model);
  }
  handleClick(id) {
    this.cmd = JSON.stringify(this.model.find((i) => i.id === id));
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
