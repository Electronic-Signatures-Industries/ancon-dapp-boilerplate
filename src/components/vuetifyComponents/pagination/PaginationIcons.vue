<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- PaginationIcons -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Previous and next page icons can be customized with the <code>prev-icon</code> and <code>next-icon</code> props.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-pagination
            v-model="page"
            :length="4"
            prev-icon="mdi-menu-left"
            next-icon="mdi-menu-right"
            ></v-pagination>
        </div>
    </div>
</template>

<script>
export default {
  name: "PaginationIcons",

  data: () => ({
      page: 1,
  })
};
</script>