<template>
  <div @drop.prevent="updateSourceVid" @dragover.prevent>
    <WrapperToolbar v-on:paperclick="togglePaperclip"/>
    <WrapperInput :active="paperclip" v-on:input="handleIn" />
    <Player
      v-if="!embed"
      :src="source"
      :key="toggle"
    />
    <div v-if="embed">
      <Embed
        :value="videoEmbed"
        :key="!toggle"
      />
    </div>

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
    },
    handleIn (data) {
      console.log('handleIn()')
      if (this.embed) {
        console.log('hm')
        this.embed = false
        this.videoEmbed = null
      }
      if (data.link.slice(0, 4) === 'blob') {
        console.log('a file!')
        this.embed = false
        this.fileBlob = data.link
      } else if (data.embed) {
        this.toggle = (this.switch[(this.toggle++ % 2)])
        this.videoEmbed = data.link
        this.embed = true
      } else {
        this.gfyLink = data.link
        this.embed = false
      }
    }

  }
}
</script>
