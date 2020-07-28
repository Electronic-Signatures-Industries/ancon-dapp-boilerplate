<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Draggable -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        <code>draggable</code> <code>v-chip</code> component can be dragged by mouse.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-row justify="center" align="center">
                <v-chip draggable>Default</v-chip>
            </v-row>
        </div>
    </div>
</template>

<script>
export default {
  name: "ChipsDraggable",

  data: () => ({
  })
};
</script>