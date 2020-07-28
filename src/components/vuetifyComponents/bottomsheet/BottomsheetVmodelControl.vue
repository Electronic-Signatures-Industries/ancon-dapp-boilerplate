<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Vmodel Control -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Bottom sheets can be controlled using <code>v-model</code>. You can use it to close them or if you can't use <code>activator</code> slot.
        </v-list-item-subtitle>
        <div class="mt-4 text-center">
            <v-btn
            color="blue"
            dark
            @click="sheet = !sheet"
            >
            Open v-model
            </v-btn>
            <v-bottom-sheet v-model="sheet">
            <v-sheet class="text-center" height="200px">
                <v-btn
                class="mt-6"
                text
                color="red"
                @click="sheet = !sheet"
                >close</v-btn>
                <div class="py-3">This is a bottom sheet using the controlled by v-model instead of activator</div>
            </v-sheet>
            </v-bottom-sheet>
        </div>
    </div>
</template>

<script>
export default {
  name: "BottomsheetVmodelControl",

  data: () => ({
      sheet: false,
  })
};
</script>