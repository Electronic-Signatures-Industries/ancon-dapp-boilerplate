<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- GridsRowColumnBreakpoints -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           Dynamically change your layout based upon resolution. <span class="grey--text text--darken-4 font-weight-bold">(resize your screen and watch the top <code>row</code> layout change on sm, md, and lg breakpoints)</span>
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-container class="grey lighten-5">
                <v-row
                class="mb-6"
                no-gutters
                >
                <v-col
                    v-for="n in 2"
                    :key="n"
                    :lg="cols[n - 1]"
                    :md="6"
                    :sm="cols[n - 1]"
                >
                    <v-card
                    class="pa-2"
                    outlined
                    tile
                    >
                    col-{{ cols[n - 1] }}
                    </v-card>
                </v-col>
                </v-row>
                <v-row no-gutters>
                <v-col
                    v-for="n in 3"
                    :key="n"
                    cols="sm"
                >
                    <v-card
                    class="pa-2"
                    outlined
                    tile
                    >
                    col
                    </v-card>
                </v-col>
                </v-row>
            </v-container>
        </div>
    </div>
</template>

<script>
export default {
  name: "GridsRowColumnBreakpoints",

  data: () => ({
  }),
  computed: {
      cols () {
        const { lg, sm } = this.$vuetify.breakpoint
        return lg ? [3, 9] : sm ? [9, 3] : [6, 6]
      },
    },
};
</script>