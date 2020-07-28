<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- MenusCustomTransitions -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Vuetify comes with 3 standard transitions, <span class="grey--text text--darken-4 font-weight-bold">scale</span>, <span class="grey--text text--darken-4 font-weight-bold">slide-x</span> and <span class="grey--text text--darken-4 font-weight-bold">slide-y</span>. You can also create your own and pass it as the transition argument. For an example of how the stock transitions are constructed, visit here.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-row justify="space-around">
                <v-menu
                bottom
                origin="center center"
                transition="scale-transition"
                >
                <template v-slot:activator="{ on }">
                    <v-btn
                    color="primary"
                    dark
                    v-on="on"
                    >
                    Scale Transition
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item
                    v-for="(item, i) in items"
                    :key="i"
                    @click.stop
                    >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                </v-list>
                </v-menu>

                <v-menu
                transition="slide-x-transition"
                bottom
                right
                >
                <template v-slot:activator="{ on }">
                    <v-btn
                    class="deep-orange"
                    color="primary"
                    dark
                    v-on="on"
                    >
                    Slide X Transition
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item
                    v-for="(item, i) in items"
                    :key="i"
                    @click.stop
                    >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                </v-list>
                </v-menu>

                <v-menu
                transition="slide-y-transition"
                bottom
                >
                <template v-slot:activator="{ on }">
                    <v-btn
                    class="purple"
                    color="primary"
                    dark
                    v-on="on"
                    >
                    Slide Y Transition
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item
                    v-for="(item, i) in items"
                    :key="i"
                    @click.stop
                    >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                </v-list>
                </v-menu>
            </v-row>
        </div>
    </div>
</template>

<script>
export default {
  name: "MenusCustomTransitions",

  data: () => ({
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
  })
};
</script>