<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- TransitionsFab -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap mt-4">
        An example of the fab transition can be found in the <code>v-speed-dial</code> component.
        </v-list-item-subtitle>
        <div class="mt-4 text-center">
            <v-menu transition="fab-transition">
                <template v-slot:activator="{ on }">
                    <v-btn
                    dark
                    color="primary"
                    v-on="on"
                    >
                    Fab Transition
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item v-for="n in 5" :key="n" @click.stop>
                    <v-list-item-title v-text="'Item ' + n"></v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </div>
    </div>
</template>

<script>
export default {
  name: "TransitionsFab",

  data: () => ({
  })
};
</script>