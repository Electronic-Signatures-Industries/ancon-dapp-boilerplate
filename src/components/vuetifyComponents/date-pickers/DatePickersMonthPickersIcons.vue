<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- DatePickersMonthPickersIcons -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
            You can override the default icons used in the picker.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-row justify="center">
                <v-date-picker
                v-model="picker"
                type="month"
                year-icon="mdi-calendar-blank"
                prev-icon="mdi-skip-previous"
                next-icon="mdi-skip-next"
                ></v-date-picker>
            </v-row>
        </div>
    </div>
</template>

<script>
export default {
  name: "DatePickersMonthPickersIcons",

  data: () => ({
      picker: new Date().toISOString().substr(0, 7),
  })
};
</script>