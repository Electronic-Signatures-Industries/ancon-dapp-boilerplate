<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- MenusAbsolutePositionwithoutActivator -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Menus can also be used without an activator by using <code>absolute</code> together with the props <code>position-x</code> and <code>position-y</code>. Try right-clicking anywhere on the image.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-row class="flex" justify="center">
            <v-card
                :ripple="false"
                class="portrait"
                img="https://cdn.vuetifyjs.com/images/cards/girl.jpg"
                height="300px"
                @click="show"
            ></v-card>
            </v-row>

            <v-menu v-model="showMenu" :position-x="x" :position-y="y" absolute offset-y>
                <v-list>
                    <v-list-item v-for="(item, index) in items" :key="index" @click="()=>{}">
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </div>
    </div>
</template>

<style scoped>
.portrait.v-card {
  margin: 0 auto;
  max-width: 600px;
  width: 100%;
}
</style>

<script>
export default {
  name: "MenusAbsolutePositionwithoutActivator",

  data: () => ({
      showMenu: false,
      x: 0,
      y: 0,
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
  }),
  methods: {
      show (e) {
        e.preventDefault()
        this.showMenu = false
        this.x = e.clientX
        this.y = e.clientY
        this.$nextTick(() => {
          this.showMenu = true
        })
      },
    },
};
</script>