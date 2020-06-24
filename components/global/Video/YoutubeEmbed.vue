<template>
  <div
    class="content"
  >
    <youtube
      :video-id="vidId"
      :player-vars="options"
      @ready="ready"
      @playing="handleTime"
      ref="youtube"
    >
    </youtube>
    <ControlBar
      v-if="isController"
      :controller="control"
      :duration="duration"
    />
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
        modestbranding: 1,
        startSeconds: 5,
        endSeconds: 10
      },
      isController: false,
      control: {},
      duration: 0,
      player: null
    }
  },
  computed: {
    vidId () {
      return this.getID()
    }
  },
  methods: {
    async ready (e) {
      this.pl = e.target
      this.duration = await this.$refs.youtube.player.getDuration()
      this.control = this.$refs.youtube.player
      this.control.addEventListener()
      this.isController = true
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
    },
    handleTime (e) {
      console.log(e)
      //this.currentTime = e.target.currentTime
    },
    handleHover (e) {
      console.log(e)
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
