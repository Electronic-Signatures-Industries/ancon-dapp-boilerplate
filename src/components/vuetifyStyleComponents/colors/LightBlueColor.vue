<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- light-blue Color -->
  <!-- ----------------------------------------------------------------------------- -->
  <div class="pa-4">
    <v-card v-for="(item, i) in colorlightblue" :key="i" class="mb-6">
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
  name: "LightBlueColor",

  data: () => ({
    colorlightblue: [
      {
        colorname: "light-blue",
        titletextcolor: "white--text",
        colorcode: "#03A9F4",
        colortext: "light-blue--text",
        examplecode:
          '<v-btn color="light-blue">Button</v-btn>' +
          '<h3 class="light-blue--text">Text</h3>' +
          '<div class="light-blue">Background</div>'
      },
      {
        colorname: "light-blue lighten-5",
        titletextcolor: "dark--text",
        colorcode: "#E1F5FE",
        colortext: "light-blue--text text--lighten-5",
        examplecode:
          '<v-btn color="light-blue lighten-5">Button</v-btn>' +
          '<h3 class="light-blue--text text--lighten-5">Text</h3>' +
          '<div class="light-blue lighten-5">Background</div>'
      },
      {
        colorname: "light-blue lighten-4",
        titletextcolor: "dark--text",
        colorcode: "#B3E5FC",
        colortext: "light-blue--text text--lighten-4",
        examplecode:
          '<v-btn color="light-blue lighten-4">Button</v-btn>' +
          '<h3 class="light-blue--text text--lighten-4">Text</h3>' +
          '<div class="light-blue lighten-4">Background</div>'
      },
      {
        colorname: "light-blue lighten-3",
        titletextcolor: "dark--text",
        colorcode: "#81D4FA",
        colortext: "light-blue--text text--lighten-3",
        examplecode:
          '<v-btn color="light-blue lighten-3">Button</v-btn>' +
          '<h3 class="light-blue--text text--lighten-3">Text</h3>' +
          '<div class="light-blue lighten-3">Background</div>'
      },
      {
        colorname: "light-blue lighten-2",
        titletextcolor: "dark--text",
        colorcode: "#4FC3F7",
        colortext: "light-blue--text text--lighten-2",
        examplecode:
          '<v-btn color="light-blue lighten-2">Button</v-btn>' +
          '<h3 class="light-blue--text text--lighten-2">Text</h3>' +
          '<div class="light-blue lighten-2">Background</div>'
      },
      {
        colorname: "light-blue lighten-1",
        titletextcolor: "dark--text",
        colorcode: "#29B6F6",
        colortext: "light-blue--text text--lighten-1",
        examplecode:
          '<v-btn color="light-blue lighten-1">Button</v-btn>' +
          '<h3 class="light-blue--text text--lighten-1">Text</h3>' +
          '<div class="light-blue lighten-1">Background</div>'
      },
      {
        colorname: "light-blue darken-1",
        titletextcolor: "white--text",
        colorcode: "#039BE5",
        colortext: "light-blue--text text--darken-1",
        examplecode:
          '<v-btn color="light-blue darken-1">Button</v-btn>' +
          '<h3 class="light-blue--text text--darken-1">Text</h3>' +
          '<div class="light-blue darken-1">Background</div>'
      },
      {
        colorname: "light-blue darken-2",
        titletextcolor: "white--text",
        colorcode: "#0288D1",
        colortext: "light-blue--text text--darken-2",
        examplecode:
          '<v-btn color="light-blue darken-2">Button</v-btn>' +
          '<h3 class="light-blue--text text--darken-2">Text</h3>' +
          '<div class="light-blue darken-2">Background</div>'
      },
      {
        colorname: "light-blue darken-3",
        titletextcolor: "white--text",
        colorcode: "#0277BD",
        colortext: "light-blue--text text--darken-3",
        examplecode:
          '<v-btn color="light-blue darken-3">Button</v-btn>' +
          '<h3 class="light-blue--text text--darken-3">Text</h3>' +
          '<div class="light-blue darken-3">Background</div>'
      },
      {
        colorname: "light-blue darken-4",
        titletextcolor: "white--text",
        colorcode: "#01579B",
        colortext: "light-blue--text text--darken-4",
        examplecode:
          '<v-btn color="light-blue darken-4">Button</v-btn>' +
          '<h3 class="light-blue--text text--darken-4">Text</h3>' +
          '<div class="light-blue darken-4">Background</div>'
      },
      {
        colorname: "light-blue accent-1",
        titletextcolor: "dark--text",
        colorcode: "#80D8FF",
        colortext: "light-blue--text text--accent-1",
        examplecode:
          '<v-btn color="light-blue accent-1">Button</v-btn>' +
          '<h3 class="light-blue--text text--accent-1">Text</h3>' +
          '<div class="light-blue accent-1">Background</div>'
      },
      {
        colorname: "light-blue accent-2",
        titletextcolor: "white--text",
        colorcode: "#40C4FF",
        colortext: "light-blue--text text--accent-2",
        examplecode:
          '<v-btn color="light-blue accent-2">Button</v-btn>' +
          '<h3 class="light-blue--text text--accent-2">Text</h3>' +
          '<div class="light-blue accent-2">Background</div>'
      },
      {
        colorname: "light-blue accent-3",
        titletextcolor: "white--text",
        colorcode: "#00B0FF",
        colortext: "light-blue--text text--accent-3",
        examplecode:
          '<v-btn color="light-blue accent-3">Button</v-btn>' +
          '<h3 class="light-blue--text text--accent-3">Text</h3>' +
          '<div class="light-blue accent-3">Background</div>'
      },
      {
        colorname: "light-blue accent-4",
        titletextcolor: "white--text",
        colorcode: "#0091EA",
        colortext: "light-blue--text text--accent-4",
        examplecode:
          '<v-btn color="light-blue accent-4">Button</v-btn>' +
          '<h3 class="light-blue--text text--accent-4">Text</h3>' +
          '<div class="light-blue accent-4">Background</div>'
      }
    ]
  })
};
</script>