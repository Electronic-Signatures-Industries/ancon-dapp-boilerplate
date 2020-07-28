<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- ImagesPlaceholder -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           <code>v-img</code> has a special <code>placeholder</code> slot for placeholder to display while image's loading. Note: the example below has bad src which won't load for you to see placeholder.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-img
                src="https://bad.src/not/valid"
                lazy-src="https://picsum.photos/id/11/100/60"
                aspect-ratio="1"
                class="grey lighten-2"
                max-width="500"
                max-height="300"
                >
                <template v-slot:placeholder>
                    <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                    >
                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                </template>
                </v-img>
        </div>
    </div>
</template>

<script>
export default {
  name: "ImagesPlaceholder",

  data: () => ({
  }),
};
</script>