<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- OverflowButtonsSegmented -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           <code>segmented</code> <code>v-overflow-btn </code>has and additional divider between the content and the icon
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-overflow-btn
                class="my-2"
                :items="dropdown_icon"
                label="Overflow Btn w/ segmented"
                segmented
                target="#dropdown-example-2"
                ></v-overflow-btn>
        </div>
    </div>
</template>

<script>
export default {
  name: "OverflowButtonsSegmented",

  data: () => ({
      dropdown_icon: [
        { text: 'list', callback: () => console.log('list') },
        { text: 'favorite', callback: () => console.log('favorite') },
        { text: 'delete', callback: () => console.log('delete') },
      ],
  })
};
</script>