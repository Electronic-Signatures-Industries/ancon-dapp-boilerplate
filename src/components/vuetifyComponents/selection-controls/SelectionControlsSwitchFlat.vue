<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- SelectionControlsSwitchFlat -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           You can make switch render without elevation of thumb using <code>flat</code> property.
        </v-list-item-subtitle>
        <div class="mt-5">
            <v-sheet class="pa-2">
                <v-switch v-model="switch1" flat :label="`Switch 1: ${switch1.toString()}`"></v-switch>
                <v-switch v-model="switch2" flat :label="`Switch 2: ${switch2.toString()}`"></v-switch>
            </v-sheet>
        </div>
    </div>
</template>

<script>
export default {
  name: "SelectionControlsSwitchFlat",

  data: () => ({
      switch1: true,
        switch2: false,
  })
};
</script>