<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- TimelineAvatarDots -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Insert avatars into dots with use of the <code>icon</code> slot and <code>v-avatar</code>.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-timeline>
                <v-timeline-item
                v-for="n in 4"
                :key="n"
                large
                >
                <template v-slot:icon>
                    <v-avatar>
                    <img src="http://i.pravatar.cc/64">
                    </v-avatar>
                </template>
                <template v-slot:opposite>
                    <span>Tus eu perfecto</span>
                </template>
                <v-card class="elevation-2">
                    <v-card-title class="headline">Lorem ipsum</v-card-title>
                    <v-card-text>Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.</v-card-text>
                </v-card>
                </v-timeline-item>
            </v-timeline>
        </div>
    </div>
</template>

<script>
export default {
  name: "TimelineAvatarDots",

  data: () => ({
     
  })
};
</script>