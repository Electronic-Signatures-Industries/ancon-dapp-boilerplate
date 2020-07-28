<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- Red Color -->
  <!-- ----------------------------------------------------------------------------- -->
  <div class="pa-4">
    <v-card v-for="(item, i) in colorpink" :key="i" class="mb-6">
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
  name: "PinkColor",

  data: () => ({
    colorpink: [
      {
        colorname: "pink",
        titletextcolor: "white--text",
        colorcode: "#E91E63",
        colortext: "pink--text",
        examplecode:
          '<v-btn color="pink">Button</v-btn>' +
          '<h3 class="pink--text">Text</h3>' +
          '<div class="pink">Background</div>'
      },
      {
        colorname: "pink lighten-5",
        titletextcolor: "dark--text",
        colorcode: "#FCE4EC",
        colortext: "pink--text text--lighten-5",
        examplecode:
          '<v-btn color="pink lighten-5">Button</v-btn>' +
          '<h3 class="pink--text text--lighten-5">Text</h3>' +
          '<div class="pink lighten-5">Background</div>'
      },
      {
        colorname: "pink lighten-4",
        titletextcolor: "dark--text",
        colorcode: "#F8BBD0",
        colortext: "pink--text text--lighten-4",
        examplecode:
          '<v-btn color="pink lighten-4">Button</v-btn>' +
          '<h3 class="pink--text text--lighten-4">Text</h3>' +
          '<div class="pink lighten-4">Background</div>'
      },
      {
        colorname: "pink lighten-3",
        titletextcolor: "dark--text",
        colorcode: "#F48FB1",
        colortext: "pink--text text--lighten-3",
        examplecode:
          '<v-btn color="pink lighten-3">Button</v-btn>' +
          '<h3 class="pink--text text--lighten-3">Text</h3>' +
          '<div class="pink lighten-3">Background</div>'
      },
      {
        colorname: "pink lighten-2",
        titletextcolor: "dark--text",
        colorcode: "#F06292",
        colortext: "pink--text text--lighten-2",
        examplecode:
          '<v-btn color="pink lighten-2">Button</v-btn>' +
          '<h3 class="pink--text text--lighten-2">Text</h3>' +
          '<div class="pink lighten-2">Background</div>'
      },
      {
        colorname: "pink lighten-1",
        titletextcolor: "dark--text",
        colorcode: "#EC407A",
        colortext: "pink--text text--lighten-1",
        examplecode:
          '<v-btn color="pink lighten-1">Button</v-btn>' +
          '<h3 class="pink--text text--lighten-1">Text</h3>' +
          '<div class="pink lighten-1">Background</div>'
      },
      {
        colorname: "pink darken-1",
        titletextcolor: "white--text",
        colorcode: "#D81B60",
        colortext: "pink--text text--darken-1",
        examplecode:
          '<v-btn color="pink darken-1">Button</v-btn>' +
          '<h3 class="pink--text text--darken-1">Text</h3>' +
          '<div class="pink darken-1">Background</div>'
      },
      {
        colorname: "pink darken-2",
        titletextcolor: "white--text",
        colorcode: "#C2185B",
        colortext: "pink--text text--darken-2",
        examplecode:
          '<v-btn color="pink darken-2">Button</v-btn>' +
          '<h3 class="pink--text text--darken-2">Text</h3>' +
          '<div class="pink darken-2">Background</div>'
      },
      {
        colorname: "pink darken-3",
        titletextcolor: "white--text",
        colorcode: "#AD1457",
        colortext: "pink--text text--darken-3",
        examplecode:
          '<v-btn color="pink darken-3">Button</v-btn>' +
          '<h3 class="pink--text text--darken-3">Text</h3>' +
          '<div class="pink darken-3">Background</div>'
      },
      {
        colorname: "pink darken-4",
        titletextcolor: "white--text",
        colorcode: "#880E4F",
        colortext: "pink--text text--darken-4",
        examplecode:
          '<v-btn color="pink darken-4">Button</v-btn>' +
          '<h3 class="pink--text text--darken-4">Text</h3>' +
          '<div class="pink darken-4">Background</div>'
      },
      {
        colorname: "pink accent-1",
        titletextcolor: "dark--text",
        colorcode: "#FF8A80",
        colortext: "pink--text text--accent-1",
        examplecode:
          '<v-btn color="pink accent-1">Button</v-btn>' +
          '<h3 class="pink--text text--accent-1">Text</h3>' +
          '<div class="pink accent-1">Background</div>'
      },
      {
        colorname: "pink accent-2",
        titletextcolor: "white--text",
        colorcode: "#FF5252",
        colortext: "pink--text text--accent-2",
        examplecode:
          '<v-btn color="pink accent-2">Button</v-btn>' +
          '<h3 class="pink--text text--accent-2">Text</h3>' +
          '<div class="pink accent-2">Background</div>'
      },
      {
        colorname: "pink accent-3",
        titletextcolor: "white--text",
        colorcode: "#FF1744",
        colortext: "pink--text text--accent-3",
        examplecode:
          '<v-btn color="pink accent-3">Button</v-btn>' +
          '<h3 class="pink--text text--accent-3">Text</h3>' +
          '<div class="pink accent-3">Background</div>'
      },
      {
        colorname: "pink accent-4",
        titletextcolor: "white--text",
        colorcode: "#D50000",
        colortext: "pink--text text--accent-4",
        examplecode:
          '<v-btn color="pink accent-4">Button</v-btn>' +
          '<h3 class="pink--text text--accent-4">Text</h3>' +
          '<div class="pink accent-4">Background</div>'
      }
    ]
  })
};
</script>