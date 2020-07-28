<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Collapsible bars -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        With the <span class="grey--text text--darken-4 font-weight-bold">collapse</span> and <span class="grey--text text--darken-4 font-weight-bold">collapse-on-scroll</span> props you can easily control the state of toolbar that the user interacts with.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-card class="overflow-hidden">
                <v-app-bar
                :collapse="!collapseOnScroll"
                :collapse-on-scroll="collapseOnScroll"
                absolute
                color="info"
                dark
                scroll-target="#scrolling-techniques-6"
                >
                <v-app-bar-nav-icon></v-app-bar-nav-icon>

                <v-toolbar-title>Collapsing Bar</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-checkbox
                    v-model="collapseOnScroll"
                    color="white"
                    hide-details
                ></v-checkbox>
                </v-app-bar>
                <v-sheet
                id="scrolling-techniques-6"
                class="overflow-y-auto"
                max-height="300"
                >
                <v-container style="height: 1000px;"></v-container>
                </v-sheet>
            </v-card>
        </div>
    </div>
</template>

<script>
export default {
  name: "AppbarCollpsibleBar",

  data: () => ({
      collapseOnScroll: true,
  })
};
</script>