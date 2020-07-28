<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- TextfieldOutlineStyle -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           Text fields can be used with an alternative outlined design.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-form>
                <v-container>
                <v-row>

                    <v-col cols="12" sm="6">
                    <v-text-field
                        v-model="first"
                        label="First Name"
                        outlined
                    ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6">
                    <v-text-field
                        v-model="last"
                        label="Last Name"
                        outlined
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
  name: "TextfieldOutlineStyle",

  data: () => ({
      first: 'John',
      last: 'Doe',
  })
};
</script>