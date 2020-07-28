<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- DatePickersMonthPickersColors -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
            Month picker colors can be set using the <code>color</code> and <code>header-color</code> props. If <code>header-color</code> prop is not provided header will use the <code>color</code> prop value.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-row justify="space-around">
                <v-date-picker v-model="picker" type="month" color="success"></v-date-picker>
                <v-date-picker v-model="picker2" type="month" color="success" header-color="primary"></v-date-picker>
            </v-row>
        </div>
    </div>
</template>

<script>
export default {
  name: "DatePickersMonthPickersColors",

  data: () => ({
        picker: new Date().toISOString().substr(0, 7),
        picker2: new Date().toISOString().substr(0, 7),
  })
};
</script>