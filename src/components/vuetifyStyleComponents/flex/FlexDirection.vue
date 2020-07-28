<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- FlexDirection -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap mt-4">
        By default, <code>d-flex</code> applies <code>flex-direction: row</code> and can generally be omitted. However, there may be situations where you need to explicitly define it.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-card
            class="d-flex flex-row mb-6"
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
                Flex item {{ n }}
            </v-card>
            </v-card>
            <v-card
            class="d-flex flex-row-reverse mt-4"
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
                Flex item {{ n }}
            </v-card>
            </v-card>
        </div>
        <p class="mt-4">The <code>flex-column</code> and <code>flex-column-reverse</code> utility classes can be used to change the orientation of the flexbox container. Keep in mind that IE11 and Safari may have issues with the column direction.</p>
        <div class="d-flex flex-column mb-6">
            <v-card
                v-for="n in 3"
                :key="n"
                class="pa-2"
                outlined
                tile
            >
                Flex item {{ n }}
            </v-card>
            </div>
            <div class="d-flex flex-column-reverse">
            <v-card
                v-for="n in 3"
                :key="n"
                class="pa-2"
                outlined
                tile
            >
                Flex item {{ n }}
            </v-card>
        </div>
        <p class="mt-4">There are also responsive variations for <code>flex-direction</code>.</p>
        <v-list dense class="mt-4">
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
  name: "FlexDirection",

  data: () => ({
      item: 0,
      items: [
        { text: '.flex-row', icon: 'mdi-arrow-right' },
        { text: '.flex-row-reverse', icon: 'mdi-arrow-right' },
        { text: '.flex-column', icon: 'mdi-arrow-right' },
        { text: '.flex-column-reverse', icon: 'mdi-arrow-right' },
        { text: '.flex-sm-row', icon: 'mdi-arrow-right' },
        { text: '.flex-sm-row-reverse', icon: 'mdi-arrow-right' },
        { text: '.flex-sm-column', icon: 'mdi-arrow-right' },
        { text: '.flex-sm-column-reverse', icon: 'mdi-arrow-right' },
        { text: '.flex-md-row', icon: 'mdi-arrow-right' },
        { text: '.flex-md-row-reverse', icon: 'mdi-arrow-right' },
        { text: '.flex-md-column', icon: 'mdi-arrow-right' },
        { text: '.flex-md-column-reverse', icon: 'mdi-arrow-right' },
        { text: '.flex-lg-row', icon: 'mdi-arrow-right' },
        { text: '.flex-lg-row-reverse', icon: 'mdi-arrow-right' },
        { text: '.flex-lg-column', icon: 'mdi-arrow-right' },
        { text: '.flex-lg-column-reverse', icon: 'mdi-arrow-right' },
        { text: '.flex-xl-row', icon: 'mdi-arrow-right' },
        { text: '.flex-xl-row-reverse', icon: 'mdi-arrow-right' },
        { text: '.flex-xl-column', icon: 'mdi-arrow-right' },
        { text: '.flex-xl-column-reverse', icon: 'mdi-arrow-right' },
      ],
  })
};
</script>