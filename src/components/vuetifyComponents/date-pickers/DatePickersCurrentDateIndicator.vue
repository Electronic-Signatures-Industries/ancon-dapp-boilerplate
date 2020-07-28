<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- DatePickersCurrentDateIndicator -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
            By default the current date is displayed using outlined button - show-current prop allows you to remove the border or select different date to be displayed as the current one.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-row justify="space-around">
                <v-date-picker v-model="date1" :show-current="false"></v-date-picker>
                <v-date-picker v-model="date2" show-current="2013-07-13"></v-date-picker>
            </v-row>
        </div>
    </div>
</template>

<script>
export default {
  name: "DatePickersCurrentDateIndicator",

  data: () => ({
      date1: new Date().toISOString().substr(0, 10),
        date2: '2013-07-29',
  })
};
</script>