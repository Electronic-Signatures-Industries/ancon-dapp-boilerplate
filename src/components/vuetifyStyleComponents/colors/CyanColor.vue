<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- Red Color -->
  <!-- ----------------------------------------------------------------------------- -->
  <div class="pa-4">
    <v-card v-for="(item, i) in colorcyan" :key="i" class="mb-6">
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
  name: "CyanColor",

  data: () => ({
    colorcyan: [
      {
        colorname: "cyan",
        titletextcolor: "white--text",
        colorcode: "#00BCD4",
        colortext: "cyan--text",
        examplecode:
          '<v-btn color="cyan">Button</v-btn>' +
          '<h3 class="cyan--text">Text</h3>' +
          '<div class="cyan">Background</div>'
      },
      {
        colorname: "cyan lighten-5",
        titletextcolor: "dark--text",
        colorcode: "#E0F7FA",
        colortext: "cyan--text text--lighten-5",
        examplecode:
          '<v-btn color="cyan lighten-5">Button</v-btn>' +
          '<h3 class="cyan--text text--lighten-5">Text</h3>' +
          '<div class="cyan lighten-5">Background</div>'
      },
      {
        colorname: "cyan lighten-4",
        titletextcolor: "dark--text",
        colorcode: "#B2EBF2",
        colortext: "cyan--text text--lighten-4",
        examplecode:
          '<v-btn color="cyan lighten-4">Button</v-btn>' +
          '<h3 class="cyan--text text--lighten-4">Text</h3>' +
          '<div class="cyan lighten-4">Background</div>'
      },
      {
        colorname: "cyan lighten-3",
        titletextcolor: "dark--text",
        colorcode: "#80DEEA",
        colortext: "cyan--text text--lighten-3",
        examplecode:
          '<v-btn color="cyan lighten-3">Button</v-btn>' +
          '<h3 class="cyan--text text--lighten-3">Text</h3>' +
          '<div class="cyan lighten-3">Background</div>'
      },
      {
        colorname: "cyan lighten-2",
        titletextcolor: "dark--text",
        colorcode: "#4DD0E1",
        colortext: "cyan--text text--lighten-2",
        examplecode:
          '<v-btn color="cyan lighten-2">Button</v-btn>' +
          '<h3 class="cyan--text text--lighten-2">Text</h3>' +
          '<div class="cyan lighten-2">Background</div>'
      },
      {
        colorname: "cyan lighten-1",
        titletextcolor: "dark--text",
        colorcode: "#26C6DA",
        colortext: "cyan--text text--lighten-1",
        examplecode:
          '<v-btn color="cyan lighten-1">Button</v-btn>' +
          '<h3 class="cyan--text text--lighten-1">Text</h3>' +
          '<div class="cyan lighten-1">Background</div>'
      },
      {
        colorname: "cyan darken-1",
        titletextcolor: "white--text",
        colorcode: "#00ACC1",
        colortext: "cyan--text text--darken-1",
        examplecode:
          '<v-btn color="cyan darken-1">Button</v-btn>' +
          '<h3 class="cyan--text text--darken-1">Text</h3>' +
          '<div class="cyan darken-1">Background</div>'
      },
      {
        colorname: "cyan darken-2",
        titletextcolor: "white--text",
        colorcode: "#0097A7",
        colortext: "cyan--text text--darken-2",
        examplecode:
          '<v-btn color="cyan darken-2">Button</v-btn>' +
          '<h3 class="cyan--text text--darken-2">Text</h3>' +
          '<div class="cyan darken-2">Background</div>'
      },
      {
        colorname: "cyan darken-3",
        titletextcolor: "white--text",
        colorcode: "#00838F",
        colortext: "cyan--text text--darken-3",
        examplecode:
          '<v-btn color="cyan darken-3">Button</v-btn>' +
          '<h3 class="cyan--text text--darken-3">Text</h3>' +
          '<div class="cyan darken-3">Background</div>'
      },
      {
        colorname: "cyan darken-4",
        titletextcolor: "white--text",
        colorcode: "#006064",
        colortext: "cyan--text text--darken-4",
        examplecode:
          '<v-btn color="cyan darken-4">Button</v-btn>' +
          '<h3 class="cyan--text text--darken-4">Text</h3>' +
          '<div class="cyan darken-4">Background</div>'
      },
      {
        colorname: "cyan accent-1",
        titletextcolor: "dark--text",
        colorcode: "#84FFFF",
        colortext: "cyan--text text--accent-1",
        examplecode:
          '<v-btn color="cyan accent-1">Button</v-btn>' +
          '<h3 class="cyan--text text--accent-1">Text</h3>' +
          '<div class="cyan accent-1">Background</div>'
      },
      {
        colorname: "cyan accent-2",
        titletextcolor: "white--text",
        colorcode: "#18FFFF",
        colortext: "cyan--text text--accent-2",
        examplecode:
          '<v-btn color="cyan accent-2">Button</v-btn>' +
          '<h3 class="cyan--text text--accent-2">Text</h3>' +
          '<div class="cyan accent-2">Background</div>'
      },
      {
        colorname: "cyan accent-3",
        titletextcolor: "white--text",
        colorcode: "#00E5FF",
        colortext: "cyan--text text--accent-3",
        examplecode:
          '<v-btn color="cyan accent-3">Button</v-btn>' +
          '<h3 class="cyan--text text--accent-3">Text</h3>' +
          '<div class="cyan accent-3">Background</div>'
      },
      {
        colorname: "cyan accent-4",
        titletextcolor: "white--text",
        colorcode: "#00B8D4",
        colortext: "cyan--text text--accent-4",
        examplecode:
          '<v-btn color="cyan accent-4">Button</v-btn>' +
          '<h3 class="cyan--text text--accent-4">Text</h3>' +
          '<div class="cyan accent-4">Background</div>'
      }
    ]
  })
};
</script>