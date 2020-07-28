<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- FlexEnabling -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap mt-4">
        Using <code>display</code> utilities you can turn any element into a flexbox container transforming direct children elements into flex items. Using additional flex property utilities, you can customize their interaction even further.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-card
                class="d-flex pa-2"
                outlined
                tile
            >
                <div>I'm a flexbox container!</div>
            </v-card>
            <v-card
                class="d-inline-flex pa-2 mt-4"
                outlined
                tile
            >
                <div>I'm an inline flexbox container!</div>
            </v-card>
        </div>
        <v-list dense class="mt-4">
            <v-subheader>You can also customize flex utilities to apply based upon various breakpoints.</v-subheader>
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
  name: "FlexEnabling",

  data: () => ({
      item: 0,
      items: [
        { text: '.d-flex', icon: 'mdi-arrow-right' },
        { text: '.d-inline-flex', icon: 'mdi-arrow-right' },
        { text: '.d-sm-flex', icon: 'mdi-arrow-right' },
        { text: '.d-sm-inline-flex', icon: 'mdi-arrow-right' },
        { text: '.d-md-flex', icon: 'mdi-arrow-right' },
        { text: '.d-md-inline-flex', icon: 'mdi-arrow-right' },
        { text: '.d-lg-flex', icon: 'mdi-arrow-right' },
        { text: '.d-lg-inline-flex', icon: 'mdi-arrow-right' },
        { text: '.d-xl-flex', icon: 'mdi-arrow-right' },
        { text: '.d-xl-inline-flex', icon: 'mdi-arrow-right' },
      ],
  })
};
</script>