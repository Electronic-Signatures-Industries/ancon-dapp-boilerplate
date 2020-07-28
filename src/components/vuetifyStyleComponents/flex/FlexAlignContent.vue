<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- FlexAlignContent -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap mt-4">
        The <code>align-content</code> flex setting can be changed using the flex align-content classes. This by default will modify the flexbox items on the x-axis but is reversed when using <code>flex-direction: column</code>, modifying the y-axis. Choose from <code>start</code> (browser default), <code>end</code>, <code>center</code>, <code>between</code>, <code>around</code> or <code>stretch</code>.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-card
                class="d-flex align-content-start flex-wrap"
                color="grey lighten-2"
                flat
                tile
                min-height="200"
            >
            <v-card
                v-for="n in 20"
                :key="n"
                class="pa-2"
                outlined
                tile
            >
                Flex item
            </v-card>
            </v-card>
        </div>
        <div class="mt-4">
            <v-card
                class="d-flex align-content-end flex-wrap"
                color="grey lighten-2"
                flat
                tile
                min-height="200"
            >
            <v-card
                v-for="n in 20"
                :key="n"
                class="pa-2"
                outlined
                tile
            >
                Flex item
            </v-card>
            </v-card>
        </div>
        <div class="mt-4">
            <v-card
                class="d-flex align-content-center flex-wrap"
                color="grey lighten-2"
                flat
                tile
                min-height="200"
            >
            <v-card
                v-for="n in 20"
                :key="n"
                class="pa-2"
                outlined
                tile
            >
                Flex item
            </v-card>
            </v-card>
        </div>
        <div class="mt-4">
            <v-card
                class="d-flex align-content-space-between flex-wrap"
                color="grey lighten-2"
                flat
                tile
                min-height="200"
            >
            <v-card
                v-for="n in 20"
                :key="n"
                class="pa-2"
                outlined
                tile
            >
                Flex item
            </v-card>
            </v-card>
        </div>
        <div class="mt-4">
            <v-card
                class="d-flex align-content-space-around flex-wrap"
                color="grey lighten-2"
                flat
                tile
                min-height="200"
            >
            <v-card
                v-for="n in 20"
                :key="n"
                class="pa-2"
                outlined
                tile
            >
                Flex item
            </v-card>
            </v-card>
        </div>
        <v-list dense class="mt-4">
            <v-subheader>There are also responsive variations for <code>align-content</code>.</v-subheader>
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
  name: "FlexAlignContent",

  data: () => ({
      item: 0,
      items: [
        { text: 'align-content-start', icon: 'mdi-arrow-right' },
        { text: 'align-content-end', icon: 'mdi-arrow-right' },
        { text: 'align-content-center', icon: 'mdi-arrow-right' },
        { text: 'align-content-space-between', icon: 'mdi-arrow-right' },
        { text: 'align-content-space-around', icon: 'mdi-arrow-right' },
        { text: 'align-content-stretch', icon: 'mdi-arrow-right' },
        { text: 'align-sm-content-start', icon: 'mdi-arrow-right' },
        { text: 'align-sm-content-end', icon: 'mdi-arrow-right' },
        { text: 'align-sm-content-center', icon: 'mdi-arrow-right' },
        { text: 'align-sm-content-space-between', icon: 'mdi-arrow-right' },
        { text: 'align-sm-content-space-around', icon: 'mdi-arrow-right' },
        { text: 'align-sm-content-stretch', icon: 'mdi-arrow-right' },
        { text: 'align-md-content-start', icon: 'mdi-arrow-right' },
        { text: 'align-md-content-end', icon: 'mdi-arrow-right' },
        { text: 'align-md-content-center', icon: 'mdi-arrow-right' },
        { text: 'align-md-content-space-between', icon: 'mdi-arrow-right' },
        { text: 'align-md-content-space-around', icon: 'mdi-arrow-right' },
        { text: 'align-md-content-stretch', icon: 'mdi-arrow-right' },
        { text: 'align-lg-content-start', icon: 'mdi-arrow-right' },
        { text: 'align-lg-content-end', icon: 'mdi-arrow-right' },
        { text: 'align-lg-content-center', icon: 'mdi-arrow-right' },
        { text: 'align-lg-content-space-between', icon: 'mdi-arrow-right' },
        { text: 'align-lg-content-space-around', icon: 'mdi-arrow-right' },
        { text: 'align-lg-content-stretch', icon: 'mdi-arrow-right' },
        { text: 'align-xl-content-start', icon: 'mdi-arrow-right' },
        { text: 'align-xl-content-end', icon: 'mdi-arrow-right' },
        { text: 'align-xl-content-center', icon: 'mdi-arrow-right' },
        { text: 'align-xl-content-space-between', icon: 'mdi-arrow-right' },
        { text: 'align-xl-content-space-around', icon: 'mdi-arrow-right' },
        { text: 'align-xl-content-stretch', icon: 'mdi-arrow-right' }
      ],
  })
};
</script>