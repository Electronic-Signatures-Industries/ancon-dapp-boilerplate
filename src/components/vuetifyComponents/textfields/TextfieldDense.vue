<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- TextfieldDense -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           You can reduces the text field height with <code>dense</code> prop.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-form>
                <v-container>
                <v-row>

                    <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        dense
                        label="Regular"
                    ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        label="Filled"
                        filled
                        dense
                    ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        label="Filled"
                        placeholder="Dense & Rounded"
                        filled
                        rounded
                        dense
                    ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        label="Solo"
                        solo
                        dense
                    ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        label="Outlined"
                        outlined
                        dense
                    ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        label="Outlined"
                        placeholder="Placeholder"
                        outlined
                        dense
                    ></v-text-field>
                    </v-col>

                </v-row>
                </v-container>
            </v-form>
        </div>
    </div>
</template>

<script>
export default {
  name: "TextfieldDense",

  data: () => ({
  })
};
</script>