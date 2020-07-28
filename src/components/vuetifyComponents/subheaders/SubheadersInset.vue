<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- SubheadersInset -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Inset subheaders are moved 72px to the right. This gives you the option to line them up with list items and inset dividers.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-row>
                <v-col cols="12" sm="6" offset-sm="3">
                    <v-card>
                    <v-subheader :inset="inset">Subheader</v-subheader>

                    <v-list>
                        <template v-for="(item, index) in items">
                        <v-list-item
                            v-if="item.action"
                            :key="item.title"
                            @click.prevent
                        >
                            <v-list-item-action>
                            <v-icon>{{ item.action }}</v-icon>
                            </v-list-item-action>

                            <v-list-item-content>
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>

                        <v-divider
                            v-else-if="item.divider"
                            :key="index"
                            :inset="inset"
                        ></v-divider>
                        </template>
                    </v-list>
                    </v-card>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
export default {
  name: "SubheadersInset",

  data: () => ({
      inset: true,
      items: [
        {
          action: 'mdi-tag',
          title: 'List item 1',
        },
        {
          divider: true,
        },
        {
          action: 'mdi-tag',
          title: 'List item 2',
        },
        {
          divider: true,
        },
        {
          action: 'mdi-tag',
          title: 'List item 3',
        },
      ],
  })
};
</script>