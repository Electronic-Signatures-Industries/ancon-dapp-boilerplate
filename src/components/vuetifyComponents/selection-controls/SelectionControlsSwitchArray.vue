<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- SelectionControlsSwitchArray -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <div class="mt-4">
            <p>{{ people }}</p>
            <v-switch v-model="people" label="John" value="John"></v-switch>
            <v-switch v-model="people" label="Jacob" value="Jacob"></v-switch>
        </div>
    </div>
</template>

<script>
export default {
  name: "SelectionControlsSwitchArray",

  data: () => ({
        people: ['John'],
  })
};
</script>