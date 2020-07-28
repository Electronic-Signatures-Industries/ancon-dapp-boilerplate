<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- GrpItemMultiple -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           Item groups can have multiple items selected.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-item-group multiple>
                <v-container>
                <v-row>
                    <v-col
                    v-for="n in 3"
                    :key="n"
                    cols="12"
                    md="4"
                    >
                    <v-item v-slot:default="{ active, toggle }">
                        <v-card
                        :color="active ? 'primary' : ''"
                        class="d-flex align-center"
                        dark
                        height="200"
                        @click="toggle"
                        >
                        <v-scroll-y-transition>
                            <div
                            v-if="active"
                            class="display-3 flex-grow-1 text-center"
                            >
                            Active
                            </div>
                        </v-scroll-y-transition>
                        </v-card>
                    </v-item>
                    </v-col>
                </v-row>
                </v-container>
            </v-item-group>
        </div>
    </div>
</template>

<script>
export default {
  name: "GrpItemMultiple",

  data: () => ({
  })
};
</script>