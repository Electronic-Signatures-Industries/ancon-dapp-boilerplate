<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- PaginationDisabled -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Pagination items can be manually deactivated using the <code>disabled</code> prop.
        </v-list-item-subtitle>
        <div class="mt-4 text-center">
            <v-pagination
            :length="3"
            disabled
            ></v-pagination>
        </div>
    </div>
</template>

<script>
export default {
  name: "PaginationDisabled",

  data: () => ({
  })
};
</script>