<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- DatePickersMonthPickersAllowedMonth -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        You can specify allowed months using arrays, objects or functions.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-row justify="center">
                <v-date-picker
                v-model="date"
                :allowed-dates="allowedMonths"
                type="month"
                class="mt-4"
                min="2017-06"
                max="2019-10"
                ></v-date-picker>
            </v-row>
        </div>
    </div>
</template>

<script>
export default {
  name: "DatePickersMonthPickersAllowedMonth",

  data: () => ({
      date: '2017-12',
  }),
  methods: {
      allowedMonths: val => parseInt(val.split('-')[1], 10) % 2 === 0,
    },
};
</script>