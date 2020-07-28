<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- With menu -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        You can easily extend the functionality of app bar by adding <code>VMenu</code> there. Click on last icon to see it in action.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-card class="overflow-hidden">
                <v-app-bar
                absolute
                color="info"
                dark
                shrink-on-scroll
                prominent
                src="https://picsum.photos/1920/1080?random"
                fade-img-on-scroll
                scroll-target="#scrolling-techniques-4"
                >
                <template v-slot:img="{ props }">
                    <v-img
                    v-bind="props"
                    gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
                    ></v-img>
                </template>

                <v-app-bar-nav-icon></v-app-bar-nav-icon>

                <v-toolbar-title>Title</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn icon>
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>

                <v-btn icon>
                    <v-icon>mdi-heart</v-icon>
                </v-btn>

                <v-menu
                    bottom
                    left
                >
                    <template>
                    <v-btn
                        icon
                        color="yellow"
                    
                    >
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                    </template>

                    <v-list>
                    <v-list-item
                        v-for="(item, i) in items"
                        :key="i"
                    >
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                    </v-list>
                </v-menu>

                <template v-slot:extension>
                    <v-tabs align-with-title>
                    <v-tab>Tab 1</v-tab>
                    <v-tab>Tab 2</v-tab>
                    <v-tab>Tab 3</v-tab>
                    </v-tabs>
                </template>
                </v-app-bar>
                <v-sheet
                id="scrolling-techniques-4"
                class="overflow-y-auto"
                max-height="400"
                >
                <v-container style="height: 1000px;"></v-container>
                </v-sheet>
            </v-card>
        </div>
    </div>
</template>

<script>
export default {
  name: "AppbarwithMenu",

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