<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- ProgressLinearRounded -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        The <code>rounded</code> prop is an alternative style that adds a border radius to the <code>v-progress-linear</code> component.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-progress-linear
                color="info"
                rounded
                value="100"
                ></v-progress-linear>
                <br>
                <v-progress-linear
                color="success"
                rounded
                value="100"
                ></v-progress-linear>
                <br>
                <v-progress-linear
                color="error"
                rounded
                value="100"
                ></v-progress-linear>
                <br>
                <v-progress-linear
                color="warning"
                rounded
                value="100"
                ></v-progress-linear>
        </div>
    </div>
</template>

<script>
export default {
  name: "ProgressLinearRounded",

  data: () => ({
  })
};
</script>