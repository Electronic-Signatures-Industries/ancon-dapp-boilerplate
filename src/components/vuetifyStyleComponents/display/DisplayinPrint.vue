<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- DisplayinPrint -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        You can also change the display property when printing.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-list dense>
                <v-subheader>The value property is one of:</v-subheader>
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
            <p class="mt-4">
            Print utility classes can also be combined with none print display utilities.
            </p>
            <div class="mt-4 blue-grey darken-4 white--text pa-4">
                <div class="d-print-none">Screen Only (Hide on print only)</div>
                <div class="d-none d-print-block">Print Only (Hide on screen only)</div>
                <div class="d-none d-lg-block d-print-block">Hide up to large on screen, but always show on print</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "DisplayinPrint",

  data: () => ({
        item2: 0,
        items2: [
            { text: '.d-print-none', icon: 'mdi-arrow-right' },
            { text: '.d-print-inline', icon: 'mdi-arrow-right' },
            { text: '.d-print-inline-block', icon: 'mdi-arrow-right' },
            { text: '.d-print-block', icon: 'mdi-arrow-right' },
            { text: '.d-print-table', icon: 'mdi-arrow-right' },
            { text: '.d-print-table-row', icon: 'mdi-arrow-right' },
            { text: '.d-print-table-cell', icon: 'mdi-arrow-right' },
            { text: '.d-print-flex', icon: 'mdi-arrow-right' },
            { text: '.d-print-inline-flex', icon: 'mdi-arrow-right' },
        ],
  })
};
</script>