<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Customization options -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        The <code>v-badge</code> component is flexible and can be used in a variety of use-cases over numerous elements. Options to tweak the location are also available through the <span class="grey--text text--darken-4 font-weight-bold">offset-x</span> and <span class="grey--text text--darken-4 font-weight-bold">offset-y</span> props.
        </v-list-item-subtitle>
        <div class="mt-4 text-center">
        <v-row
            align="center"
            justify="center"
            >
            <v-badge
                bordered
                color="error"
                icon="mdi-lock"
                overlap
            >
                <v-btn
                class="white--text"
                color="error"
                depressed
                >
                Lock Account
                </v-btn>
            </v-badge>

            <div class="mx-3"></div>

            <v-badge
                bordered
                bottom
                color="info"
                dot
                offset-x="10"
                offset-y="10"
            >
                <v-avatar size="40">
                <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"></v-img>
                </v-avatar>
            </v-badge>

            <div class="mx-3"></div>

            <v-badge
                avatar
                bordered
                overlap
            >
                <template v-slot:badge>
                <v-avatar>
                    <v-img src="https://cdn.vuetifyjs.com/images/logos/v.png"></v-img>
                </v-avatar>
                </template>

                <v-avatar size="40">
                <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
                </v-avatar>
            </v-badge>
            </v-row>
        </div>
    </div>
</template>

<script>
export default {
  name: "BadgeCustomization",

  data: () => ({
  })
};
</script>