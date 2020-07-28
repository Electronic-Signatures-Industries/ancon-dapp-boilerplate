<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Profile Card -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Using the <span class="grey--text text--darken-4 font-weight-bold">tile</span> prop, we can create a sleek hard-lined profile card.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-card
                class="mx-auto"
                max-width="434"
                tile
            >
                <v-img
                height="100%"
                src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"
                >
                <v-row
                    align="end"
                    class="fill-height"
                >
                    <v-col
                    align-self="start"
                    class="pa-0"
                    cols="12"
                    >
                    <v-avatar
                        class="profile"
                        color="grey"
                        size="164"
                        tile
                    >
                        <v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
                    </v-avatar>
                    </v-col>
                    <v-col class="py-0">
                    <v-list-item
                        color="rgba(0, 0, 0, .4)"
                        dark
                    >
                        <div class="pa-4">
                        <v-list-item-title class="title">Marcus Obrien</v-list-item-title>
                        <v-list-item-subtitle>Network Engineer</v-list-item-subtitle>
                        </div>
                    </v-list-item>
                    </v-col>
                </v-row>
                </v-img>
            </v-card>
        </div>
    </div>
</template>

<script>
export default {
  name: "AvatarProfileCard",

  data: () => ({
  })
};
</script>