<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- ProgressLinearCustomcolors -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        You can also set the color using the props <code>color</code> and <code>background-color</code>.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-progress-linear
            background-color="info lighten-3"
            color="info"
            value="15"
            ></v-progress-linear>
            <br>
            <v-progress-linear
            background-color="success lighten-3"
            color="success"
            value="30"
            ></v-progress-linear>
            <br>
            <v-progress-linear
            background-color="success"
            color="error"
            value="45"
            ></v-progress-linear>
        </div>
    </div>
</template>

<script>
export default {
  name: "ProgressLinearCustomcolors",

  data: () => ({
  })
};
</script>