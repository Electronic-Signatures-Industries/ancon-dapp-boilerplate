<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- TextfieldIconEvents -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           <code>click:prepend</code>, <code>click:append</code>, <code>click:append-outer</code>, and <code>click:clear</code> will be emitted when you click on the respective icon. Note that these events will not be fired if the slot is used instead.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-form>
            <v-container>
            <v-row>

                <v-col cols="12">
                <v-text-field
                    v-model="message"
                    :append-icon="marker ? 'mdi-map-marker' : 'mdi-map-marker-off'"
                    :append-outer-icon="message ? 'mdi-send' : 'mdi-microphone'"
                    :prepend-icon="icon"
                    filled
                    clear-icon="mdi-close-circle"
                    clearable
                    label="Message"
                    type="text"
                    @click:append="toggleMarker"
                    @click:append-outer="sendMessage"
                    @click:prepend="changeIcon"
                    @click:clear="clearMessage"
                ></v-text-field>
                </v-col>

            </v-row>
            </v-container>
        </v-form>
        </div>
    </div>
</template>

<script>
export default {
  name: "TextfieldIconEvents",

  data: () => ({
    password: 'Password',
      show: false,
      message: 'Hey!',
      marker: true,
      iconIndex: 0,
      icons: [
        'mdi-emoticon',
        'mdi-emoticon-cool',
        'mdi-emoticon-dead',
        'mdi-emoticon-excited',
        'mdi-emoticon-happy',
        'mdi-emoticon-neutral',
        'mdi-emoticon-sad',
        'mdi-emoticon-tongue',
      ],
  }),
  computed: {
      icon () {
        return this.icons[this.iconIndex]
      },
    },

    methods: {
      toggleMarker () {
        this.marker = !this.marker
      },
      sendMessage () {
        this.resetIcon()
        this.clearMessage()
      },
      clearMessage () {
        this.message = ''
      },
      resetIcon () {
        this.iconIndex = 0
      },
      changeIcon () {
        this.iconIndex === this.icons.length - 1
          ? this.iconIndex = 0
          : this.iconIndex++
      },
    },
};
</script>