<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- FlexWrap -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap mt-4">
        By default <code>.d-flex</code> does not provide any wrapping (behaves similarly to <code>flex-wrap: nowrap</code>). This can be modified by applying flex-wrap helper classes in the format <code>flex-{condition}</code> where condition can be <code>nowrap</code>, <code>wrap</code>, or <code>wrap-reverse</code>.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-list dense>
                <v-subheader>There are also responsive variations for <code>align-self-items</code>.</v-subheader>
                <v-list-item-group v-model="item" color="primary">
                    <v-list-item
                    v-for="(item, i) in items"
                    :key="i"
                    >
                    <v-list-item-icon>
                        <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.text"></v-list-item-title>
                    </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
            <p class="mt-4">These helper classes can also be applied in the format <code>flex-{breakpoint}-{condition}</code> to create more responsive variations based on breakpoints. The following combinations are available:</p>
            <v-list dense>
                <v-subheader>There are also responsive variations for <code>align-self-items</code>.</v-subheader>
                <v-list-item-group v-model="item2" color="primary">
                    <v-list-item
                    v-for="(item2, i) in items2"
                    :key="i"
                    >
                    <v-list-item-icon>
                        <v-icon v-text="item2.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title v-text="item2.text"></v-list-item-title>
                    </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </div>
    </div>
</template>

<script>
export default {
  name: "FlexWrap",

  data: () => ({
      item: 0,
      items: [
        { text: '.flex-nowrap', icon: 'mdi-arrow-right' },
        { text: '.flex-wrap', icon: 'mdi-arrow-right' },
        { text: '.flex-wrap-reverse', icon: 'mdi-arrow-right' }
      ],
      item2: 0,
      items2: [
        { text: '.flex-sm-nowrap', icon: 'mdi-arrow-right' },
        { text: '.flex-sm-wrap', icon: 'mdi-arrow-right' },
        { text: '.flex-sm-wrap-reverse', icon: 'mdi-arrow-right' },
        { text: '.flex-md-nowrap', icon: 'mdi-arrow-right' },
        { text: '.flex-md-wrap', icon: 'mdi-arrow-right' },
        { text: '.flex-md-wrap-reverse', icon: 'mdi-arrow-right' },
        { text: '.flex-lg-nowrap', icon: 'mdi-arrow-right' },
        { text: '.flex-lg-wrap', icon: 'mdi-arrow-right' },
        { text: '.flex-lg-wrap-reverse', icon: 'mdi-arrow-right' },
        { text: '.flex-xl-nowrap', icon: 'mdi-arrow-right' },
        { text: '.flex-xl-wrap', icon: 'mdi-arrow-right' },
        { text: '.flex-xl-wrap-reverse', icon: 'mdi-arrow-right' }
      ],
  })
};
</script>