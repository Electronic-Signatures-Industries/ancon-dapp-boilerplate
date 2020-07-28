<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- DatePickersReactMonthYearChange -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
            You can watch the <code>pickerDate</code> which is the displayed month/year (depending on the picker type and active view) to perform some action when it changes.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-row class="pa-4">
                <v-col cols="12" sm="6" class="my-2 px-1">
                <v-date-picker
                    ref="picker"
                    v-model="date"
                    :picker-date.sync="pickerDate"
                    full-width
                ></v-date-picker>
                </v-col>
                <v-col cols="12" sm="6" class="my-2 px-1">
                <div class="title">Month news ({{ pickerDate || 'change month...' }})</div>
                <div class="subheading">Change month to see other news</div>
                <ul class="ma-4">
                    <li v-for="note in notes" :key="note">{{ note }}</li>
                </ul>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
export default {
  name: "DatePickersReactMonthYearChange",

  data: () => ({
      date: new Date().toISOString().substr(0, 10),
      pickerDate: null,
      notes: [],
      allNotes: [
        'President met with prime minister',
        'New power plant opened',
        'Rocket launch announced',
        'Global warming discussion cancelled',
        'Company changed its location',
      ],
  }),
  watch: {
      pickerDate () {
        this.notes = [
          this.allNotes[Math.floor(Math.random() * 5)],
          this.allNotes[Math.floor(Math.random() * 5)],
          this.allNotes[Math.floor(Math.random() * 5)],
        ].filter((value, index, self) => self.indexOf(value) === index)
      },
    },
};
</script>