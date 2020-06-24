<template>
  <div ref="uinput" v-show="!isInputFile" class="file is-boxed level">
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
</template>

<script>
export default {
  data () {
    return {
      isInputFile: false,
      inputFile:  {},
      i: 0
    }
  },
  methods: {
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
  }
}
</script>
