<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- Orange Color -->
  <!-- ----------------------------------------------------------------------------- -->
  <div class="pa-4">
    <v-card v-for="(item, i) in colororange" :key="i" class="mb-6">
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
  name: "OrangeColor",

  data: () => ({
    colororange: [
      {
        colorname: "orange",
        titletextcolor: "white--text",
        colorcode: "#FF9800",
        colortext: "orange--text",
        examplecode:
          '<v-btn color="orange">Button</v-btn>' +
          '<h3 class="orange--text">Text</h3>' +
          '<div class="orange">Background</div>'
      },
      {
        colorname: "orange lighten-5",
        titletextcolor: "dark--text",
        colorcode: "#FFF3E0",
        colortext: "orange--text text--lighten-5",
        examplecode:
          '<v-btn color="orange lighten-5">Button</v-btn>' +
          '<h3 class="orange--text text--lighten-5">Text</h3>' +
          '<div class="orange lighten-5">Background</div>'
      },
      {
        colorname: "orange lighten-4",
        titletextcolor: "dark--text",
        colorcode: "#FFE0B2",
        colortext: "orange--text text--lighten-4",
        examplecode:
          '<v-btn color="orange lighten-4">Button</v-btn>' +
          '<h3 class="orange--text text--lighten-4">Text</h3>' +
          '<div class="orange lighten-4">Background</div>'
      },
      {
        colorname: "orange lighten-3",
        titletextcolor: "dark--text",
        colorcode: "#FFCC80",
        colortext: "orange--text text--lighten-3",
        examplecode:
          '<v-btn color="orange lighten-3">Button</v-btn>' +
          '<h3 class="orange--text text--lighten-3">Text</h3>' +
          '<div class="orange lighten-3">Background</div>'
      },
      {
        colorname: "orange lighten-2",
        titletextcolor: "dark--text",
        colorcode: "#FFB74D",
        colortext: "orange--text text--lighten-2",
        examplecode:
          '<v-btn color="orange lighten-2">Button</v-btn>' +
          '<h3 class="orange--text text--lighten-2">Text</h3>' +
          '<div class="orange lighten-2">Background</div>'
      },
      {
        colorname: "orange lighten-1",
        titletextcolor: "dark--text",
        colorcode: "#FFA726",
        colortext: "orange--text text--lighten-1",
        examplecode:
          '<v-btn color="orange lighten-1">Button</v-btn>' +
          '<h3 class="orange--text text--lighten-1">Text</h3>' +
          '<div class="orange lighten-1">Background</div>'
      },
      {
        colorname: "orange darken-1",
        titletextcolor: "white--text",
        colorcode: "#FB8C00",
        colortext: "orange--text text--darken-1",
        examplecode:
          '<v-btn color="orange darken-1">Button</v-btn>' +
          '<h3 class="orange--text text--darken-1">Text</h3>' +
          '<div class="orange darken-1">Background</div>'
      },
      {
        colorname: "orange darken-2",
        titletextcolor: "white--text",
        colorcode: "#F57C00",
        colortext: "orange--text text--darken-2",
        examplecode:
          '<v-btn color="orange darken-2">Button</v-btn>' +
          '<h3 class="orange--text text--darken-2">Text</h3>' +
          '<div class="orange darken-2">Background</div>'
      },
      {
        colorname: "orange darken-3",
        titletextcolor: "white--text",
        colorcode: "#EF6C00",
        colortext: "orange--text text--darken-3",
        examplecode:
          '<v-btn color="orange darken-3">Button</v-btn>' +
          '<h3 class="orange--text text--darken-3">Text</h3>' +
          '<div class="orange darken-3">Background</div>'
      },
      {
        colorname: "orange darken-4",
        titletextcolor: "white--text",
        colorcode: "#E65100",
        colortext: "orange--text text--darken-4",
        examplecode:
          '<v-btn color="orange darken-4">Button</v-btn>' +
          '<h3 class="orange--text text--darken-4">Text</h3>' +
          '<div class="orange darken-4">Background</div>'
      },
      {
        colorname: "orange accent-1",
        titletextcolor: "dark--text",
        colorcode: "#FFD180",
        colortext: "orange--text text--accent-1",
        examplecode:
          '<v-btn color="orange accent-1">Button</v-btn>' +
          '<h3 class="orange--text text--accent-1">Text</h3>' +
          '<div class="orange accent-1">Background</div>'
      },
      {
        colorname: "orange accent-2",
        titletextcolor: "white--text",
        colorcode: "#FFAB40",
        colortext: "orange--text text--accent-2",
        examplecode:
          '<v-btn color="orange accent-2">Button</v-btn>' +
          '<h3 class="orange--text text--accent-2">Text</h3>' +
          '<div class="orange accent-2">Background</div>'
      },
      {
        colorname: "orange accent-3",
        titletextcolor: "white--text",
        colorcode: "#FF9100",
        colortext: "orange--text text--accent-3",
        examplecode:
          '<v-btn color="orange accent-3">Button</v-btn>' +
          '<h3 class="orange--text text--accent-3">Text</h3>' +
          '<div class="orange accent-3">Background</div>'
      },
      {
        colorname: "orange accent-4",
        titletextcolor: "white--text",
        colorcode: "#FF6D00",
        colortext: "orange--text text--accent-4",
        examplecode:
          '<v-btn color="orange accent-4">Button</v-btn>' +
          '<h3 class="orange--text text--accent-4">Text</h3>' +
          '<div class="orange accent-4">Background</div>'
      }
    ]
  })
};
</script>