<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- DatePickersRange -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Date picker can select date <code>range</code> with the <code>range</code> prop. When using range prop date picker expects its model to be an array of length 2 or empty.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-row>
                <v-col cols="12" sm="6">
                <v-date-picker v-model="dates" range></v-date-picker>
                </v-col>
                <v-col cols="12" sm="6">
                <v-text-field v-model="dateRangeText" label="Date range" prepend-icon="mdi-calendar" readonly></v-text-field>
                model: {{ dates }}
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
export default {
  name: "DatePickersRange",

  data: () => ({
      dates: ['2019-09-10', '2019-09-20'],
  }),
  computed: {
      dateRangeText () {
        return this.dates.join(' ~ ')
      },
    },
};
</script>