<template>
  <nav class="level is-mobile">
    <div class="level-left">
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
import { ref, computed, reactive } from '@vue/composition-api'
import { useContext } from 'nuxt-composition-api'

export default {
  setup (props, { emit }) {
    const state = reactive({
      inputFile: null,
      isInputFile: false,
      inputLink: null,
      outputLink: null
    })
    const { store } = useContext()

    const getInput = (e) => {
      state.inputFile = null
      state.inputFile = URL.createObjectURL(e.target.files[0])
      if (store.state.userVideo[0]) {
        store.commit('DELETE_VIDEO', 0)
      }
      store.commit('PUSH_VIDEO', state.inputFile)
      const output = {
        'embed': false,
        'link': state.inputFile
      }
      emit('submitted', output)
    }
    return {
      state,
      getInput
    }
  }
  // methods: {
  //   async parseLink (e) {
  //     const output = {
  //       'embed': true,
  //       'link': this.inputLink
  //     }
  //     if (this.inputLink.search('gfycat') > 0) {
  //       await this.getGfy(this.inputLink)
  //       output.embed = false
  //       output.link = this.outputLink
  //       console.log('gfycat!')
  //     }
  //     this.$emit('submitted', output)
  //   },
  //   getPath (url) {
  //     const test = new URL(url)
  //     console.log('--',test)
  //     const reUrlPath = /(?:\w+:)?\/\/[^\/]+([^?#-]+)/;
  //     const urlParts = url.match(reUrlPath) || [url, 'unknown'];
  //     console.log(urlParts)
  //     return urlParts.pop().slice(1)
  //   },
  //   async getGfy (gfyURL) {
  //     console.log('gettinggfy', gfyURL)
  //     const vidID = this.getPath(gfyURL)
  //     const gfy = await this.$axios.$get(`https://api.gfycat.com/v1/gfycats/${vidID}`)
  //     return this.outputLink = gfy.gfyItem.miniUrl
  //   },
  // }
}
</script>
