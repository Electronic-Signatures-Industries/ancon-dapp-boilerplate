<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- SheetelColorSize -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Sheets and components based on then can have different sizes and colors.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-row
            class="flex-child"
            >
            <v-col
                class="d-flex"
                cols="12"
                md="4"
            >
                <v-sheet
                class="d-flex"
                color="grey lighten-3"
                height="424"
                >
                <sheet-footer>
                    #1: (3r x 2c)
                </sheet-footer>
                </v-sheet>
            </v-col>

            <v-col
                class="d-flex"
                cols="12"
                md="4"
            >
                <v-row>
                <v-col cols="6">
                    <v-sheet
                    class="d-flex"
                    color="green lighten-3"
                    height="150"
                    >
                    <sheet-footer>
                        #2: (1r x 1c)
                    </sheet-footer>
                    </v-sheet>
                </v-col>
                <v-col cols="6">
                    <v-sheet
                    class="d-flex"
                    color="yellow lighten-3"
                    height="150"
                    >
                    <sheet-footer>
                        #3: (1r x 1c)
                    </sheet-footer>
                    </v-sheet>
                </v-col>
                <v-col cols="12">

                    <v-sheet
                    class="d-flex"
                    color="red lighten-3"
                    height="250"
                    >
                    <sheet-footer>
                        #5: (2r x 2c)
                    </sheet-footer>
                    </v-sheet>
                </v-col>
                </v-row>
            </v-col>
            <v-col
                cols="6"
                md="2"
            >
                <v-sheet
                class="d-flex"
                color="teal lighten-3"
                height="300"
                >
                <sheet-footer>
                    #4: (2r x 1c)
                </sheet-footer>
                </v-sheet>
            </v-col>
            <v-col
                class="d-flex"
                cols="6"
                md="2"
            >
                <v-sheet
                class="d-flex mt-auto"
                color="purple lighten-3"
                height="300"
                >
                <sheet-footer>
                    #6: (2r x 1c)
                </sheet-footer>
                </v-sheet>
            </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
export default {
  name: "SheetelColorSize",

  data: () => ({
  }),
  components: {
      SheetFooter: {
        functional: true,

        render (h, { children }) {
          return h('v-sheet', {
            staticClass: 'mt-auto align-center justify-center d-flex',
            props: {
              color: 'rgba(0, 0, 0, .36)',
              dark: true,
              height: 50,
            },
          }, children)
        },
      },
    },
};
</script>