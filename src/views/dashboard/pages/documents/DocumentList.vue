<template>
  <v-card>
    <v-card-title>Videos</v-card-title>

    <v-card-text v-if="items.length < 1">
      No hay videos disponibles.
      
    </v-card-text>

    <v-card-text v-else>
      <v-treeview
        :active="selectedValue"
        @update:active="updateSelected"
        :items="items"
        activatable
      >
        <template v-slot:prepend="{ item, open }">
          <v-icon v-if="!item.folder.contentType">
            {{ open ? "mdi-folder-open" : "mdi-folder" }}
          </v-icon>
          <v-icon v-else>
            {{ getFileIcon(item.folder.contentType) }}
          </v-icon>
          {{ item.folder.length }} archivo(s)
        </template>
      </v-treeview>
    </v-card-text>

    <v-card-actions>
      <v-spacer />

      <slot name="buttons"/>
    </v-card-actions>
  <v-card>
  </v-card>
    <v-card-title>Ejemplo Video Sin HLS</v-card-title>
    <div class="player">
      <h3>Using Html5 to play m3u8 media file</h3>
      <video-player ref="videoPlayer"
                    class="vjs-custom-skin"
                    :options="playerOptions"
                    @play="onPlayerPlay($event)"
                    @ready="onPlayerReady($event)">
      </video-player>
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Emit, Prop } from 'vue-property-decorator';
import { FileIcons } from './FileIcons';
import { DocumentListItem } from './DocumentListItem';
import VideoPlayer from '@/components/VideoPlayer.vue'

// export {
//   name: 'DocumentList',
//   components: {
//     VideoPlayer
//   },
//   data () {
//     return {
//       playerOptions: {
//         autoplay: true,
//         controls: true,
//         controlBar: {
//           timeDivider: false,
//           durationDisplay: false
//         }
//         // poster: 'https://surmon-china.github.io/vue-quill-editor/static/images/surmon-5.jpg'
//       }
//     }
//   },
//   computed: {
//     player () {
//       return this.$refs.videoPlayer.player
//     }
//   },
//   methods: {
//     onPlayerPlay (player) {
//       console.log('player play!', player)
//     },
//     onPlayerReady (player) {
//       console.log('player ready!', player)
//       this.player.play()
//     },
//     playVideo: function (source) {
//       const video = {
//         withCredentials: false,
//         type: 'application/x-mpegurl',
//         src: source
//       }
//       this.player.reset() // in IE11 (mode IE10) direct usage of src() when <src> is already set, generated errors,
//       this.player.src(video)
//       // this.player.load()
//       this.player.play()
//     }
//   },
//   mounted () {
//     const src = 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8'
//     this.playVideo(src)
//   }
// }

// Vue.use(VideoPlayer, /* {
//   options: global default videojs options,
//   events: global videojs videojs events
// } */)

@Component({})
export default class DocumentList extends Vue {
  @Prop()
  readonly selectedValue: any;

  @Prop()
  readonly items: DocumentListItem[];

  @Emit('update:selectedValue')
  updateSelected(newValue) {
    return newValue;
  }

  getFileIcon(contentType: string): string {
    return FileIcons[contentType]
  }
}
</script>