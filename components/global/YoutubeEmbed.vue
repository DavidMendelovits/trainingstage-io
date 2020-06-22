<template>
  <div class="content">
    <!-- <youtube :video-id="vidId" ref="youtube"></youtube> -->
    <youtube
      :video-id="vidId"
      :player-vars="options"
      @ready="ready"
      ref="youtube"
    >
    </youtube>
    <ControlBar :v-if="player" :controller="player"/>
  </div>
</template>
<script>
export default {
  props: {
    link: {
      default: 'https://youtu.be/ltho8_PzC2U',
      type: String
    }
  },
  data () {
    return {
      isPlaying: false,
      options: {
        rel: 0,
        modestbranding: true
      },
      controller: false,
      duration: 0
    }
  },
  computed: {
    vidId () {
      return this.getID()
    },
    player () {
      return this.$refs.youtube.player
    }
  },
  methods: {
    ready (e) {
      this.pl = e.target
      this.controller = true
      this.duration = this.$refs.youtube.player.getDuration()
      console.log('ready()', e)
    },
    getID () {
      return this.$youtube.getIdFromUrl(this.link)
    },
    play () {
      console.log(this.$refs.player)
      this.$refs.youtube.player.playVideo()
    },
    pause () {
      this.$refs.youtube.player.pauseVideo()
    },
    togglePlayPause () {
      if (!(this.isPlaying = !this.isPlaying)) {

      }
    }
  }
}
</script>

<style scoped>
.content {
  display: flex;
  position: relative;
}
iframe {
  width: 100%;
  max-width: 650px;
  height: auto;
  display: block;
}
.button {
  position: absolute;
  z-index: 6;
}
</style>
