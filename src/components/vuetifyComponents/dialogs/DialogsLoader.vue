<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Loader -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
       <v-list-item-subtitle class="text-wrap">
        The <code>v-dialog</code> component makes it easy to create a customized loading experience for your application.
        </v-list-item-subtitle>
        <div class="mt-4 text-center">
            <v-btn
                :disabled="dialog"
                :loading="dialog"
                class="white--text"
                color="info"
                @click="dialog = true"
                >
                Start loading
                </v-btn>
                <v-dialog
                v-model="dialog"
                hide-overlay
                persistent
                width="300"
                >
                <v-card
                    color="primary"
                    dark
                >
                    <v-card-text>
                    Please stand by
                    <v-progress-linear
                        indeterminate
                        color="white"
                        class="mb-0"
                    ></v-progress-linear>
                    </v-card-text>
                </v-card>
                </v-dialog>
        </div>
    </div>
</template>

<script>
export default {
  name: "DialogsLoader",

  data: () => ({
      dialog: false,
  }),
  watch: {
      dialog (val) {
        if (!val) return

        setTimeout(() => (this.dialog = false), 4000)
      },
    }
};
</script>