<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- error -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           You cannot use read-only <code>v-select</code>, but it looks default.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-select
                :items="items"
                readonly
                label="Read-only"
            ></v-select>
        </div>
    </div>
</template>

<script>
export default {
  name: "SelectsReadonly",

  data: () => ({
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
  })
};
</script>