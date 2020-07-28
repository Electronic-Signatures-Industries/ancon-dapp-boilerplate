<template>
  <v-list-item
    :href="href"
    :rel="href && href !== '#' ? 'noopener' : undefined"
    :target="href && href !== '#' ? '_blank' : undefined"
    :to="item.to"
    :active-class="``"
  >
   
    <v-list-item-icon v-if="item.icon">
      <v-icon v-text="item.icon" />
    </v-list-item-icon>
    

    <v-list-item-content v-if="item.title">
      <v-list-item-title v-text="item.title" />
    </v-list-item-content>
  </v-list-item>
</template>

<script>
  import Themeable from 'vuetify/lib/mixins/themeable'

  export default {
    name: 'BaseItem',

    mixins: [Themeable],

    props: {
      item: {
        type: Object,
        default: () => ({
           href: undefined,
          icon: undefined,
          title: undefined,
          to: undefined,
        }),
      },
      text: {
        type: Boolean,
        default: false,
      },
    },

    computed: {
        
      href () {
        return this.item.href || (!this.item.to ? '#' : undefined)
      },
    },
  }
</script>
