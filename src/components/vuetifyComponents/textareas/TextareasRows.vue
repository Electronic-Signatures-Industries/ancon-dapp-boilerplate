<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- TextareasRows -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           The <code>rows</code> prop allows you to define how many rows the textarea has, when combined with the <code>row-height</code> prop you can further customize your rows by defining their height.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-row>
                <v-col cols="12" sm="6">
                    <v-textarea
                    label="One row"
                    auto-grow
                    outlined
                    rows="1"
                    row-height="15"
                    ></v-textarea>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-textarea
                    filled
                    auto-grow
                    label="Two rows"
                    rows="2"
                    row-height="20"
                    ></v-textarea>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-textarea
                    label="Three rows"
                    auto-grow
                    outlined
                    rows="3"
                    row-height="25"
                    shaped
                    ></v-textarea>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-textarea
                    filled
                    auto-grow
                    label="Four rows"
                    rows="4"
                    row-height="30"
                    shaped
                    ></v-textarea>
                </v-col>
                </v-row>
        </div>
    </div>
</template>

<script>
export default {
  name: "TextareasRows",

  data: () => ({
  })
};
</script>