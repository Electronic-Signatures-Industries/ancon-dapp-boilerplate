<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- Red Color -->
  <!-- ----------------------------------------------------------------------------- -->
  <div class="pa-4">
    <v-card v-for="(item, i) in colorteal" :key="i" class="mb-6">
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
  name: "TealColor",

  data: () => ({
    colorteal: [
      {
        colorname: "teal",
        titletextcolor: "white--text",
        colorcode: "#009688",
        colortext: "teal--text",
        examplecode:
          '<v-btn color="teal">Button</v-btn>' +
          '<h3 class="teal--text">Text</h3>' +
          '<div class="teal">Background</div>'
      },
      {
        colorname: "teal lighten-5",
        titletextcolor: "dark--text",
        colorcode: "#E0F2F1",
        colortext: "teal--text text--lighten-5",
        examplecode:
          '<v-btn color="teal lighten-5">Button</v-btn>' +
          '<h3 class="teal--text text--lighten-5">Text</h3>' +
          '<div class="teal lighten-5">Background</div>'
      },
      {
        colorname: "teal lighten-4",
        titletextcolor: "dark--text",
        colorcode: "#B2DFDB",
        colortext: "teal--text text--lighten-4",
        examplecode:
          '<v-btn color="teal lighten-4">Button</v-btn>' +
          '<h3 class="teal--text text--lighten-4">Text</h3>' +
          '<div class="teal lighten-4">Background</div>'
      },
      {
        colorname: "teal lighten-3",
        titletextcolor: "dark--text",
        colorcode: "#80CBC4",
        colortext: "teal--text text--lighten-3",
        examplecode:
          '<v-btn color="teal lighten-3">Button</v-btn>' +
          '<h3 class="teal--text text--lighten-3">Text</h3>' +
          '<div class="teal lighten-3">Background</div>'
      },
      {
        colorname: "teal lighten-2",
        titletextcolor: "dark--text",
        colorcode: "#4DB6AC",
        colortext: "teal--text text--lighten-2",
        examplecode:
          '<v-btn color="teal lighten-2">Button</v-btn>' +
          '<h3 class="teal--text text--lighten-2">Text</h3>' +
          '<div class="teal lighten-2">Background</div>'
      },
      {
        colorname: "teal lighten-1",
        titletextcolor: "dark--text",
        colorcode: "#26A69A",
        colortext: "teal--text text--lighten-1",
        examplecode:
          '<v-btn color="teal lighten-1">Button</v-btn>' +
          '<h3 class="teal--text text--lighten-1">Text</h3>' +
          '<div class="teal lighten-1">Background</div>'
      },
      {
        colorname: "teal darken-1",
        titletextcolor: "white--text",
        colorcode: "#00897B",
        colortext: "teal--text text--darken-1",
        examplecode:
          '<v-btn color="teal darken-1">Button</v-btn>' +
          '<h3 class="teal--text text--darken-1">Text</h3>' +
          '<div class="teal darken-1">Background</div>'
      },
      {
        colorname: "teal darken-2",
        titletextcolor: "white--text",
        colorcode: "#00796B",
        colortext: "teal--text text--darken-2",
        examplecode:
          '<v-btn color="teal darken-2">Button</v-btn>' +
          '<h3 class="teal--text text--darken-2">Text</h3>' +
          '<div class="teal darken-2">Background</div>'
      },
      {
        colorname: "teal darken-3",
        titletextcolor: "white--text",
        colorcode: "#00695C",
        colortext: "teal--text text--darken-3",
        examplecode:
          '<v-btn color="teal darken-3">Button</v-btn>' +
          '<h3 class="teal--text text--darken-3">Text</h3>' +
          '<div class="teal darken-3">Background</div>'
      },
      {
        colorname: "teal darken-4",
        titletextcolor: "white--text",
        colorcode: "#004D40",
        colortext: "teal--text text--darken-4",
        examplecode:
          '<v-btn color="teal darken-4">Button</v-btn>' +
          '<h3 class="teal--text text--darken-4">Text</h3>' +
          '<div class="teal darken-4">Background</div>'
      },
      {
        colorname: "teal accent-1",
        titletextcolor: "dark--text",
        colorcode: "#A7FFEB",
        colortext: "teal--text text--accent-1",
        examplecode:
          '<v-btn color="teal accent-1">Button</v-btn>' +
          '<h3 class="teal--text text--accent-1">Text</h3>' +
          '<div class="teal accent-1">Background</div>'
      },
      {
        colorname: "teal accent-2",
        titletextcolor: "white--text",
        colorcode: "#64FFDA",
        colortext: "teal--text text--accent-2",
        examplecode:
          '<v-btn color="teal accent-2">Button</v-btn>' +
          '<h3 class="teal--text text--accent-2">Text</h3>' +
          '<div class="teal accent-2">Background</div>'
      },
      {
        colorname: "teal accent-3",
        titletextcolor: "white--text",
        colorcode: "#1DE9B6",
        colortext: "teal--text text--accent-3",
        examplecode:
          '<v-btn color="teal accent-3">Button</v-btn>' +
          '<h3 class="teal--text text--accent-3">Text</h3>' +
          '<div class="teal accent-3">Background</div>'
      },
      {
        colorname: "teal accent-4",
        titletextcolor: "white--text",
        colorcode: "#00BFA5",
        colortext: "teal--text text--accent-4",
        examplecode:
          '<v-btn color="teal accent-4">Button</v-btn>' +
          '<h3 class="teal--text text--accent-4">Text</h3>' +
          '<div class="teal accent-4">Background</div>'
      }
    ]
  })
};
</script>