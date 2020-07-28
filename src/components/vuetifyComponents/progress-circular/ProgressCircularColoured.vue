<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- ProgressCircularColoured -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Alternate colors can be applied to <code>v-progress-circular</code> using the <code>color</code> prop.
        </v-list-item-subtitle>
        <div class="mt-4 text-center">
            <v-progress-circular
            :value="100"
            color="info"
            ></v-progress-circular>

            <v-progress-circular
            :value="80"
            color="success"
            ></v-progress-circular>

            <v-progress-circular
            :value="60"
            color="error"
            ></v-progress-circular>

            <v-progress-circular
            :value="40"
            color="warning"
            ></v-progress-circular>

            <v-progress-circular
            :value="20"
            color="indigo"
            ></v-progress-circular>
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
  name: "ProgressCircularColoured",

  data: () => ({
  })
};
</script>