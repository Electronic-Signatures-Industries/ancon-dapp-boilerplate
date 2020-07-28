<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- blue Color -->
  <!-- ----------------------------------------------------------------------------- -->
  <div class="pa-4">
    <v-card v-for="(item, i) in colorblue" :key="i" class="mb-6">
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
  name: "BlueColor",

  data: () => ({
    colorblue: [
      {
        colorname: "blue",
        titletextcolor: "white--text",
        colorcode: "#2196F3",
        colortext: "blue--text",
        examplecode:
          '<v-btn color="blue">Button</v-btn>' +
          '<h3 class="blue--text">Text</h3>' +
          '<div class="blue">Background</div>'
      },
      {
        colorname: "blue lighten-5",
        titletextcolor: "dark--text",
        colorcode: "#E3F2FD",
        colortext: "blue--text text--lighten-5",
        examplecode:
          '<v-btn color="blue lighten-5">Button</v-btn>' +
          '<h3 class="blue--text text--lighten-5">Text</h3>' +
          '<div class="blue lighten-5">Background</div>'
      },
      {
        colorname: "blue lighten-4",
        titletextcolor: "dark--text",
        colorcode: "#BBDEFB",
        colortext: "blue--text text--lighten-4",
        examplecode:
          '<v-btn color="blue lighten-4">Button</v-btn>' +
          '<h3 class="blue--text text--lighten-4">Text</h3>' +
          '<div class="blue lighten-4">Background</div>'
      },
      {
        colorname: "blue lighten-3",
        titletextcolor: "dark--text",
        colorcode: "#90CAF9",
        colortext: "blue--text text--lighten-3",
        examplecode:
          '<v-btn color="blue lighten-3">Button</v-btn>' +
          '<h3 class="blue--text text--lighten-3">Text</h3>' +
          '<div class="blue lighten-3">Background</div>'
      },
      {
        colorname: "blue lighten-2",
        titletextcolor: "dark--text",
        colorcode: "#64B5F6",
        colortext: "blue--text text--lighten-2",
        examplecode:
          '<v-btn color="blue lighten-2">Button</v-btn>' +
          '<h3 class="blue--text text--lighten-2">Text</h3>' +
          '<div class="blue lighten-2">Background</div>'
      },
      {
        colorname: "blue lighten-1",
        titletextcolor: "dark--text",
        colorcode: "#42A5F5",
        colortext: "blue--text text--lighten-1",
        examplecode:
          '<v-btn color="blue lighten-1">Button</v-btn>' +
          '<h3 class="blue--text text--lighten-1">Text</h3>' +
          '<div class="blue lighten-1">Background</div>'
      },
      {
        colorname: "blue darken-1",
        titletextcolor: "white--text",
        colorcode: "#1E88E5",
        colortext: "blue--text text--darken-1",
        examplecode:
          '<v-btn color="blue darken-1">Button</v-btn>' +
          '<h3 class="blue--text text--darken-1">Text</h3>' +
          '<div class="blue darken-1">Background</div>'
      },
      {
        colorname: "blue darken-2",
        titletextcolor: "white--text",
        colorcode: "#1976D2",
        colortext: "blue--text text--darken-2",
        examplecode:
          '<v-btn color="blue darken-2">Button</v-btn>' +
          '<h3 class="blue--text text--darken-2">Text</h3>' +
          '<div class="blue darken-2">Background</div>'
      },
      {
        colorname: "blue darken-3",
        titletextcolor: "white--text",
        colorcode: "#1565C0",
        colortext: "blue--text text--darken-3",
        examplecode:
          '<v-btn color="blue darken-3">Button</v-btn>' +
          '<h3 class="blue--text text--darken-3">Text</h3>' +
          '<div class="blue darken-3">Background</div>'
      },
      {
        colorname: "blue darken-4",
        titletextcolor: "white--text",
        colorcode: "#0D47A1",
        colortext: "blue--text text--darken-4",
        examplecode:
          '<v-btn color="blue darken-4">Button</v-btn>' +
          '<h3 class="blue--text text--darken-4">Text</h3>' +
          '<div class="blue darken-4">Background</div>'
      },
      {
        colorname: "blue accent-1",
        titletextcolor: "dark--text",
        colorcode: "#82B1FF",
        colortext: "blue--text text--accent-1",
        examplecode:
          '<v-btn color="blue accent-1">Button</v-btn>' +
          '<h3 class="blue--text text--accent-1">Text</h3>' +
          '<div class="blue accent-1">Background</div>'
      },
      {
        colorname: "blue accent-2",
        titletextcolor: "white--text",
        colorcode: "#448AFF",
        colortext: "blue--text text--accent-2",
        examplecode:
          '<v-btn color="blue accent-2">Button</v-btn>' +
          '<h3 class="blue--text text--accent-2">Text</h3>' +
          '<div class="blue accent-2">Background</div>'
      },
      {
        colorname: "blue accent-3",
        titletextcolor: "white--text",
        colorcode: "#2979FF",
        colortext: "blue--text text--accent-3",
        examplecode:
          '<v-btn color="blue accent-3">Button</v-btn>' +
          '<h3 class="blue--text text--accent-3">Text</h3>' +
          '<div class="blue accent-3">Background</div>'
      },
      {
        colorname: "blue accent-4",
        titletextcolor: "white--text",
        colorcode: "#2962FF",
        colortext: "blue--text text--accent-4",
        examplecode:
          '<v-btn color="blue accent-4">Button</v-btn>' +
          '<h3 class="blue--text text--accent-4">Text</h3>' +
          '<div class="blue accent-4">Background</div>'
      }
    ]
  })
};
</script>