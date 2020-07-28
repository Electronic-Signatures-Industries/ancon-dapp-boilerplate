<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Menus -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Menus can be placed within almost any component.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-row>
                <v-col cols="12" sm="6" offset-sm="3">
                <v-card height="200px">
                    <v-card-title class="blue white--text">
                    <span class="headline">Menu</span>

                    <v-spacer></v-spacer>

                    <v-menu bottom left>
                        <v-btn slot="activator" dark icon>
                        <v-icon>more_vert</v-icon>
                        </v-btn>

                        <v-list>
                        <v-list-tile v-for="(item, i) in items" :key="i" @click="()=>{}">
                            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                        </v-list-tile>
                        </v-list>
                    </v-menu>
                    </v-card-title>

                    <v-card-text>Lorem Ipsum</v-card-text>
                </v-card>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
export default {
  name: "Menus",

  data: () => ({
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
  })
};
</script>