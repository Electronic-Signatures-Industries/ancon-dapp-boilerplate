<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- FlexAutoMargins -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap mt-4">
        Using the margin helper classes in a flexbox container, you can control the positioning of flex items on the x-axis or y-axis when using <code>flex-row</code> or <code>flex-column</code> respectively.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-alert
            border="left"
            colored-border
            type="error"
            elevation="2"
            >
            IE11 does not properly support auto margins on flex items that have a parent with a non-default <code>justify-content</code> value. See this StackOverflow answer for more details.
            </v-alert>
        </div>
        <v-card
        class="d-flex mb-6 mt-4"
        color="grey lighten-2"
        flat
        tile
        >
        <v-card
            v-for="n in 3"
            :key="n"
            class="pa-2"
            outlined
            tile
        >
            Flex item
        </v-card>
        </v-card>

        <v-card
        class="d-flex mb-6"
        color="grey lighten-2"
        flat
        tile
        >
        <v-card
            v-for="n in 3"
            :key="n"
            :class="n === 1 && 'mr-auto'"
            class="pa-2"
            outlined
            tile
        >
            Flex item
        </v-card>
        </v-card>

        <v-card
        class="d-flex mb-6"
        color="grey lighten-2"
        flat
        tile
        >
        <v-card
            v-for="n in 3"
            :key="n"
            :class="n === 3 && 'ml-auto'"
            class="pa-2"
            outlined
            tile
        >
            Flex item
        </v-card>
        </v-card>
    </div>
</template>

<script>
export default {
  name: "FlexAutoMargins",

  data: () => ({
  })
};
</script>