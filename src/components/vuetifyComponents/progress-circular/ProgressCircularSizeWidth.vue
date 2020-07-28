<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- ProgressCircularSizeWidth -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        The <code>size</code> and <code>width</code> props allow you to easily alter the size and width of the <code>v-progress-circular</code> component.
        </v-list-item-subtitle>
        <div class="mt-4 text-center">
            <v-progress-circular
            :size="50"
            color="info"
            indeterminate
            ></v-progress-circular>

            <v-progress-circular
            :width="3"
            color="error"
            indeterminate
            ></v-progress-circular>

            <v-progress-circular
            :size="70"
            :width="7"
            color="success"
            indeterminate
            ></v-progress-circular>

            <v-progress-circular
            :width="3"
            color="warning"
            indeterminate
            ></v-progress-circular>

            <v-progress-circular
            :size="50"
            color="indigo"
            indeterminate
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
  name: "ProgressCircularSizeWidth",

  data: () => ({
  })
};
</script>