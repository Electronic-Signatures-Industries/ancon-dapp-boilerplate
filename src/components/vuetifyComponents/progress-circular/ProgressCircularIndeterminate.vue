<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- ProgressCircularIndeterminate -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Using the <code>indeterminate</code> prop, a <code>v-progress-circular</code> continues to animate indefinitely.
        </v-list-item-subtitle>
        <div class="mt-4 text-center">
            <v-progress-circular
                indeterminate
                color="info"
                ></v-progress-circular>

                <v-progress-circular
                indeterminate
                color="error"
                ></v-progress-circular>

                <v-progress-circular
                indeterminate
                color="success"
                ></v-progress-circular>

                <v-progress-circular
                indeterminate
                color="warning"
                ></v-progress-circular>

                <v-progress-circular
                indeterminate
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
  name: "ProgressCircularIndeterminate",

  data: () => ({
  })
};
</script>