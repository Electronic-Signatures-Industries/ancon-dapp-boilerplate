<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Overflow Buttons Menu Props -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           You can set underlying <code>v-menu</code> props using <code>menu-props</code> property
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-overflow-btn
                class="my-2"
                :items="dropdown_font"
                menu-props="top"
                label="Overflow Btn w/ menu-props"
                target="#dropdown-example-1"
                ></v-overflow-btn>
        </div>
    </div>
</template>

<script>
export default {
  name: "OverflowButtonsMenuProps",

  data: () => ({
      dropdown_font: ['Arial', 'Calibri', 'Courier', 'Verdana'],
  })
};
</script>