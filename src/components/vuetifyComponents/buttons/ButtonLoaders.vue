<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Loaders -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Using the loading prop, you can notify a user that there is processing taking place. The default behavior is to use a v-progress-circular component but this can be customized.
        </v-list-item-subtitle>
        <div class="mt-4 text-center">
            <v-btn
                class="ma-2"
                :loading="loading"
                :disabled="loading"
                color="success"
                @click="loader = 'loading'"
                >
                Accept Terms
                </v-btn>

                <v-btn
                :loading="loading3"
                :disabled="loading3"
                color="info"
                class="ma-2 white--text"
                @click="loader = 'loading3'"
                >
                Upload
                <v-icon right dark>mdi-cloud-upload</v-icon>
                </v-btn>

                <v-btn
                class="ma-2"
                :loading="loading2"
                :disabled="loading2"
                color="warning"
                @click="loader = 'loading2'"
                >
                Custom Loader
                <template v-slot:loader>
                    <span>Loading...</span>
                </template>
                </v-btn>

                <v-btn
                class="ma-2"
                :loading="loading4"
                :disabled="loading4"
                color="info"
                @click="loader = 'loading4'"
                >
                Icon Loader
                <template v-slot:loader>
                    <span class="custom-loader">
                    <v-icon light>mdi-reload</v-icon>
                    </span>
                </template>
                </v-btn>

                <v-btn
                :loading="loading5"
                :disabled="loading5"
                color="error"
                class="ma-2 white--text"
                fab
                @click="loader = 'loading5'"
                >
                <v-icon dark>mdi-cloud-upload</v-icon>
                </v-btn>
        </div>
    </div>
</template>

<script>
export default {
  name: "ButtonLoaders",

  data: () => ({
        loader: null,
        loading: false,
        loading2: false,
        loading3: false,
        loading4: false,
        loading5: false,
  }),
  watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
      },
    },
};
</script>