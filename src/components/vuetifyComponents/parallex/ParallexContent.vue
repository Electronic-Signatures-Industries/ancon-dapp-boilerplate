<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- ParallaxContent -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        You can also place any content inside of the parallax. This allows you to use the parallax as a hero image.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-parallax
                dark
                src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
            >
                <v-row
                align="center"
                justify="center"
                >
                <v-col class="text-center" cols="12">
                    <h1 class="display-1 font-weight-thin mb-4">Vuetify.js</h1>
                    <h4 class="subheading">Build your application today!</h4>
                </v-col>
                </v-row>
            </v-parallax>
        </div>
    </div>
</template>

<script>
export default {
  name: "ParallexContent",

  data: () => ({
  })
};
</script>