<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- FloatClasses -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap mt-4">
        Easily toggle a float with a class:
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
            <div class="mt-4">
                <div>
                    <div class="float-left">Float left on all viewport sizes</div><br>
                    <div class="float-right">Float right on all viewport sizes</div><br>
                    <div class="float-none">Don't float on all viewport sizes</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "FloatClasses",

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