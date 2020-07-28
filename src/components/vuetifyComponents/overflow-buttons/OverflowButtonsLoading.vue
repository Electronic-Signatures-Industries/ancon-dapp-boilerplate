<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Overflow Buttons Loading -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           <code>v-overflow-btn</code> can have <code>loading</code> state with a linear progress bar under them
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-overflow-btn
            class="my-2"
            :items="dropdown_font"
            label="Overflow Btn w/ loading"
            loading
            target="#dropdown-example-1"
            ></v-overflow-btn>
        </div>
    </div>
</template>

<script>
export default {
  name: "OverflowButtonsLoading",

  data: () => ({
      dropdown_font: ['Arial', 'Calibri', 'Courier', 'Verdana'],
  })
};
</script>