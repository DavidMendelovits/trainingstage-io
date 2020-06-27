<template>
  <div class="stage" @drop.prevent="addFile" @dragover.prevent>
    <div class="columns is-gapless is-centered is-multiline">
      <div class="column is-full">
        <nav class="level mx-0 px-0 is-mobile">
          <div class="level-left">
            <div class="nav-item">
              <button class="button">
                <span class="icon" v-on:click="toggleSplit">
                  <i v-show="!this.split" class="icon-frame" />
                  <i class="icon-frame" />
                </span>
              </button>
            </div>
            <div class="nav-item">
              <button class="button">
                <span class="icon" v-on:click="toggleSplit">
                  <i class="icon-eye" />
                </span>
              </button>
            </div>
          </div>
        </nav>
      </div>
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
  </div>
</template>

<script>
export default {
  props: {

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
    readFile (file) {
      if (this.url = window.URL) {
        return this.url.createObjectURL(file)
      }
      return null
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
    },
    addFile (e) {
      const dropped = e.dataTransfer.files;
      if (!dropped) { return }
      ([...dropped]).forEach(file => {
        this.entries.push(this.readFile(file))
      })
    }
  }
}
</script>

<style scoped>
.stage {
  display: block;
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
