<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- DatePickersSettingPickerWidth -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
            You can specify allowed the picker's width or make it full width.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-row align="center" class="pa-4">
                <v-date-picker
                v-model="date"
                width="290"
                class="mt-4"
                ></v-date-picker>
                <v-date-picker
                v-model="date"
                full-width
                :landscape="$vuetify.breakpoint.smAndUp"
                class="mt-4"
                ></v-date-picker>
            </v-row>
        </div>
    </div>
</template>

<script>
export default {
  name: "DatePickersSettingPickerWidth",

  data: () => ({
      date: new Date().toISOString().substr(0, 10),
  })
};
</script>