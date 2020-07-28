<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- ImagesGradients -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           The <code>gradient</code> prop can be used to apply a simple gradient overlay to the image. More complex gradients should be written as a class on the content slot instead.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-row>
                <v-col cols="6" sm="4">
                    <v-img
                    src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
                    gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
                    ></v-img>
                </v-col>

                <v-col cols="6" sm="4">
                    <v-img src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg">
                    <div class="fill-height bottom-gradient"></div>
                    </v-img>
                </v-col>

                <v-col cols="6" sm="4">
                    <v-img src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg">
                    <div class="fill-height repeating-gradient"></div>
                    </v-img>
                </v-col>
                </v-row>
        </div>
    </div>
</template>

<style scoped>
  .bottom-gradient {
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 72px);
  }

  .repeating-gradient {
    background-image: repeating-linear-gradient(-45deg,
                        rgba(255,0,0,.25),
                        rgba(255,0,0,.25) 5px,
                        rgba(0,0,255,.25) 5px,
                        rgba(0,0,255,.25) 10px
                      );
  }
</style>

<script>
export default {
  name: "ImagesGradients",

  data: () => ({
  }),
};
</script>