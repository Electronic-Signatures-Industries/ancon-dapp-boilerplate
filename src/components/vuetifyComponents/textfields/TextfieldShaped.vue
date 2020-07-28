<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- TextfieldShaped -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           <code>shaped</code> text fields are rounded if they're <code>outlined</code> and have higher <code>border-radius</code> if <code>filled</code>.
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
                        shaped
                    ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6">
                    <v-text-field
                        v-model="last"
                        label="Last Name"
                        filled
                        shaped
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
  name: "TextfieldShaped",

  data: () => ({
      first: 'John',
      last: 'Doe',
  })
};
</script>