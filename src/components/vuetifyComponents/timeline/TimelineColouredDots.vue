<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- TimelineColouredDots -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Colored dots create visual breakpoints that make your timelines easier to read.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-card
                class="mx-auto"
                max-width="400"
            >
                <v-card
                dark
                flat
                >
                <v-btn
                    absolute
                    bottom
                    color="info"
                    right
                    fab
                >
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
                <v-card-title class="pa-2 info lighten-3">
                    <v-btn icon>
                    <v-icon>mdi-menu</v-icon>
                    </v-btn>
                    <h3 class="title font-weight-light text-center grow">Timeline</h3>
                    <v-avatar>
                    <v-img src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"></v-img>
                    </v-avatar>
                </v-card-title>
                <v-img
                    src="https://cdn.vuetifyjs.com/images/cards/forest.jpg"
                    gradient="to top, rgba(0,0,0,.44), rgba(0,0,0,.44)"
                >
                    <v-container class="fill-height">
                    <v-row align="center">
                        <strong class="display-4 font-weight-regular mr-6">8</strong>
                        <v-row justify="end">
                        <div class="headline font-weight-light">Monday</div>
                        <div class="text-uppercase font-weight-light">February 2015</div>
                        </v-row>
                    </v-row>
                    </v-container>
                </v-img>
                </v-card>
                <v-card-text class="py-0">
                <v-timeline
                    align-top
                    dense
                >
                    <v-timeline-item
                    color="info"
                    small
                    >
                    <v-row class="pt-1">
                        <v-col cols="3">
                        <strong>5pm</strong>
                        </v-col>
                        <v-col>
                        <strong>New Icon</strong>
                        <div class="caption">Mobile App</div>
                        </v-col>
                    </v-row>
                    </v-timeline-item>

                    <v-timeline-item
                    color="success lighten-3"
                    small
                    >
                    <v-row class="pt-1">
                        <v-col cols="3">
                        <strong>3-4pm</strong>
                        </v-col>
                        <v-col>
                        <strong>Design Stand Up</strong>
                        <div class="caption mb-2">Hangouts</div>
                        <v-avatar>
                            <v-img
                            src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairFrida&accessoriesType=Kurt&hairColor=Red&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=GraphicShirt&clotheColor=Gray01&graphicType=Skull&eyeType=Wink&eyebrowType=RaisedExcitedNatural&mouthType=Disbelief&skinColor=Brown"
                            ></v-img>
                        </v-avatar>
                        <v-avatar>

                            <v-img
                            src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairFrizzle&accessoriesType=Prescription02&hairColor=Black&facialHairType=MoustacheMagnum&facialHairColor=BrownDark&clotheType=BlazerSweater&clotheColor=Black&eyeType=Default&eyebrowType=FlatNatural&mouthType=Default&skinColor=Tanned"
                            ></v-img>
                        </v-avatar>
                        <v-avatar>
                            <v-img
                            src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairMiaWallace&accessoriesType=Sunglasses&hairColor=BlondeGolden&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Surprised&eyebrowType=RaisedExcited&mouthType=Smile&skinColor=Pale"
                            ></v-img>
                        </v-avatar>
                        </v-col>
                    </v-row>
                    </v-timeline-item>

                    <v-timeline-item
                    color="error"
                    small
                    >
                    <v-row class="pt-1">
                        <v-col cols="3">
                        <strong>12pm</strong>
                        </v-col>
                        <v-col>
                        <strong>Lunch break</strong>
                        </v-col>
                    </v-row>
                    </v-timeline-item>

                    <v-timeline-item
                    color="indigo"
                    small
                    >
                    <v-row class="pt-1">
                        <v-col cols="3">
                        <strong>9-11am</strong>
                        </v-col>
                        <v-col>
                        <strong>Finish Home Screen</strong>
                        <div class="caption">Web App</div>
                        </v-col>
                    </v-row>
                    </v-timeline-item>
                </v-timeline>
                </v-card-text>
            </v-card>
        </div>
    </div>
</template>

<script>
export default {
  name: "TimelineColouredDots",

  data: () => ({
     
  })
};
</script>