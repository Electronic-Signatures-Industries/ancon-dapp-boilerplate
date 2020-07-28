<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- TransitionsExpand -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap mt-4">
        The expand transition is used in Expansion Panels and List Groups. There is also a horizontal version available with <code>v-expand-x-transition</code>.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-row
                justify="center"
                style="min-height: 160px;"
            >
                <v-col class="shrink">
                <v-btn
                    class="ma-2"
                    color="primary"
                    @click="expand = !expand"
                >
                    Expand Transition
                </v-btn>

                <v-expand-transition>
                    <v-card
                    v-show="expand"
                    height="100"
                    width="100"
                    class="mx-auto"
                    ></v-card>
                </v-expand-transition>
                </v-col>

                <div class="mx-4 hidden-sm-and-down"></div>

                <v-col class="shrink">
                <v-btn
                    class="ma-2"
                    color="secondary"
                    @click="expand2 = !expand2"
                >
                    Expand X Transition
                </v-btn>

                <v-expand-x-transition>
                    <v-card
                    v-show="expand2"
                    height="100"
                    width="100"
                    class="mx-auto"
                    ></v-card>
                </v-expand-x-transition>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
export default {
  name: "TransitionsExpand",

  data: () => ({
      expand: false,
      expand2: false,
  })
};
</script>