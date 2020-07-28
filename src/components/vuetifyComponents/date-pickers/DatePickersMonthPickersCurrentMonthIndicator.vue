<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- DatePickersMonthPickersCurrentMonthIndicator -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        By default the current month is displayed using outlined button - show-current prop allows you to remove the border or select different month to be displayed as the current one.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-row justify="space-around">
                <v-date-picker v-model="month1" :show-current="false" type="month"></v-date-picker>
                <v-date-picker v-model="month2" type="month" show-current="2013-07"></v-date-picker>
            </v-row>
        </div>
    </div>
</template>

<script>
export default {
  name: "DatePickersMonthPickersCurrentMonthIndicator",

  data: () => ({
      month1: new Date().toISOString().substr(0, 7),
        month2: '2013-09',
  })
};
</script>