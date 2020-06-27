<template>
  <div @drop.prevent="updateSourceVid" @dragover.prevent>
    <WrapperToolbar v-on:paperclick="togglePaperclip"/>
    <WrapperInput :active="paperclip" v-on:input="handleLink" />
    <Player
      :src="source"
      :key="toggle"
    />
    <Embed
      v-if="embed"
      :value="videoEmbed"
      :key="!toggle"
    />
  </div>
</template>

<script>
export default {
  props: {
    videoSource: String
  },
  data () {
    return {
      isDroppedFile: false,
      fileBlob: null,
      switch: [0, 1],
      toggle: 0,
      paperclip: false,
      videoEmbed: null,
      embed: false,
      gfyLink: null
    }
  },
  computed: {
    source () {
      return (this.fileBlob || this.gfyLink || this.videoSource)
    }
  },
  methods: {
    updateSourceVid (e) {
      const file = e.dataTransfer.files[0]
      if (!file) { return }
      this.fileBlob = this.readFile(file)
      this.toggle = (this.switch[(this.toggle + 1) % 1])
    },
    readFile (file) {
      if (this.url = window.URL) {
        return this.url.createObjectURL(file)
      }
      return null
    },
    togglePaperclip () {
      console.log('togglePaperclip')
      this.paperclip = !this.paperclip
      this.$store.commit('TOGGLE_INPUT')
    },
    handleLink (linkInfo) {
      console.log('handleLink()', linkInfo)
      if (linkInfo.embed) {
        this.embed = false
        this.videoEmbed = null
        this.videoEmbed = linkInfo.link
        this.embed = true
      } else {
        this.gfyLink = linkInfo.link
      }
      this.toggle = (this.switch[(this.toggle + 1) % 1])
    }
  }
}
</script>
