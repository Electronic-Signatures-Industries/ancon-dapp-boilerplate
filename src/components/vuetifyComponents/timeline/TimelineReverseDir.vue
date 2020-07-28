<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- TimelineReverseDir -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        You can reverse the direction of the timeline items by using the <code>reverse</code> prop. This works both in default and <code>dense</code> mode.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-switch v-model="reverse" label="Toggle reverse"></v-switch>
                <v-timeline :reverse="reverse" :dense="$vuetify.breakpoint.smAndDown">
                <v-timeline-item
                    v-for="n in 2"
                    :key="n"
                >
                    <span slot="opposite">Tus eu perfecto</span>
                    <v-card class="elevation-2">
                    <v-card-title class="headline">Lorem ipsum</v-card-title>
                    <v-card-text>
                        Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.
                    </v-card-text>
                    </v-card>
                </v-timeline-item>
                </v-timeline>
                <v-timeline :reverse="reverse" dense>
                <v-timeline-item
                    v-for="n in 2"
                    :key="n"
                >
                    <span slot="opposite">Tus eu perfecto</span>
                    <v-card class="elevation-2">
                    <v-card-title class="headline">Lorem ipsum</v-card-title>
                    <v-card-text>
                        Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.
                    </v-card-text>
                    </v-card>
                </v-timeline-item>
                </v-timeline>
        </div>
    </div>
</template>

<script>
export default {
  name: "TimelineReverseDir",

  data: () => ({
     reverse: true
  })
};
</script>