<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- FlexAlign -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap mt-4">
        The <code>align-items</code> flex setting can be changed using the flex align classes. This by default will modify the flexbox items on the y-axis but is reversed when using <code>flex-direction: column</code>, modifying the x-axis. Choose from <code>start</code>, <code>end</code>, <code>center</code>, <code>baseline</code>, or <code>stretch</code> (browser default).
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-alert
            border="top"
            colored-border
            type="info"
            elevation="2"
            >
            When using flex align with IE11 you will need to set an explicit <code>height</code> as <code>min-height</code> will not suffice and cause undesired results.
            </v-alert>
        </div>
        <v-card
            class="mt-4"
            v-for="a in align"
            :key="a"
            :class="`d-flex align-${a} mb-6`"
            color="grey lighten-2"
            flat
            height="100"
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
        <v-list dense class="mt-4">
            <v-subheader>There are also responsive variations for <code>align-items</code>.</v-subheader>
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
  name: "FlexAlign",

  data: () => ({
      align: [
        'start',
        'end',
        'center',
        'baseline',
        'stretch',
      ],
      item: 0,
      items: [
        { text: '.align-start', icon: 'mdi-arrow-right' },
        { text: '.align-end', icon: 'mdi-arrow-right' },
        { text: '.align-center', icon: 'mdi-arrow-right' },
        { text: '.align-baseline', icon: 'mdi-arrow-right' },
        { text: '.align-stretch', icon: 'mdi-arrow-right' },
        { text: '.align-sm-start', icon: 'mdi-arrow-right' },
        { text: '.align-sm-end', icon: 'mdi-arrow-right' },
        { text: '.align-sm-center', icon: 'mdi-arrow-right' },
        { text: '.align-sm-baseline', icon: 'mdi-arrow-right' },
        { text: '.align-sm-stretch', icon: 'mdi-arrow-right' },
        { text: '.align-md-start', icon: 'mdi-arrow-right' },
        { text: '.align-md-end', icon: 'mdi-arrow-right' },
        { text: '.align-md-center', icon: 'mdi-arrow-right' },
        { text: '.align-md-baseline', icon: 'mdi-arrow-right' },
        { text: '.align-md-stretch', icon: 'mdi-arrow-right' },
        { text: '.align-lg-start', icon: 'mdi-arrow-right' },
        { text: '.align-lg-end', icon: 'mdi-arrow-right' },
        { text: '.align-lg-center', icon: 'mdi-arrow-right' },
        { text: '.align-lg-baseline', icon: 'mdi-arrow-right' },
        { text: '.align-lg-stretch', icon: 'mdi-arrow-right' },
        { text: '.align-xl-start', icon: 'mdi-arrow-right' },
        { text: '.align-xl-end', icon: 'mdi-arrow-right' },
        { text: '.align-xl-center', icon: 'mdi-arrow-right' },
        { text: '.align-xl-baseline', icon: 'mdi-arrow-right' },
        { text: '.align-xl-stretch', icon: 'mdi-arrow-right' },
      ],
  })
};
</script>