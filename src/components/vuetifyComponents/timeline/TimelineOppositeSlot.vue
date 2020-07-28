<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- TimelineOppositeSlot -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        The opposite slot provides an additional layer of customization within your timelines.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-timeline class="pa-4">
                <v-timeline-item
                v-for="(year, i) in years"
                :key="i"
                :color="year.color"
                small
                >
                <template v-slot:opposite>
                    <span
                    :class="`headline font-weight-medium ${year.color}--text`"
                    v-text="year.year"
                    ></span>
                </template>
                <div class="py-4">
                    <h2 :class="`headline font-weight-light mb-4 ${year.color}--text`">Lorem ipsum</h2>
                    <div>
                    Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.
                    </div>
                </div>
                </v-timeline-item>
            </v-timeline>
        </div>
    </div>
</template>

<script>
export default {
  name: "TimelineOppositeSlot",

  data: () => ({
     years: [
        {
          color: 'success',
          year: '1960',
        },
        {
          color: 'error',
          year: '1970',
        },
        {
          color: 'info',
          year: '1980',
        },
        {
          color: 'indigo',
          year: '1990',
        },
        {
          color: 'warning',
          year: '2000',
        },
      ],
  })
};
</script>