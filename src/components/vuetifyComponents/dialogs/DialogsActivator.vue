<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Without activator -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
       <v-list-item-subtitle class="text-wrap">
        If for some reason you are unable to use the activator slot, be sure to add the <code>.stop</code> modifier to the event that triggers the dialog.
        </v-list-item-subtitle>
        <div class="mt-4 text-center">
            <v-btn
                color="primary"
                dark
                @click.stop="dialog = true"
                >
                Open Dialog
                </v-btn>

                <v-dialog
                v-model="dialog"
                max-width="290"
                >
                <v-card>
                    <v-card-title class="headline">Use Google's location service?</v-card-title>

                    <v-card-text>
                    Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
                    </v-card-text>

                    <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        color="error"
                        text
                        @click="dialog = false"
                    >
                        Disagree
                    </v-btn>

                    <v-btn
                        color="success"
                        text
                        @click="dialog = false"
                    >
                        Agree
                    </v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
        </div>
    </div>
</template>

<script>
export default {
  name: "DialogsActivator",

  data: () => ({
      dialog: false,
  })
};
</script>