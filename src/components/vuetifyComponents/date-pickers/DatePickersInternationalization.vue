<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- DatePickersInternationalization -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        The date picker supports internationalization through the JavaScript Date object. Specify a BCP 47 language tag using the <code>locale</code> prop, and then set the first day of the week with the <code>first-day-of-week</code> prop.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-row justify="space-around">
                <v-date-picker
                v-model="picker"
                :first-day-of-week="0"
                locale="zh-cn"
                ></v-date-picker>
                <v-date-picker
                v-model="picker"
                :first-day-of-week="1"
                locale="sv-se"
                ></v-date-picker>
            </v-row>
        </div>
    </div>
</template>

<script>
export default {
  name: "DatePickersInternationalization",

  data: () => ({
      picker: new Date().toISOString().substr(0, 10),
  })
};
</script>