<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- TextareasNoresize -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           <code>v-textarea</code>'s have the option to remain the same size regardless of their content's size, using the <code>no-resize</code> prop.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-textarea
            label="Text"
            no-resize
            rows="1"
            :value="value"
            ></v-textarea>
        </div>
    </div>
</template>

<script>
export default {
  name: "TextareasNoresize",

  data: () => ({
      value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  })
};
</script>