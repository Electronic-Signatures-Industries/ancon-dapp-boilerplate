<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- GridsEqualWidthColumns -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           You can break equal width columns into multiple lines. While there are workarounds for older browser versions, there was a Safari flexbox bug. This shouldn't be necessary if you're up-to-date.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-container class="grey lighten-5">
                <v-row no-gutters>
                <template v-for="n in 4">
                    <v-col :key="n">
                    <v-card
                        class="pa-2"
                        outlined
                        tile
                    >
                        Column
                    </v-card>
                    </v-col>
                    <v-responsive
                    v-if="n === 2"
                    :key="`width-${n}`"
                    width="100%"
                    ></v-responsive>
                </template>
                </v-row>
            </v-container>
        </div>
    </div>
</template>

<script>
export default {
  name: "GridsEqualWidthColumns",

  data: () => ({
  })
};
</script>