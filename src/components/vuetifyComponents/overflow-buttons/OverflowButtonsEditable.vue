<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Overflow Buttons Editable -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           <code>editable</code> <code>v-overflow-btn</code> can be directly edited, just as <code>v-text-field</code>
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-overflow-btn
                class="my-2"
                :items="dropdown_edit"
                label="Overflow Btn w/ editable"
                editable
                item-value="text"
                ></v-overflow-btn>
        </div>
    </div>
</template>

<script>
export default {
  name: "OverflowButtonsEditable",

  data: () => ({
    dropdown_edit: [
        { text: '100%' },
        { text: '75%' },
        { text: '50%' },
        { text: '25%' },
        { text: '0%' },
      ],
  })
};
</script>