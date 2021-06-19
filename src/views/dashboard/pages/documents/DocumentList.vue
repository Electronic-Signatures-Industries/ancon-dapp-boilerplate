<template>
  <v-card>
    <v-card-title>Documentos</v-card-title>

    <v-card-text v-if="items.length < 1">
      No hay documentos disponibles.
    </v-card-text>

    <v-card-text v-else>
      <v-treeview
        :active="selectedValue"
        @update:active="updateSelected"
        :items="items"
        activatable
      >
        <template v-slot:prepend="{ item, open }">
          <v-icon v-if="!item.folder.contentType">
            {{ open ? "mdi-folder-open" : "mdi-folder" }}
          </v-icon>
          <v-icon v-else>
            {{ getFileIcon(item.folder.contentType) }}
          </v-icon>
          {{ item.folder.length }} archivo(s)
        </template>
      </v-treeview>
    </v-card-text>

    <v-card-actions>
      <v-spacer />

      <slot name="buttons"/>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Emit, Prop } from 'vue-property-decorator';
import { FileIcons } from './FileIcons';
import { DocumentListItem } from './DocumentListItem';

@Component({})
export default class DocumentList extends Vue {
  @Prop()
  readonly selectedValue: any;

  @Prop()
  readonly items: DocumentListItem[];

  @Emit('update:selectedValue')
  updateSelected(newValue) {
    return newValue;
  }

  getFileIcon(contentType: string): string {
    return FileIcons[contentType]
  }
}
</script>