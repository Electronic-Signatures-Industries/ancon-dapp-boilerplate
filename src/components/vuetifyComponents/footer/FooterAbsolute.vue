<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Footer Absolute -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        The <code>absolute</code> prop positions footers absolutely at the bottom of their parent container.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-card height="150">
                <v-footer
                absolute
                class="font-weight-medium"
                >
                <v-col
                    class="text-center"
                    cols="12"
                >
                    {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
                </v-col>
                </v-footer>
            </v-card>
        </div>
    </div>
</template>

<script>
export default {
  name: "FooterAbsolute",

  data: () => ({
  })
};
</script>