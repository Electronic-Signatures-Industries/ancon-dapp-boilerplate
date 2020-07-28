<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- Red Color -->
  <!-- ----------------------------------------------------------------------------- -->
  <div class="pa-4">
    <v-card v-for="(item, i) in colorgrey" :key="i" class="mb-6">
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
  name: "GreyColor",

  data: () => ({
    colorgrey: [
      {
        colorname: "grey",
        titletextcolor: "white--text",
        colorcode: "#9E9E9E",
        colortext: "grey--text",
        examplecode:
          '<v-btn color="grey">Button</v-btn>' +
          '<h3 class="grey--text">Text</h3>' +
          '<div class="grey">Background</div>'
      },
      {
        colorname: "grey lighten-5",
        titletextcolor: "dark--text",
        colorcode: "#FAFAFA",
        colortext: "grey--text text--lighten-5",
        examplecode:
          '<v-btn color="grey lighten-5">Button</v-btn>' +
          '<h3 class="grey--text text--lighten-5">Text</h3>' +
          '<div class="grey lighten-5">Background</div>'
      },
      {
        colorname: "grey lighten-4",
        titletextcolor: "dark--text",
        colorcode: "#F5F5F5",
        colortext: "grey--text text--lighten-4",
        examplecode:
          '<v-btn color="grey lighten-4">Button</v-btn>' +
          '<h3 class="grey--text text--lighten-4">Text</h3>' +
          '<div class="grey lighten-4">Background</div>'
      },
      {
        colorname: "grey lighten-3",
        titletextcolor: "dark--text",
        colorcode: "#EEEEEE",
        colortext: "grey--text text--lighten-3",
        examplecode:
          '<v-btn color="grey lighten-3">Button</v-btn>' +
          '<h3 class="grey--text text--lighten-3">Text</h3>' +
          '<div class="grey lighten-3">Background</div>'
      },
      {
        colorname: "grey lighten-2",
        titletextcolor: "dark--text",
        colorcode: "#E0E0E0",
        colortext: "grey--text text--lighten-2",
        examplecode:
          '<v-btn color="grey lighten-2">Button</v-btn>' +
          '<h3 class="grey--text text--lighten-2">Text</h3>' +
          '<div class="grey lighten-2">Background</div>'
      },
      {
        colorname: "grey lighten-1",
        titletextcolor: "dark--text",
        colorcode: "#BDBDBD",
        colortext: "grey--text text--lighten-1",
        examplecode:
          '<v-btn color="grey lighten-1">Button</v-btn>' +
          '<h3 class="grey--text text--lighten-1">Text</h3>' +
          '<div class="grey lighten-1">Background</div>'
      },
      {
        colorname: "grey darken-1",
        titletextcolor: "white--text",
        colorcode: "#757575",
        colortext: "grey--text text--darken-1",
        examplecode:
          '<v-btn color="grey darken-1">Button</v-btn>' +
          '<h3 class="grey--text text--darken-1">Text</h3>' +
          '<div class="grey darken-1">Background</div>'
      },
      {
        colorname: "grey darken-2",
        titletextcolor: "white--text",
        colorcode: "#616161",
        colortext: "grey--text text--darken-2",
        examplecode:
          '<v-btn color="grey darken-2">Button</v-btn>' +
          '<h3 class="grey--text text--darken-2">Text</h3>' +
          '<div class="grey darken-2">Background</div>'
      },
      {
        colorname: "grey darken-3",
        titletextcolor: "white--text",
        colorcode: "#424242",
        colortext: "grey--text text--darken-3",
        examplecode:
          '<v-btn color="grey darken-3">Button</v-btn>' +
          '<h3 class="grey--text text--darken-3">Text</h3>' +
          '<div class="grey darken-3">Background</div>'
      },
      {
        colorname: "grey darken-4",
        titletextcolor: "white--text",
        colorcode: "#212121",
        colortext: "grey--text text--darken-4",
        examplecode:
          '<v-btn color="grey darken-4">Button</v-btn>' +
          '<h3 class="grey--text text--darken-4">Text</h3>' +
          '<div class="grey darken-4">Background</div>'
      }
    ]
  })
};
</script>