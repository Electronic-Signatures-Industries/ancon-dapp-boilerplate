<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- DatePickersReadOnly -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
            Selecting new date could be disabled by adding readonly prop.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-row justify="center">
                <v-date-picker v-model="date" readonly></v-date-picker>
            </v-row>
        </div>
    </div>
</template>

<script>
export default {
  name: "DatePickersReadOnly",

  data: () => ({
      date: new Date().toISOString().substr(0, 10),
  })
};
</script>