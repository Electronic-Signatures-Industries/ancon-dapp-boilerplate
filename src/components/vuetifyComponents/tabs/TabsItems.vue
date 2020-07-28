<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- TabsItems -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        The <code>v-tabs-items</code> component allows for you to customize the content per tab. Using a shared <code>v-model</code>, the <code>v-tabs-items</code> will sync with the currently selected <code>v-tab</code>.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-tabs
                v-model="tab"
                background-color="primary"
                dark
                >
                <v-tab
                    v-for="item in items"
                    :key="item.tab"
                >
                    {{ item.tab }}
                </v-tab>
                </v-tabs>

                <v-tabs-items v-model="tab">
                <v-tab-item
                    v-for="item in items"
                    :key="item.tab"
                >
                    <v-card flat>
                    <v-card-text>{{ item.content }}</v-card-text>
                    </v-card>
                </v-tab-item>
                </v-tabs-items>
        </div>
    </div>
</template>

<script>
export default {
  name: "TabsItems",

  data: () => ({
      tab: null,
        items: [
          { tab: 'One', content: 'Tab 1 Content' },
          { tab: 'Two', content: 'Tab 2 Content' },
          { tab: 'Three', content: 'Tab 3 Content' },
          { tab: 'Four', content: 'Tab 4 Content' },
          { tab: 'Five', content: 'Tab 5 Content' },
          { tab: 'Six', content: 'Tab 6 Content' },
          { tab: 'Seven', content: 'Tab 7 Content' },
          { tab: 'Eight', content: 'Tab 8 Content' },
          { tab: 'Nine', content: 'Tab 9 Content' },
          { tab: 'Ten', content: 'Tab 10 Content' },
        ],
  })
};
</script>