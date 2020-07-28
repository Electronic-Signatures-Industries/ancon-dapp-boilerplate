<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Icon Divider -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        For the icon variant, breadcrumbs can use any icon in Material Design Icons.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-breadcrumbs :items="items">
            <template v-slot:divider>
                <v-icon>mdi-forward</v-icon>
            </template>
            </v-breadcrumbs>

            <v-breadcrumbs :items="items">
            <template v-slot:divider>
                <v-icon>mdi-chevron-right</v-icon>
            </template>
            </v-breadcrumbs>
        </div>
    </div>
</template>

<script>
export default {
  name: "BreadcrumbIcondivider",

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