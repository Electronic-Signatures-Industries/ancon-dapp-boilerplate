<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- FlexAlignSelf -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap mt-4">
        The <code>align-self</code> flex setting can be changed using the flex align-self classes. This by default will modify the flexbox items on the x-axis but is reversed when using <code>flex-direction: column</code>, modifying the y-axis. Choose from <code>start</code>, <code>end</code>, <code>center</code>, <code>baseline</code>, <code>auto</code>, or <code>stretch</code> (browser default).
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-card
            v-for="j in justify"
            :key="j"
            class="d-flex mb-6"
            color="grey lighten-2"
            flat
            height="100"
            tile
            >
            <v-card
                v-for="n in 3"
                :key="n"
                class="pa-2"
                :class="[n === 2 && `align-self-${j}`]"
                outlined
                tile
            >
                {{ n === 2 ? 'Aligned flex item' : 'Flex item' }}
            </v-card>
            </v-card>
        </div>
        <v-list dense class="mt-4">
            <v-subheader>There are also responsive variations for <code>align-self-items</code>.</v-subheader>
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
  name: "FlexAlignSelf",

  data: () => ({
      justify: [
        'start',
        'end',
        'center',
        'baseline',
        'auto',
        'stretch',
      ],
      item: 0,
      items: [
        { text: '.align-self-start', icon: 'mdi-arrow-right' },
        { text: '.align-self-end', icon: 'mdi-arrow-right' },
        { text: '.align-self-center', icon: 'mdi-arrow-right' },
        { text: '.align-self-baseline', icon: 'mdi-arrow-right' },
        { text: '.align-self-auto', icon: 'mdi-arrow-right' },
        { text: '.align-self-stretch', icon: 'mdi-arrow-right' },
        { text: '.align-self-sm-start', icon: 'mdi-arrow-right' },
        { text: '.align-self-sm-end', icon: 'mdi-arrow-right' },
        { text: '.align-self-sm-center', icon: 'mdi-arrow-right' },
        { text: '.align-self-sm-baseline', icon: 'mdi-arrow-right' },
        { text: '.align-self-sm-auto', icon: 'mdi-arrow-right' },
        { text: '.align-self-sm-stretch', icon: 'mdi-arrow-right' },
        { text: '.align-self-md-start', icon: 'mdi-arrow-right' },
        { text: '.align-self-md-end', icon: 'mdi-arrow-right' },
        { text: '.align-self-md-center', icon: 'mdi-arrow-right' },
        { text: '.align-self-md-baseline', icon: 'mdi-arrow-right' },
        { text: '.align-self-md-auto', icon: 'mdi-arrow-right' },
        { text: '.align-self-md-stretch', icon: 'mdi-arrow-right' },
        { text: '.align-self-lg-start', icon: 'mdi-arrow-right' },
        { text: '.align-self-lg-end', icon: 'mdi-arrow-right' },
        { text: '.align-self-lg-center', icon: 'mdi-arrow-right' },
        { text: '.align-self-lg-baseline', icon: 'mdi-arrow-right' },
        { text: '.align-self-lg-auto', icon: 'mdi-arrow-right' },
        { text: '.align-self-lg-stretch', icon: 'mdi-arrow-right' },
        { text: '.align-self-xl-start', icon: 'mdi-arrow-right' },
        { text: '.align-self-xl-end', icon: 'mdi-arrow-right' },
        { text: '.align-self-xl-center', icon: 'mdi-arrow-right' },
        { text: '.align-self-xl-baseline', icon: 'mdi-arrow-right' },
        { text: '.align-self-xl-auto', icon: 'mdi-arrow-right' },
        { text: '.align-self-xl-stretch', icon: 'mdi-arrow-right' },
      ],
  })
};
</script>