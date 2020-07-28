<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Modal -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
       <v-list-item-subtitle class="text-wrap">
        Similar to a Simple Dialog, except that it's not dismissed when touching outside.
        </v-list-item-subtitle>
        <div class="mt-4 text-center">
            <v-dialog v-model="dialog" persistent max-width="290">
                <template v-slot:activator="{ on }">
                    <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
                </template>
                <v-card>
                    <v-card-title class="headline">Use Google's location service?</v-card-title>
                    <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" text @click="dialog = false">Disagree</v-btn>
                    <v-btn color="success" text @click="dialog = false">Agree</v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
        </div>
    </div>
</template>

<script>
export default {
  name: "DialogsModal",

  data: () => ({
    dialog: false,
  })
};
</script>