<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- ImagesFixedRatio -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           You can set a fixed aspect ratio if you want to change aspect ratio of the image.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-slider v-model="width" min="200" max="500" step="1"></v-slider>
            <v-navigation-drawer
            :width="width"
            :value="true"
            stateless
            >
            <v-img :aspect-ratio="16/9" src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
                <v-row align="end" class="lightbox white--text pa-2 fill-height">
                <v-col>
                    <div class="subheading">Jonathan Lee</div>
                    <div class="body-1">heyfromjonathan@gmail.com</div>
                </v-col>
                </v-row>
            </v-img>

            <v-list>
                <template v-for="(item, i) in items">
                <v-divider v-if="item.divider" :key="i"></v-divider>
                <v-list-item v-else :key="item.title">
                    <v-list-item-action>
                    <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
                </template>
            </v-list>
            </v-navigation-drawer>
        </div>
    </div>
</template>

<style scoped>
  .v-navigation-drawer {
    transition: none !important;
  }

  .lightbox {
    box-shadow: 0 0 20px inset rgba(0, 0, 0, 0.2);
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 72px);
  }
</style>

<script>
export default {
  name: "ImagesFixedRatio",

  data: () => ({
      width: 300,
      items: [
        { icon: 'mdi-email-outline', title: 'Inbox' },
        { icon: 'mdi-star-outline', title: 'Starred' },
        { icon: 'mdi-send', title: 'Sent mail' },
        { icon: 'mdi-email-open', title: 'Drafts' },
        { divider: true },
        { icon: 'mdi-email-open', title: 'All mail' },
        { icon: 'mdi-delete', title: 'Trash' },
        { icon: 'mdi-alert-circle-outline', title: 'Spam' },
      ],
  }),
};
</script>