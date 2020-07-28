<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- error -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           You can use <code>dense</code> prop to reduce the field height and lower max height of list items.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-row align="center">
                <v-col class="d-flex" cols="12" sm="6">
                    <v-select
                    :items="items"
                    label="Standard"
                    dense
                    ></v-select>
                </v-col>

                <v-col class="d-flex" cols="12" sm="6">
                    <v-select
                    :items="items"
                    filled
                    label="Filled style"
                    dense
                    ></v-select>
                </v-col>

                <v-col class="d-flex" cols="12" sm="6">
                    <v-select
                    :items="items"
                    label="Outlined style"
                    dense
                    outlined
                    ></v-select>
                </v-col>

                <v-col class="d-flex" cols="12" sm="6">
                    <v-select
                    :items="items"
                    label="Solo field"
                    dense
                    solo
                    ></v-select>
                </v-col>
                </v-row>
        </div>
    </div>
</template>

<script>
export default {
  name: "SelectsDence",

  data: () => ({
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
  })
};
</script>