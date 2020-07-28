<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- SheetelTile -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Sheets can accept a <code>tile</code> property which makes them rectangular (no <code>border-radius</code>).
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-row justify="space-around">
                <v-col
                    v-for="tile in [false, true]"
                    :key="tile"
                    cols="12"
                    md="4"
                >
                    <v-sheet
                    class="pa-12"
                    color="grey lighten-3"
                    >
                    <div></div>
                    <v-sheet
                        :tile="tile"
                        class="mx-auto"
                        height="100"
                        width="100"
                    ></v-sheet>
                    <div></div>
                    </v-sheet>
                </v-col>
                </v-row>
        </div>
    </div>
</template>

<script>
export default {
  name: "SheetelTile",

  data: () => ({
  })
};
</script>