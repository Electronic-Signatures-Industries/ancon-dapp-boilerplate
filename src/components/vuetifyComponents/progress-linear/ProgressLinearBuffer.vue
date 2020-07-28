<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- ProgressLinearBuffer -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        A buffer state represents two values simultaneously. The primary value is controlled by <code>v-model</code>, whereas the buffer is controlled by the <code>buffer-value</code> prop.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-progress-linear
            v-model="value"
            :buffer-value="bufferValue"
            ></v-progress-linear>
            <br>
            <v-progress-linear
            v-model="value"
            :buffer-value="bufferValue"
            color="error"
            ></v-progress-linear>
            <br>
            <v-progress-linear
            v-model="value"
            :buffer-value="bufferValue"
            color="success"
            ></v-progress-linear>
            <br>
            <v-progress-linear
            v-model="value"
            :buffer-value="bufferValue"
            color="warning"
            ></v-progress-linear>
        </div>
    </div>
</template>

<script>
export default {
  name: "ProgressLinearBuffer",

  data: () => ({
      value: 10,
        bufferValue: 20,
        interval: 0,
  }),
  watch: {
      value (val) {
        if (val < 100) return

        this.value = 0
        this.bufferValue = 10
        this.startBuffer()
      },
    },

    mounted () {
      this.startBuffer()
    },

    beforeDestroy () {
      clearInterval(this.interval)
    },

    methods: {
      startBuffer () {
        clearInterval(this.interval)

        this.interval = setInterval(() => {
          this.value += Math.random() * (15 - 5) + 5
          this.bufferValue += Math.random() * (15 - 5) + 6
        }, 2000)
      },
    },

};
</script>