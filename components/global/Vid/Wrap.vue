<template>
  <div @drop.prevent="updateSourceVid" @dragover.prevent>
    <WrapperToolbar v-on:paperclip="toggleInput"/>
    <WrapperInput :active="state.paperclip" v-on:input="handleIn" />
    <Player
      v-if="!state.embed"
      :src="source"
      :key="state.toggle"
    />
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
      paperclip: false
    })

    const source = ref(computed(() => {
      return (state.fileBlob || state.gfyLink || props.videoSource)
    }))

    const toggleInput = () => {
      console.log('toggleInput')
      state.paperclip = true
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
      handleIn
    }
  }
}
</script>
