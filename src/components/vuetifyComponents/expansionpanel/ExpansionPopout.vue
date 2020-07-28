<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Small variant -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
       <v-list-item-subtitle class="text-wrap">
        The expansion-panel also has popout design. With it, expansion-panel is enlargened when activated.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-expansion-panels popout>
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
  name: "ExpansionPopout",

  data: () => ({
  })
};
</script>