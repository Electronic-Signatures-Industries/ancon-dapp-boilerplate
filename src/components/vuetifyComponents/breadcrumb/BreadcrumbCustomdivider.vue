<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Custom Divider -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Breadcrumbs separator can be set using divider property.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-breadcrumbs :items="items" divider="-"></v-breadcrumbs>

            <v-breadcrumbs :items="items" divider="."></v-breadcrumbs>
        </div>
    </div>
</template>

<script>
export default {
  name: "BreadcrumbCustomdivider",

  data: () => ({
      items: [
        {
          text: 'Dashboard',
          disabled: false,
          href: 'breadcrumbs_dashboard',
        },
        {
          text: 'Link 1',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
        {
          text: 'Link 2',
          disabled: true,
          href: 'breadcrumbs_link_2',
        },
      ],
  })
};
</script>