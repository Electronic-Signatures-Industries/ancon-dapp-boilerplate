<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- Red Color -->
  <!-- ----------------------------------------------------------------------------- -->
  <div class="pa-4">
    <v-card v-for="(item, i) in colorred" :key="i" class="mb-6">
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
  name: "RedColor",

  data: () => ({
    colorred: [
      {
        colorname: "red",
        titletextcolor: "white--text",
        colorcode: "#F44336",
        colortext: "red--text",
        examplecode:
          '<v-btn color="red">Button</v-btn>' +
          '<h3 class="red--text">Text</h3>' +
          '<div class="red">Background</div>'
      },
      {
        colorname: "red lighten-5",
        titletextcolor: "dark--text",
        colorcode: "#FFEBEE",
        colortext: "red--text text--lighten-5",
        examplecode:
          '<v-btn color="red lighten-5">Button</v-btn>' +
          '<h3 class="red--text text--lighten-5">Text</h3>' +
          '<div class="red lighten-5">Background</div>'
      },
      {
        colorname: "red lighten-4",
        titletextcolor: "dark--text",
        colorcode: "#FFCDD2",
        colortext: "red--text text--lighten-4",
        examplecode:
          '<v-btn color="red lighten-4">Button</v-btn>' +
          '<h3 class="red--text text--lighten-4">Text</h3>' +
          '<div class="red lighten-4">Background</div>'
      },
      {
        colorname: "red lighten-3",
        titletextcolor: "dark--text",
        colorcode: "#EF9A9A",
        colortext: "red--text text--lighten-3",
        examplecode:
          '<v-btn color="red lighten-3">Button</v-btn>' +
          '<h3 class="red--text text--lighten-3">Text</h3>' +
          '<div class="red lighten-3">Background</div>'
      },
      {
        colorname: "red lighten-2",
        titletextcolor: "dark--text",
        colorcode: "#E57373",
        colortext: "red--text text--lighten-2",
        examplecode:
          '<v-btn color="red lighten-2">Button</v-btn>' +
          '<h3 class="red--text text--lighten-2">Text</h3>' +
          '<div class="red lighten-2">Background</div>'
      },
      {
        colorname: "red lighten-1",
        titletextcolor: "dark--text",
        colorcode: "#EF5350",
        colortext: "red--text text--lighten-1",
        examplecode:
          '<v-btn color="red lighten-1">Button</v-btn>' +
          '<h3 class="red--text text--lighten-1">Text</h3>' +
          '<div class="red lighten-1">Background</div>'
      },
      {
        colorname: "red darken-1",
        titletextcolor: "white--text",
        colorcode: "#E53935",
        colortext: "red--text text--darken-1",
        examplecode:
          '<v-btn color="red darken-1">Button</v-btn>' +
          '<h3 class="red--text text--darken-1">Text</h3>' +
          '<div class="red darken-1">Background</div>'
      },
      {
        colorname: "red darken-2",
        titletextcolor: "white--text",
        colorcode: "#D32F2F",
        colortext: "red--text text--darken-2",
        examplecode:
          '<v-btn color="red darken-2">Button</v-btn>' +
          '<h3 class="red--text text--darken-2">Text</h3>' +
          '<div class="red darken-2">Background</div>'
      },
      {
        colorname: "red darken-3",
        titletextcolor: "white--text",
        colorcode: "#C62828",
        colortext: "red--text text--darken-3",
        examplecode:
          '<v-btn color="red darken-3">Button</v-btn>' +
          '<h3 class="red--text text--darken-3">Text</h3>' +
          '<div class="red darken-3">Background</div>'
      },
      {
        colorname: "red darken-4",
        titletextcolor: "white--text",
        colorcode: "#B71C1C",
        colortext: "red--text text--darken-4",
        examplecode:
          '<v-btn color="red darken-4">Button</v-btn>' +
          '<h3 class="red--text text--darken-4">Text</h3>' +
          '<div class="red darken-4">Background</div>'
      },
      {
        colorname: "red accent-1",
        titletextcolor: "dark--text",
        colorcode: "#FF8A80",
        colortext: "red--text text--accent-1",
        examplecode:
          '<v-btn color="red accent-1">Button</v-btn>' +
          '<h3 class="red--text text--accent-1">Text</h3>' +
          '<div class="red accent-1">Background</div>'
      },
      {
        colorname: "red accent-2",
        titletextcolor: "white--text",
        colorcode: "#FF5252",
        colortext: "red--text text--accent-2",
        examplecode:
          '<v-btn color="red accent-2">Button</v-btn>' +
          '<h3 class="red--text text--accent-2">Text</h3>' +
          '<div class="red accent-2">Background</div>'
      },
      {
        colorname: "red accent-3",
        titletextcolor: "white--text",
        colorcode: "#FF1744",
        colortext: "red--text text--accent-3",
        examplecode:
          '<v-btn color="red accent-3">Button</v-btn>' +
          '<h3 class="red--text text--accent-3">Text</h3>' +
          '<div class="red accent-3">Background</div>'
      },
      {
        colorname: "red accent-4",
        titletextcolor: "white--text",
        colorcode: "#D50000",
        colortext: "red--text text--accent-4",
        examplecode:
          '<v-btn color="red accent-4">Button</v-btn>' +
          '<h3 class="red--text text--accent-4">Text</h3>' +
          '<div class="red accent-4">Background</div>'
      }
    ]
  })
};
</script>