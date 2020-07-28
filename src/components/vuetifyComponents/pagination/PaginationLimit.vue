<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- PaginationLimit -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        You can also manually set the maximum number of visible page buttons with the <code>total-visible</code> prop.
        </v-list-item-subtitle>
        <div class="mt-4 text-center">
            <v-pagination
            v-model="page"
            :length="15"
            :total-visible="7"
            ></v-pagination>
        </div>
    </div>
</template>

<script>
export default {
  name: "PaginationLimit",

  data: () => ({
      page: 1,
  })
};
</script>