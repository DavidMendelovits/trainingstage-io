<template>
  <div @drop.prevent="updateSourceVid" @dragover.prevent>
    <WrapperToolbar
      @paperclip="toggleInput"
      @question="toggleInstructions"
    />
    <WrapperInput
      v-show="state.paperclip"
      :active="state.paperclip"
      @input="handleIn"
      @exit="toggleInput"
    />
    <div class="player">
      <Instructions class="instruction" v-show="state.instructions" />
      <Player
        class="p"
        v-if="!state.embed"
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
      default: 'default.mp4'
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
      instructions: false
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

    return {
      state,
      updateSourceVid,
      source,
      toggleInput,
      handleIn,
      toggleInstructions
    }
  }
}
</script>

<style scoped>
.player {
  position: absolute;
  height: 100%;
  width: 100%;
}
.instruction {
  position: absolute;
  top: 10%;
  height: 100%;
  width: 100%;
  object-fit: contain;
}

.p {
  position: absolute;
  top: 0;
}

</style>
