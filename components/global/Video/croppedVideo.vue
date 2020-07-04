<template>
  <div class="videoContainer">
    <video
      :src="state.src"
      id="player"
      class="video"
      ref="player"
      @click="handleTouch"
      @loadedmetadata="loadMetaData"
      @timeupdate="handleTimeUpdate"
      type="video/mp4"
    />
    <Controls
      class="controls"
      :player="player"
      :duration="state.duration"
      :currentTime="state.currentTime"
    />
  </div>
</template>

<script>
import { onMounted, ref, computed, reactive } from '@vue/composition-api'
// import { useContext } from 'nuxt-composition-api'

export default {
  setup () {
    //setup
    const player = ref(null)
    onMounted(() => {
      console.log('player', player)
    })

    const state = reactive({
      src: 'default.mp4',
      duration: 0,
      currentTime: 0,
      frame: (1/22),
      frameRates: [0.25, 0.5, .75, 1, 1.25, 1.5, 1.75, 2],
      frameRate: 3,
      isPaused: true,
      trimRight: 0,
      trimLeft: 0,
      isTrimming: false,
      offsetStart: 0,
      offsetEnd: 0,
      isLooping: true,
      right: 0,
      left: 0
    })
    //methods
    const play = () => {
      state.isPaused = false
      player.value.play()
    }
    const pause = () => {
      state.isPaused = true
      player.value.pause()
    }
    const togglePlayPause = () => {
      (state.isPaused)
      ? play()
      : pause()
    }
    const seekForward = (frame) => {
      console.log('->')
      player.value.currentTime -= frame
      pause()
    }
    const seekBackward = (frame) => {
      console.log('<-')
      player.value.currentTime += frame
      pause()
    }
    const setTime = (to) => {
      player.value.currentTime = to
    }
    const getZone = (middleX, middleY, inX, inY) => {
      if (Math.abs(inX - middleX) <= 40 && Math.abs(inY - middleY) <= 40) {
        return (0)
      }
      const top = (inY < middleY)
      const left = (inX < middleX)
      if (top) {
        return (left) ? 1 : 2
      } else {
        return (left) ? 3 : 4
      }
    }

    const loadMetaData = (e) => {
      state.duration = e.target.duration
    }

    const handleTouch = (e) => {
      const face = (e.touches) ? e.touches[0] : e
      const videoBorderInfo = e.target.getBoundingClientRect()
      const middleY = videoBorderInfo.y + (videoBorderInfo.height / 2)
      const middleX = videoBorderInfo.x + (videoBorderInfo.width / 2)
      const zone = getZone(middleX, middleY, face.clientX, face.clientY)

      if (!zone) {
        (player.value.paused)
          ? play()
          : pause()
      } else if (zone % 2 !== 0) {
        seekForward(state.frame)
      } else {
        seekBackward(state.frame)
      }
    }

    const handleTimeUpdate = (e) => {
      console.log('time update!')
      state.currentTime = e.target.currentTime
      if (!state.trimRight || !state.isTrimming) { return }
      if ((state.currentTime <= (state.duration - state.offsetEnd))) {
        setTime(state.offsetStart)
      }
    }
    return {
      state,
      player,
      togglePlayPause,
      handleTouch,
      handleTimeUpdate,
      loadMetaData
    }
  }
}
</script>

<style>
.videoContainer {
  width: 100%;
  position: relative;
  object-fit: contain;
  display: flex;
}

.video {
  width: 100%;
}

.controls {
  z-index: 2;
  position: absolute;
  top: 0;
  left: 0;
  width: 100;
  overflow: hidden;
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
</style>
