<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Item slot -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        You can use the item slot to customize each breadcrumb.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-breadcrumbs :items="items">
                <template v-slot:item="{ item }">
                <v-breadcrumbs-item
                    :href="item.href"
                    :disabled="item.disabled"
                >
                    {{ item.text.toUpperCase() }}
                </v-breadcrumbs-item>
                </template>
            </v-breadcrumbs>
        </div>
    </div>
</template>

<script>
export default {
  name: "BreadcrumbIconSlot",

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