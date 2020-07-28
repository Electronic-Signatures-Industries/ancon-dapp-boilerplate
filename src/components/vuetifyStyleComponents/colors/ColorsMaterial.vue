<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- ColorsMaterial -->
  <!-- ----------------------------------------------------------------------------- -->
  <div>
    <div>
      <v-tabs v-model="tab" background-color="white" light icons-and-text>
        <v-tab :key="redcolor" active-class="red--text">
          Red
          <v-icon small>mdi-feather</v-icon>
        </v-tab>
        <v-tab :key="pinkcolor" active-class="pink--text">
          Pink
          <v-icon small>mdi-feather</v-icon>
        </v-tab>
        <v-tab :key="purplecolor" active-class="purple--text">
          Purple
          <v-icon small>mdi-feather</v-icon>
        </v-tab>
        <v-tab :key="deeppurplecolor" active-class="deep-purple--text">
          Deep Purple
          <v-icon small>mdi-feather</v-icon>
        </v-tab>
        <v-tab :key="indigocolor" active-class="indigo--text">
          Indigo
          <v-icon small>mdi-feather</v-icon>
        </v-tab>
        <v-tab :key="bluecolor" active-class="blue--text">
          Blue
          <v-icon small>mdi-feather</v-icon>
        </v-tab>
        <v-tab :key="lightbluecolor" active-class="light-blue--text">
          Light Blue
          <v-icon small>mdi-feather</v-icon>
        </v-tab>
        <v-tab :key="cyancolor" active-class="cyan--text">
          Cyan
          <v-icon small>mdi-feather</v-icon>
        </v-tab>
        <v-tab :key="tealcolor" active-class="teal--text">
          Teal
          <v-icon small>mdi-feather</v-icon>
        </v-tab>
        <v-tab :key="greencolor" active-class="green--text">
          Green
          <v-icon small>mdi-feather</v-icon>
        </v-tab>
        <v-tab :key="lightgreencolor" active-class="light-green--text">
          Light Green
          <v-icon small>mdi-feather</v-icon>
        </v-tab>
        <v-tab :key="limecolor" active-class="lime--text">
          Lime
          <v-icon small>mdi-feather</v-icon>
        </v-tab>
        <v-tab :key="yellowcolor" active-class="yellow--text">
          Yellow
          <v-icon small>mdi-feather</v-icon>
        </v-tab>
        <v-tab :key="ambercolor" active-class="amber--text">
          Amber
          <v-icon small>mdi-feather</v-icon>
        </v-tab>
        <v-tab :key="orangecolor" active-class="orange--text">
          Orange
          <v-icon small>mdi-feather</v-icon>
        </v-tab>
        <v-tab :key="deeporangecolor" active-class="deep-orange--text">
          Deep Orange
          <v-icon small>mdi-feather</v-icon>
        </v-tab>
        <v-tab :key="browncolor" active-class="brown--text">
          Brown
          <v-icon small>mdi-feather</v-icon>
        </v-tab>
        <v-tab :key="bluegreycolor" active-class="blue-grey--text">
          Blue Grey
          <v-icon small>mdi-feather</v-icon>
        </v-tab>
        <v-tab :key="greycolor" active-class="grey--text">
          Grey
          <v-icon small>mdi-feather</v-icon>
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item :key="redcolor">
          <RedColor></RedColor>
        </v-tab-item>
        <v-tab-item :key="pinkcolor">
          <PinkColor></PinkColor>
        </v-tab-item>
        <v-tab-item :key="purplecolor">
          <PurpleColor></PurpleColor>
        </v-tab-item>
        <v-tab-item :key="deeppurplecolor">
          <DeepPurpleColor></DeepPurpleColor>
        </v-tab-item>
        <v-tab-item :key="indigocolor">
          <IndigoColor></IndigoColor>
        </v-tab-item>
        <v-tab-item :key="bluecolor">
          <BlueColor></BlueColor>
        </v-tab-item>
        <v-tab-item :key="lightbluecolor">
          <LightBlueColor></LightBlueColor>
        </v-tab-item>
        <v-tab-item :key="cyancolor">
          <CyanColor></CyanColor>
        </v-tab-item>
        <v-tab-item :key="tealcolor">
          <TealColor></TealColor>
        </v-tab-item>
        <v-tab-item :key="greencolor">
          <GreenColor></GreenColor>
        </v-tab-item>
        <v-tab-item :key="lightgreencolor">
          <LightGreenColor></LightGreenColor>
        </v-tab-item>
        <v-tab-item :key="limecolor">
          <LimeColor></LimeColor>
        </v-tab-item>
        <v-tab-item :key="yellowcolor">
          <YellowColor></YellowColor>
        </v-tab-item>
        <v-tab-item :key="ambercolor">
          <AmberColor></AmberColor>
        </v-tab-item>
        <v-tab-item :key="orangecolor">
          <OrangeColor></OrangeColor>
        </v-tab-item>
        <v-tab-item :key="deeporangecolor">
          <DeepOrangeColor></DeepOrangeColor>
        </v-tab-item>
        <v-tab-item :key="browncolor">
          <BrownColor></BrownColor>
        </v-tab-item>
        <v-tab-item :key="bluegreycolor">
          <BlueGreyColor></BlueGreyColor>
        </v-tab-item>
        <v-tab-item :key="greycolor">
          <GreyColor></GreyColor>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
export default {
  name: "ColorsMaterial",

  data: () => ({
    tab: null,
    redcolor: null,
    pinkcolor: null,
    purplecolor: null,
    deeppurplecolor: null,
    indigocolor: null,
    bluecolor: null,
    lightbluecolor: null,
    cyancolor: null,
    tealcolor: null,
    greencolor: null,
    lightgreencolor: null,
    limecolor: null,
    yellowcolor: null,
    ambercolor: null,
    orangecolor: null,
    deeporangecolor: null,
    browncolor: null,
    bluegreycolor: null,
    greycolor: null
  }),
  components: {
    RedColor: () => import("./RedColor"),
    PinkColor: () => import("./PinkColor"),
    PurpleColor: () => import("./PurpleColor"),
    DeepPurpleColor: () => import("./DeepPurpleColor"),
    IndigoColor: () => import("./IndigoColor"),
    BlueColor: () => import("./BlueColor"),
    LightBlueColor: () => import("./LightBlueColor"),
    CyanColor: () => import("./CyanColor"),
    TealColor: () => import("./TealColor"),
    GreenColor: () => import("./GreenColor"),
    LightGreenColor: () => import("./LightGreenColor"),
    LimeColor: () => import("./LimeColor"),
    YellowColor: () => import("./YellowColor"),
    AmberColor: () => import("./AmberColor"),
    OrangeColor: () => import("./OrangeColor"),
    DeepOrangeColor: () => import("./DeepOrangeColor"),
    BrownColor: () => import("./BrownColor"),
    BlueGreyColor: () => import("./BlueGreyColor"),
    GreyColor: () => import("./GreyColor")
  }
};
</script>