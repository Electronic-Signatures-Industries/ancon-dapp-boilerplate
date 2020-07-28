<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- TreeviewSlots -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Using slots we are able to create an intuitive file explorer. Apart from the <code>prepend</code> slot, there is also one for the label, and an <code>append</code> slot.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-treeview
                v-model="tree"
                :open="open"
                :items="items"
                activatable
                item-key="name"
                open-on-click
            >
                <template v-slot:prepend="{ item, open }">
                <v-icon v-if="!item.file">
                    {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
                </v-icon>
                <v-icon v-else>
                    {{ files[item.file] }}
                </v-icon>
                </template>
            </v-treeview>
        </div>
    </div>
</template>

<script>
export default {
  name: "TreeviewSlots",

  data: () => ({
      open: ['public'],
      files: {
        html: 'mdi-language-html5',
        js: 'mdi-nodejs',
        json: 'mdi-json',
        md: 'mdi-markdown',
        pdf: 'mdi-file-pdf',
        png: 'mdi-file-image',
        txt: 'mdi-file-document-outline',
        xls: 'mdi-file-excel',
      },
      tree: [],
      items: [
        {
          name: '.git',
        },
        {
          name: 'node_modules',
        },
        {
          name: 'public',
          children: [
            {
              name: 'static',
              children: [{
                name: 'logo.png',
                file: 'png',
              }],
            },
            {
              name: 'favicon.ico',
              file: 'png',
            },
            {
              name: 'index.html',
              file: 'html',
            },
          ],
        },
        {
          name: '.gitignore',
          file: 'txt',
        },
        {
          name: 'babel.config.js',
          file: 'js',
        },
        {
          name: 'package.json',
          file: 'json',
        },
        {
          name: 'README.md',
          file: 'md',
        },
        {
          name: 'vue.config.js',
          file: 'js',
        },
        {
          name: 'yarn.lock',
          file: 'txt',
        },
      ],
  }),
};
</script>