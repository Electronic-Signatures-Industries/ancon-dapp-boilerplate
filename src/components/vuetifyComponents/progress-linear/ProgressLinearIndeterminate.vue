<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- ProgressLinearIndeterminate -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Using the <code>indeterminate</code> prop, <code>v-progress-linear</code> continuously animates.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-progress-linear
            indeterminate
            color="info"
            ></v-progress-linear>
            <br>
            <v-progress-linear
            indeterminate
            color="success"
            ></v-progress-linear>
            <br>
            <v-progress-linear
            indeterminate
            color="warning"
            ></v-progress-linear>
            <br>
            <v-progress-linear
            indeterminate
            color="error"
            ></v-progress-linear>
        </div>
    </div>
</template>

<script>
export default {
  name: "ProgressLinearIndeterminate",

  data: () => ({
  })
};
</script>