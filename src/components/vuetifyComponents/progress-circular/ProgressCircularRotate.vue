<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- ProgressCircularRotate -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        The <code>rotate</code> prop gives you the ability to customize the <code>v-progress-circular</code>'s origin.
        </v-list-item-subtitle>
        <div class="mt-4 text-center">
            <v-progress-circular
            :rotate="360"
            :size="100"
            :width="15"
            :value="value"
            color="info"
            >
            {{ value }}
            </v-progress-circular>

            <v-progress-circular
            :rotate="-90"
            :size="100"
            :width="15"
            :value="value"
            color="error"
            >
            {{ value }}
            </v-progress-circular>

            <v-progress-circular
            :rotate="90"
            :size="100"
            :width="15"
            :value="value"
            color="success"
            >
            {{ value }}
            </v-progress-circular>

            <v-progress-circular
            :rotate="180"
            :size="100"
            :width="15"
            :value="value"
            color="warning"
            >
            {{ value }}
            </v-progress-circular>
        </div>
    </div>
</template>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>

<script>
export default {
  name: "ProgressCircularRotate",

  data: () => ({
      interval: {},
        value: 0,
  }),
  beforeDestroy () {
      clearInterval(this.interval)
    },
    mounted () {
      this.interval = setInterval(() => {
        if (this.value === 100) {
          return (this.value = 0)
        }
        this.value += 10
      }, 1000)
    },
};
</script>