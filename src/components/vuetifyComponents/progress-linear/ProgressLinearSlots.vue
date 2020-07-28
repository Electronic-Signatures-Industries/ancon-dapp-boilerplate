<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- ProgressLinearSlots -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        The <code>v-progress-linear</code> component will be responsive to user input when using <code>v-model</code>. You can use the default slot or bind a local model to display inside of the progress. If you are looking for advanced features on a linear type component, check out v-slider.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-progress-linear
            v-model="power"
            color="warning"
            height="25"
            reactive
            ></v-progress-linear>

            <br>

            <v-progress-linear
            v-model="skill"
            color="success"
            height="25"
            reactive
            >
            <template v-slot="{ value }">
                <strong>{{ Math.ceil(value) }}%</strong>
            </template>
            </v-progress-linear>

            <br>

            <v-progress-linear
            v-model="knowledge"
            height="25"
            reactive
            >
            <strong>{{ Math.ceil(knowledge) }}%</strong>
            </v-progress-linear>
        </div>
    </div>
</template>

<script>
export default {
  name: "ProgressLinearSlots",

  data: () => ({
      skill: 20,
      knowledge: 33,
      power: 78,
  })
};
</script>