<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- Deep deep-Orange Color -->
  <!-- ----------------------------------------------------------------------------- -->
  <div class="pa-4">
    <v-card v-for="(item, i) in colordeeporange" :key="i" class="mb-6">
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
  name: "DeepOrangeColor",

  data: () => ({
    colordeeporange: [
      {
        colorname: "deep-orange",
        titletextcolor: "white--text",
        colorcode: "#FF5722",
        colortext: "deep-orange--text",
        examplecode:
          '<v-btn color="deep-orange">Button</v-btn>' +
          '<h3 class="deep-orange--text">Text</h3>' +
          '<div class="deep-orange">Background</div>'
      },
      {
        colorname: "deep-orange lighten-5",
        titletextcolor: "dark--text",
        colorcode: "#FBE9E7",
        colortext: "deep-orange--text text--lighten-5",
        examplecode:
          '<v-btn color="deep-orange lighten-5">Button</v-btn>' +
          '<h3 class="deep-orange--text text--lighten-5">Text</h3>' +
          '<div class="deep-orange lighten-5">Background</div>'
      },
      {
        colorname: "deep-orange lighten-4",
        titletextcolor: "dark--text",
        colorcode: "#FFCCBC",
        colortext: "deep-orange--text text--lighten-4",
        examplecode:
          '<v-btn color="deep-orange lighten-4">Button</v-btn>' +
          '<h3 class="deep-orange--text text--lighten-4">Text</h3>' +
          '<div class="deep-orange lighten-4">Background</div>'
      },
      {
        colorname: "deep-orange lighten-3",
        titletextcolor: "dark--text",
        colorcode: "#FFAB91",
        colortext: "deep-orange--text text--lighten-3",
        examplecode:
          '<v-btn color="deep-orange lighten-3">Button</v-btn>' +
          '<h3 class="deep-orange--text text--lighten-3">Text</h3>' +
          '<div class="deep-orange lighten-3">Background</div>'
      },
      {
        colorname: "deep-orange lighten-2",
        titletextcolor: "dark--text",
        colorcode: "#FF8A65",
        colortext: "deep-orange--text text--lighten-2",
        examplecode:
          '<v-btn color="deep-orange lighten-2">Button</v-btn>' +
          '<h3 class="deep-orange--text text--lighten-2">Text</h3>' +
          '<div class="deep-orange lighten-2">Background</div>'
      },
      {
        colorname: "deep-orange lighten-1",
        titletextcolor: "dark--text",
        colorcode: "#FF7043",
        colortext: "deep-orange--text text--lighten-1",
        examplecode:
          '<v-btn color="deep-orange lighten-1">Button</v-btn>' +
          '<h3 class="deep-orange--text text--lighten-1">Text</h3>' +
          '<div class="deep-orange lighten-1">Background</div>'
      },
      {
        colorname: "deep-orange darken-1",
        titletextcolor: "white--text",
        colorcode: "#F4511E",
        colortext: "deep-orange--text text--darken-1",
        examplecode:
          '<v-btn color="deep-orange darken-1">Button</v-btn>' +
          '<h3 class="deep-orange--text text--darken-1">Text</h3>' +
          '<div class="deep-orange darken-1">Background</div>'
      },
      {
        colorname: "deep-orange darken-2",
        titletextcolor: "white--text",
        colorcode: "#E64A19",
        colortext: "deep-orange--text text--darken-2",
        examplecode:
          '<v-btn color="deep-orange darken-2">Button</v-btn>' +
          '<h3 class="deep-orange--text text--darken-2">Text</h3>' +
          '<div class="deep-orange darken-2">Background</div>'
      },
      {
        colorname: "deep-orange darken-3",
        titletextcolor: "white--text",
        colorcode: "#D84315",
        colortext: "deep-orange--text text--darken-3",
        examplecode:
          '<v-btn color="deep-orange darken-3">Button</v-btn>' +
          '<h3 class="deep-orange--text text--darken-3">Text</h3>' +
          '<div class="deep-orange darken-3">Background</div>'
      },
      {
        colorname: "deep-orange darken-4",
        titletextcolor: "white--text",
        colorcode: "#BF360C",
        colortext: "deep-orange--text text--darken-4",
        examplecode:
          '<v-btn color="deep-orange darken-4">Button</v-btn>' +
          '<h3 class="deep-orange--text text--darken-4">Text</h3>' +
          '<div class="deep-orange darken-4">Background</div>'
      },
      {
        colorname: "deep-orange accent-1",
        titletextcolor: "dark--text",
        colorcode: "#FF9E80",
        colortext: "deep-orange--text text--accent-1",
        examplecode:
          '<v-btn color="deep-orange accent-1">Button</v-btn>' +
          '<h3 class="deep-orange--text text--accent-1">Text</h3>' +
          '<div class="deep-orange accent-1">Background</div>'
      },
      {
        colorname: "deep-orange accent-2",
        titletextcolor: "white--text",
        colorcode: "#FF6E40",
        colortext: "deep-orange--text text--accent-2",
        examplecode:
          '<v-btn color="deep-orange accent-2">Button</v-btn>' +
          '<h3 class="deep-orange--text text--accent-2">Text</h3>' +
          '<div class="deep-orange accent-2">Background</div>'
      },
      {
        colorname: "deep-orange accent-3",
        titletextcolor: "white--text",
        colorcode: "#FF3D00",
        colortext: "deep-orange--text text--accent-3",
        examplecode:
          '<v-btn color="deep-orange accent-3">Button</v-btn>' +
          '<h3 class="deep-orange--text text--accent-3">Text</h3>' +
          '<div class="deep-orange accent-3">Background</div>'
      },
      {
        colorname: "deep-orange accent-4",
        titletextcolor: "white--text",
        colorcode: "#DD2C00",
        colortext: "deep-orange--text text--accent-4",
        examplecode:
          '<v-btn color="deep-orange accent-4">Button</v-btn>' +
          '<h3 class="deep-orange--text text--accent-4">Text</h3>' +
          '<div class="deep-orange accent-4">Background</div>'
      }
    ]
  })
};
</script>