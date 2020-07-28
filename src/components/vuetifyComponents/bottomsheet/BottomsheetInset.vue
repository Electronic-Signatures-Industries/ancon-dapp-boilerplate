<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- inset -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Bottom sheets can be inset, reducing their maximum width on desktop to 70%. This can be further reduced manually using the <code>width</code> prop.
        </v-list-item-subtitle>
        <div class="mt-4 text-center">
            <v-bottom-sheet v-model="sheet" inset>
                <template v-slot:activator="{ on }">
                    <v-btn
                    color="orange"
                    dark
                    v-on="on"
                    >
                    Open Inset
                    </v-btn>
                </template>
                <v-sheet class="text-center" height="200px">
                    <v-btn
                    class="mt-6"
                    text
                    color="error"
                    @click="sheet = !sheet"
                    >close</v-btn>
                    <div class="my-3">This is a bottom sheet using the inset prop</div>
                </v-sheet>
            </v-bottom-sheet>
        </div>
    </div>
</template>

<script>
export default {
  name: "BottomsheetInset",

  data: () => ({
      sheet: false,
  })
};
</script>