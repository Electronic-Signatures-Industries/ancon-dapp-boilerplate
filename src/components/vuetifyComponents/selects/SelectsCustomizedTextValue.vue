<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- error -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           You can specify the specific properties within your items array correspond to the text and value fields. By default, this is text and value. In this example we also use the <code>return-object</code> prop which will return the entire object of the selected item on selection.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-row align="center">
                <v-col cols="6">
                    <v-subheader>Custom items</v-subheader>
                </v-col>

                <v-col cols="6">
                    <v-select
                    v-model="select"
                    :hint="`${select.state}, ${select.abbr}`"
                    :items="items"
                    item-text="state"
                    item-value="abbr"
                    label="Select"
                    persistent-hint
                    return-object
                    single-line
                    ></v-select>
                </v-col>
                </v-row>
        </div>
    </div>
</template>

<script>
export default {
  name: "SelectsCustomizedTextValue",

  data: () => ({
      select: { state: 'Florida', abbr: 'FL' },
        items: [
          { state: 'Florida', abbr: 'FL' },
          { state: 'Georgia', abbr: 'GA' },
          { state: 'Nebraska', abbr: 'NE' },
          { state: 'California', abbr: 'CA' },
          { state: 'New York', abbr: 'NY' },
        ],
  })
};
</script>