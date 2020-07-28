<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- DatePickersBirthdayPicker -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Starting with year picker by default, resticting dates range and closing the picker menu after selecting the day make the perfect birthday picker.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="290px"
            >
                <template v-slot:activator="{ on }">
                <v-text-field
                    v-model="date"
                    label="Birthday date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-on="on"
                ></v-text-field>
                </template>
                <v-date-picker
                ref="picker"
                v-model="date"
                :max="new Date().toISOString().substr(0, 10)"
                min="1950-01-01"
                @change="save"
                ></v-date-picker>
            </v-menu>
        </div>
    </div>
</template>

<script>
export default {
  name: "DatePickersBirthdayPicker",

  data: () => ({
      date: null,
      menu: false,
  }),
  watch: {
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
    },
    methods: {
      save (date) {
        this.$refs.menu.save(date)
      },
    },
};
</script>