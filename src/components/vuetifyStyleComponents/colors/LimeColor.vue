<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- lime Color -->
  <!-- ----------------------------------------------------------------------------- -->
  <div class="pa-4">
    <v-card v-for="(item, i) in colorlime" :key="i" class="mb-6">
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
  name: "LimeColor",

  data: () => ({
    colorlime: [
      {
        colorname: "lime",
        titletextcolor: "white--text",
        colorcode: "#CDDC39",
        colortext: "lime--text",
        examplecode:
          '<v-btn color="lime">Button</v-btn>' +
          '<h3 class="lime--text">Text</h3>' +
          '<div class="lime">Background</div>'
      },
      {
        colorname: "lime lighten-5",
        titletextcolor: "dark--text",
        colorcode: "#F9FBE7",
        colortext: "lime--text text--lighten-5",
        examplecode:
          '<v-btn color="lime lighten-5">Button</v-btn>' +
          '<h3 class="lime--text text--lighten-5">Text</h3>' +
          '<div class="lime lighten-5">Background</div>'
      },
      {
        colorname: "lime lighten-4",
        titletextcolor: "dark--text",
        colorcode: "#F0F4C3",
        colortext: "lime--text text--lighten-4",
        examplecode:
          '<v-btn color="lime lighten-4">Button</v-btn>' +
          '<h3 class="lime--text text--lighten-4">Text</h3>' +
          '<div class="lime lighten-4">Background</div>'
      },
      {
        colorname: "lime lighten-3",
        titletextcolor: "dark--text",
        colorcode: "#E6EE9C",
        colortext: "lime--text text--lighten-3",
        examplecode:
          '<v-btn color="lime lighten-3">Button</v-btn>' +
          '<h3 class="lime--text text--lighten-3">Text</h3>' +
          '<div class="lime lighten-3">Background</div>'
      },
      {
        colorname: "lime lighten-2",
        titletextcolor: "dark--text",
        colorcode: "#DCE775",
        colortext: "lime--text text--lighten-2",
        examplecode:
          '<v-btn color="lime lighten-2">Button</v-btn>' +
          '<h3 class="lime--text text--lighten-2">Text</h3>' +
          '<div class="lime lighten-2">Background</div>'
      },
      {
        colorname: "lime lighten-1",
        titletextcolor: "dark--text",
        colorcode: "#D4E157",
        colortext: "lime--text text--lighten-1",
        examplecode:
          '<v-btn color="lime lighten-1">Button</v-btn>' +
          '<h3 class="lime--text text--lighten-1">Text</h3>' +
          '<div class="lime lighten-1">Background</div>'
      },
      {
        colorname: "lime darken-1",
        titletextcolor: "white--text",
        colorcode: "#C0CA33",
        colortext: "lime--text text--darken-1",
        examplecode:
          '<v-btn color="lime darken-1">Button</v-btn>' +
          '<h3 class="lime--text text--darken-1">Text</h3>' +
          '<div class="lime darken-1">Background</div>'
      },
      {
        colorname: "lime darken-2",
        titletextcolor: "white--text",
        colorcode: "#AFB42B",
        colortext: "lime--text text--darken-2",
        examplecode:
          '<v-btn color="lime darken-2">Button</v-btn>' +
          '<h3 class="lime--text text--darken-2">Text</h3>' +
          '<div class="lime darken-2">Background</div>'
      },
      {
        colorname: "lime darken-3",
        titletextcolor: "white--text",
        colorcode: "#9E9D24",
        colortext: "lime--text text--darken-3",
        examplecode:
          '<v-btn color="lime darken-3">Button</v-btn>' +
          '<h3 class="lime--text text--darken-3">Text</h3>' +
          '<div class="lime darken-3">Background</div>'
      },
      {
        colorname: "lime darken-4",
        titletextcolor: "white--text",
        colorcode: "#827717",
        colortext: "lime--text text--darken-4",
        examplecode:
          '<v-btn color="lime darken-4">Button</v-btn>' +
          '<h3 class="lime--text text--darken-4">Text</h3>' +
          '<div class="lime darken-4">Background</div>'
      },
      {
        colorname: "lime accent-1",
        titletextcolor: "dark--text",
        colorcode: "#F4FF81",
        colortext: "lime--text text--accent-1",
        examplecode:
          '<v-btn color="lime accent-1">Button</v-btn>' +
          '<h3 class="lime--text text--accent-1">Text</h3>' +
          '<div class="lime accent-1">Background</div>'
      },
      {
        colorname: "lime accent-2",
        titletextcolor: "white--text",
        colorcode: "#EEFF41",
        colortext: "lime--text text--accent-2",
        examplecode:
          '<v-btn color="lime accent-2">Button</v-btn>' +
          '<h3 class="lime--text text--accent-2">Text</h3>' +
          '<div class="lime accent-2">Background</div>'
      },
      {
        colorname: "lime accent-3",
        titletextcolor: "white--text",
        colorcode: "#C6FF00",
        colortext: "lime--text text--accent-3",
        examplecode:
          '<v-btn color="lime accent-3">Button</v-btn>' +
          '<h3 class="lime--text text--accent-3">Text</h3>' +
          '<div class="lime accent-3">Background</div>'
      },
      {
        colorname: "lime accent-4",
        titletextcolor: "white--text",
        colorcode: "#AEEA00",
        colortext: "lime--text text--accent-4",
        examplecode:
          '<v-btn color="lime accent-4">Button</v-btn>' +
          '<h3 class="lime--text text--accent-4">Text</h3>' +
          '<div class="lime accent-4">Background</div>'
      }
    ]
  })
};
</script>