<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Closable -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Closable chips can be controlled with a v-model. You can also listen to the <code>click:close</code> event if you want to know when a chip has been closed.
        </v-list-item-subtitle>
        <div class="mt-4">
            <div class="text-center">
                <v-btn
                v-if="!chip1 && !chip2 && !chip3 && !chip4"
                close
                color="primary"
                dark
                @click="chip1 = true, chip2 = true, chip3 = true, chip4= true"
                >
                Reset Chips
                </v-btn>

                <v-chip
                v-if="chip1"
                class="ma-2"
                close
                @click:close="chip1 = false"
                >
                Closable
                </v-chip>

                <v-chip
                v-if="chip2"
                class="ma-2"
                close
                color="error"
                text-color="white"
                @click:close="chip2 = false"
                >
                Remove
                </v-chip>

                <v-chip
                v-if="chip3"
                class="ma-2"
                close
                color="success"
                outlined
                @click:close="chip3 = false"
                >
                Success
                </v-chip>

                <v-chip
                v-if="chip4"
                class="ma-2"
                close
                color="orange"
                label
                outlined
                @click:close="chip4 = false"
                >
                Complete
                </v-chip>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "ChipsClosable",

  data: () => ({
        chip1: true,
        chip2: true,
        chip3: true,
        chip4: true,
  })
};
</script>