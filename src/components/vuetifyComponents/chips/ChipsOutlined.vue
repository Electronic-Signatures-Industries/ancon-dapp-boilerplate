<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Outlined -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Outlined chips inherit their border color from the current text color.
        </v-list-item-subtitle>
        <div class="mt-4">
            <div class="text-center">
                <v-chip
                class="ma-2"
                color="success"
                outlined
                >
                <v-icon left>mdi-server-plus</v-icon>
                Server Status
                </v-chip>

                <v-chip
                class="ma-2"
                color="primary"
                outlined
                pill
                >
                User Account
                <v-icon right>mdi-account-outline</v-icon>
                </v-chip>

                <v-chip
                class="ma-2"
                color="error"
                outlined
                >
                <v-icon left>mdi-wrench</v-icon>
                Update Settings
                </v-chip>

                <v-chip
                class="ma-2"
                close
                color="warning"
                outlined
                >
                <v-icon left>mdi-fire</v-icon>
                New Posts Available
                </v-chip>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "ChipsOutlined",

  data: () => ({
  })
};
</script>