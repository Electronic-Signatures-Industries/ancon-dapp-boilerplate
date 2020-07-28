<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- GridsOrderClasses -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           You can control the ordering of grid items. As with offsets, you can set different orders for different sizes. Design specialized screen layouts that accommodate to any applica
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-container class="grey lighten-5">
                <v-row no-gutters>
                <v-col>
                    <v-card
                    class="pa-2"
                    outlined
                    tile
                    >
                    First, but unordered
                    </v-card>
                </v-col>
                <v-col order="12">
                    <v-card
                    class="pa-2"
                    outlined
                    tile
                    >
                    Second, but last
                    </v-card>
                </v-col>
                <v-col order="1">
                    <v-card
                    class="pa-2"
                    outlined
                    tile
                    >
                    Third, but first
                    </v-card>
                </v-col>
                </v-row>
            </v-container>
        </div>
    </div>
</template>

<script>
export default {
  name: "GridsOrderClasses",

  data: () => ({
  })
};
</script>