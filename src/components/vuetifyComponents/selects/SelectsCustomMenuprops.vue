<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- error -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           Custom props can be passed directly to <code>v-menu</code> using <code>menuProps</code> prop. In this example menu is force directed to top and shifted to top.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-select
            :items="items"
            :menu-props="{ top: true, offsetY: true }"
            label="Label"
        ></v-select>
        </div>
    </div>
</template>

<script>
export default {
  name: "SelectsCustomMenuprops",

  data: () => ({
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
  })
};
</script>