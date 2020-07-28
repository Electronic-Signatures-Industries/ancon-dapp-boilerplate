<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Horizontal -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Using <code>v-flex</code>, you can create customized horizontal cards. Use the <code>contain</code> property to shrink the <code>v-img</code> to fit inside the container, instead of covering.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-card
                max-width="400"
                class="mx-auto"
            >
                <v-system-bar
                color="info darken-2"
                dark
                >
                <v-spacer></v-spacer>

                <v-icon>mdi-window-minimize</v-icon>

                <v-icon>mdi-window-maximize</v-icon>

                <v-icon>mdi-close</v-icon>
                </v-system-bar>

                <v-app-bar
                dark
                color="info"
                >
                <v-app-bar-nav-icon></v-app-bar-nav-icon>

                <v-toolbar-title>My Music</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn icon>
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>
                </v-app-bar>

                <v-container>
                <v-row dense>
                    <v-col cols="12">
                    <v-card
                        color="info"
                        dark
                    >
                        <v-card-title class="headline">Unlimited music now</v-card-title>

                        <v-card-subtitle>Listen to your favorite artists and albums whenever and wherever, online and offline.</v-card-subtitle>

                        <v-card-actions>
                        <v-btn text>Listen Now</v-btn>
                        </v-card-actions>
                    </v-card>
                    </v-col>

                    <v-col
                    v-for="(item, i) in items"
                    :key="i"
                    cols="12"
                    >
                    <v-card
                        :color="item.color"
                        dark
                    >
                        <div class="d-flex flex-no-wrap justify-space-between">
                        <div>
                            <v-card-title
                            class="headline"
                            v-text="item.title"
                            ></v-card-title>

                            <v-card-subtitle v-text="item.artist"></v-card-subtitle>
                        </div>

                        <v-avatar
                            class="ma-3"
                            size="125"
                            tile
                        >
                            <v-img :src="item.src"></v-img>
                        </v-avatar>
                        </div>
                    </v-card>
                    </v-col>
                </v-row>
                </v-container>
            </v-card>
        </div>
    </div>
</template>


<script>
export default {
  name: "CardHorizontal",

  data: () => ({
      items: [
        {
          color: 'warning',
          src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          title: 'Supermodel',
          artist: 'Foster the People',
        },
        {
          color: 'success',
          src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
          title: 'Halcyon Days',
          artist: 'Ellie Goulding',
        },
      ],
  })
};
</script>