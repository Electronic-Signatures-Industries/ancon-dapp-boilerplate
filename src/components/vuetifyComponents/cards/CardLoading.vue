<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Loading -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Cards can be set to a loading state when processing a user action. This disables further actions and provides visual feedback with an indeterminate v-progress-linear.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-card
                :loading="loading"
                class="mx-auto my-12"
                max-width="374"
            >
                <v-img
                height="250"
                src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                ></v-img>

                <v-card-title>Cafe Badilico</v-card-title>

                <v-card-text>
                <v-row
                    align="center"
                    class="mx-0"
                >
                    <v-rating
                    :value="4.5"
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="14"
                    ></v-rating>

                    <div class="grey--text ml-4">4.5 (413)</div>
                </v-row>

                <div class="my-4 subtitle-1">
                    $ • Italian, Cafe
                </div>

                <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
                </v-card-text>

                <v-divider class="mx-4"></v-divider>

                <v-card-title>Tonight's availability</v-card-title>

                <v-card-text>
                <v-chip-group
                    v-model="selection"
                    active-class="success white--text"
                    column
                >
                    <v-chip>5:30PM</v-chip>

                    <v-chip>7:30PM</v-chip>

                    <v-chip>8:00PM</v-chip>

                    <v-chip>9:00PM</v-chip>
                </v-chip-group>
                </v-card-text>

                <v-card-actions>
                <v-btn
                    color="info"
                    text
                    @click="reserve"
                >
                    Reserve
                </v-btn>
                </v-card-actions>
            </v-card>
        </div>
    </div>
</template>

<script>
export default {
  name: "CardLoading",

  data: () => ({
      loading: false,
      selection: 1,
  }),
  methods: {
      reserve () {
        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
      },
    }
};
</script>