<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- HoverDisabled -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           The <code>disabled</code> prop disables the hover functionality.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-hover
                v-slot:default="{ hover }"
                disabled
            >
                <v-card
                :elevation="hover ? 12 : 2"
                class="mx-auto"
                height="350"
                max-width="350"
                >
                <v-card-text class="my-4 text-center title">Hover over me!</v-card-text>
                </v-card>
            </v-hover>
        </div>
    </div>
</template>

<script>
export default {
  name: "HoverDisabled",

  data: () => ({
  }),
};
</script>