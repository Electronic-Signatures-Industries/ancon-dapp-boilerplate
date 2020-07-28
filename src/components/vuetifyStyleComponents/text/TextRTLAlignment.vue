<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- TextRTLAlignment -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap mt-4">
        When using RTL, you may want to keep the alignment regardless of the rtl designation. This can be achieved using text alignment helper classes in the following format: <code>text-breakpoint-direction</code>, where breakpoint can be <code>sm</code>, <code>md</code>, <code>lg</code>, or <code>xl</code> and direction can be <code>left</code> or <code>right</code>. You may also want alignment to respond to rtl which can be done using directions <code>start</code> and <code>end</code>.
        </v-list-item-subtitle>
        <div class="mt-4">
            <div class="pa-4 grey lighten-2">
                <p class="subtitle-2 text-center">Agnostic RTL Alignment</p>

                <p class="text-sm-left">Left aligned text on viewports sized SM (small) or wider for rtl or ltr.</p>
                <p class="text-md-left">Left aligned text on viewports sized MD (medium) or wider for rtl or ltr.</p>
                <p class="text-lg-right">Right aligned text on viewports sized LG (large) or wider for rtl or ltr.</p>
                <p class="text-xl-left">Left aligned text on viewports sized XL (extra-large) or wider for rtl or ltr.</p>

                <p class="subtitle-2 text-center">Responsive RTL Alignment</p>

                <p class="text-start">Left aligned text on ltr and right aligned on rtl.</p>
                <p class="text-end">Right aligned text on ltr and left aligned on rtl.</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "TextRTLAlignment",

  data: () => ({
  })
};
</script>