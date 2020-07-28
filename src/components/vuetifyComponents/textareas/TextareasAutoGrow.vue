<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- TextareasAutoGrow -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           When using the <code>auto-grow</code> prop, textarea's will automatically increase in size when the contained text exceeds its size.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-textarea
            name="input-7-1"
            filled
            label="Label"
            auto-grow
            value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
            ></v-textarea>
        </div>
    </div>
</template>

<script>
export default {
  name: "TextareasAutoGrow",

  data: () => ({
  })
};
</script>