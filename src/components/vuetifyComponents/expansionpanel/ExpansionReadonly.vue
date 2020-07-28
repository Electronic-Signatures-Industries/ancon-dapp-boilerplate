<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Small variant -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
       <v-list-item-subtitle class="text-wrap">
        <code>readonly</code> prop does the same thing as <code>disabled</code>, but it doesn't touch styles.
        </v-list-item-subtitle>
        <div class="mt-4">
            <div class="d-flex">
                <v-checkbox
                    v-model="readonly"
                    label="Readonly"
                ></v-checkbox>
                </div>

                <v-expansion-panels
                v-model="panel"
                :readonly="readonly"
                multiple
                >
                <v-expansion-panel>
                    <v-expansion-panel-header>Panel 1</v-expansion-panel-header>
                    <v-expansion-panel-content>
                    Some content
                    </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                    <v-expansion-panel-header>Panel 2</v-expansion-panel-header>
                    <v-expansion-panel-content>
                    Some content
                    </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                    <v-expansion-panel-header>Panel 3</v-expansion-panel-header>
                    <v-expansion-panel-content>
                    Some content
                    </v-expansion-panel-content>
                </v-expansion-panel>
                </v-expansion-panels>
        </div>
    </div>
</template>

<script>
export default {
  name: "ExpansionReadonly",

  data: () => ({
      panel: [0, 1],
      readonly: false,
  })
};
</script>