<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- Red Color -->
  <!-- ----------------------------------------------------------------------------- -->
  <div class="pa-4">
    <v-card v-for="(item, i) in colorpurple" :key="i" class="mb-6">
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
  name: "PurpleColor",

  data: () => ({
    colorpurple: [
      {
        colorname: "purple",
        titletextcolor: "white--text",
        colorcode: "#9C27B0",
        colortext: "purple--text",
        examplecode:
          '<v-btn color="purple">Button</v-btn>' +
          '<h3 class="purple--text">Text</h3>' +
          '<div class="purple">Background</div>'
      },
      {
        colorname: "purple lighten-5",
        titletextcolor: "dark--text",
        colorcode: "#F3E5F5",
        colortext: "purple--text text--lighten-5",
        examplecode:
          '<v-btn color="purple lighten-5">Button</v-btn>' +
          '<h3 class="purple--text text--lighten-5">Text</h3>' +
          '<div class="purple lighten-5">Background</div>'
      },
      {
        colorname: "purple lighten-4",
        titletextcolor: "dark--text",
        colorcode: "#E1BEE7",
        colortext: "purple--text text--lighten-4",
        examplecode:
          '<v-btn color="purple lighten-4">Button</v-btn>' +
          '<h3 class="purple--text text--lighten-4">Text</h3>' +
          '<div class="purple lighten-4">Background</div>'
      },
      {
        colorname: "purple lighten-3",
        titletextcolor: "dark--text",
        colorcode: "#CE93D8",
        colortext: "purple--text text--lighten-3",
        examplecode:
          '<v-btn color="purple lighten-3">Button</v-btn>' +
          '<h3 class="purple--text text--lighten-3">Text</h3>' +
          '<div class="purple lighten-3">Background</div>'
      },
      {
        colorname: "purple lighten-2",
        titletextcolor: "dark--text",
        colorcode: "#BA68C8",
        colortext: "purple--text text--lighten-2",
        examplecode:
          '<v-btn color="purple lighten-2">Button</v-btn>' +
          '<h3 class="purple--text text--lighten-2">Text</h3>' +
          '<div class="purple lighten-2">Background</div>'
      },
      {
        colorname: "purple lighten-1",
        titletextcolor: "dark--text",
        colorcode: "#AB47BC",
        colortext: "purple--text text--lighten-1",
        examplecode:
          '<v-btn color="purple lighten-1">Button</v-btn>' +
          '<h3 class="purple--text text--lighten-1">Text</h3>' +
          '<div class="purple lighten-1">Background</div>'
      },
      {
        colorname: "purple darken-1",
        titletextcolor: "white--text",
        colorcode: "#8E24AA",
        colortext: "purple--text text--darken-1",
        examplecode:
          '<v-btn color="purple darken-1">Button</v-btn>' +
          '<h3 class="purple--text text--darken-1">Text</h3>' +
          '<div class="purple darken-1">Background</div>'
      },
      {
        colorname: "purple darken-2",
        titletextcolor: "white--text",
        colorcode: "#7B1FA2",
        colortext: "purple--text text--darken-2",
        examplecode:
          '<v-btn color="purple darken-2">Button</v-btn>' +
          '<h3 class="purple--text text--darken-2">Text</h3>' +
          '<div class="purple darken-2">Background</div>'
      },
      {
        colorname: "purple darken-3",
        titletextcolor: "white--text",
        colorcode: "#6A1B9A",
        colortext: "purple--text text--darken-3",
        examplecode:
          '<v-btn color="purple darken-3">Button</v-btn>' +
          '<h3 class="purple--text text--darken-3">Text</h3>' +
          '<div class="purple darken-3">Background</div>'
      },
      {
        colorname: "purple darken-4",
        titletextcolor: "white--text",
        colorcode: "#4A148C",
        colortext: "purple--text text--darken-4",
        examplecode:
          '<v-btn color="purple darken-4">Button</v-btn>' +
          '<h3 class="purple--text text--darken-4">Text</h3>' +
          '<div class="purple darken-4">Background</div>'
      },
      {
        colorname: "purple accent-1",
        titletextcolor: "dark--text",
        colorcode: "#EA80FC",
        colortext: "purple--text text--accent-1",
        examplecode:
          '<v-btn color="purple accent-1">Button</v-btn>' +
          '<h3 class="purple--text text--accent-1">Text</h3>' +
          '<div class="purple accent-1">Background</div>'
      },
      {
        colorname: "purple accent-2",
        titletextcolor: "white--text",
        colorcode: "#E040FB",
        colortext: "purple--text text--accent-2",
        examplecode:
          '<v-btn color="purple accent-2">Button</v-btn>' +
          '<h3 class="purple--text text--accent-2">Text</h3>' +
          '<div class="purple accent-2">Background</div>'
      },
      {
        colorname: "purple accent-3",
        titletextcolor: "white--text",
        colorcode: "#D500F9",
        colortext: "purple--text text--accent-3",
        examplecode:
          '<v-btn color="purple accent-3">Button</v-btn>' +
          '<h3 class="purple--text text--accent-3">Text</h3>' +
          '<div class="purple accent-3">Background</div>'
      },
      {
        colorname: "purple accent-4",
        titletextcolor: "white--text",
        colorcode: "#AA00FF",
        colortext: "purple--text text--accent-4",
        examplecode:
          '<v-btn color="purple accent-4">Button</v-btn>' +
          '<h3 class="purple--text text--accent-4">Text</h3>' +
          '<div class="purple accent-4">Background</div>'
      }
    ]
  })
};
</script>