<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- amber Color -->
  <!-- ----------------------------------------------------------------------------- -->
  <div class="pa-4">
    <v-card v-for="(item, i) in coloramber" :key="i" class="mb-6">
      <div class="pa-3 d-flex align-center" :class="item.colorname">
        <h3 class="title" :class="item.titletextcolor">{{ item.colorname }}</h3>
        <span class="ml-auto" :class="item.titletextcolor">{{ item.colorcode }}</span>
      </div>
      <div class="pa-3 grey lighten-4">
        <div class="pa-2 grey darken-4 mt-4">
          <h4 class="white--text">Example:</h4>
        </div>
        <div class>
          <div class="d-flex align-center mt-4 pa-3 white">
            <v-btn :color="item.colorname">Button</v-btn>
            <h3 class="ml-6 white pa-2" :class="item.colortext">Text</h3>
            <div class="ml-6 pa-2" :class="item.colorname">Background</div>
          </div>
          <div class="pa-2 grey darken-4 mt-4">
            <h4 class="white--text">Code:</h4>
          </div>

          <pre class="d-block color-code">
                <code class="elevation-0 border px-3">
{{ item.examplecode }}
                </code>
            </pre>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "AmberColor",

  data: () => ({
    coloramber: [
      {
        colorname: "amber",
        titletextcolor: "white--text",
        colorcode: "#FFC107",
        colortext: "amber--text",
        examplecode:
          '<v-btn color="amber">Button</v-btn>' +
          '<h3 class="amber--text">Text</h3>' +
          '<div class="amber">Background</div>'
      },
      {
        colorname: "amber lighten-5",
        titletextcolor: "dark--text",
        colorcode: "#FFF8E1",
        colortext: "amber--text text--lighten-5",
        examplecode:
          '<v-btn color="amber lighten-5">Button</v-btn>' +
          '<h3 class="amber--text text--lighten-5">Text</h3>' +
          '<div class="amber lighten-5">Background</div>'
      },
      {
        colorname: "amber lighten-4",
        titletextcolor: "dark--text",
        colorcode: "#FFECB3",
        colortext: "amber--text text--lighten-4",
        examplecode:
          '<v-btn color="amber lighten-4">Button</v-btn>' +
          '<h3 class="amber--text text--lighten-4">Text</h3>' +
          '<div class="amber lighten-4">Background</div>'
      },
      {
        colorname: "amber lighten-3",
        titletextcolor: "dark--text",
        colorcode: "#FFE082",
        colortext: "amber--text text--lighten-3",
        examplecode:
          '<v-btn color="amber lighten-3">Button</v-btn>' +
          '<h3 class="amber--text text--lighten-3">Text</h3>' +
          '<div class="amber lighten-3">Background</div>'
      },
      {
        colorname: "amber lighten-2",
        titletextcolor: "dark--text",
        colorcode: "#FFD54F",
        colortext: "amber--text text--lighten-2",
        examplecode:
          '<v-btn color="amber lighten-2">Button</v-btn>' +
          '<h3 class="amber--text text--lighten-2">Text</h3>' +
          '<div class="amber lighten-2">Background</div>'
      },
      {
        colorname: "amber lighten-1",
        titletextcolor: "dark--text",
        colorcode: "#FFCA28",
        colortext: "amber--text text--lighten-1",
        examplecode:
          '<v-btn color="amber lighten-1">Button</v-btn>' +
          '<h3 class="amber--text text--lighten-1">Text</h3>' +
          '<div class="amber lighten-1">Background</div>'
      },
      {
        colorname: "amber darken-1",
        titletextcolor: "white--text",
        colorcode: "#FFB300",
        colortext: "amber--text text--darken-1",
        examplecode:
          '<v-btn color="amber darken-1">Button</v-btn>' +
          '<h3 class="amber--text text--darken-1">Text</h3>' +
          '<div class="amber darken-1">Background</div>'
      },
      {
        colorname: "amber darken-2",
        titletextcolor: "white--text",
        colorcode: "#FFA000",
        colortext: "amber--text text--darken-2",
        examplecode:
          '<v-btn color="amber darken-2">Button</v-btn>' +
          '<h3 class="amber--text text--darken-2">Text</h3>' +
          '<div class="amber darken-2">Background</div>'
      },
      {
        colorname: "amber darken-3",
        titletextcolor: "white--text",
        colorcode: "#FF8F00",
        colortext: "amber--text text--darken-3",
        examplecode:
          '<v-btn color="amber darken-3">Button</v-btn>' +
          '<h3 class="amber--text text--darken-3">Text</h3>' +
          '<div class="amber darken-3">Background</div>'
      },
      {
        colorname: "amber darken-4",
        titletextcolor: "white--text",
        colorcode: "#FF6F00",
        colortext: "amber--text text--darken-4",
        examplecode:
          '<v-btn color="amber darken-4">Button</v-btn>' +
          '<h3 class="amber--text text--darken-4">Text</h3>' +
          '<div class="amber darken-4">Background</div>'
      },
      {
        colorname: "amber accent-1",
        titletextcolor: "dark--text",
        colorcode: "#FFE57F",
        colortext: "amber--text text--accent-1",
        examplecode:
          '<v-btn color="amber accent-1">Button</v-btn>' +
          '<h3 class="amber--text text--accent-1">Text</h3>' +
          '<div class="amber accent-1">Background</div>'
      },
      {
        colorname: "amber accent-2",
        titletextcolor: "white--text",
        colorcode: "#FFD740",
        colortext: "amber--text text--accent-2",
        examplecode:
          '<v-btn color="amber accent-2">Button</v-btn>' +
          '<h3 class="amber--text text--accent-2">Text</h3>' +
          '<div class="amber accent-2">Background</div>'
      },
      {
        colorname: "amber accent-3",
        titletextcolor: "white--text",
        colorcode: "#FFC400",
        colortext: "amber--text text--accent-3",
        examplecode:
          '<v-btn color="amber accent-3">Button</v-btn>' +
          '<h3 class="amber--text text--accent-3">Text</h3>' +
          '<div class="amber accent-3">Background</div>'
      },
      {
        colorname: "amber accent-4",
        titletextcolor: "white--text",
        colorcode: "#FFAB00",
        colortext: "amber--text text--accent-4",
        examplecode:
          '<v-btn color="amber accent-4">Button</v-btn>' +
          '<h3 class="amber--text text--accent-4">Text</h3>' +
          '<div class="amber accent-4">Background</div>'
      }
    ]
  })
};
</script>