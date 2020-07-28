<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- ImagesHeight -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           <code>v-img</code> will automatically grow to the size of its <code>src</code>, preserving the correct aspect ratio. You can limit this with the <code>height</code> and <code>max-height</code> props.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-container
                class="fill-height"
                fluid
                style="min-height: 434px"
            >
                <v-fade-transition mode="out-in">
                <v-row v-if="show" key="0">
                    <v-col cols="6">
                    <v-card>
                        <v-img
                        src="https://picsum.photos/350/165?random"
                        height="125"
                        class="grey darken-4"
                        ></v-img>
                        <v-card-title class="title">height</v-card-title>
                    </v-card>
                    </v-col>

                    <v-col cols="6">
                    <v-card>
                        <v-img
                        src="https://picsum.photos/350/165?random"
                        height="125"
                        contain
                        class="grey darken-4"
                        ></v-img>
                        <v-card-title class="title">height with contain</v-card-title>
                    </v-card>
                    </v-col>

                    <v-col cols="6">
                    <v-card>
                        <v-img
                        src="https://picsum.photos/350/165?random"
                        max-height="125"
                        class="grey darken-4"
                        ></v-img>
                        <v-card-title class="title">max-height</v-card-title>
                    </v-card>
                    </v-col>

                    <v-col cols="6">
                    <v-card>
                        <v-img
                        src="https://picsum.photos/350/165?random"
                        max-height="125"
                        contain
                        class="grey darken-4"
                        ></v-img>
                        <v-card-title class="title">max-height with contain</v-card-title>
                    </v-card>
                    </v-col>
                </v-row>

                <v-row v-else key="1" justify="center">
                    <v-btn text @click="show = true">Load images</v-btn>
                </v-row>
                </v-fade-transition>
            </v-container>
        </div>
    </div>
</template>

<script>
export default {
  name: "ImagesHeight",

  data: () => ({
      show: false,
  }),
};
</script>