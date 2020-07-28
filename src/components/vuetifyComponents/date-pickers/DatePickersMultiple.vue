<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- DatePickersMultiple -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Month pickers can now select multiple months with the <code>multiple</code> prop. If using <code>multiple</code> then the month picker expects its model to be an array.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-row justify="center">
                <v-date-picker
                v-model="months"
                type="month"
                multiple
                ></v-date-picker>
            </v-row>
        </div>
    </div>
</template>

<script>
export default {
  name: "DatePickersMultiple",

  data: () => ({
       months: ['2018-09', '2018-10'],
  })
};
</script>