<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- TransitionsSlideX -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap mt-4">
        Slide x transitions move along the horizontal axis.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-row
                justify="center"
            >
                <v-menu transition="slide-x-transition">
                <template v-slot:activator="{ on }">
                    <v-btn color="primary" class="ma-2" v-on="on">
                    Slide X Transition
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item v-for="n in 5" :key="n" link>
                    <v-list-item-title v-text="'Item ' + n"></v-list-item-title>
                    </v-list-item>
                </v-list>
                </v-menu>

                <div class="mx-4 hidden-sm-and-down"></div>

                <v-menu transition="slide-x-reverse-transition">
                <template v-slot:activator="{ on }">
                    <v-btn color="secondary" class="ma-2" v-on="on">
                    Slide X Reverse Transition
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item v-for="n in 5" :key="n" link>
                    <v-list-item-title v-text="'Item ' + n"></v-list-item-title>
                    </v-list-item>
                </v-list>
                </v-menu>
            </v-row>
        </div>
    </div>
</template>

<script>
export default {
  name: "TransitionsSlideX",

  data: () => ({
  })
};
</script>