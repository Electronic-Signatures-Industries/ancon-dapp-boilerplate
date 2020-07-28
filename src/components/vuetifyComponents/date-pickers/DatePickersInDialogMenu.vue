<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- DatePickersInDialogMenu -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        When integrating a picker into a <code>v-text-field</code>, it is recommended to use the readonly prop. This will prevent mobile keyboards from triggering. To save vertical space, you can also hide the picker title.Pickers expose a slot that allow you to hook into save and cancel functionality. This will maintain an old value which can be replaced if the user cancels.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-row>
                <v-col cols="12" sm="6" md="4">
                <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="date"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                >
                    <template v-slot:activator="{ on }">
                    <v-text-field
                        v-model="date"
                        label="Picker in menu"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-on="on"
                    ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                    </v-date-picker>
                </v-menu>
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="12" sm="6" md="4">
                <v-dialog
                    ref="dialog"
                    v-model="modal"
                    :return-value.sync="date"
                    persistent
                    width="290px"
                >
                    <template v-slot:activator="{ on }">
                    <v-text-field
                        v-model="date"
                        label="Picker in dialog"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-on="on"
                    ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                    </v-date-picker>
                </v-dialog>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                <v-menu
                    v-model="menu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                >
                    <template v-slot:activator="{ on }">
                    <v-text-field
                        v-model="date"
                        label="Picker without buttons"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-on="on"
                    ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
                </v-menu>
                </v-col>
                <v-spacer></v-spacer>
            </v-row>
        </div>
    </div>
</template>

<script>
export default {
  name: "DatePickersInDialogMenu",

  data: () => ({
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
  })
};
</script>