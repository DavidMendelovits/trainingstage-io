<template>
  <div class="videoContainer" v-hotkey="keymap">
    <video
      id="player"
      ref="player"
      muted
      v-on:click="handleScrub"
      v-on:timeupdate="handleTime"
      v-on:loadedmetadata="loadmetadata"
      v-on:ended="handleEnd"
      loop
      :src="src"
      type="video/mp4"
    />
    <div id="videoControls" class="controls" >
      <progress
        :value="`${currentTime / duration}`"
        max="1"
        id="progressBar"
        ref="progressbar"
        class="progress is-dark"
        v-on:click="handleSeeking"
      />
      <div
        class="cursors"
        ref="cursors"
      >
        <div
          class="cursor"
          id="begin"
          ref="begincursor"
          draggable="true"
          v-on:dragstart="handleCursor"
          v-on:dragend="handleCursor"
          v-on:drag="handleCursor"
          v-on:touchmove="handleCursor"
        />
        <div
          class="cursor"
          id="end"
          ref="endcursor"
          draggable="true"
          v-on:dragstart="handleCursor"
          v-on:dragend="handleCursor"
          v-on:drag="handleCursor"
          v-on:touchmove="handleCursor"
        />
      </div>
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
    <div id="toolbar" class="level">
      <span v-on:click="handleUtil($event, 'trim')" class="icon is-medium">
        <i class="icon-film" />
      </span>
      <span>
        {{ currentTime }}
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
      isPaused: true,
      trimRight: null,
      trimLeft: null,
      isTrimming: false,
      offsetStart: 0,
      offsetEnd: 0,
      isLooping: true
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
  watch: {
    src: function (source) {
      this.$refs.player.load()
    }
  },
  mounted () {
    console.log('mounted')
    this.$refs.player.load()
  },
  created () {
    console.log('created')
  },
  methods: {
    handleEnd (e) {
      console.log('handleEnd()', e)
      if (this.isTrimming && this.trimLeft) {
        const borderInfo = e.target.getBoundingClientRect()
        console.log(this.trimLeft.slice(0, -2), borderInfo)
        let newval = (this.duration) * (this.trimLeft.slice(0, -2) / borderInfo.right)
        console.log(newval)
        this.$refs.player.currentTime = newval
        this.togglePlayPause()
      }
    },
    handleCursor (e) {
      console.log('handleCursor()', e, e.target)
      if (!this.isTrimming) { return ; }
      let begin = (e.target.id === 'begin')
      let pos
      if (e.type === 'drag' || e.type === 'dragend') {
        pos = `${e.x}px`
      } else if (e.type === 'touchmove') {
        console.log('touchmove')
        pos = `${Math.max(e.touches[0].clientX, 0)}px`
      } else { return ;}

      if (begin) {
        e.target.style.left = pos
        this.trimLeft = pos
        console.log(e.target.getBoundingClientRect())
        this.offsetStart =
            (this.duration) *
            (this.trimLeft.slice(0, -2) / e.target.parentElement.getBoundingClientRect().right)
      } else {
        e.target.style.left = pos
        this.trimRight = pos
        console.log(e.target.getBoundingClientRect())
        this.offsetEnd =
            (this.duration) *
            (this.trimRight.slice(0, -2) / e.target.parentElement.getBoundingClientRect().right)
      }
    },
    toggleTrim () {
      this.$refs.cursors.style.visibility = ((this.isTrimming = !this.isTrimming))
                                          ? 'visible'
                                          : 'hidden'
      if (!this.isTrimming) {
        //this.trimLeft = null
        //this.trimRight = null
      }
    },
    handleUtil (e, util) {
      console.log('handle Util')
      console.log(e)
      e.target.style.color = (e.target.style.color === 'red')
                             ? 'white'
                             : 'red'
      if (util === 'trim') {
        this.toggleTrim()

      }
    },
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
      console.log(this.$refs.progressar)
      this.duration = e.target.duration
      //this.$refs.progressBar.style.transform = `scaleX(${this.$refs.video.currentTime / this.$refs.video.duration})`
    },
    handleTime (e) {
      console.log(e)
      this.currentTime = e.target.currentTime
      console.log(this.offsetStart,this.offsetEnd)
      if ((!(this.trimRight)) || !(this.isTrimming)) { return ; }
      if (!(this.currentTime <= this.offsetEnd)) {
        this.$refs.player.currentTime = this.offsetStart
      }

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
  display: flex;
  flex-direction: column;
}


#player {
  width: 100%;
}

#videoControls {
  position: absolute;
  object-fit: contain;
  display: initial;
  top: 0;
  width: 100%;
}
.cursors {
  display: flex;
  width: 100%;
  visibility: hidden;;
}

.cursor {
  position: absolute;
  display: flex;
  border-radius: 5px;
  background-color: red;
  height: 35px;
  width: 5px;
  z-index: 6;
}
#end {
  right: 0px;
}

#begin {
  left: 0px;
}

#progressBar {
  position: absolute;
  height: 35px;
  z-index: 5;
  width: 100%;
  align-self: center;
}


#trimControls {
  position: absolute;
  z-index: 6;
  top: 0;
  color: red;
}

#icon-arrow-right {
  cursor: move;
  left: 0;
}

#icon-arrow-left {
  left: 100%;
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
  color: white;
  background-color: black;
  border-radius: 10px;
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
