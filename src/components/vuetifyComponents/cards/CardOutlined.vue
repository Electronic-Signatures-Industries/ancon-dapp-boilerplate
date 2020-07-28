<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Outlined -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        An outlined card has 0 elevation and contains a soft border.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-card
                class="mx-auto"
                max-width="344"
                outlined
            >
                <v-list-item three-line>
                <v-list-item-content>
                    <div class="overline mb-4">OVERLINE</div>
                    <v-list-item-title class="headline mb-1">Headline 5</v-list-item-title>
                    <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar
                    tile
                    size="80"
                    color="grey"
                ></v-list-item-avatar>
                </v-list-item>

                <v-card-actions>
                <v-btn text>Button</v-btn>
                <v-btn text>Button</v-btn>
                </v-card-actions>
            </v-card>
        </div>
    </div>
</template>

<script>
export default {
  name: "CardOutlined",

  data: () => ({
  })
};
</script>