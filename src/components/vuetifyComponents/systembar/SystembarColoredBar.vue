<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Colored bar -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        You can optionally change the color of the <code>v-system-bar</code> by using the <code>color</code> prop.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-system-bar dark color="primary">
            <v-spacer></v-spacer>
            <v-icon>mdi-wifi-strength-4</v-icon>
            <v-icon>mdi-signal-cellular-outline</v-icon>
            <v-icon>mdi-battery</v-icon>
            <span>12:30</span>
            </v-system-bar>
            <br>
            <v-system-bar dark color="success">
            <v-spacer></v-spacer>
            <v-icon>mdi-wifi-strength-4</v-icon>
            <v-icon>mdi-signal-cellular-outline</v-icon>
            <v-icon>mdi-battery</v-icon>
            <span>12:30</span>
            </v-system-bar>
            <br>
            <v-system-bar dark color="warning">
            <v-spacer></v-spacer>
            <v-icon>mdi-wifi-strength-4</v-icon>
            <v-icon>mdi-signal-cellular-outline</v-icon>
            <v-icon>mdi-battery</v-icon>
            <span>12:30</span>
            </v-system-bar>
        </div>
    </div>
</template>

<script>
export default {
  name: "SystembarColoredBar",

  data: () => ({
  })
};
</script>