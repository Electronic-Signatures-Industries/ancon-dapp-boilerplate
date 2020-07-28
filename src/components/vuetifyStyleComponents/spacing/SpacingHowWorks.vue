<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- SpacingHowWorks -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap mt-4">
        The helper classes apply margin or padding to an element ranging from 0 to 12. Each size increment was designed to align with common Material Design spacings. These classes can be applied using the following format <code>{property}{direction}-{size}</code>.
        </v-list-item-subtitle>
        <v-list dense>
            <v-subheader>The property applies the type of spacing:</v-subheader>
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
            <v-subheader>The direction designates the side the property applies to:</v-subheader>
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
        <v-list dense>
            <v-subheader>The size controls the increment of the property in 4px intervals:</v-subheader>
            <v-list-item-group v-model="item3" color="primary">
                <v-list-item
                v-for="(item3, i) in items3"
                :key="i"
                >
                <v-list-item-icon>
                    <v-icon v-text="item3.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title v-text="item3.text"></v-list-item-title>
                </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
        <div class="mt-4">
        </div>
    </div>
</template>

<script>
export default {
  name: "SpacingHowWorks",

  data: () => ({
      item: 0,
      items: [
        { text: 'm - applies margin', icon: 'mdi-arrow-right' },
        { text: 'p - applies padding', icon: 'mdi-arrow-right' },
      ],
      item2: 0,
      items2: [
        { text: 't - applies the spacing for margin-top and padding-top', icon: 'mdi-arrow-right' },
        { text: 'b - applies the spacing for margin-bottom and padding-bottom', icon: 'mdi-arrow-right' },
        { text: 'l - applies the spacing for margin-left and padding-left', icon: 'mdi-arrow-right' },
        { text: 'r - applies the spacing for margin-right and padding-right', icon: 'mdi-arrow-right' },
        { text: 's - applies the spacing for margin-left/padding-left (in LTR mode) and margin-right/padding-right (in RTL mode)', icon: 'mdi-arrow-right' },
        { text: 'e - applies the spacing for margin-right/padding-right (in LTR mode) and margin-left/padding-left (in RTL mode)', icon: 'mdi-arrow-right' },
        { text: 'x - applies the spacing for both *-left and *-right', icon: 'mdi-arrow-right' },
        { text: 'y - applies the spacing for both *-top and *-bottom', icon: 'mdi-arrow-right' },
        { text: 'a - applies the spacing for the property in all directions', icon: 'mdi-arrow-right' },
      ],
      item3: 0,
      items3: [
        { text: '0 - eliminates all margin or padding by setting it to 0', icon: 'mdi-arrow-right' },
        { text: '1 - sets margin or padding to 4px', icon: 'mdi-arrow-right' },
        { text: '2 - sets margin or padding to 8px', icon: 'mdi-arrow-right' },
        { text: '3 - sets margin or padding to 12px', icon: 'mdi-arrow-right' },
        { text: '4 - sets margin or padding to 16px', icon: 'mdi-arrow-right' },
        { text: '5 - sets margin or padding to 20px', icon: 'mdi-arrow-right' },
        { text: '6 - sets margin or padding to 24px', icon: 'mdi-arrow-right' },
        { text: '7 - sets margin or padding to 28px', icon: 'mdi-arrow-right' },
        { text: '8 - sets margin or padding to 32px', icon: 'mdi-arrow-right' },
        { text: '9 - sets margin or padding to 36px', icon: 'mdi-arrow-right' },
        { text: '10 - sets margin or padding to 40px', icon: 'mdi-arrow-right' },
        { text: '11 - sets margin or padding to 44px', icon: 'mdi-arrow-right' },
        { text: '12 - sets margin or padding to 48px', icon: 'mdi-arrow-right' },
        { text: 'n1 - sets negative margin to 4px', icon: 'mdi-arrow-right' },
        { text: 'n2 - sets negative margin to 8px', icon: 'mdi-arrow-right' },
        { text: 'n3 - sets negative margin to 12px', icon: 'mdi-arrow-right' },
        { text: 'n4 - sets negative margin to 16px', icon: 'mdi-arrow-right' },
        { text: 'n5 - sets negative margin to 20px', icon: 'mdi-arrow-right' },
        { text: 'n6 - sets negative margin to 24px', icon: 'mdi-arrow-right' },
        { text: 'n7 - sets negative margin to 28px', icon: 'mdi-arrow-right' },
        { text: 'n8 - sets negative margin to 32px', icon: 'mdi-arrow-right' },
        { text: 'n9 - sets negative margin to 36px', icon: 'mdi-arrow-right' },
        { text: 'n10 - sets negative margin to 40px', icon: 'mdi-arrow-right' },
        { text: 'n11 - sets negative margin to 44px', icon: 'mdi-arrow-right' },
        { text: 'n12 - sets negative margin to 48px', icon: 'mdi-arrow-right' },
        { text: 'auto - sets the spacing to auto', icon: 'mdi-arrow-right' },
      ],
  })
};
</script>