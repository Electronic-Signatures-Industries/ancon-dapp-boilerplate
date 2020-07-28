<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- ColorPickersCanvas -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        The canvas can be hidden with the <code>hide-canvas</code> prop, and you can set its height with the prop <code>canvas-height</code>. The size of the selection dot can be controlled with the <code>dot-size</code> prop.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-row justify="space-around">
                <v-color-picker class="ma-2" hide-canvas></v-color-picker>
                <v-color-picker class="ma-2" canvas-height="300"></v-color-picker>
                <v-color-picker class="ma-2" dot-size="30"></v-color-picker>
            </v-row>
        </div>
    </div>
</template>

<script>
export default {
  name: "ColorPickersCanvas",

  data: () => ({
  })
};
</script>