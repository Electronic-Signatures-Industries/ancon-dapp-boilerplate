<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- MenusActivatorTooltip -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        With the new v-slot syntax, nested activators such as those seen with a <code>v-menu</code> and <code>v-tooltip</code> attached to the same activator button, need a particular setup in order to function correctly. <span class="grey--text text--darken-4 font-weight-bold">Note: this same syntax is used for other nested activators such as</span> <code>v-dialog</code> <span class="grey--text text--darken-4 font-weight-bold">w/</span> <code>v-tooltip</code>.
        </v-list-item-subtitle>
        <div class="mt-4 text-center">
            <v-menu>
            <template v-slot:activator="{ on: menu }">
                <v-tooltip bottom>
                <template v-slot:activator="{ on: tooltip }">
                    <v-btn
                    color="primary"
                    dark
                    v-on="{ ...tooltip, ...menu }"
                    >Dropdown w/ Tooltip</v-btn>
                </template>
                <span>Im A ToolTip</span>
                </v-tooltip>
            </template>
            <v-list>
                <v-list-item
                v-for="(item, index) in items"
                :key="index"
                @click.stop
                >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
            </v-menu>
        </div>
    </div>
</template>

<script>
export default {
  name: "MenusActivatorTooltip",

  data: () => ({
      items: [
        { title: 'Click Me1' },
        { title: 'Click Me2' },
        { title: 'Click Me3' },
        { title: 'Click Me4' },
      ],
  })
};
</script>