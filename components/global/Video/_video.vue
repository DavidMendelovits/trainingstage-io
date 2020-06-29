<template>
  <div class="is-centered">
    <!-- <Embed @click.prevent ref="embed" value="https://gfycat.com/immediatebigbengaltiger" /> -->
    <!-- <Embed value="https://gfycat.com/tidyalarminggoldfish"/> -->
    {{ gfyLink }}
    <div class="level is-mobile">
      <div class="control level-left">
        <input class="input" v-model="userIn" type="text" placeholder="paste a link!">
        <button class="button" @click="getGfy">
          <span class="icon is-large">
            <i class="icon-mouse"/>
          </span>
        </button>
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
              Choose a file, or drag it in!
            </span>
          </span>
        </label>
      </div>
    </div>
    <Player
      v-if="flag"
      :src="inputLink"
    />
  </div>
</template>

<script>
export default {
  props: {
    link: String
  },
  data () {
    return {
      gfyLink: null,
      success: false,
      userIn: null,
      flag: false,
      inputLink: null
    }
  },
  fetchOnServer: false,
  async fetch() {
    // console.log(this)
    // const gfyLink = await this.$axios.$get(`https://api.gfycat.com/v1/gfycats/${this.gfyID}`)
    // this.gfyLink = gfyLink.gfyItem.miniUrl
    // this.success = true
    // console.log(gfyLink,gfyLink.gfyItem, gfyLink.gfyItem.miniUrl)
  },
  computed: {
    emb () {
      return this.$refs.embed
    }
  },
  methods: {
    getPath (url) {
      const test = new URL(url)
      console.log('--',test)
      const reUrlPath = /(?:\w+:)?\/\/[^\/]+([^?#-]+)/;
      const urlParts = url.match(reUrlPath) || [url, 'unknown'];
      console.log(urlParts)
      return urlParts.pop().slice(1)
    },
    async getGfy (e) {
      console.log('gettinggfy', e)
      if ((!this.userIn) || this.userIn === '') { return }
      const vidID = this.getPath(this.userIn)
      const gfy = await this.$axios.$get(`https://api.gfycat.com/v1/gfycats/${vidID}`)
      this.inputLink = gfy.gfyItem.miniUrl
      this.flag = true
    },
    getInput (e) {
      console.log(e, e.target, e.target.files)
      console.log(window)
      this.inputFile = null
      if (this.url = window.URL) {
        this.inputFile = this.url.createObjectURL(e.target.files[0])
        this.isInputFile = true;
        this.i += 1
        console.log('filled!')
        this.$store.commit('PUSH_VIDEO', this.inputFile)
        this.$emit('filled')
      }
    }
  },
  watch: {
    // async userIn (newVal) {
    //   const gfyID = this.getPath(newVal)
    //   const gfy = await this.$axios.$get(`https://api.gfycat.com/v1/gfycats/${gfyID}`)
    //   this.inputLink = gfy.gfyItem.miniUrl
    //   this.flag = true
    // }
  }

}
</script>
