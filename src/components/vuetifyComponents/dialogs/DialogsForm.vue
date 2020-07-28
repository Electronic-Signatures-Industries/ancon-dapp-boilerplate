<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Form -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
       <v-list-item-subtitle class="text-wrap">
        Just a simple example of a form in a dialog.
        </v-list-item-subtitle>
        <div class="mt-4 text-center">
            <v-dialog v-model="dialog" persistent max-width="600px">
                <template v-slot:activator="{ on }">
                    <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
                </template>
                <v-card>
                    <v-card-title>
                    <span class="headline">User Profile</span>
                    </v-card-title>
                    <v-card-text>
                    <v-container>
                        <v-row>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field label="Legal first name*" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field label="Legal middle name" hint="example of helper text only on focus"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field
                            label="Legal last name*"
                            hint="example of persistent helper text"
                            persistent-hint
                            required
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="Email*" required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="Password*" type="password" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-select
                            :items="['0-17', '18-29', '30-54', '54+']"
                            label="Age*"
                            required
                            ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-autocomplete
                            :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                            label="Interests"
                            multiple
                            ></v-autocomplete>
                        </v-col>
                        </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" text @click="dialog = false">Close</v-btn>
                    <v-btn color="success" text @click="dialog = false">Save</v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
        </div>
    </div>
</template>

<script>
export default {
  name: "DialogsForm",

  data: () => ({
      dialog: false,
  })
};
</script>