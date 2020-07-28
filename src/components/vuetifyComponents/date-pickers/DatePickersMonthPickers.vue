<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- DatePickersMonthPickers -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
            Month pickers come in two orientation variations, portrait (default) and landscape.
        </v-list-item-subtitle>
        <div class="mt-4 text-center">
            <v-row align="center" class="pa-4">
                <v-checkbox v-model="landscape" label="Landscape" class="mr-7"></v-checkbox>
                <v-date-picker v-model="picker" :landscape="landscape" type="month"></v-date-picker>
            </v-row>
        </div>
    </div>
</template>

<script>
export default {
  name: "DatePickersMonthPickers",

  data: () => ({
        picker: new Date().toISOString().substr(0, 7),
        landscape: false,
  })
};
</script>