<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Overflow Buttons Hint -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           You can add a hint for the user using the <code>hint</code> property
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-overflow-btn
                class="my-2"
                :items="dropdown_font"
                menu-props="top"
                label="Overflow Btn w/ hint"
                hint="Select font"
                target="#dropdown-example-1"
                ></v-overflow-btn>
        </div>
    </div>
</template>

<script>
export default {
  name: "OverflowButtonsHint",

  data: () => ({
      dropdown_font: ['Arial', 'Calibri', 'Courier', 'Verdana'],
  })
};
</script>