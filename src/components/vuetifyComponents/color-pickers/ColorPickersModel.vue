<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- ColorPickersModel -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        The <code>v-color-picker</code> uses the <code>v-model</code> prop to control the color displayed. It supports hex strings such as #FF00FF and #FF00FF00, and objects representing RGBA, HSLA and HSVA values.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-row>
                <v-col
                    cols="12"
                    md="4"
                >
                    <v-btn
                    v-for="t in types"
                    :key="t"
                    class="my-4"
                    block
                    @click="type = t"
                    >{{ t }}</v-btn>
                </v-col>
                <v-col
                    class="d-flex justify-center"
                >
                    <v-color-picker v-model="color"></v-color-picker>
                </v-col>
                <v-col
                    cols="12"
                    md="4"
                >
                    <v-sheet
                    dark
                    class="pa-4"
                    >
                    <pre>{{ showColor }}</pre>
                    </v-sheet>
                </v-col>
                </v-row>
        </div>
    </div>
</template>

<script>
export default {
  name: "ColorPickersModel",

  data: () => ({
      types: ['hex', 'hexa', 'rgba', 'hsla', 'hsva'],
      type: 'hex',
      hex: '#FF00FF',
      hexa: '#FF00FFFF',
      rgba: { r: 255, g: 0, b: 255, a: 1 },
      hsla: { h: 300, s: 1, l: 0.5, a: 1 },
      hsva: { h: 300, s: 1, v: 1, a: 1 },
  }),
  computed: {
      color: {
        get () {
          return this[this.type]
        },
        set (v) {
          this[this.type] = v
        },
      },
      showColor () {
        if (typeof this.color === 'string') return this.color

        return JSON.stringify(Object.keys(this.color).reduce((color, key) => {
          color[key] = Number(this.color[key].toFixed(2))
          return color
        }, {}), null, 2)
      },
    },
};
</script>