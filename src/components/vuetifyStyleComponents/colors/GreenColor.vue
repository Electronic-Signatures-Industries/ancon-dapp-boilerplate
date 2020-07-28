<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- Green Color -->
  <!-- ----------------------------------------------------------------------------- -->
  <div class="pa-4">
    <v-card v-for="(item, i) in colorgreen" :key="i" class="mb-6">
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
  name: "GreenColor",

  data: () => ({
    colorgreen: [
      {
        colorname: "green",
        titletextcolor: "white--text",
        colorcode: "#4CAF50",
        colortext: "green--text",
        examplecode:
          '<v-btn color="green">Button</v-btn>' +
          '<h3 class="green--text">Text</h3>' +
          '<div class="green">Background</div>'
      },
      {
        colorname: "green lighten-5",
        titletextcolor: "dark--text",
        colorcode: "#E8F5E9",
        colortext: "green--text text--lighten-5",
        examplecode:
          '<v-btn color="green lighten-5">Button</v-btn>' +
          '<h3 class="green--text text--lighten-5">Text</h3>' +
          '<div class="green lighten-5">Background</div>'
      },
      {
        colorname: "green lighten-4",
        titletextcolor: "dark--text",
        colorcode: "#C8E6C9",
        colortext: "green--text text--lighten-4",
        examplecode:
          '<v-btn color="green lighten-4">Button</v-btn>' +
          '<h3 class="green--text text--lighten-4">Text</h3>' +
          '<div class="green lighten-4">Background</div>'
      },
      {
        colorname: "green lighten-3",
        titletextcolor: "dark--text",
        colorcode: "#A5D6A7",
        colortext: "green--text text--lighten-3",
        examplecode:
          '<v-btn color="green lighten-3">Button</v-btn>' +
          '<h3 class="green--text text--lighten-3">Text</h3>' +
          '<div class="green lighten-3">Background</div>'
      },
      {
        colorname: "green lighten-2",
        titletextcolor: "dark--text",
        colorcode: "#81C784",
        colortext: "green--text text--lighten-2",
        examplecode:
          '<v-btn color="green lighten-2">Button</v-btn>' +
          '<h3 class="green--text text--lighten-2">Text</h3>' +
          '<div class="green lighten-2">Background</div>'
      },
      {
        colorname: "green lighten-1",
        titletextcolor: "dark--text",
        colorcode: "#66BB6A",
        colortext: "green--text text--lighten-1",
        examplecode:
          '<v-btn color="green lighten-1">Button</v-btn>' +
          '<h3 class="green--text text--lighten-1">Text</h3>' +
          '<div class="green lighten-1">Background</div>'
      },
      {
        colorname: "green darken-1",
        titletextcolor: "white--text",
        colorcode: "#43A047",
        colortext: "green--text text--darken-1",
        examplecode:
          '<v-btn color="green darken-1">Button</v-btn>' +
          '<h3 class="green--text text--darken-1">Text</h3>' +
          '<div class="green darken-1">Background</div>'
      },
      {
        colorname: "green darken-2",
        titletextcolor: "white--text",
        colorcode: "#388E3C",
        colortext: "green--text text--darken-2",
        examplecode:
          '<v-btn color="green darken-2">Button</v-btn>' +
          '<h3 class="green--text text--darken-2">Text</h3>' +
          '<div class="green darken-2">Background</div>'
      },
      {
        colorname: "green darken-3",
        titletextcolor: "white--text",
        colorcode: "#2E7D32",
        colortext: "green--text text--darken-3",
        examplecode:
          '<v-btn color="green darken-3">Button</v-btn>' +
          '<h3 class="green--text text--darken-3">Text</h3>' +
          '<div class="green darken-3">Background</div>'
      },
      {
        colorname: "green darken-4",
        titletextcolor: "white--text",
        colorcode: "#1B5E20",
        colortext: "green--text text--darken-4",
        examplecode:
          '<v-btn color="green darken-4">Button</v-btn>' +
          '<h3 class="green--text text--darken-4">Text</h3>' +
          '<div class="green darken-4">Background</div>'
      },
      {
        colorname: "green accent-1",
        titletextcolor: "dark--text",
        colorcode: "#B9F6CA",
        colortext: "green--text text--accent-1",
        examplecode:
          '<v-btn color="green accent-1">Button</v-btn>' +
          '<h3 class="green--text text--accent-1">Text</h3>' +
          '<div class="green accent-1">Background</div>'
      },
      {
        colorname: "green accent-2",
        titletextcolor: "white--text",
        colorcode: "#69F0AE",
        colortext: "green--text text--accent-2",
        examplecode:
          '<v-btn color="green accent-2">Button</v-btn>' +
          '<h3 class="green--text text--accent-2">Text</h3>' +
          '<div class="green accent-2">Background</div>'
      },
      {
        colorname: "green accent-3",
        titletextcolor: "white--text",
        colorcode: "#00E676",
        colortext: "green--text text--accent-3",
        examplecode:
          '<v-btn color="green accent-3">Button</v-btn>' +
          '<h3 class="green--text text--accent-3">Text</h3>' +
          '<div class="green accent-3">Background</div>'
      },
      {
        colorname: "green accent-4",
        titletextcolor: "white--text",
        colorcode: "#00C853",
        colortext: "green--text text--accent-4",
        examplecode:
          '<v-btn color="green accent-4">Button</v-btn>' +
          '<h3 class="green--text text--accent-4">Text</h3>' +
          '<div class="green accent-4">Background</div>'
      }
    ]
  })
};
</script>