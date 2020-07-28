<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Size -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        The <code>size</code> prop allows you to define the height and width of <code>v-avatar</code>. This prop scales both evenly with an aspect ratio of 1. <code>height</code> and <code>width</code> props will override this prop.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-row justify="space-around">
                <v-avatar color="indigo" size="36">
                <span class="white--text headline">36</span>
                </v-avatar>

                <v-avatar color="teal" size="48">
                <span class="white--text headline">48</span>
                </v-avatar>

                <v-avatar color="orange" size="62">
                <span class="white--text headline">62</span>
                </v-avatar>

            </v-row>
        </div>
    </div>
</template>

<script>
export default {
  name: "AvatarSize",

  data: () => ({
  })
};
</script>