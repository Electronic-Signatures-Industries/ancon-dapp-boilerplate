<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- SnackbarMultiline -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        The <code>multi-line</code> property extends the height of the <code>v-snackbar</code> to give you a little more room for content.
        </v-list-item-subtitle>
        <div class="mt-4 text-center">
            <v-btn
                dark
                color="info"
                @click="snackbar = true"
                >
                Open Snackbar
                </v-btn>

                <v-snackbar
                v-model="snackbar"
                :multi-line="multiLine"
                >
                {{ text }}
                <v-btn
                    color="info"
                    text
                    @click="snackbar = false"
                >
                    Close
                </v-btn>
                </v-snackbar>
        </div>
    </div>
</template>

<script>
export default {
  name: "SnackbarMultiline",

  data: () => ({
      multiLine: true,
      snackbar: false,
      text: 'I\'m a multi-line snackbar.',
  })
};
</script>