<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- yellow Color -->
  <!-- ----------------------------------------------------------------------------- -->
  <div class="pa-4">
    <v-card v-for="(item, i) in coloryellow" :key="i" class="mb-6">
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
  name: "YellowColor",

  data: () => ({
    coloryellow: [
      {
        colorname: "yellow",
        titletextcolor: "white--text",
        colorcode: "#FFEB3B",
        colortext: "yellow--text",
        examplecode:
          '<v-btn color="yellow">Button</v-btn>' +
          '<h3 class="yellow--text">Text</h3>' +
          '<div class="yellow">Background</div>'
      },
      {
        colorname: "yellow lighten-5",
        titletextcolor: "dark--text",
        colorcode: "#FFFDE7",
        colortext: "yellow--text text--lighten-5",
        examplecode:
          '<v-btn color="yellow lighten-5">Button</v-btn>' +
          '<h3 class="yellow--text text--lighten-5">Text</h3>' +
          '<div class="yellow lighten-5">Background</div>'
      },
      {
        colorname: "yellow lighten-4",
        titletextcolor: "dark--text",
        colorcode: "#FFF9C4",
        colortext: "yellow--text text--lighten-4",
        examplecode:
          '<v-btn color="yellow lighten-4">Button</v-btn>' +
          '<h3 class="yellow--text text--lighten-4">Text</h3>' +
          '<div class="yellow lighten-4">Background</div>'
      },
      {
        colorname: "yellow lighten-3",
        titletextcolor: "dark--text",
        colorcode: "#FFF59D",
        colortext: "yellow--text text--lighten-3",
        examplecode:
          '<v-btn color="yellow lighten-3">Button</v-btn>' +
          '<h3 class="yellow--text text--lighten-3">Text</h3>' +
          '<div class="yellow lighten-3">Background</div>'
      },
      {
        colorname: "yellow lighten-2",
        titletextcolor: "dark--text",
        colorcode: "#FFF176",
        colortext: "yellow--text text--lighten-2",
        examplecode:
          '<v-btn color="yellow lighten-2">Button</v-btn>' +
          '<h3 class="yellow--text text--lighten-2">Text</h3>' +
          '<div class="yellow lighten-2">Background</div>'
      },
      {
        colorname: "yellow lighten-1",
        titletextcolor: "dark--text",
        colorcode: "#FFEE58",
        colortext: "yellow--text text--lighten-1",
        examplecode:
          '<v-btn color="yellow lighten-1">Button</v-btn>' +
          '<h3 class="yellow--text text--lighten-1">Text</h3>' +
          '<div class="yellow lighten-1">Background</div>'
      },
      {
        colorname: "yellow darken-1",
        titletextcolor: "white--text",
        colorcode: "#FDD835",
        colortext: "yellow--text text--darken-1",
        examplecode:
          '<v-btn color="yellow darken-1">Button</v-btn>' +
          '<h3 class="yellow--text text--darken-1">Text</h3>' +
          '<div class="yellow darken-1">Background</div>'
      },
      {
        colorname: "yellow darken-2",
        titletextcolor: "white--text",
        colorcode: "#FBC02D",
        colortext: "yellow--text text--darken-2",
        examplecode:
          '<v-btn color="yellow darken-2">Button</v-btn>' +
          '<h3 class="yellow--text text--darken-2">Text</h3>' +
          '<div class="yellow darken-2">Background</div>'
      },
      {
        colorname: "yellow darken-3",
        titletextcolor: "white--text",
        colorcode: "#F9A825",
        colortext: "yellow--text text--darken-3",
        examplecode:
          '<v-btn color="yellow darken-3">Button</v-btn>' +
          '<h3 class="yellow--text text--darken-3">Text</h3>' +
          '<div class="yellow darken-3">Background</div>'
      },
      {
        colorname: "yellow darken-4",
        titletextcolor: "white--text",
        colorcode: "#F57F17",
        colortext: "yellow--text text--darken-4",
        examplecode:
          '<v-btn color="yellow darken-4">Button</v-btn>' +
          '<h3 class="yellow--text text--darken-4">Text</h3>' +
          '<div class="yellow darken-4">Background</div>'
      },
      {
        colorname: "yellow accent-1",
        titletextcolor: "dark--text",
        colorcode: "#FFFF8D",
        colortext: "yellow--text text--accent-1",
        examplecode:
          '<v-btn color="yellow accent-1">Button</v-btn>' +
          '<h3 class="yellow--text text--accent-1">Text</h3>' +
          '<div class="yellow accent-1">Background</div>'
      },
      {
        colorname: "yellow accent-2",
        titletextcolor: "white--text",
        colorcode: "#FFFF00",
        colortext: "yellow--text text--accent-2",
        examplecode:
          '<v-btn color="yellow accent-2">Button</v-btn>' +
          '<h3 class="yellow--text text--accent-2">Text</h3>' +
          '<div class="yellow accent-2">Background</div>'
      },
      {
        colorname: "yellow accent-3",
        titletextcolor: "white--text",
        colorcode: "#FFEA00",
        colortext: "yellow--text text--accent-3",
        examplecode:
          '<v-btn color="yellow accent-3">Button</v-btn>' +
          '<h3 class="yellow--text text--accent-3">Text</h3>' +
          '<div class="yellow accent-3">Background</div>'
      },
      {
        colorname: "yellow accent-4",
        titletextcolor: "white--text",
        colorcode: "#FFD600",
        colortext: "yellow--text text--accent-4",
        examplecode:
          '<v-btn color="yellow accent-4">Button</v-btn>' +
          '<h3 class="yellow--text text--accent-4">Text</h3>' +
          '<div class="yellow accent-4">Background</div>'
      }
    ]
  })
};
</script>