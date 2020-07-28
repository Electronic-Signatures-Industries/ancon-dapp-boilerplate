<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- MenusAbsolutePosition -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Menus can also be placed absolutely on top of the activator element using the <code>absolute</code> prop. Try clicking anywhere on the image.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-row
                class="d-flex"
                justify="center"
            >
                <v-menu
                v-model="showMenu"
                absolute
                offset-y
                style="max-width: 600px"
                >
                <template v-slot:activator="{ on }">
                    <v-card
                    class="portrait"
                    img="https://cdn.vuetifyjs.com/images/cards/girl.jpg"
                    height="300"
                    width="600"
                    v-on="on"
                    ></v-card>
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
            </v-row>
        </div>
    </div>
</template>

<script>
export default {
  name: "MenusAbsolutePosition",

  data: () => ({
      showMenu: false,
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
  })
};
</script>