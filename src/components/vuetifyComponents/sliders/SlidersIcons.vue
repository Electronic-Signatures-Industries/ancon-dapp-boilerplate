<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- SlidersIcons -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           You can add icons to the slider with the <code>append-icon</code> and <code>prepend-icon</code> props. With <code>@click:append</code> and <code>@click:prepend</code> you can trigger a callback function when click the icon.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-subheader>Media volume</v-subheader>
            <v-card-text>
            <v-slider
                v-model="media"
                prepend-icon="mdi-volume-high"
            ></v-slider>
            </v-card-text>

            <v-subheader>Alarm volume</v-subheader>

            <v-card-text>
            <v-slider
                v-model="alarm"
                append-icon="mdi-alarm"
            ></v-slider>
            </v-card-text>

            <v-subheader>Icon click callback</v-subheader>

            <v-card-text>
            <v-slider
                v-model="zoom"
                append-icon="mdi-magnify-plus-outline"
                prepend-icon="mdi-magnify-minus-outline"
                @click:append="zoomIn"
                @click:prepend="zoomOut"
            ></v-slider>
            </v-card-text>
        </div>
    </div>
</template>

<script>
export default {
  name: "SlidersIcons",

  data: () => ({
      media: 0,
        alarm: 0,
        zoom: 0,
  }),
  methods: {
      zoomOut () {
        this.zoom = (this.zoom - 10) || 0
      },
      zoomIn () {
        this.zoom = (this.zoom + 10) || 100
      },
    },
};
</script>