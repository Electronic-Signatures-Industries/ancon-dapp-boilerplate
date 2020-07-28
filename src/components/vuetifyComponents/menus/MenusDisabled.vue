<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- MenusDisabled -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        You can disable the menu. Disabled menus can't be opened.
        </v-list-item-subtitle>
        <div class="mt-4 text-center">
            <v-menu disabled top offset-y>
                <template v-slot:activator="{ on }">
                    <v-btn
                    color="primary"
                    dark
                    v-on="on"
                    >
                    Dropdown
                    </v-btn>
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
  name: "MenusDisabled",

  data: () => ({
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
  })
};
</script>