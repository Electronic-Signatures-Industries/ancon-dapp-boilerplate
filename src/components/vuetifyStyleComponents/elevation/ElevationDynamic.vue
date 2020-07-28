<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Display -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap mt-4">
        Numerous components utilize the elevatable mixin and are given an elevation prop. For components that are not supported, you can dynamically change the class
        </v-list-item-subtitle>
        <div class="mt-4">
            <div class="text--primary">
                <!-- Using the elevation prop -->
                <v-hover>
                    <template v-slot="{ hover }">
                        <v-card
                        :elevation="hover ? 24 : 6"
                        class="mx-auto pa-6"
                        >
                        Prop based elevation
                        </v-card>
                    </template>
                </v-hover>

                <div class="my-6"></div>

                <!-- Using a dynamic class -->
                <v-hover>
                    <template v-slot="{ hover }">
                        <div
                        :class="`elevation-${hover ? 24 : 6}`"
                        class="mx-auto pa-6 transition-swing"
                        >
                        Class based elevation
                        </div>
                    </template>
                </v-hover>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "ElevationDynamic",

  data: () => ({
  })
};
</script>