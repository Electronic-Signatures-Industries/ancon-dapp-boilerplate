<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- GridsOnecolumnWidth -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           When using the auto-layout, you can define the width of only one column and still have its siblings to automatically resize around it.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-container class="grey lighten-5">
                <v-row
                class="mb-6"
                no-gutters
                >
                <v-col
                    v-for="n in 3"
                    :key="n"
                    :cols="n === 2 ? 6 : undefined"
                >
                    <v-card
                    class="pa-2"
                    outlined
                    tile
                    >
                    {{ n }} of 3 {{ n === 2 ? '(wider)' : '' }}
                    </v-card>
                </v-col>
                </v-row>
                <v-row no-gutters>
                <v-col
                    v-for="n in 3"
                    :key="n"
                    :cols="n === 2 ? 5 : undefined"
                >
                    <v-card
                    class="pa-2"
                    outlined
                    tile
                    >
                    {{ n }} of 3 {{ n === 2 ? '(wider)' : '' }}
                    </v-card>
                </v-col>
                </v-row>
            </v-container>
        </div>
    </div>
</template>

<script>
export default {
  name: "GridsOnecolumnWidth",

  data: () => ({
  })
};
</script>