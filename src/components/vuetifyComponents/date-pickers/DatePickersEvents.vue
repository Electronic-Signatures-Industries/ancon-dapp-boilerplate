<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- DatePickersEvents -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        You can specify events using arrays, objects or functions. To change the default color of the event use event-color prop. Your events function or object can return an array of colors (material or css) in case you want to display multiple event indicators.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-row justify="space-between" class="pa-4">
                <div>
                <div class="subheading">Defined by array</div>
                <v-date-picker
                    v-model="date1"
                    :events="arrayEvents"
                    event-color="success"
                ></v-date-picker>
                </div>
                <div>
                <div class="subheading">Defined by function</div>
                <v-date-picker
                    v-model="date2"
                    :event-color="date => date[9] % 2 ? 'error' : 'warning'"
                    :events="functionEvents"
                ></v-date-picker>
                </div>
            </v-row>
        </div>
    </div>
</template>

<script>
export default {
  name: "DatePickersEvents",

  data: () => ({
      arrayEvents: null,
      date1: new Date().toISOString().substr(0, 10),
      date2: new Date().toISOString().substr(0, 10),
  }),
    mounted () {
      this.arrayEvents = [...Array(6)].map(() => {
        const day = Math.floor(Math.random() * 30)
        const d = new Date()
        d.setDate(day)
        return d.toISOString().substr(0, 10)
      })
    },

    methods: {
      functionEvents (date) {
        const [,, day] = date.split('-')
        if ([12, 17, 28].includes(parseInt(day, 10))) return true
        if ([1, 19, 22].includes(parseInt(day, 10))) return ['error', '#00f']
        return false
      },
    },
};
</script>