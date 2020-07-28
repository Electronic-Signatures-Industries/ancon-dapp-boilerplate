<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- FloatResponsive -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap mt-4">
        Floats can also be applied on a per breakpoint (viewport) basis.
        </v-list-item-subtitle>
        <div class="mt-4">
            <div>
                <div class="float-sm-left">Float left on viewports sized SM (small) or wider</div><br>
                <div class="float-md-left">Float left on viewports sized MD (medium) or wider</div><br>
                <div class="float-lg-left">Float left on viewports sized LG (large) or wider</div><br>
                <div class="float-xl-left">Float left on viewports sized XL (extra-large) or wider</div><br>
            </div>
        </div>
        <v-list dense>
            <v-subheader>Here is a list of all the available support classes:</v-subheader>
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
    </div>
</template>

<script>
export default {
  name: "FloatResponsive",

  data: () => ({
      item: 0,
      items: [
        { text: '.float-left', icon: 'mdi-arrow-right' },
        { text: '.float-right', icon: 'mdi-arrow-right' },
        { text: '.float-none', icon: 'mdi-arrow-right' },
        { text: '.float-sm-left', icon: 'mdi-arrow-right' },
        { text: '.float-sm-right', icon: 'mdi-arrow-right' },
        { text: '.float-sm-none', icon: 'mdi-arrow-right' },
        { text: '.float-md-left', icon: 'mdi-arrow-right' },
        { text: '.float-md-right', icon: 'mdi-arrow-right' },
        { text: '.float-md-none', icon: 'mdi-arrow-right' },
        { text: '.float-lg-left', icon: 'mdi-arrow-right' },
        { text: '.float-lg-right', icon: 'mdi-arrow-right' },
        { text: '.float-lg-none', icon: 'mdi-arrow-right' },
        { text: '.float-xl-left', icon: 'mdi-arrow-right' },
        { text: '.float-xl-right', icon: 'mdi-arrow-right' },
        { text: '.float-xl-none', icon: 'mdi-arrow-right' },
      ],
  })
};
</script>