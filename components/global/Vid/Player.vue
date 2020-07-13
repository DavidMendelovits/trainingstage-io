<template>
  <div class="videoContainer">
    <video
      :src="src"
      id="player"
      playsinline
      class="video"
      ref="player"
      @loadedmetadata="loadMetaData"
      @timeupdate="handleTimeUpdate"
      type="video/mp4"
      :style="mirrorTransform"
    />

    <Control
      ref="controls"
      class="controls"
      :player="player"
      :duration="state.duration"
      :currentTime="state.currentTime"
      @crop="adjust"
      @on="trimOn"
      @off="trimOff"
      @mirror="toggleMirror"
      @question="toggleInstruction"
    />
  </div>
</template>

<script>
import { onMounted, ref, computed, reactive } from '@vue/composition-api'
import { useContext } from 'nuxt-composition-api'

export default {
  props: {
    src: {
      default: 'backflip.mp4'
    }
  },
  setup (props) {
    //setup
    const player = ref(null)
    onMounted(() => {
      console.log('player', player)
    })
    const controls = ref(null)
    onMounted(() => {
      console.log('controls', controls)
    })

    // console.log(controls.value)
    const { store } = useContext()

    const state = reactive({
      src: props.src,
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
      left: 0,
      mirror: false,
      instructions: false
    })

    const toggleMirror = () => {
      console.log('toggleMirror')
      state.mirror = !state.mirror
    }


    const toggleInstruction = () => {
      console.log('hmm')
      state.instructions = !(state.instructions)
    }

    const mirrorTransform = (computed(() => {
      const transform = `
        transform: rotateY(180deg);
      -webkit-transform:rotateY(180deg); /* Safari and Chrome */
      -moz-transform:rotateY(180deg);
      `
      return (state.mirror)
              ? transform
              : ''
    }))

    const trimOff = () => {
      state.isTrimming = false
      state.trimRight = 0
      state.trimLeft = 0
      state.offsetStart = 0
      state.offsetEnd = 0
    }
    const trimOn = () => {
      state.isTrimming = true
    }
    const setTime = (to) => {
      console.log('set time to ', to)
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

    const adjust = (direction, trim, offset) => {
      if (direction === 'left') {
        state.trimLeft = trim
        state.offsetStart = offset
      } else if (direction === 'right') {
        state.trimRight = trim
        state.offsetEnd = offset
      }
    }
    const loadMetaData = (e) => {
      state.duration = e.target.duration
    }

    // const handleTouch = (e) => {
    //   const face = (e.touches) ? e.touches[0] : e
    //   const videoBorderInfo = e.target.getBoundingClientRect()
    //   const middleY = videoBorderInfo.y + (videoBorderInfo.height / 2)
    //   const middleX = videoBorderInfo.x + (videoBorderInfo.width / 2)
    //   const zone = getZone(middleX, middleY, face.clientX, face.clientY)

    //   if (!zone) {
    //     (player.value.paused)
    //       ? play()
    //       : pause()
    //   } else if (zone % 2 !== 0) {
    //     seekForward(state.frame)
    //   } else {
    //     seekBackward(state.frame)
    //   }
    // }

    const handleTimeUpdate = (e) => {
      console.log('time update!')
      state.currentTime = e.target.currentTime
      if (!state.trimRight || !state.isTrimming) { return }
      if (!(state.currentTime < (state.duration - state.offsetEnd))) {
        setTime(state.offsetStart)
      }
    }
    return {
      state,
      player,
      // togglePlayPause,
      // handleTouch,
      handleTimeUpdate,
      loadMetaData,
      adjust,
      trimOn,
      trimOff,
      mirrorTransform,
      toggleMirror,
      toggleInstruction
    }
  }
}
</script>

<style scoped>
.videoContainer {
  width: 100%;
  position: relative;
  object-fit: contain;
  display: flex;
}

.video {
  width: 100%;
}

.instruction {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  object-fit: contain;
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
