<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Persistent -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Persistent bottom sheets can't be closed by clicking outside them.
        </v-list-item-subtitle>
        <div class="mt-8 text-center">
            <v-bottom-sheet v-model="sheet" persistent>
                <template v-slot:activator="{ on }">
                    <v-btn
                    color="success"
                    dark
                    v-on="on"
                    >
                    Open Persistent
                    </v-btn>
                </template>
                <v-sheet class="text-center" height="200px">
                    <v-btn
                    class="mt-6"
                    flat
                    color="error"
                    @click="sheet = !sheet"
                    >close</v-btn>
                    <div class="py-3">This is a bottom sheet using the persistent prop</div>
                </v-sheet>
            </v-bottom-sheet>
        </div>
    </div>
</template>

<script>
export default {
  name: "BottomsheetPersistent",

  data: () => ({
      sheet: false,
  })
};
</script>