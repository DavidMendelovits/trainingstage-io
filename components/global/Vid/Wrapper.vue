<template>
  <div @drop.prevent="updateSourceVid" @dragover.prevent>
    <WrapperToolbar
      :frameRate="frameRate"
      @paperclip="toggleInput"
      @question="toggleInstructions"
      @change="changeSpeed"
    />
    <WrapperInput
      v-show="state.paperclip"
      :active="state.paperclip"
      @input="handleIn"
      @exit="toggleInput"
    />
    <div class="player">
      <Instructions
        class="instruction"
        v-show="state.instructions"
        @exit="toggleInstructions"
      />
      <Player
        class="p"
        v-if="!state.embed"
        :frameRate="frameRate"
        :src="source"
        :key="state.toggle"
      />
    </div>
    <div v-if="state.embed">
      <Embed
        :value="state.videoEmbed"
        :key="!state.toggle"
      />
    </div>
  </div>
</template>

<script>
import { ref, computed, reactive } from '@vue/composition-api'
import { useContext } from 'nuxt-composition-api'

export default {
  props: {
    videoSource: {
      required: false,
      default: 'backflip.mp4'
    }
  },
  setup (props, { emit }) {
    const state = reactive({
      source: computed(() => {
        return (state.fileBlob || state.gfyLink || props.videoSource)
      }),
      split: false,
      userIn: null,
      fileBlob: null,
      droppedFile: false,
      embed: false,
      gfyLink: null,
      videoEmbed: null,
      toggle: 0,
      switch: [0, 1],
      paperclip: false,
      instructions: false,
      frameRates: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
      frameRate: 3
    })

    const frameRate = computed(() => {
      return state.frameRates[state.frameRate]
    })

    const source = ref(computed(() => {
      return (state.fileBlob || state.gfyLink || props.videoSource)
    }))

    const toggleInput = () => {
      console.log('toggleInput')
      state.paperclip = !(state.paperclip)
    }
    const toggleInstructions = () => {
      console.log('toggle instructions')
      state.instructions = !(state.instructions)
    }

    const handleIn = (data) => {
      console.log('handleIn()')
      const reset = () => {
        state.embed = false
        state.videoEmbed = null
      }
      reset()

      if (data.link.slice(0, 4) === 'blob') {
        console.log('a file!')
        state.embed = false
        state.fileBlob = data.link
      } else if (data.embed) {
        state.toggle = (state.switch[++state.toggle % 2])
        state.videoEmbed = data.link
        state.embed = true
      } else {
        state.gfyLink = data.link
        reset()
      }
    }

    const readFile = (f) => {
      console.log('reading file', f)
      return (URL.createObjectURL(f) || null)
    }
    const updateSourceVid = (e) => {
      console.log('update source vid')
      const file = e.dataTransfer.files[0]
      if (!file) { return }
      state.fileBlob = readFile(file)
      state.toggle = (state.switch[(state.toggle + 1) % 1])
    }

    const changeSpeed = (to) => {
      console.log('changing speed...', to)
      if (to === 'slow' && state.frameRate > 0) {
        state.frameRate -= 1
      } else if (to === 'fast' && state.frameRate < 7) {
        state.frameRate += 1
      }
    }
    return {
      state,
      updateSourceVid,
      source,
      toggleInput,
      handleIn,
      toggleInstructions,
      frameRate,
      changeSpeed
    }
  }
}
</script>

<style scoped>
.player {
  position: relative;
  height: 100%;
  width: 100%;
}
.instruction {
  position: absolute;
  top: 5%;
  height: 100%;
  width: 100%;
  object-fit: contain;
}

.p {
  position: absolute;
  object-fit: cover;
  max-height: 60vh;
  top: 0;
}

</style>
