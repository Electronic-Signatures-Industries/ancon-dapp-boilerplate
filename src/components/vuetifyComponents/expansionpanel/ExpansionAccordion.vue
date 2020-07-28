<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Small variant -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
       <v-list-item-subtitle class="text-wrap">
        accordion expansion-panel hasn't got margins around active panel.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-expansion-panels accordion>
                <v-expansion-panel
                    v-for="(item,i) in 5"
                    :key="i"
                >
                    <v-expansion-panel-header>Item</v-expansion-panel-header>
                    <v-expansion-panel-content>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </v-expansion-panel-content>
                </v-expansion-panel>
                </v-expansion-panels>
        </div>
    </div>
</template>

<script>
export default {
  name: "ExpansionAccordion",

  data: () => ({
  })
};
</script>