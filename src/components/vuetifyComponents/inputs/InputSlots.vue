<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Slots -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        <code>v-input</code> has <code>append</code> and <code>prepend</code> slots. You can place custom icons in them.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-text-field>
                <v-icon slot="append" color="red">mdi-plus</v-icon>
                <v-icon slot="prepend" color="green">mdi-minus</v-icon>
            </v-text-field>
        </div>
    </div>
</template>

<script>
export default {
  name: "InputSlots",

  data: () => ({
  })
};
</script>