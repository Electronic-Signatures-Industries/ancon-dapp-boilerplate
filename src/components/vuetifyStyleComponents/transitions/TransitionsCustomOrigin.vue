<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- TransitionsCustomOrigin -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap mt-4">
        Programmatically control the transition origin with a simple prop.
        </v-list-item-subtitle>
        <div class="mt-4 text-center">
            <v-menu transition="scale-transition" origin="center center">
                <template v-slot:activator="{ on }">
                    <v-btn
                    dark
                    color="primary"
                    v-on="on"
                    >
                    Scale Transition
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item v-for="n in 5" :key="n" @click="() => {}">
                    <v-list-item-title v-text="'Item ' + n"></v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </div>
    </div>
</template>

<script>
export default {
  name: "TransitionsCustomOrigin",

  data: () => ({
  })
};
</script>