<template>
  <div class="stage">
    <nav class="nav">
      <div class="nav-item">
        <span class="icon" v-on:click="toggleSplit">
          <i v-show="!this.split" class="icon-frame" />
          <i class="icon-frame" />
        </span>
      </div>
    </nav>
    <div
      class="columns is-gapless"
      ref="stage"
    >
      <Player
        class="column"
        ref="left"
        id="left"
      />
      <div
        v-if="split"
        class="column"
        ref="uinput"
      >
        <div ref="uinput" v-show="!isInputFile" class="file is-boxed">
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
                Choose a file…
              </span>
            </span>
          </label>
        </div>
        <Player
          :src="inputFile"
          v-show="isInputFile"
          :key="i"
          class="column"
          ref="right"
          id="right"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Player from './Player'

export default {
  components: {
    Player
  },
  data () {
    return {
      split: false,
      isInputFile: false,
      inputFile: null,
      url: null,
      i: 0
    }
  },
  methods: {
    handleFocus (e) {
      console.log('handleFocus()', e, e.target)
    },
    toggleSplit () {
      if (!(this.split = !this.split)) {
        this.isInputFile = false
        this.inputFile = null
      }
    },
    getInput (e) {
      console.log(e, e.target, e.target.files)
      console.log(window)
      this.inputFile = null
      if (this.url = window.URL) {
        this.inputFile = this.url.createObjectURL(e.target.files[0])
        this.isInputFile = true;
        this.i += 1

      }
    }
  }
}
</script>

<style scoped>
.stage {
  display: inline-block;
}
.nav {
  background-color: hotpink;
}
.column {
  border-left: 2px solid black;
  border-right: 2px solid black;
  border-bottom: 2px solid black;
  border-top: 2px solid black;
  padding: 0px;
}

#right {
  display: flex;
}

.file {
  visibility: visible;
}

</style>
