<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- TimelineSmallDots -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        The <code>small</code> prop allows alternate styles to provide a unique design.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-timeline :dense="$vuetify.breakpoint.smAndDown">
                <v-timeline-item
                color="info lighten-2"
                fill-dot
                right
                >
                <v-card>
                    <v-card-title class="info lighten-2">
                    <v-icon
                        dark
                        size="42"
                        class="mr-4"
                    >
                        mdi-magnify
                    </v-icon>
                    <h2 class="display-1 white--text font-weight-light">Title 1</h2>
                    </v-card-title>
                    <v-container>
                    <v-row>
                        <v-col cols="12" md="10">
                        Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit.
                        </v-col>
                        <v-col
                        class="hidden-sm-and-down text-right"
                        md="2"
                        >
                        <v-icon size="64">mdi-calendar-text</v-icon>
                        </v-col>
                    </v-row>
                    </v-container>
                </v-card>
                </v-timeline-item>

                <v-timeline-item
                color="warning lighten-1"
                fill-dot
                left
                small
                >
                <v-card>
                    <v-card-title class="warning lighten-1 justify-end">
                    <h2 class="display-1 mr-4 white--text font-weight-light">Title 2</h2>
                    <v-icon
                        dark
                        size="42"
                    >mdi-home-outline</v-icon>
                    </v-card-title>
                    <v-container>
                    <v-row>
                        <v-col cols="12" md="8">
                        Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit.
                        </v-col>
                        <v-col cols="12" md="4">
                        Lorem ipsum dolor sit amet, no nam oblique veritus.
                        </v-col>
                    </v-row>
                    </v-container>
                </v-card>
                </v-timeline-item>

                <v-timeline-item
                color="success lighten-1"
                fill-dot
                right
                >
                <v-card>
                    <v-card-title class="success lighten-1">
                    <v-icon
                        class="mr-4"
                        dark
                        size="42"
                    >
                        mdi-email-outline
                    </v-icon>
                    <h2 class="display-1 white--text font-weight-light">Title 3</h2>
                    </v-card-title>
                    <v-container>
                    <v-row>
                        <v-col
                        v-for="n in 3"
                        :key="n"
                        cols="12"
                        md="4"
                        >
                        Lorem ipsum dolor sit amet, no nam oblique veritus no nam oblique.
                        </v-col>
                    </v-row>
                    </v-container>
                </v-card>
                </v-timeline-item>

                <v-timeline-item
                color="error lighten-1"
                fill-dot
                left
                small
                >
                <v-card>
                    <v-card-title class="error lighten-1 justify-end">
                    <h2 class="display-1 mr-4 white--text font-weight-light">Title 4</h2>
                    <v-icon
                        dark
                        size="42"
                    >
                        mdi-account-multiple-outline
                    </v-icon>
                    </v-card-title>
                    <v-container>
                    <v-row>
                        <v-col class="hidden-sm-and-down" md="2">
                        <v-icon size="64">mdi-server-network</v-icon>
                        </v-col>
                        <v-col cols="12" md="10">
                        Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus.
                        </v-col>
                    </v-row>
                    </v-container>
                </v-card>
                </v-timeline-item>

                <v-timeline-item
                color="indigo lighten-1"
                fill-dot
                right
                >
                <v-card>
                    <v-card-title class="indigo lighten-1">
                    <v-icon
                        class="mr-4"
                        dark
                        size="42"
                    >
                        mdi-phone-in-talk
                    </v-icon>
                    <h2 class="display-1 white--text font-weight-light">Title 5</h2>
                    </v-card-title>
                    <v-container>
                    <v-row>
                        <v-col>
                        Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.
                        </v-col>
                    </v-row>
                    </v-container>
                </v-card>
                </v-timeline-item>
            </v-timeline>
        </div>
    </div>
</template>

<script>
export default {
  name: "TimelineSmallDots",

  data: () => ({
     
  })
};
</script>