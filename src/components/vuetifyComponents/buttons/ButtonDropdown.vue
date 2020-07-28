<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Dropdown -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Button dropdowns are regular selects with additional styling.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-row>
                <v-col cols="12" sm="4">
                    <p>Overflow</p>

                    <v-overflow-btn
                    class="my-2"
                    :items="dropdown_font"
                    label="Overflow Btn"
                    target="#dropdown-example"
                    ></v-overflow-btn>
                </v-col>

                <v-col cols="12" sm="4">
                    <p>Segmented</p>

                    <v-overflow-btn
                    class="my-2"
                    :items="dropdown_icon"
                    label="Segmented Btn"
                    segmented
                    target="#dropdown-example"
                    ></v-overflow-btn>
                </v-col>

                <v-col cols="12" sm="4">
                    <p>Editable</p>

                    <v-overflow-btn
                    class="my-2"
                    :items="dropdown_edit"
                    label="Editable Btn"
                    editable
                    item-value="text"
                    ></v-overflow-btn>
                </v-col>
                </v-row>
        </div>
    </div>
</template>

<script>
export default {
  name: "ButtonDropdown",

  data: () => ({
    dropdown_font: ['Arial', 'Calibri', 'Courier', 'Verdana'],
      dropdown_icon: [
        { text: 'list', callback: () => console.log('list') },
        { text: 'favorite', callback: () => console.log('favorite') },
        { text: 'delete', callback: () => console.log('delete') },
      ],
      dropdown_edit: [
        { text: '100%' },
        { text: '75%' },
        { text: '50%' },
        { text: '25%' },
        { text: '0%' },
      ],
  })
};
</script>