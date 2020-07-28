<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- TextAlignment -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap mt-4">
        Alignment helper classes allow you to easily re-align text.
        </v-list-item-subtitle>
        <div class="mt-4 pa-4 grey lighten-2">
            <p class="text-justify">
                Morbi mattis ullamcorper velit. Donec orci lectus, aliquam ut, faucibus non, euismod id, nulla. Fusce convallis metus id felis luctus adipiscing. Aenean massa. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus.

                Nulla consequat massa quis enim. Praesent venenatis metus at tortor pulvinar varius. Donec venenatis vulputate lorem. Phasellus accumsan cursus velit. Pellentesque ut neque.
            </p>
        </div>
        <v-list-item-subtitle class="text-wrap mt-4">
        There are also available alignment classes that support responsive displays.
        </v-list-item-subtitle>
        <div class="pa-4 grey lighten-2 mt-4">
            <p class="text-left">Left aligned text on all viewport sizes.</p>
            <p class="text-center">Center aligned text on all viewport sizes.</p>
            <p class="text-right">Right aligned text on all viewport sizes.</p>

            <p class="text-sm-left">Left aligned text on viewports sized SM (small) or wider.</p>
            <p class="text-md-left">Left aligned text on viewports sized MD (medium) or wider.</p>
            <p class="text-lg-left">Left aligned text on viewports sized LG (large) or wider.</p>
            <p class="text-xl-left">Left aligned text on viewports sized XL (extra-large) or wider.</p>
        </div>
    </div>
</template>

<script>
export default {
  name: "TextAlignment",

  data: () => ({
  })
};
</script>