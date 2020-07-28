<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- Red Color -->
  <!-- ----------------------------------------------------------------------------- -->
  <div class="pa-4">
    <v-card v-for="(item, i) in colorbrown" :key="i" class="mb-6">
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
  name: "BrownColor",

  data: () => ({
    colorbrown: [
      {
        colorname: "brown",
        titletextcolor: "white--text",
        colorcode: "#795548",
        colortext: "brown--text",
        examplecode:
          '<v-btn color="brown">Button</v-btn>' +
          '<h3 class="brown--text">Text</h3>' +
          '<div class="brown">Background</div>'
      },
      {
        colorname: "brown lighten-5",
        titletextcolor: "dark--text",
        colorcode: "#EFEBE9",
        colortext: "brown--text text--lighten-5",
        examplecode:
          '<v-btn color="brown lighten-5">Button</v-btn>' +
          '<h3 class="brown--text text--lighten-5">Text</h3>' +
          '<div class="brown lighten-5">Background</div>'
      },
      {
        colorname: "brown lighten-4",
        titletextcolor: "dark--text",
        colorcode: "#D7CCC8",
        colortext: "brown--text text--lighten-4",
        examplecode:
          '<v-btn color="brown lighten-4">Button</v-btn>' +
          '<h3 class="brown--text text--lighten-4">Text</h3>' +
          '<div class="brown lighten-4">Background</div>'
      },
      {
        colorname: "brown lighten-3",
        titletextcolor: "dark--text",
        colorcode: "#BCAAA4",
        colortext: "brown--text text--lighten-3",
        examplecode:
          '<v-btn color="brown lighten-3">Button</v-btn>' +
          '<h3 class="brown--text text--lighten-3">Text</h3>' +
          '<div class="brown lighten-3">Background</div>'
      },
      {
        colorname: "brown lighten-2",
        titletextcolor: "dark--text",
        colorcode: "#A1887F",
        colortext: "brown--text text--lighten-2",
        examplecode:
          '<v-btn color="brown lighten-2">Button</v-btn>' +
          '<h3 class="brown--text text--lighten-2">Text</h3>' +
          '<div class="brown lighten-2">Background</div>'
      },
      {
        colorname: "brown lighten-1",
        titletextcolor: "dark--text",
        colorcode: "#8D6E63",
        colortext: "brown--text text--lighten-1",
        examplecode:
          '<v-btn color="brown lighten-1">Button</v-btn>' +
          '<h3 class="brown--text text--lighten-1">Text</h3>' +
          '<div class="brown lighten-1">Background</div>'
      },
      {
        colorname: "brown darken-1",
        titletextcolor: "white--text",
        colorcode: "#6D4C41",
        colortext: "brown--text text--darken-1",
        examplecode:
          '<v-btn color="brown darken-1">Button</v-btn>' +
          '<h3 class="brown--text text--darken-1">Text</h3>' +
          '<div class="brown darken-1">Background</div>'
      },
      {
        colorname: "brown darken-2",
        titletextcolor: "white--text",
        colorcode: "#5D4037",
        colortext: "brown--text text--darken-2",
        examplecode:
          '<v-btn color="brown darken-2">Button</v-btn>' +
          '<h3 class="brown--text text--darken-2">Text</h3>' +
          '<div class="brown darken-2">Background</div>'
      },
      {
        colorname: "brown darken-3",
        titletextcolor: "white--text",
        colorcode: "#4E342E",
        colortext: "brown--text text--darken-3",
        examplecode:
          '<v-btn color="brown darken-3">Button</v-btn>' +
          '<h3 class="brown--text text--darken-3">Text</h3>' +
          '<div class="brown darken-3">Background</div>'
      },
      {
        colorname: "brown darken-4",
        titletextcolor: "white--text",
        colorcode: "#3E2723",
        colortext: "brown--text text--darken-4",
        examplecode:
          '<v-btn color="brown darken-4">Button</v-btn>' +
          '<h3 class="brown--text text--darken-4">Text</h3>' +
          '<div class="brown darken-4">Background</div>'
      }
    ]
  })
};
</script>