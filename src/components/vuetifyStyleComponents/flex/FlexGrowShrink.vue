<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- FlexGrowShrink -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap mt-4">
        Vuetify has helper classes for applying grow and shrink manually. These can be applied by adding the helper class in the format <code>flex-{condition}-{value}</code>, where condition can be either <code>grow</code> or <code>shrink</code> and value can be either <code>0</code> or <code>1</code>. The condition <code>grow</code> will permit an element to grow to fill available space, whereas <code>shrink</code> will permit an element to shrink down to only the space needs for its contents. However, this will only happen if the element must shrink to fit their container such as a container resize or being effected by a <code>flex-grow-1</code>. The value <code>0</code> will prevent the condition from occuring whereas <code>1</code> will permit the condition. The following classes are available:
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-list dense>
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
    </div>
</template>

<script>
export default {
  name: "FlexGrowShrink",

  data: () => ({
      item: 0,
      items: [
        { text: 'flex-grow-0', icon: 'mdi-arrow-right' },
        { text: 'flex-grow-1', icon: 'mdi-arrow-right' },
        { text: 'flex-shrink-0', icon: 'mdi-arrow-right' },
        { text: 'flex-shrink-1', icon: 'mdi-arrow-right' }
      ],
  })
};
</script>