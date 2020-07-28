<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- SnackbarVertical -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        The <code>vertical</code> property allows you to stack the content of your <code>v-snackbar</code>.
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
            :vertical="vertical"
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
  name: "SnackbarVertical",

  data: () => ({
      snackbar: false,
      text: 'Lorem ipsum dolor sit amet',
      vertical: true,
  })
};
</script>