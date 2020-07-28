<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Themes -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Dark or light theme variants can be applied to <code>v-system-bar</code>.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-subheader>Light status bar</v-subheader>
            <v-card img="https://cdn.vuetifyjs.com/images/home/vuetify_layout1.svg" height="200px">
                <v-system-bar color="primary">
                    <v-spacer></v-spacer>
                    <v-icon>mdi-wifi-strength-4</v-icon>
                    <v-icon>mdi-signal-cellular-outline</v-icon>
                    <v-icon>mdi-battery</v-icon>
                    <span>12:30</span>
                </v-system-bar>
            </v-card>
            <v-subheader>Dark status bar</v-subheader>
            <v-card img="https://cdn.vuetifyjs.com/images/home/vuetify_layout1.svg" height="200px">
                <v-system-bar color="primary" dark>
                    <v-spacer></v-spacer>
                    <v-icon>mdi-wifi-strength-4</v-icon>
                    <v-icon>mdi-signal-cellular-outline</v-icon>
                    <v-icon>mdi-battery</v-icon>
                    <span>12:30</span>
                </v-system-bar>
            </v-card>
        </div>
    </div>
</template>

<script>
export default {
  name: "SystembarThemes",

  data: () => ({
  })
};
</script>