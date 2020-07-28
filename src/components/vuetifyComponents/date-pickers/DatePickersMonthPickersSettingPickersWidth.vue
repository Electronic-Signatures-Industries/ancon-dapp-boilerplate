<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- DatePickersMonthPickersSettingPickersWidth -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        You can specify allowed the picker's width or make it full width.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-row justify="space-around" class="pa-4">
                <v-date-picker
                v-model="date"
                type="month"
                width="290"
                class="mt-4"
                ></v-date-picker>
                <v-date-picker
                v-model="date"
                full-width
                :landscape="$vuetify.breakpoint.smAndUp"
                type="month"
                class="mt-4"
                ></v-date-picker>
            </v-row>
        </div>
    </div>
</template>

<script>
export default {
  name: "DatePickersMonthPickersSettingPickersWidth",

  data: () => ({
      date: new Date().toISOString().substr(0, 7),
  })
};
</script>