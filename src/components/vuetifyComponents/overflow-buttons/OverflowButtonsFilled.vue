<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Overflow Buttons Filled -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           Text fields can be used with an alternative box design. Append and prepend icon props are not supported in this mode.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-overflow-btn
            class="my-2"
            :items="dropdown_font"
            label="Overflow Btn - filled"
            filled
            target="#dropdown-example-1"
            ></v-overflow-btn>
        </div>
    </div>
</template>

<script>
export default {
  name: "OverflowButtonsFilled",

  data: () => ({
      dropdown_font: ['Arial', 'Calibri', 'Courier', 'Verdana'],
  })
};
</script>