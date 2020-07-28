<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- TextfieldHintText -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           The <code>hint</code> property on text fields adds the provided string beneath the text field. Using <code>persistent-hint</code> keeps the hint visible when the text field is not focused. Hint prop is not supported in solo mode.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-form>
            <v-container>
            <v-row>

                <v-col cols="12" sm="6">
                <v-text-field
                    label="Your product or service"
                    value="Grocery delivery"
                    hint="For example, flowers or used cars"
                ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                <v-text-field
                    label="Your landing page"
                    hint="www.example.com/page"
                    persistent-hint
                ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                <v-text-field
                    label="Your product or service"
                    value="Grocery delivery"
                    hint="For example, flowers or used cars"
                    filled
                ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                <v-text-field
                    label="Your landing page"
                    hint="www.example.com/page"
                    persistent-hint
                    filled
                ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                <v-text-field
                    label="Your product or service"
                    value="Grocery delivery"
                    hint="For example, flowers or used cars"
                    outlined
                ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                <v-text-field
                    label="Your landing page"
                    hint="www.example.com/page"
                    persistent-hint
                    outlined
                ></v-text-field>
                </v-col>

            </v-row>
            </v-container>
        </v-form>
        </div>
    </div>
</template>

<script>
export default {
  name: "TextfieldHintText",

  data: () => ({
  })
};
</script>