<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- TextfieldDisabledReadonly -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           Text fields can be <code>disabled</code> or <code>readonly</code>.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-form>
                <v-container>
                <v-row>

                    <v-col cols="12" sm="6">
                    <v-text-field
                        value="John Doe"
                        label="Regular"
                        disabled
                    ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6">
                    <v-text-field
                        value="John Doe"
                        label="Regular"
                        readonly
                    ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6">
                    <v-text-field
                        value="John Doe"
                        label="Solo"
                        solo
                        disabled
                    ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6">
                    <v-text-field
                        value="John Doe"
                        label="Solo"
                        solo
                        readonly
                    ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6">
                    <v-text-field
                        value="John Doe"
                        label="Filled"
                        filled
                        disabled
                    ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6">
                    <v-text-field
                        value="John Doe"
                        label="Filled"
                        filled
                        readonly
                    ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6">
                    <v-text-field
                        value="John Doe"
                        label="Outlined"
                        outlined
                        disabled
                    ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6">
                    <v-text-field
                        value="John Doe"
                        label="Outlined"
                        outlined
                        readonly
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
  name: "TextfieldDisabledReadonly",

  data: () => ({
  })
};
</script>