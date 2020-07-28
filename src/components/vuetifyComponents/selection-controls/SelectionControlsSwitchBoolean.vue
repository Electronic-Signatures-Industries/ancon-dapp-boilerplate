<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- SelectionControlsSwitchBoolean -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <div class="mt-4">
            <v-switch v-model="switch1" :label="`Switch 1: ${switch1.toString()}`"></v-switch>
            <v-switch v-model="switch2" :label="`Switch 2: ${switch2.toString()}`"></v-switch>
        </div>
    </div>
</template>

<script>
export default {
  name: "SelectionControlsSwitchBoolean",

  data: () => ({
      switch1: true,
        switch2: false,
  })
};
</script>