<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- DatePickersMonthPickersMultiple -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Month pickers can now select multiple months with the <code>multiple</code> prop. If using <code>multiple</code> then the month picker expects its model to be an array.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-row>
                <v-col cols="12" sm="6">
                <v-date-picker
                    v-model="dates"
                    multiple
                ></v-date-picker>
                </v-col>
                <v-col cols="12" sm="6">
                <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="dates"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                >
                    <template v-slot:activator="{ on }">
                    <v-combobox
                        v-model="dates"
                        multiple
                        chips
                        small-chips
                        label="Multiple picker in menu"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-on="on"
                    ></v-combobox>
                    </template>
                    <v-date-picker v-model="dates" multiple no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(dates)">OK</v-btn>
                    </v-date-picker>
                </v-menu>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
export default {
  name: "DatePickersMonthPickersMultiple",

  data: () => ({
     dates: ['2018-09-15', '2018-09-20'],
      menu: false,
  })
};
</script>