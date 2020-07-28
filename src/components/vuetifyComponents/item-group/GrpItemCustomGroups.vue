<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- GrpItemCustomGroups -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           Icons can be used as toggle buttons when they allow selection, or deselection, of a single choice, such as marking an item as a favorite.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-card
                max-width="400"
                class="mx-auto"
            >
                <v-container class="pa-1">
                <v-item-group
                    v-model="selected"
                    multiple
                >
                    <v-row>
                    <v-col
                        v-for="(item, i) in items"
                        :key="i"
                        cols="12"
                        md="6"
                    >
                        <v-item v-slot:default="{ active, toggle }">
                        <v-img
                            :src="`https://cdn.vuetifyjs.com/images/${item.src}`"
                            height="150"
                            class="text-right pa-2"
                            @click="toggle"
                        >
                            <v-btn
                            icon
                            dark
                            >
                            <v-icon>
                                {{ active ? 'mdi-heart' : 'mdi-heart-outline' }}
                            </v-icon>
                            </v-btn>
                        </v-img>
                        </v-item>
                    </v-col>
                    </v-row>
                </v-item-group>
                </v-container>
            </v-card>
        </div>
    </div>
</template>

<script>
export default {
  name: "GrpItemCustomGroups",

  data: () => ({
    items: [
        {
          src: 'backgrounds/bg.jpg',
        },
        {
          src: 'backgrounds/md.jpg',
        },
        {
          src: 'backgrounds/bg-2.jpg',
        },
        {
          src: 'backgrounds/md2.jpg',
        },
      ],
      selected: [],
  })
};
</script>