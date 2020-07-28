<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- SnackbarTimeout -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        The <code>timeout</code> property lets you customize the delay before the <code>v-snackbar</code> is hidden.
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
            :timeout="timeout"
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
  name: "SnackbarTimeout",

  data: () => ({
      snackbar: false,
      text: 'My timeout is set to 2000.',
      timeout: 2000,
  })
};
</script>