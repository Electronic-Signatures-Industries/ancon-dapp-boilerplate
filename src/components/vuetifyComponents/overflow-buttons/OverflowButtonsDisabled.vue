<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Overflow Buttons Disabled -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           <code>v-overflow-btn</code> can be disabled in order to prevent a user from interacting with it
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-overflow-btn
                class="my-2"
                :items="dropdown_font"
                label="Overflow Btn w/ disabled"
                disabled
                target="#dropdown-example-1"
                ></v-overflow-btn>
        </div>
    </div>
</template>

<script>
export default {
  name: "OverflowButtonsDisabled",

  data: () => ({
      dropdown_font: ['Arial', 'Calibri', 'Courier', 'Verdana'],
  })
};
</script>