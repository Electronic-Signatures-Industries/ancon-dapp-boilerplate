<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- DisplayVisibility -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Conditionally display an element based upon the current viewport. Breakpoint utility classes always apply from the bottom up. That means if you have <code>.d-none</code>, it will apply to all breakpoints. However, <code>.d-md-none</code> will apply to only <code>md</code> and up.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-card outlined flat>
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                            <tr>
                            <th class="text-left">Screen Size</th>
                            <th class="text-left">Class</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in desserts" :key="item.screensize">
                            <td>{{ item.screensize }}</td>
                            <td><code>{{ item.class }}</code></td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-card>
            <div class="mt-7">
                <h4 class="mb-3"><v-icon class="mr-2">mdi-border-color</v-icon>Only visible in lg</h4>
                <div class="blue-grey darken-4 white--text pa-4">
                    <div class="d-lg-none">hide on screens wider than lg</div>
                    <div class="d-none d-lg-block">hide on screens smaller than lg</div>
                </div>
            </div>
            <p class="mt-4">Additionally you can also display an element based upon the current viewport using lateral display helper classes. These classes can be applied using the following format <code>hidden-{breakpoint}-{condition}</code></p>
            <p class="mt-3">The condition applies the class base on:</p>
            <v-list dense>
                <v-subheader>The value property is one of:</v-subheader>
                <v-list-item-group color="primary">
                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon class="headline">mdi-arrow-right</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title><code>only</code> - hide the element only on <code>xs</code> through <code>xl</code> breakpoints</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon class="headline">mdi-arrow-right</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title><code>and-down</code> - hide the element on the specified breakpoint and down <code>sm</code> through <code>lg</code> breakpoints</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon class="headline">mdi-arrow-right</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title><code>and-up</code> - hide the element on the specified breakpoint and up <code>sm</code> through <code>lg</code> breakpoints</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </div>
    </div>
</template>

<script>
export default {
  name: "DisplayVisibility",

  data: () => ({
      desserts: [
          {
            screensize: 'Hidden on all',
            class: '.d-none',
          },
          {
            screensize: 'Hidden only on xs',
            class: '.d-none .d-sm-flex',
          },
          {
            screensize: 'Hidden only on sm',
            class: '.d-sm-none .d-md-flex',
          },
          {
            screensize: 'Hidden only on md',
            class: '.d-md-none .d-lg-flex',
          },
          {
            screensize: 'Hidden only on lg',
            class: '.d-lg-none .d-xl-flex',
          },
          {
            screensize: 'Hidden only on xl',
            class: '.d-xl-none',
          },
          {
            screensize: 'Visible on all',
            class: '.d-flex',
          },
          {
            screensize: 'Visible only on xs',
            class: '.d-flex .d-sm-none',
          },
          {
            screensize: 'Visible only on sm',
            class: '.d-none .d-sm-flex .d-md-none',
          },
          {
            screensize: 'Visible only on md',
            class: '.d-none .d-md-flex .d-lg-none',
          },
          {
            screensize: 'Visible only on lg',
            class: '.d-none .d-lg-flex .d-xl-none',
          },
          {
            screensize: 'Visible only on xl',
            class: '.d-none .d-xl-flex',
          },
        ],
  })
};
</script>