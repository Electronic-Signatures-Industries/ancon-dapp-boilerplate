<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- Red Color -->
  <!-- ----------------------------------------------------------------------------- -->
  <div class="pa-4">
    <v-card v-for="(item, i) in colordeeppurple" :key="i" class="mb-6">
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
  name: "DeepPurpleColor",

  data: () => ({
    colordeeppurple: [
      {
        colorname: "deep-purple",
        titletextcolor: "white--text",
        colorcode: "#673AB7",
        colortext: "deep-purple--text",
        examplecode:
          '<v-btn color="deep-purple">Button</v-btn>' +
          '<h3 class="deep-purple--text">Text</h3>' +
          '<div class="deep-purple">Background</div>'
      },
      {
        colorname: "deep-purple lighten-5",
        titletextcolor: "dark--text",
        colorcode: "#EDE7F6",
        colortext: "deep-purple--text text--lighten-5",
        examplecode:
          '<v-btn color="deep-purple lighten-5">Button</v-btn>' +
          '<h3 class="deep-purple--text text--lighten-5">Text</h3>' +
          '<div class="deep-purple lighten-5">Background</div>'
      },
      {
        colorname: "deep-purple lighten-4",
        titletextcolor: "dark--text",
        colorcode: "#D1C4E9",
        colortext: "deep-purple--text text--lighten-4",
        examplecode:
          '<v-btn color="deep-purple lighten-4">Button</v-btn>' +
          '<h3 class="deep-purple--text text--lighten-4">Text</h3>' +
          '<div class="deep-purple lighten-4">Background</div>'
      },
      {
        colorname: "deep-purple lighten-3",
        titletextcolor: "dark--text",
        colorcode: "#B39DDB",
        colortext: "deep-purple--text text--lighten-3",
        examplecode:
          '<v-btn color="deep-purple lighten-3">Button</v-btn>' +
          '<h3 class="deep-purple--text text--lighten-3">Text</h3>' +
          '<div class="deep-purple lighten-3">Background</div>'
      },
      {
        colorname: "deep-purple lighten-2",
        titletextcolor: "dark--text",
        colorcode: "#9575CD",
        colortext: "deep-purple--text text--lighten-2",
        examplecode:
          '<v-btn color="deep-purple lighten-2">Button</v-btn>' +
          '<h3 class="deep-purple--text text--lighten-2">Text</h3>' +
          '<div class="deep-purple lighten-2">Background</div>'
      },
      {
        colorname: "deep-purple lighten-1",
        titletextcolor: "dark--text",
        colorcode: "#7E57C2",
        colortext: "deep-purple--text text--lighten-1",
        examplecode:
          '<v-btn color="deep-purple lighten-1">Button</v-btn>' +
          '<h3 class="deep-purple--text text--lighten-1">Text</h3>' +
          '<div class="deep-purple lighten-1">Background</div>'
      },
      {
        colorname: "deep-purple darken-1",
        titletextcolor: "white--text",
        colorcode: "#5E35B1",
        colortext: "deep-purple--text text--darken-1",
        examplecode:
          '<v-btn color="deep-purple darken-1">Button</v-btn>' +
          '<h3 class="deep-purple--text text--darken-1">Text</h3>' +
          '<div class="deep-purple darken-1">Background</div>'
      },
      {
        colorname: "deep-purple darken-2",
        titletextcolor: "white--text",
        colorcode: "#512DA8",
        colortext: "deep-purple--text text--darken-2",
        examplecode:
          '<v-btn color="deep-purple darken-2">Button</v-btn>' +
          '<h3 class="deep-purple--text text--darken-2">Text</h3>' +
          '<div class="deep-purple darken-2">Background</div>'
      },
      {
        colorname: "deep-purple darken-3",
        titletextcolor: "white--text",
        colorcode: "#4527A0",
        colortext: "deep-purple--text text--darken-3",
        examplecode:
          '<v-btn color="deep-purple darken-3">Button</v-btn>' +
          '<h3 class="deep-purple--text text--darken-3">Text</h3>' +
          '<div class="deep-purple darken-3">Background</div>'
      },
      {
        colorname: "deep-purple darken-4",
        titletextcolor: "white--text",
        colorcode: "#311B92",
        colortext: "deep-purple--text text--darken-4",
        examplecode:
          '<v-btn color="deep-purple darken-4">Button</v-btn>' +
          '<h3 class="deep-purple--text text--darken-4">Text</h3>' +
          '<div class="deep-purple darken-4">Background</div>'
      },
      {
        colorname: "deep-purple accent-1",
        titletextcolor: "dark--text",
        colorcode: "#B388FF",
        colortext: "deep-purple--text text--accent-1",
        examplecode:
          '<v-btn color="deep-purple accent-1">Button</v-btn>' +
          '<h3 class="deep-purple--text text--accent-1">Text</h3>' +
          '<div class="deep-purple accent-1">Background</div>'
      },
      {
        colorname: "deep-purple accent-2",
        titletextcolor: "white--text",
        colorcode: "#7C4DFF",
        colortext: "deep-purple--text text--accent-2",
        examplecode:
          '<v-btn color="deep-purple accent-2">Button</v-btn>' +
          '<h3 class="deep-purple--text text--accent-2">Text</h3>' +
          '<div class="deep-purple accent-2">Background</div>'
      },
      {
        colorname: "deep-purple accent-3",
        titletextcolor: "white--text",
        colorcode: "#651FFF",
        colortext: "deep-purple--text text--accent-3",
        examplecode:
          '<v-btn color="deep-purple accent-3">Button</v-btn>' +
          '<h3 class="deep-purple--text text--accent-3">Text</h3>' +
          '<div class="deep-purple accent-3">Background</div>'
      },
      {
        colorname: "deep-purple accent-4",
        titletextcolor: "white--text",
        colorcode: "#6200EA",
        colortext: "deep-purple--text text--accent-4",
        examplecode:
          '<v-btn color="deep-purple accent-4">Button</v-btn>' +
          '<h3 class="deep-purple--text text--accent-4">Text</h3>' +
          '<div class="deep-purple accent-4">Background</div>'
      }
    ]
  })
};
</script>