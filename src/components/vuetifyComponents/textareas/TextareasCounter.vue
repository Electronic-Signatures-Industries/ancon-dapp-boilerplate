<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- TextareasCounter -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           The <code>counter</code> prop informs the user of a character limit for the <code>v-textarea</code>.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-textarea
            counter
            label="Text"
            :rules="rules"
            :value="value"
            ></v-textarea>
        </div>
    </div>
</template>

<script>
export default {
  name: "TextareasCounter",

  data: () => ({
      rules: [v => v.length <= 25 || 'Max 25 characters'],
      value: 'Hello!',
  })
};
</script>