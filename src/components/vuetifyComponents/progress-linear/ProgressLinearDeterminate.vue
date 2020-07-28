<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- ProgressLinearDeterminate -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        The progress linear component can have a determinate state modified by <code>v-model</code>.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-progress-linear
            v-model="valueDeterminate"
            color="info"
            ></v-progress-linear>
            <br>
            <v-progress-linear
            v-model="valueDeterminate"
            color="success"
            ></v-progress-linear>
            <br>
            <v-progress-linear
            v-model="valueDeterminate"
            color="error"
            ></v-progress-linear>
            <br>
            <v-progress-linear
            v-model="valueDeterminate"
            color="warning"
            ></v-progress-linear>
        </div>
    </div>
</template>

<script>
export default {
  name: "ProgressLinearDeterminate",

  data: () => ({
      valueDeterminate: 50,
  })
};
</script>