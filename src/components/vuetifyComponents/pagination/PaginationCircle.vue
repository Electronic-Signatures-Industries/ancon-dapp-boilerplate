<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- PaginationCircle -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        The <code>circle</code> prop gives you an alternate style for pagination buttons.
        </v-list-item-subtitle>
        <div class="mt-4 text-center">
            <v-pagination
            v-model="page"
            :length="4"
            circle
            ></v-pagination>
        </div>
    </div>
</template>

<script>
export default {
  name: "PaginationCircle",

  data: () => ({
      page: 1,
  })
};
</script>