interface Item {
  contentType: string;
}

export interface DocumentListItem {
  folder: Item | Item[];
}
