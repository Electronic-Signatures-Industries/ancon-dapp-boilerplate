<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- blue-grey Color -->
  <!-- ----------------------------------------------------------------------------- -->
  <div class="pa-4">
    <v-card v-for="(item, i) in colorbluegrey" :key="i" class="mb-6">
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
  name: "BlueGreyColor",

  data: () => ({
    colorbluegrey: [
      {
        colorname: "blue-grey",
        titletextcolor: "white--text",
        colorcode: "#607D8B",
        colortext: "blue-grey--text",
        examplecode:
          '<v-btn color="blue-grey">Button</v-btn>' +
          '<h3 class="blue-grey--text">Text</h3>' +
          '<div class="blue-grey">Background</div>'
      },
      {
        colorname: "blue-grey lighten-5",
        titletextcolor: "dark--text",
        colorcode: "#ECEFF1",
        colortext: "blue-grey--text text--lighten-5",
        examplecode:
          '<v-btn color="blue-grey lighten-5">Button</v-btn>' +
          '<h3 class="blue-grey--text text--lighten-5">Text</h3>' +
          '<div class="blue-grey lighten-5">Background</div>'
      },
      {
        colorname: "blue-grey lighten-4",
        titletextcolor: "dark--text",
        colorcode: "#CFD8DC",
        colortext: "blue-grey--text text--lighten-4",
        examplecode:
          '<v-btn color="blue-grey lighten-4">Button</v-btn>' +
          '<h3 class="blue-grey--text text--lighten-4">Text</h3>' +
          '<div class="blue-grey lighten-4">Background</div>'
      },
      {
        colorname: "blue-grey lighten-3",
        titletextcolor: "dark--text",
        colorcode: "#B0BEC5",
        colortext: "blue-grey--text text--lighten-3",
        examplecode:
          '<v-btn color="blue-grey lighten-3">Button</v-btn>' +
          '<h3 class="blue-grey--text text--lighten-3">Text</h3>' +
          '<div class="blue-grey lighten-3">Background</div>'
      },
      {
        colorname: "blue-grey lighten-2",
        titletextcolor: "dark--text",
        colorcode: "#90A4AE",
        colortext: "blue-grey--text text--lighten-2",
        examplecode:
          '<v-btn color="blue-grey lighten-2">Button</v-btn>' +
          '<h3 class="blue-grey--text text--lighten-2">Text</h3>' +
          '<div class="blue-grey lighten-2">Background</div>'
      },
      {
        colorname: "blue-grey lighten-1",
        titletextcolor: "dark--text",
        colorcode: "#78909C",
        colortext: "blue-grey--text text--lighten-1",
        examplecode:
          '<v-btn color="blue-grey lighten-1">Button</v-btn>' +
          '<h3 class="blue-grey--text text--lighten-1">Text</h3>' +
          '<div class="blue-grey lighten-1">Background</div>'
      },
      {
        colorname: "blue-grey darken-1",
        titletextcolor: "white--text",
        colorcode: "#546E7A",
        colortext: "blue-grey--text text--darken-1",
        examplecode:
          '<v-btn color="blue-grey darken-1">Button</v-btn>' +
          '<h3 class="blue-grey--text text--darken-1">Text</h3>' +
          '<div class="blue-grey darken-1">Background</div>'
      },
      {
        colorname: "blue-grey darken-2",
        titletextcolor: "white--text",
        colorcode: "#455A64",
        colortext: "blue-grey--text text--darken-2",
        examplecode:
          '<v-btn color="blue-grey darken-2">Button</v-btn>' +
          '<h3 class="blue-grey--text text--darken-2">Text</h3>' +
          '<div class="blue-grey darken-2">Background</div>'
      },
      {
        colorname: "blue-grey darken-3",
        titletextcolor: "white--text",
        colorcode: "#37474F",
        colortext: "blue-grey--text text--darken-3",
        examplecode:
          '<v-btn color="blue-grey darken-3">Button</v-btn>' +
          '<h3 class="blue-grey--text text--darken-3">Text</h3>' +
          '<div class="blue-grey darken-3">Background</div>'
      },
      {
        colorname: "blue-grey darken-4",
        titletextcolor: "white--text",
        colorcode: "#263238",
        colortext: "blue-grey--text text--darken-4",
        examplecode:
          '<v-btn color="blue-grey darken-4">Button</v-btn>' +
          '<h3 class="blue-grey--text text--darken-4">Text</h3>' +
          '<div class="blue-grey darken-4">Background</div>'
      }
    ]
  })
};
</script>