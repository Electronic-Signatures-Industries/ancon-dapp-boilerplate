<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- TimelineIconDots -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Conditionally use icons within the <code>v-timeline-item</code>'s dot to provide additional context.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-timeline align-top :dense="$vuetify.breakpoint.smAndDown">
                <v-timeline-item
                v-for="(item, i) in items"
                :key="i"
                :color="item.color"
                :icon="item.icon"
                fill-dot
                >
                <v-card
                    :color="item.color"
                    dark
                >
                    <v-card-title class="title">Lorem Ipsum Dolor</v-card-title>
                    <v-card-text class="white text--primary">
                    <p>Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.</p>
                    <v-btn
                        :color="item.color"
                        class="mx-0"
                        outlined
                    >
                        Button
                    </v-btn>
                    </v-card-text>
                </v-card>
                </v-timeline-item>
            </v-timeline>
        </div>
    </div>
</template>

<script>
export default {
  name: "TimelineIconDots",

  data: () => ({
     items: [
        {
          color: 'error lighten-2',
          icon: 'mdi-star',
        },
        {
          color: 'info darken-1',
          icon: 'mdi-book-variant',
        },
        {
          color: 'success lighten-1',
          icon: 'mdi-airballoon',
        },
        {
          color: 'indigo',
          icon: 'mdi-buffer',
        },
      ],
  })
};
</script>