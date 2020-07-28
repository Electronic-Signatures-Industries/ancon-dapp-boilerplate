<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Display -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <h4 class="text-center">Material Design Viewport Breakpoints</h4>
        <v-simple-table>
            <template v-slot:default>
            <thead>
                <tr>
                <th class="text-left">Device</th>
                <th class="text-left">Code</th>
                <th class="text-left">Types</th>
                <th class="text-left">Range</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in desserts" :key="item.device">
                <td>{{ item.device }}</td>
                <td class="dark--text font-weight-bold">{{ item.code }}</td>
                <td>{{ item.types }}</td>
                <td>{{ item.range }}</td>
                </tr>
            </tbody>
            </template>
        </v-simple-table>
        
        
        <v-list-item-subtitle class="text-wrap mt-4">
        Specify the elements <code>display</code> property. These classes can be applied to all breakpoints, from <code>xs</code> to <code>xl</code> and have no specified breakpoint.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-list dense>
                <v-subheader>Responsive Display Classes</v-subheader>
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
            <p class="mt-4">When setting a specific breakpoint for a display helper class, it will apply to all screen widths from the designation and up. For example, <code>d-lg-flex</code> will apply to <code>lg</code> and <code>xl</code>  size screens.</p>
            
            <div>
                <h4 class="mb-3"><v-icon class="mr-2">mdi-border-color</v-icon>inline</h4>
                <div class="d-inline pa-2 info white--text">d-inline</div>
                <div class="d-inline pa-2 success white--text">d-inline</div>
            </div>
            <div class="mt-7">
                <h4 class="mb-2"><v-icon class="mr-2">mdi-border-color</v-icon>block</h4>
                <div class="d-block pa-2 info white--text">d-block</div>
                <div class="d-block pa-2 success white--text">d-block</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "DisplayDefault",

  data: () => ({
      item: 0,
      item2: 0,
      items: [
        { text: '<code>.d-{value}</code> for <code>xs</code>', icon: 'mdi-arrow-right' },
        { text: '<code>.d-{breakpoint}-{value}</code> for <code>sm</code>, <code>md</code>, <code>lg</code> and <code>xl</code>', icon: 'mdi-arrow-right' },
      ],
      items2: [
        { text: 'none', icon: 'mdi-arrow-right' },
        { text: 'inline', icon: 'mdi-arrow-right' },
        { text: 'inline-block', icon: 'mdi-arrow-right' },
        { text: 'block', icon: 'mdi-arrow-right' },
        { text: 'table', icon: 'mdi-arrow-right' },
        { text: 'table-cell', icon: 'mdi-arrow-right' },
        { text: 'table-row', icon: 'mdi-arrow-right' },
        { text: 'flex', icon: 'mdi-arrow-right' },
        { text: 'inline-flex', icon: 'mdi-arrow-right' },
      ],
      desserts: [
          {
            device: 'Extra Small',
            code: 'xs',
            types: 'small to large handset',
            range: '< 600px',
          },
          {
            device: 'Small',
            code: 'sm',
            types: 'small to medium tablet',
            range: '600px > < 960px',
          },
          {
            device: 'Medium',
            code: 'md',
            types: 'large tablet to laptop',
            range: '960px > < 1264px*',
          },
          {
            device: 'Large',
            code: 'lg',
            types: 'desktop',
            range: '1264px* > < 1904px*',
          },
          {
            device: 'Extra large',
            code: 'xl',
            types: '4k and ultra-wides',
            range: '> 1904px*',
          },
        ],
  })
};
</script>