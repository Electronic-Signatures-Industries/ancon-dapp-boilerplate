<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Small variant -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
       <v-list-item-subtitle class="text-wrap">
        Both the expansion-panel and its content can be disabled using the <code>disabled</code> prop.
        </v-list-item-subtitle>
        <div class="mt-4">
            <div class="d-flex">
                <v-checkbox
                    v-model="disabled"
                    label="Disabled"
                ></v-checkbox>
                </div>

                <v-expansion-panels
                v-model="panel"
                :disabled="disabled"
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
  name: "ExpansionDisabled",

  data: () => ({
      panel: [0, 1],
      disabled: false,
      readonly: false,
  })
};
</script>