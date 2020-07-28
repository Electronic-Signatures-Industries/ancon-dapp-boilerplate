<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Icon click event -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        VBanner emits <code>click:icon</code> event on icon click, even with custom icon slot.
        </v-list-item-subtitle>
        <div class="mt-4">
        <v-banner single-line @click:icon="alert">
            <v-icon
            slot="icon"
            color="warning"
            size="36"
            >
            mdi-wifi-strength-alert-outline
            </v-icon>
            Unable to verify your Internet connection

            <template v-slot:actions>
            <v-btn
                color="primary"
                text
            >
                Connecting Settings
            </v-btn>
            </template>
        </v-banner>
        </div>
    </div>
</template>

<script>
export default {
  name: "BannerIconClickEvent",

  data: () => ({
      
  }),
  methods: {
      alert () {
        alert('Hello, World!')
      },
    }
};
</script>