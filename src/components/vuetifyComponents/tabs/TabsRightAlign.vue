<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- TabsRightAlign -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        The right prop aligns the tabs to the right.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-tabs
            background-color="white"
            color="info"
            right
            >
            <v-tab>Landscape</v-tab>
            <v-tab>City</v-tab>
            <v-tab>Abstract</v-tab>

            <v-tab-item
                v-for="n in 3"
                :key="n"
            >
                <v-container fluid>
                <v-row>
                    <v-col
                    v-for="i in 6"
                    :key="i"
                    cols="12"
                    md="4"
                    >
                    <v-img
                        :src="`https://picsum.photos/500/300?image=${i * n * 5 + 10}`"
                        :lazy-src="`https://picsum.photos/10/6?image=${i * n * 5 + 10}`"
                        aspect-ratio="1"
                    ></v-img>
                    </v-col>
                </v-row>
                </v-container>
            </v-tab-item>
            </v-tabs>
        </div>
    </div>
</template>

<script>
export default {
  name: "TabsRightAlign",

  data: () => ({
  })
};
</script>