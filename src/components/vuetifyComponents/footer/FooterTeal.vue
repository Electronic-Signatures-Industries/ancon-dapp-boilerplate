<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Teal Footer -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        The footer component with a Teal color header and columns and rows of links.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-footer
                dark
                padless
            >
                <v-card
                class="flex"
                flat
                tile
                >
                <v-card-title class="teal">
                    <strong class="subheading">Get connected with us on social networks!</strong>

                    <v-spacer></v-spacer>

                    <v-btn
                    v-for="icon in icons"
                    :key="icon"
                    class="mx-4"
                    dark
                    icon
                    >
                    <v-icon size="24px">{{ icon }}</v-icon>
                    </v-btn>
                </v-card-title>

                <v-card-text class="py-2 white--text text-center">
                    {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
                </v-card-text>
                </v-card>
            </v-footer>
        </div>
    </div>
</template>

<script>
export default {
  name: "FooterTeal",

  data: () => ({
      icons: [
        'fab fa-facebook',
        'fab fa-twitter',
        'fab fa-google-plus',
        'fab fa-linkedin',
        'fab fa-instagram',
      ],
  })
};
</script>