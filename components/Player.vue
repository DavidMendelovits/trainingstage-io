<template>
  <div class="videoContainer" v-hotkey="keymap">
    <video
      id="player"
      ref="player"
      muted
      v-on:click="handleScrub"
      v-on:timeupdate="handleTime"
      v-on:loadedmetadata="loadmetadata"
      :src="src"
      type="video/mp4"
    />
    <section>
    <div id="videoControls">
      {{ frameRates[frameRate] }}
      {{ currentTime }}
      <div id="videoCurrentTime"></div>
      <div id="videoDuration"></div>
      <div ref="progressbar"></div>
    </div>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: 'default.mp4'
    }
  },
  computed: {
    player () {
      return this.$refs.player
    }
  },
  data () {
    return {
      currentTime: 0,
      duration: 0,
      frame: (1/22),
      show: true,
      frameRates: [0.25, 0.5, .75, 1, 1.25, 1.5, 1.75, 2],
      frameRate: 3,
      isPaused: true
    }
  },
  computed: {
    keymap () {
      return {
        'space': this.togglePlayPause,
        'left': this.seekBackward,
        'right': this.seekForward,
        '[': this.slowDown,
        ']': this.speedUp
      }
    }
  },
  mounted () {
    console.log('mounted')
    console.log(this.$refs.progressBar)

  },
  methods: {
    loadmetadata (e) {
      console.log(e)
      console.log(this.$refs.progressBar)
      this.duration = e.target.duration
      //this.$refs.progressBar.style.transform = `scaleX(${this.$refs.video.currentTime / this.$refs.video.duration})`
    },
    handleTime (e) {
      console.log(e)
      this.currentTime = e.target.currentTime
    },
    slowDown () {
      this.$refs.player.playbackRate = this.frameRates[(this.frameRate > 0) ? --this.frameRate : 0]
    },
    speedUp () {
      this.$refs.player.playbackRate = this.frameRates[(this.frameRate < 7) ? ++this.frameRate : 7]
    },
    togglePlayPause () {
      (this.isPaused)
      ? this.play()
      : this.pause()
    },
    play () {
      this.isPaused = false
      this.$refs.player.play()

    },
    pause () {
      this.isPaused = true
      this.$refs.player.pause()

    },
    seekBackward () {
      this.$refs.player.currentTime -= this.frame
      this.pause()
    },
    seekForward () {
      this.$refs.player.currentTime += this.frame
      this.pause()
    },
    getZone (middleX, middleY, inX, inY) {
      if (Math.abs(inX - middleX) <= 25 && Math.abs(inY - middleY) <= 25) {
        return (0)
      }
      const top = (inY < middleY)
      const left = (inX < middleX)
      if (top) {
        return (left) ? 1 : 2
      } else {
        return (left) ? 3 : 4
      }
    },
    scrub (zone) {
      const player = this.$refs.player
      if (!zone) {
        (player.paused)
          ? player.play()
          : player.pause()
      } else if (zone % 2 !== 0) {
        player.currentTime -= this.frame
        player.pause()
      } else {
        player.currentTime += this.frame
        player.pause()
      }
    },
    handleScrub (e) {
      console.log(e)
      const face = (e.touches) ? e.touches[0] : e
      const videoBorderInfo = e.target.getBoundingClientRect()
      const middleY = videoBorderInfo.y + (videoBorderInfo.height / 2)
      const middleX = videoBorderInfo.x + (videoBorderInfo.width / 2)
      const zone = this.getZone(middleX, middleY, face.clientX, face.clientY)
      this.scrub(zone)
    }
  }
}
</script>

<style scoped>
</style>
