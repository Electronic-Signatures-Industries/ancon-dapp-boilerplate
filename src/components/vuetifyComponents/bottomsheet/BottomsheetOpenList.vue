<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Open in list -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        By combining a functional list into a bottom sheet, you can create a simple 'open in' component.
        </v-list-item-subtitle>
        <div class="mt-4 text-center">
            <v-bottom-sheet v-model="sheet">
                <template v-slot:activator="{ on }">
                    <v-btn
                    color="info"
                    dark
                    v-on="on"
                    >
                    Open In
                    </v-btn>
                </template>
                <v-list>
                    <v-subheader>Open in</v-subheader>
                    <v-list-item
                    v-for="tile in tiles"
                    :key="tile.title"
                    @click="sheet = false"
                    >
                    <v-list-item-avatar>
                        <v-avatar size="32px" tile>
                        <img
                            :src="`https://cdn.vuetifyjs.com/images/bottom-sheets/${tile.img}`"
                            :alt="tile.title"
                        >
                        </v-avatar>
                    </v-list-item-avatar>
                    <v-list-item-title>{{ tile.title }}</v-list-item-title>
                    </v-list-item>
                </v-list>
                </v-bottom-sheet>
        </div>
    </div>
</template>

<script>
export default {
  name: "BottomsheetOpenList",

  data: () => ({
      sheet: false,
      tiles: [
        { img: 'keep.png', title: 'Keep' },
        { img: 'inbox.png', title: 'Inbox' },
        { img: 'hangouts.png', title: 'Hangouts' },
        { img: 'messenger.png', title: 'Messenger' },
        { img: 'google.png', title: 'Google+' },
      ],
  })
};
</script>