<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- No ripple -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        <code>v-chip</code> can be rendered without ripple if <code>ripple</code> prop is set to <code>false</code>.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-row justify="center" align="center">
                <v-chip :ripple="false">Default</v-chip>
            </v-row>
        </div>
    </div>
</template>

<script>
export default {
  name: "ChipsNoripple",

  data: () => ({
  })
};
</script>