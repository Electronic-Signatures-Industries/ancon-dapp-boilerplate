<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- MenusXoffset -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Menu can be offset by the X axis to make the activator visible.
        </v-list-item-subtitle>
        <div class="mt-4 text-center">
            <v-switch v-model="offset" label="X offset"></v-switch>
            <v-menu top :offset-x="offset">
                <template v-slot:activator="{ on }">
                    <v-btn
                    color="primary"
                    dark
                    v-on="on"
                    >
                    Dropdown
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item
                    v-for="(item, index) in items"
                    :key="index"
                    @click.stop
                    >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </div>
    </div>
</template>

<script>
export default {
  name: "MenusXoffset",

  data: () => ({
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
      offset: true,
  })
};
</script>