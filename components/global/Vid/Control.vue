<template>
  <div class="controls">
    <div id="videoControls" class="controls" >
      <div class="seeker">
        <progress
          :value="`${currentTime / duration}`"
          :style="`clip-path:inset(0 ${state.trimRight}% 0 ${state.trimLeft}%);`"
          max="1"
          id="progressBar"
          ref="progressbar"
          class="progress is-dark"
          v-on:click="handleSeeking"
        />
        <div class="cursors" ref="cursors">
          <div
            class="cursor"
            id="begin"
            ref="begincursor"
            v-draggabilly="{axis: 'x', containment: true}"
            v-draggabilly-on:pointerDown="handleStartCursor"
            v-draggabilly-on:pointerMove="handleStartCursor"
          />
          <div
            class="cursor"
            id="end"
            ref="endcursor"
            v-draggabilly="{axis: 'x', containment: true}"
            v-draggabilly-on:pointerDown="handleEndCursor"
            v-draggabilly-on:pointerMove="handleEndCursor"
          />
        </div>
      </div>
      <div
        class="zones"
        @click="handleTouch($event, player, state)"
      />
    </div>
    <div id="utilities" class="level is-mobile">
      <div class="level-left">
        <div id="mirror" class="level-item">
          <button @click="mirror" class="tag is-medium">
            <span class="icon is-medium">
              <i class="icon-refresh"/>
            </span>
            Mirror
          </button>
        </div>
      </div>
      <div class="level-right">
        <div id="cut" class="level-item">
          <span class="icon is-medium" @click="toggleTrim">
            <i class="icon-film" />
          </span>
          <span>
            {{ currentTime.toFixed(2) }}
          </span>
        </div>
        <div class="level-item">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, computed, reactive } from '@vue/composition-api'
import {
  play, pause, togglePlayPause, handleTouch, getZone, setTime, seekForward, seekBackward
} from './utils'

export default {
  props: {
    player: {
      required: true
    },
    duration: Number,
    currentTime: Number
  },
  setup(props, { emit }) {
    const cursors = ref(null)
    onMounted(() => {
      console.log(cursors.value)
    })

    const handleSeeking = (e) => {
      const face = (e.touches) ? e.touches[0] : e
      const videoBorderInfo = e.target.getBoundingClientRect()
      const target = (props.duration) * ((face.x + videoBorderInfo.left) / videoBorderInfo.right)
      setTime(props.player, target)
    }

    const handleEndCursor = (e, ptr) => {
      if (e.target.id !== 'end') { return }
      const parentBorder = ptr.target.parentElement.getBoundingClientRect()
      const offset = ptr.x - parentBorder.left
      state.trimRight =
       `${(100 - (100 * (offset / parentBorder.width)))}`
      state.offsetEnd =
        props.duration * (state.trimRight / 100)
      emit('crop', 'right', state.trimRight, state.offsetEnd)
    }



    const handleStartCursor = (e, ptr) => {
      if (e.target.id !== 'begin') { return }
      const parentBorder = ptr.target.parentElement.getBoundingClientRect()
      const offset = ptr.x - parentBorder.left
      state.trimLeft =
       `${(100 * (offset / parentBorder.width))}`
      state.offsetStart =
        props.duration * (state.trimLeft / 100)
      setTime(props.player, state.offsetStart)
      emit('crop', 'left', state.trimLeft, state.offsetStart)
    }
    const toggleTrim = () => {
      cursors.value.style.visibility = ((state.isTrimming = !state.isTrimming))
        ? 'visible'
        : 'hidden'
      if (!state.isTrimming) {
        state.trimLeft = 0
        state.trimRight = 0
        state.offsetEnd = 0
        state.offsetStart = 0
        emit('off')
      } else { emit('on')}
    }
    const mirror = () => {
      emit('mirror')
    }

    const handleTimeUpdate = (e) => {
      console.log('about to travel through time')
      console.log(e)
    }

    const state = reactive({
      trimRight: 0,
      trimLeft: 0,
      frame: (1/22),
      isPaused: true,
      isTrimming: false,
      offsetStart: 0,
      offsetEnd: 0,
      isLooping: true,
      right: 0,
      left: 0,
      frameRates: [0.25, 0.5, .75, 1, 1.25, 1.5, 1.75, 2],
      frameRate: 3
    })

    return {
      state,
      handleSeeking,
      handleTouch,
      handleStartCursor,
      handleEndCursor,
      cursors,
      toggleTrim,
      handleTimeUpdate,
      mirror
    }
  }
}
</script>

<style scoped>
.controls {
  overflow: hidden;
  top: 0;
  width: 100%;
  height: 100%;
}

.zones {
  height: 100%;
  position: relative;
  top: 0;
  z-index: 4;
  display:flex;
}

#progressBar {
  height: 35px;
  position: absolute;
  object-fit: contain;
  z-index: 5;
  margin-top: 0;
  margin-bottom: 0;
}

.cursors {
  position: absolute;
  display: flex;
  top: 0;
  width: 100%;
  z-index: 5;
  height: 35px;
  visibility: hidden;
}

.cursor {
  border-radius: 5px;
  background-color: red;
  height: 35px;
  width: 5px;
  z-index: 5;
}

#begin {
  left: 5%;
}
#end {
  left: 95%;
  top: 0
}
#play {
  position: absolute;
  left: 50%;
  top: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
#util {
  z-index: 6;
  position: absolute;
  top: 90%;
  height: 8.7777%;
  right: 0;
  color: white;
  background-color: black;
  border-radius: 10px;
}

#cut {
  background-color: black;
  color: white;
  border-radius: 10px;
  height: 8.77%;
}

#mirror {
  height: 8.7777%;
  background-color: black;
  color: white;
  border-radius: 10px;
}

#utilities {
  position: absolute;
  top: 90%;
  width: 100%;
  position: absolute;
  z-index: 6;
}
</style>
