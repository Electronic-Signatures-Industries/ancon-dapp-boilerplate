<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- dence -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           You can use <code>dense</code> prop to reduce overflow button height and lower max height of list items.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-overflow-btn
                class="my-2"
                :items="items"
                label="Overflow Btn - Dense"
                dense
                ></v-overflow-btn>
        </div>
    </div>
</template>

<script>
export default {
  name: "OverflowButtonsDense",

  data: () => ({
      items: ['Arial', 'Calibri', 'Courier', 'Verdana'],
  })
};
</script>