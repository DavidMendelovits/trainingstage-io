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
    <div id="videoControls" >
      <progress
        :value="`${currentTime / duration}`"
        max="1"
        id="progressBar"
        ref="progressbar"
        class="progress is-dark"
        v-on:click="handleSeeking"
      />
    </div>
    <div
      id="frameRate"
      ref="framerate"
      class="container"
    >
      <span class="icon is-dark">
        <i class="icon-speedometer" />
        {{ frameRates[frameRate] }}x
      </span>
    </div>
    <div id="toolbar" class="container">
      <span class="icon is-small">
        <button class="button is-small">
          <i class="icon-user" />
        </button>
      </span>
      <span class="icon is-small">
        <button class="button is-small">
          <i class="icon-loop" />
        </button>
      </span>
      <span class="icon is-small">
        <button class="button is-small">
          <i class="icon-film" />
        </button>
      </span>
      <span class="icon is-small">
        <button class="button is-small">
          <i class="icon-crop" />
        </button>
      </span>
    </div>
  </div>
</template>

<script>
import line from '../assets/line.svg'
import dot from '../assets/dot.svg'
import tile from '../assets/tile.svg'
export default {
  props: {
    src: {
      type: String,
      default: 'default.mp4'
    }
  },
  data () {
    return {
      line: line,
      dot: dot,
      tile: tile,
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
    handleSeeking (e) {
      console.log('seeking...')
      console.log(e)
      const face = (e.touches) ? e.touches[0] : e
      const videoBorderInfo = e.target.getBoundingClientRect()
      console.log(face, videoBorderInfo)
      this.$refs.player.currentTime = (this.duration) * ((face.x + videoBorderInfo.left) / videoBorderInfo.right)
    },
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
.videoContainer {
  position: relative;
}

#videoControls {
  position: absolute;
  top: 0;
  width: 100%;
}

#progressBar {
  height: 35px;
  width: 100%;
  z-index: 5;
}
#frameRate {
  position: absolute;
  height: 10%;
  width: 10%;
  top: 90%;
  left: 0;
  text-align: center;
  font-weight: bold;
  color: white;
}
#toolbar {
  position: absolute;
  top: 90%;
  height: 8.7777%;
  right: 0;
}

#progressDot {
  position: absolute;
  height: 35px;
  width: 35px;
  will-change: transform;
  transform-origin: 0 50%;
  transform: scale(1);
}

</style>
