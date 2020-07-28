<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- MenusCloseonContentClick -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        You can configure whether <code>v-menu</code> should be closed when its content is clicked.
        </v-list-item-subtitle>
        <div class="mt-4 text-center">
            <v-switch v-model="closeOnContentClick" label="Close on content click"></v-switch>
            <v-menu top :close-on-content-click="closeOnContentClick">
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
  name: "MenusCloseonContentClick",

  data: () => ({
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
      closeOnContentClick: true,
  })
};
</script>