<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Two-line (mobile) -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        <span class="grey--text text--darken-4 font-weight-bold">Two-line</span> VBanner can store larger amount of data, use it for big messages.
        </v-list-item-subtitle>
        <div class="mt-4">
        <v-banner>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            <template v-slot:actions>
            <v-btn text color="primary">Dismiss</v-btn>
            <v-btn text color="primary">Retry</v-btn>
            </template>
        </v-banner>
        </div>
    </div>
</template>

<script>
export default {
  name: "BannerTwoLine",

  data: () => ({
  })
};
</script>