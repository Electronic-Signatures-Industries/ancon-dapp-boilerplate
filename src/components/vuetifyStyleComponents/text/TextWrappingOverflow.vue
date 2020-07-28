<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- TextWrappingOverflow -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap mt-4">
        You can prevent wrapping text with the <code>.text-no-wrap</code> utility class.
        </v-list-item-subtitle>
        <div class="mt-4 pa-4 grey lighten-2">
            <div
                class="text-no-wrap text-example"
                style="width: 8rem;"
            >
                This text should overflow the parent.
            </div>
        </div>
        <p class="mt-4">Longer content can be truncated with a text ellipsis. Requires <code>display: inline-block</code> or <code>display: block</code>.</p>
        <div class="pa-4 grey lighten-2">
            <!-- Block level -->
            <div class="row">
            <div class="col-2 text-truncate">
                Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus.
            </div>
            </div>

            <!-- Inline level -->
            <span
            class="d-inline-block text-truncate"
            style="max-width: 150px;"
            >
            Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus.
            </span>
        </div>
    </div>
</template>

<style lang="sass">
  .text-example
    background-color: rgba(86, 61, 124,.15)
    border: 1px solid rgba(86, 61, 124,.15)
</style>

<script>
export default {
  name: "TextWrappingOverflow",

  data: () => ({
  })
};
</script>