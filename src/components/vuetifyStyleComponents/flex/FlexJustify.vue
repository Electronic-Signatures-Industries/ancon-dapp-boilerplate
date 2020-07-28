<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- FlexJustify -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap mt-4">
        The <code>justify-content</code> flex setting can be changed using the flex justify classes. This by default will modify the flexbox items on the x-axis but is reversed when using <code>flex-direction: column</code>, modifying the y-axis. Choose from <code>start</code> (browser default), <code>end</code>, <code>center</code>, <code>between</code>, or <code>around</code>.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-card
            v-for="j in justify"
            :key="j"
            :class="`d-flex justify-${j} mb-6`"
            color="grey lighten-2"
            flat
            tile
            >
            <v-card
                v-for="n in 3"
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
            <v-subheader>There are also responsive variations for <code>justify-content</code>.</v-subheader>
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
  name: "FlexJustify",

  data: () => ({
      justify: [
        'start',
        'end',
        'center',
        'space-between',
        'space-around',
      ],
      item: 0,
      items: [
        { text: '.justify-start', icon: 'mdi-arrow-right' },
        { text: '.justify-end', icon: 'mdi-arrow-right' },
        { text: '.justify-center', icon: 'mdi-arrow-right' },
        { text: '.justify-space-between', icon: 'mdi-arrow-right' },
        { text: '.justify-space-around', icon: 'mdi-arrow-right' },
        { text: '.justify-sm-start', icon: 'mdi-arrow-right' },
        { text: '.justify-sm-end', icon: 'mdi-arrow-right' },
        { text: '.justify-sm-center', icon: 'mdi-arrow-right' },
        { text: '.justify-sm-space-between', icon: 'mdi-arrow-right' },
        { text: '.justify-sm-space-around', icon: 'mdi-arrow-right' },
        { text: '.justify-md-start', icon: 'mdi-arrow-right' },
        { text: '.justify-md-end', icon: 'mdi-arrow-right' },
        { text: '.justify-md-center', icon: 'mdi-arrow-right' },
        { text: '.justify-md-space-between', icon: 'mdi-arrow-right' },
        { text: '.justify-md-space-around', icon: 'mdi-arrow-right' },
        { text: '.justify-lg-start', icon: 'mdi-arrow-right' },
        { text: '.justify-lg-end', icon: 'mdi-arrow-right' },
        { text: '.justify-lg-center', icon: 'mdi-arrow-right' },
        { text: '.justify-lg-space-between', icon: 'mdi-arrow-right' },
        { text: '.justify-lg-space-around', icon: 'mdi-arrow-right' },
        { text: '.justify-xl-start', icon: 'mdi-arrow-right' },
        { text: '.justify-xl-end', icon: 'mdi-arrow-right' },
        { text: '.justify-xl-center', icon: 'mdi-arrow-right' },
        { text: '.justify-xl-space-between', icon: 'mdi-arrow-right' },
        { text: '.justify-xl-space-around', icon: 'mdi-arrow-right' }
      ],
  })
};
</script>