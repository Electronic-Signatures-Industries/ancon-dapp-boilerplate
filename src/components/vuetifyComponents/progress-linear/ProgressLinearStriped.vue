<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- ProgressLinearStriped -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        This applies a striped background over the value portion of the <code>v-progress-linear</code>.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-progress-linear
                color="info"
                height="10"
                value="10"
                striped
                ></v-progress-linear>
                <br>
                <v-progress-linear
                color="warning"
                height="10"
                value="20"
                striped
                ></v-progress-linear>
                <br>
                <v-progress-linear
                height="10"
                value="45"
                striped
                color="success"
                ></v-progress-linear>
                <br>
                <v-progress-linear
                value="60"
                height="10"
                striped
                color="error"
                ></v-progress-linear>
        </div>
    </div>
</template>

<script>
export default {
  name: "ProgressLinearStriped",

  data: () => ({
    
  })
};
</script>