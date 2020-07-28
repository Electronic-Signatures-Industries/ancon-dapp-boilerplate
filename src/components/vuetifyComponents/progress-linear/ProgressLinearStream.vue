<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- ProgressLinearStream -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
            The <code>stream</code> property works with <code>buffer-value</code> to convey to the user that there is some action taking place. You can use any combination of <code>buffer-value</code> and <code>value</code> to achieve your design.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-progress-linear
            color="error"
            buffer-value="0"
            stream
            ></v-progress-linear>
            <br>
            <v-progress-linear
            color="success"
            buffer-value="0"
            value="20"
            stream
            ></v-progress-linear>
            <br>
            <v-progress-linear
            buffer-value="50"
            stream
            color="info"
            ></v-progress-linear>
            <br>
            <v-progress-linear
            buffer-value="60"
            value="40"
            stream
            color="warning"
            ></v-progress-linear>
        </div>
    </div>
</template>

<script>
export default {
  name: "ProgressLinearStream",

  data: () => ({
  })
};
</script>