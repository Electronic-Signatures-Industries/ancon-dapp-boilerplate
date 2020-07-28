<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- SelectionControlsSwitchInset -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           You can make switch render in inset mode.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-sheet class="pa-5">
                <v-switch v-model="switch1" inset :label="`Switch 1: ${switch1.toString()}`"></v-switch>
                <v-switch v-model="switch2" inset :label="`Switch 2: ${switch2.toString()}`"></v-switch>
            </v-sheet>
        </div>
    </div>
</template>

<script>
export default {
  name: "SelectionControlsSwitchInset",

  data: () => ({
      switch1: true,
        switch2: false,
  })
};
</script>