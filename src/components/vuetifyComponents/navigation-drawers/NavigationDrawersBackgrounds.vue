<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- NavigationDrawersBackgrounds -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Apply a custom background to your drawer. If you need to customize <code>v-img</code>'s properties you can use the <span class="grey--text text--darken-4 font-weight-bold">img</span> slot.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-card
                class="mx-auto"
                height="300"
                width="300"
            >
                <v-navigation-drawer
                absolute
                dark
                src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
                width="100%"
                permanent
                >
                <v-list>
                    <v-list-item
                    v-for="([icon, text], i) in items"
                    :key="i"
                    link
                    >
                    <v-list-item-icon>
                        <v-icon>{{ icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ text }}</v-list-item-title>
                    </v-list-item-content>
                    </v-list-item>
                </v-list>
                </v-navigation-drawer>
            </v-card>
        </div>
    </div>
</template>

<script>
export default {
  name: "NavigationDrawersBackgrounds",

  data: () => ({
      items: [
        ['mdi-email', 'Inbox'],
        ['mdi-account-supervisor-circle', 'Supervisors'],
        ['mdi-clock-start', 'Clock-in'],
      ],
  })
};
</script>