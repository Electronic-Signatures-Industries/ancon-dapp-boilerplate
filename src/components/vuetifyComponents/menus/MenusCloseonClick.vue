<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- MenusCloseonClick -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Menu can be closed when lost focus.
        </v-list-item-subtitle>
        <div class="mt-4 text-center">
            <v-menu top :close-on-click="closeOnClick">
            <template v-slot:activator="{ on }">
                <v-btn
                color="primary"
                dark
                v-on="on"
                slot="activator"
                >
                Dropdown
                </v-btn>
            </template>

            <v-list>
                <v-list-item
                v-for="(item, index) in items"
                :key="index"
                @click.prevent
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
  name: "MenusCloseonClick",

  data: () => ({
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
      closeOnClick: true,
  })
};
</script>