<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- DatePickersMonthPickersReadOnly -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Selecting new date could be disabled by adding readonly prop.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-row justify="center">
                <v-date-picker v-model="date" type="month" readonly></v-date-picker>
            </v-row>
        </div>
    </div>
</template>

<script>
export default {
  name: "DatePickersMonthPickersReadOnly",

  data: () => ({
      date: new Date().toISOString().substr(0, 7),
  })
};
</script>