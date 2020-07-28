<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- PaginationLong -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Using the <code>length</code> prop you can set the length of <code>v-pagination</code>, if the number of page buttons exceeds the parent container, it will truncate the list.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-row justify="center">
                <v-col cols="8">
                <v-container class="max-width">
                    <v-pagination
                    v-model="page"
                    class="my-4"
                    :length="15"
                    ></v-pagination>
                </v-container>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
export default {
  name: "PaginationLong",

  data: () => ({
      page: 1,
  })
};
</script>