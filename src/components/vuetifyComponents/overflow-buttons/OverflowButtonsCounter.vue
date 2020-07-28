<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Overflow Buttons Counter -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           You can add a counter to <code>v-overflow-btn</code> to control the max char count
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-overflow-btn
                class="my-2"
                :items="dropdown_edit"
                label="Overflow Btn w/ counter"
                counter
                item-value="text"
                ></v-overflow-btn>
        </div>
    </div>
</template>

<script>
export default {
  name: "OverflowButtonsCounter",

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