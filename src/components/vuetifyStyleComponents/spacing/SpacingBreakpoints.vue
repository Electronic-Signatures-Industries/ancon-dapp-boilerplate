<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- SpacingBreakpoints -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap mt-4">
        Vuetify comes with a 12 point grid system built using Flexbox. Spacing is used to create specific layouts within an application's content. It consists of 5 media breakpoints used to target specific screen sizes or orientations: xs, sm, md, lg and xl. The default resolutions are defined below in the Viewport Breakpoints table and can be modified by customizing the breakpoint service config.
        </v-list-item-subtitle>
        <div class="mt-4">
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
        </div>
    </div>
</template>

<script>
export default {
  name: "SpacingBreakpoints",

  data: () => ({
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