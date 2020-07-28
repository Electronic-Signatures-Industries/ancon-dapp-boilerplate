<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- TextfieldClearable -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           When <code>clearable</code>, you can customize the clear icon with <code>clear-icon</code>.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-form>
                <v-container>
                <v-row>

                    <v-col cols="12" sm="6">
                    <v-text-field
                        v-model="message1"
                        label="Regular"
                        clearable
                    ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6">
                    <v-text-field
                        v-model="message2"
                        solo
                        label="Solo"
                        clearable
                    ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6">
                    <v-text-field
                        v-model="message3"
                        filled
                        label="Filled"
                        clearable
                    ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6">
                    <v-text-field
                        v-model="message4"
                        label="Outlined"
                        outlined
                        clearable
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
  name: "TextfieldClearable",

  data: () => ({
      message1: 'Hey!',
        message2: 'Hey!',
        message3: 'Hey!',
        message4: 'Hey!',
  })
};
</script>