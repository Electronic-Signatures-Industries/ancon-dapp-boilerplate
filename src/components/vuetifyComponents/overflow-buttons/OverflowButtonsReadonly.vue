<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Overflow Buttons Readonly -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           <code>v-overflow-btn</code> can be put into <code>readonly</code> mode, it'll become inactive but won't change the color
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-overflow-btn
            class="my-2"
            :items="dropdown_font"
            label="Overflow Btn w/ readonly"
            readonly
            target="#dropdown-example-1"
            ></v-overflow-btn>
        </div>
    </div>
</template>

<script>
export default {
  name: "OverflowButtonsReadonly",

  data: () => ({
      dropdown_font: ['Arial', 'Calibri', 'Courier', 'Verdana'],
  })
};
</script>