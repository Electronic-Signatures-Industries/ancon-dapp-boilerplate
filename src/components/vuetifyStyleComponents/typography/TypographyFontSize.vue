<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- TypographyFontSize -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap mt-4">
        Typography helper classes allow you to easily style text according to Material Design sizing
        </v-list-item-subtitle>
        <div class="mt-4">
            <p class="text-center font-weight-black">Typography Display Classes</p>
            <v-simple-table>
                <template v-slot:default>
                <thead>
                    <tr>
                    <th class="text-left">Class</th>
                    <th class="text-left">Code</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in fontsize" :key="item.class">
                        <td><code>{{ item.class }}</code></td>
                        <td class="dark--text font-weight-medium">{{ item.code }}</td>
                    </tr>
                </tbody>
                </template>
            </v-simple-table>
        </div>
        <div class="mt-4">
            <p class="text-center font-weight-black">Style and Weight Classes</p>
            <v-simple-table>
                <template v-slot:default>
                <thead>
                    <tr>
                    <th class="text-left">Class</th>
                    <th class="text-left">Information</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in weightclasses" :key="item.class">
                        <td><code>{{ item.class }}</code></td>
                        <td class="dark--text font-weight-medium">{{ item.information }}</td>
                    </tr>
                </tbody>
                </template>
            </v-simple-table>
        </div>
    </div>
</template>

<script>
export default {
  name: "TypographyFontSize",

  data: () => ({
      fontsize: [
          {
            class: '.display-4',
            code: 'Light 96sp',
          },
          {
            class: '.display-3',
            code: 'Light 60sp',
          },
          {
            class: '.display-2',
            code: 'Regular 48sp',
          },
          {
            class: '.display-1',
            code: 'Regular 34sp',
          },
          {
            class: '.headline',
            code: 'Regular 24sp',
          },
          {
            class: '.title',
            code: 'Medium 20sp',
          },
          {
            class: '.subtitle-1',
            code: 'Regular 16sp',
          },
          {
            class: '.subtitle-2',
            code: 'Medium 14sp',
          },
          {
            class: '.body-1',
            code: 'Regular 16sp',
          },
          {
            class: '.body-2',
            code: 'Regular 14sp',
          },
          {
            class: '.caption',
            code: 'Regular 12sp',
          },
          {
            class: '.overline',
            code: 'REGULAR 10SP',
          },
        ],
        weightclasses: [
          {
            class: '.font-regular',
            information: 'Regular 10sp',
          },
          {
            class: '.font-weight-light',
            information: 'Condensed Light',
          },
          {
            class: '.font-weight-thin',
            information: 'Thin',
          },
          {
            class: '.font-weight-regular',
            information: 'Regular',
          },
          {
            class: '.font-weight-medium',
            information: 'Medium',
          },
          {
            class: '.font-weight-bold',
            information: 'Bold',
          },
          {
            class: '.font-weight-black',
            information: 'Black',
          },
          {
            class: '.font-italic',
            information: 'italic',
          },
          {
            class: '.font-italic font-weight-light',
            information: 'Light italic',
          },
          {
            class: '.font-italic font-weight-medium',
            information: 'Medium italic',
          },
          {
            class: '.font-italic font-weight-bold',
            information: 'Bold italic',
          }
        ],
  })
};
</script>