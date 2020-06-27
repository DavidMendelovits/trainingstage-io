<template>
  <nav class="level is-mobile">
    <div class="level-left">
      <div class="level-item control">
        <input
          class="input"
          type="text"
          placeholder="Paste a link here (youtube, vimeo, etc)"
          v-model="inputLink"
        >
        <button class="button" @click="parseLink">
          <label class="label">
            submit
          </label>
        </button>
      </div>
    </div>
    <div class="level-right">
      <label class="file-label">
          <input
            class="file-input"
            type="file"
            name="resume"
            @change="getInput"
          >
          <span class="file-cta">
            <span class="file-icon">
              <i class="icon-rocket"></i>
            </span>
            <span class="file-label">
              click to choose a file
            </span>
          </span>
        </label>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      inputFile: null,
      isInputFile: false,
      inputLink: null,
      outputLink: null
    }
  },
  methods: {
    getInput (e) {
      this.inputFile = null
      if (this.url = window.URL) {
        this.inputFile = this.url.createObjectURL(e.target.files[0])
        this.isInputFile = true;
        console.log('filled!')
        if (this.$store.state.userVideo[0]) {
          this.$store.commit('DELETE_VIDEO', 0)
        }
        this.$store.commit('PUSH_VIDEO', this.inputFile)
      }
    },
    async parseLink (e) {
      const output = {
        'embed': true,
        'link': this.inputLink
      }
      if (this.inputLink.search('gfycat') > 0) {
        await this.getGfy(this.inputLink)
        output.embed = false
        output.link = this.outputLink
        console.log('gfycat!')
      }
      this.$emit('submitted', output)
    },
    getPath (url) {
      const test = new URL(url)
      console.log('--',test)
      const reUrlPath = /(?:\w+:)?\/\/[^\/]+([^?#-]+)/;
      const urlParts = url.match(reUrlPath) || [url, 'unknown'];
      console.log(urlParts)
      return urlParts.pop().slice(1)
    },
    async getGfy (gfyURL) {
      console.log('gettinggfy', gfyURL)
      const vidID = this.getPath(gfyURL)
      const gfy = await this.$axios.$get(`https://api.gfycat.com/v1/gfycats/${vidID}`)
      return this.outputLink = gfy.gfyItem.miniUrl
    },
  }
}
</script>
