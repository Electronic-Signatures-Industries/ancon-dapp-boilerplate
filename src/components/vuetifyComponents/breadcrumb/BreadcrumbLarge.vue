<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Large -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Large breadcrumbs have larger font size.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-breadcrumbs :items="items"></v-breadcrumbs>

            <v-breadcrumbs :items="items" large></v-breadcrumbs>
        </div>
    </div>
</template>

<script>
export default {
  name: "BreadcrumbLarge",

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