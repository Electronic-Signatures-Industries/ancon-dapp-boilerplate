<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- error -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           You cannot use disabled <code>v-select</code>.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-select
                :items="items"
                disabled
                label="Disabled"
            ></v-select>
        </div>
    </div>
</template>

<script>
export default {
  name: "SelectsDisabled",

  data: () => ({
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
  })
};
</script>