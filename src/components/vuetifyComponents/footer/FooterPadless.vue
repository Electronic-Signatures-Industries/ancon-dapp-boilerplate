<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Padless Footer -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        The <code>padless</code> prop removes all default padding from the footer component.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-footer padless>
                <v-col
                class="text-center"
                cols="12"
                >
                {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
                </v-col>
            </v-footer>
        </div>
    </div>
</template>

<script>
export default {
  name: "FooterPadless",

  data: () => ({
  })
};
</script>