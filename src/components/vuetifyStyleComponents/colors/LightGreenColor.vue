<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- light-Green Color -->
  <!-- ----------------------------------------------------------------------------- -->
  <div class="pa-4">
    <v-card v-for="(item, i) in colorlightgreen" :key="i" class="mb-6">
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
  name: "LightGreenColor",

  data: () => ({
    colorlightgreen: [
      {
        colorname: "light-green",
        titletextcolor: "white--text",
        colorcode: "#8BC34A",
        colortext: "light-green--text",
        examplecode:
          '<v-btn color="light-green">Button</v-btn>' +
          '<h3 class="light-green--text">Text</h3>' +
          '<div class="light-green">Background</div>'
      },
      {
        colorname: "light-green lighten-5",
        titletextcolor: "dark--text",
        colorcode: "#F1F8E9",
        colortext: "light-green--text text--lighten-5",
        examplecode:
          '<v-btn color="light-green lighten-5">Button</v-btn>' +
          '<h3 class="light-green--text text--lighten-5">Text</h3>' +
          '<div class="light-green lighten-5">Background</div>'
      },
      {
        colorname: "light-green lighten-4",
        titletextcolor: "dark--text",
        colorcode: "#DCEDC8",
        colortext: "light-green--text text--lighten-4",
        examplecode:
          '<v-btn color="light-green lighten-4">Button</v-btn>' +
          '<h3 class="light-green--text text--lighten-4">Text</h3>' +
          '<div class="light-green lighten-4">Background</div>'
      },
      {
        colorname: "light-green lighten-3",
        titletextcolor: "dark--text",
        colorcode: "#C5E1A5",
        colortext: "light-green--text text--lighten-3",
        examplecode:
          '<v-btn color="light-green lighten-3">Button</v-btn>' +
          '<h3 class="light-green--text text--lighten-3">Text</h3>' +
          '<div class="light-green lighten-3">Background</div>'
      },
      {
        colorname: "light-green lighten-2",
        titletextcolor: "dark--text",
        colorcode: "#AED581",
        colortext: "light-green--text text--lighten-2",
        examplecode:
          '<v-btn color="light-green lighten-2">Button</v-btn>' +
          '<h3 class="light-green--text text--lighten-2">Text</h3>' +
          '<div class="light-green lighten-2">Background</div>'
      },
      {
        colorname: "light-green lighten-1",
        titletextcolor: "dark--text",
        colorcode: "#9CCC65",
        colortext: "light-green--text text--lighten-1",
        examplecode:
          '<v-btn color="light-green lighten-1">Button</v-btn>' +
          '<h3 class="light-green--text text--lighten-1">Text</h3>' +
          '<div class="light-green lighten-1">Background</div>'
      },
      {
        colorname: "light-green darken-1",
        titletextcolor: "white--text",
        colorcode: "#7CB342",
        colortext: "light-green--text text--darken-1",
        examplecode:
          '<v-btn color="light-green darken-1">Button</v-btn>' +
          '<h3 class="light-green--text text--darken-1">Text</h3>' +
          '<div class="light-green darken-1">Background</div>'
      },
      {
        colorname: "light-green darken-2",
        titletextcolor: "white--text",
        colorcode: "#689F38",
        colortext: "light-green--text text--darken-2",
        examplecode:
          '<v-btn color="light-green darken-2">Button</v-btn>' +
          '<h3 class="light-green--text text--darken-2">Text</h3>' +
          '<div class="light-green darken-2">Background</div>'
      },
      {
        colorname: "light-green darken-3",
        titletextcolor: "white--text",
        colorcode: "#558B2F",
        colortext: "light-green--text text--darken-3",
        examplecode:
          '<v-btn color="light-green darken-3">Button</v-btn>' +
          '<h3 class="light-green--text text--darken-3">Text</h3>' +
          '<div class="light-green darken-3">Background</div>'
      },
      {
        colorname: "light-green darken-4",
        titletextcolor: "white--text",
        colorcode: "#33691E",
        colortext: "light-green--text text--darken-4",
        examplecode:
          '<v-btn color="light-green darken-4">Button</v-btn>' +
          '<h3 class="light-green--text text--darken-4">Text</h3>' +
          '<div class="light-green darken-4">Background</div>'
      },
      {
        colorname: "light-green accent-1",
        titletextcolor: "dark--text",
        colorcode: "#CCFF90",
        colortext: "light-green--text text--accent-1",
        examplecode:
          '<v-btn color="light-green accent-1">Button</v-btn>' +
          '<h3 class="light-green--text text--accent-1">Text</h3>' +
          '<div class="light-green accent-1">Background</div>'
      },
      {
        colorname: "light-green accent-2",
        titletextcolor: "white--text",
        colorcode: "#B2FF59",
        colortext: "light-green--text text--accent-2",
        examplecode:
          '<v-btn color="light-green accent-2">Button</v-btn>' +
          '<h3 class="light-green--text text--accent-2">Text</h3>' +
          '<div class="light-green accent-2">Background</div>'
      },
      {
        colorname: "light-green accent-3",
        titletextcolor: "white--text",
        colorcode: "#76FF03",
        colortext: "light-green--text text--accent-3",
        examplecode:
          '<v-btn color="light-green accent-3">Button</v-btn>' +
          '<h3 class="light-green--text text--accent-3">Text</h3>' +
          '<div class="light-green accent-3">Background</div>'
      },
      {
        colorname: "light-green accent-4",
        titletextcolor: "white--text",
        colorcode: "#64DD17",
        colortext: "light-green--text text--accent-4",
        examplecode:
          '<v-btn color="light-green accent-4">Button</v-btn>' +
          '<h3 class="light-green--text text--accent-4">Text</h3>' +
          '<div class="light-green accent-4">Background</div>'
      }
    ]
  })
};
</script>