<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- FlexOrder -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap mt-4">
        You can change the visual order of flex items with the <code>order</code> utilities.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-card
            class="d-flex flex-wrap-reverse"
            color="grey lighten-2"
            flat
            tile
            >
            <v-card
                class="order-3 pa-2"
                outlined
                tile
            >
                First flex item
            </v-card>
            <v-card
                class="order-2 pa-2"
                outlined
                tile
            >
                Second flex item
            </v-card>
            <v-card
                class="order-1 pa-2"
                outlined
                tile
            >
                Third flex item
            </v-card>
            </v-card>
        </div>
        <v-list dense class="mt-4">
            <v-subheader>There are also responsive variations for <code>order</code>.</v-subheader>
            <v-list-item-group v-model="item" color="primary">
                <v-list-item
                v-for="(item, i) in items"
                :key="i"
                >
                <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </div>
</template>

<script>
export default {
  name: "FlexOrder",

  data: () => ({
      item: 0,
      items: [
        { text: '.order-first', icon: 'mdi-arrow-right' },
        { text: '.order-0', icon: 'mdi-arrow-right' },
        { text: '.order-1', icon: 'mdi-arrow-right' },
        { text: '.order-2', icon: 'mdi-arrow-right' },
        { text: '.order-3', icon: 'mdi-arrow-right' },
        { text: '.order-4', icon: 'mdi-arrow-right' },
        { text: '.order-5', icon: 'mdi-arrow-right' },
        { text: '.order-6', icon: 'mdi-arrow-right' },
        { text: '.order-7', icon: 'mdi-arrow-right' },
        { text: '.order-8', icon: 'mdi-arrow-right' },
        { text: '.order-9', icon: 'mdi-arrow-right' },
        { text: '.order-10', icon: 'mdi-arrow-right' },
        { text: '.order-11', icon: 'mdi-arrow-right' },
        { text: '.order-12', icon: 'mdi-arrow-right' },
        { text: '.order-last', icon: 'mdi-arrow-right' },
        { text: '.order-sm-first', icon: 'mdi-arrow-right' },
        { text: '.order-sm-0', icon: 'mdi-arrow-right' },
        { text: '.order-sm-1', icon: 'mdi-arrow-right' },
        { text: '.order-sm-2', icon: 'mdi-arrow-right' },
        { text: '.order-sm-3', icon: 'mdi-arrow-right' },
        { text: '.order-sm-4', icon: 'mdi-arrow-right' },
        { text: '.order-sm-5', icon: 'mdi-arrow-right' },
        { text: '.order-sm-6', icon: 'mdi-arrow-right' },
        { text: '.order-sm-7', icon: 'mdi-arrow-right' },
        { text: '.order-sm-8', icon: 'mdi-arrow-right' },
        { text: '.order-sm-9', icon: 'mdi-arrow-right' },
        { text: '.order-sm-10', icon: 'mdi-arrow-right' },
        { text: '.order-sm-11', icon: 'mdi-arrow-right' },
        { text: '.order-sm-12', icon: 'mdi-arrow-right' },
        { text: '.order-sm-last', icon: 'mdi-arrow-right' },
        { text: '.order-md-first', icon: 'mdi-arrow-right' },
        { text: '.order-md-0', icon: 'mdi-arrow-right' },
        { text: '.order-md-1', icon: 'mdi-arrow-right' },
        { text: '.order-md-2', icon: 'mdi-arrow-right' },
        { text: '.order-md-3', icon: 'mdi-arrow-right' },
        { text: '.order-md-4', icon: 'mdi-arrow-right' },
        { text: '.order-md-5', icon: 'mdi-arrow-right' },
        { text: '.order-md-6', icon: 'mdi-arrow-right' },
        { text: '.order-md-7', icon: 'mdi-arrow-right' },
        { text: '.order-md-8', icon: 'mdi-arrow-right' },
        { text: '.order-md-9', icon: 'mdi-arrow-right' },
        { text: '.order-md-10', icon: 'mdi-arrow-right' },
        { text: '.order-md-11', icon: 'mdi-arrow-right' },
        { text: '.order-md-12', icon: 'mdi-arrow-right' },
        { text: '.order-md-last', icon: 'mdi-arrow-right' },
        { text: '.order-lg-first', icon: 'mdi-arrow-right' },
        { text: '.order-lg-0', icon: 'mdi-arrow-right' },
        { text: '.order-lg-1', icon: 'mdi-arrow-right' },
        { text: '.order-lg-2', icon: 'mdi-arrow-right' },
        { text: '.order-lg-3', icon: 'mdi-arrow-right' },
        { text: '.order-lg-4', icon: 'mdi-arrow-right' },
        { text: '.order-lg-5', icon: 'mdi-arrow-right' },
        { text: '.order-lg-6', icon: 'mdi-arrow-right' },
        { text: '.order-lg-7', icon: 'mdi-arrow-right' },
        { text: '.order-lg-8', icon: 'mdi-arrow-right' },
        { text: '.order-lg-9', icon: 'mdi-arrow-right' },
        { text: '.order-lg-10', icon: 'mdi-arrow-right' },
        { text: '.order-lg-11', icon: 'mdi-arrow-right' },
        { text: '.order-lg-12', icon: 'mdi-arrow-right' },
        { text: '.order-lg-last', icon: 'mdi-arrow-right' },
        { text: '.order-xl-first', icon: 'mdi-arrow-right' },
        { text: '.order-xl-0', icon: 'mdi-arrow-right' },
        { text: '.order-xl-1', icon: 'mdi-arrow-right' },
        { text: '.order-xl-2', icon: 'mdi-arrow-right' },
        { text: '.order-xl-3', icon: 'mdi-arrow-right' },
        { text: '.order-xl-4', icon: 'mdi-arrow-right' },
        { text: '.order-xl-5', icon: 'mdi-arrow-right' },
        { text: '.order-xl-6', icon: 'mdi-arrow-right' },
        { text: '.order-xl-7', icon: 'mdi-arrow-right' },
        { text: '.order-xl-8', icon: 'mdi-arrow-right' },
        { text: '.order-xl-9', icon: 'mdi-arrow-right' },
        { text: '.order-xl-10', icon: 'mdi-arrow-right' },
        { text: '.order-xl-11', icon: 'mdi-arrow-right' },
        { text: '.order-xl-12', icon: 'mdi-arrow-right' },
        { text: '.order-xl-last', icon: 'mdi-arrow-right' },
      ],
  })
};
</script>