<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Label -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Label chips use the <code>v-card</code> border-radius.
        </v-list-item-subtitle>
        <div class="mt-4">
            <div class="text-center">
                <v-chip
                class="ma-2"
                label
                >
                Label
                </v-chip>

                <v-chip
                class="ma-2"
                color="error"
                label
                text-color="white"
                >
                <v-icon left>mdi-label</v-icon>
                Tags
                </v-chip>

                <v-chip
                class="ma-2"
                color="primary"
                label
                >
                <v-icon left>mdi-account-circle-outline</v-icon>
                John Leider
                </v-chip>

                <v-chip
                class="ma-2"
                close
                color="cyan"
                label
                text-color="white"
                >
                <v-icon left>mdi-twitter</v-icon>
                New Tweets
                </v-chip>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "ChipsLabel",

  data: () => ({
  })
};
</script>