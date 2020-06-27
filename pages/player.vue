<template>
  <div>
    <Wrapper :videoSource="string"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      inputString: null,
      inputFile: null,
      isInputFile: false,
      embedFlag: false,
      html5Flag: false,
      userIn: null,
      inputLink: null,
      flag: false,
      string: 'https://thumbs.gfycat.com/ImmediateBigBengaltiger-mobile.mp4'
    }
  },
  computed: {
    userInput () {
      if (isInputFile) {
        return this.inputFile
      } else if (html5Flag) {
        return this.inputString
      }
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
      } else {
        console.log('error - window does not exist')
      }
    }
  }
}
</script>

<style scoped>

</style>
