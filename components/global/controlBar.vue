<template>
  <div id="videoControls" class="controls" >
      <progress
        :value="`${currentTime / duration}`"
        max="1"
        id="progressBar"
        ref="progressbar"
        class="progress is-dark"
        v-on:click="handleSeeking"
      />
      <div
        class="cursors"
        ref="cursors"
      >
        <!-- <div
          class="cursor"
          id="begin"
          ref="begincursor"
          draggable="true"
          v-on:dragstart="handleCursor"
          v-on:dragend="handleCursor"
          v-on:drag="handleCursor"
          v-on:touchmove="handleCursor"
        />
        <div
          class="cursor"
          id="end"
          ref="endcursor"
          draggable="true"
          v-on:dragstart="handleCursor"
          v-on:dragend="handleCursor"
          v-on:drag="handleCursor"
          v-on:touchmove="handleCursor"
        /> -->
      </div>
    </div>
</template>

<script>
export default {
  props: {
    controller: {
      type: Object,
      required: true
    },
    duration: {
      type: Number,
      default: 0
    }

  },
  computed: {
  },
  data () {
    return {
      currentTime: 0
    }
  },
  mounted () {
    console.log('mounted()')
    console.log(this.controller)
    // this.controller.addEventListener('ontimeupdate', (e) => {
    //    console.log(e.target.currentTime)
    // })
  },
  methods: {
    handleSeeking (e) {
      console.log('seeking...')
      console.log(e)
      const face = (e.touches) ? e.touches[0] : e
      const videoBorderInfo = e.target.getBoundingClientRect()
      console.log(face, videoBorderInfo)
      this.$refs.player.currentTime = (this.duration) * ((face.x + videoBorderInfo.left) / videoBorderInfo.right)
    },
    handleCursor (e) {
      console.log('handleCursor()', e, e.target)
      if (!this.isTrimming) { return ; }
      let begin = (e.target.id === 'begin')
      let pos
      if (e.type === 'drag' || e.type === 'dragend') {
        pos = `${e.x}px`
      } else if (e.type === 'touchmove') {
        console.log('touchmove')
        pos = `${Math.max(e.touches[0].clientX, 0)}px`
      } else { return ;}

      if (begin) {
        e.target.style.left = pos
        this.trimLeft = pos
        console.log(e.target.getBoundingClientRect())
        this.offsetStart =
            (this.duration) *
            (this.trimLeft.slice(0, -2) / e.target.parentElement.getBoundingClientRect().right)
      } else {
        e.target.style.left = pos
        this.trimRight = pos
        console.log(e.target.getBoundingClientRect())
        this.offsetEnd =
            (this.duration) *
            (this.trimRight.slice(0, -2) / e.target.parentElement.getBoundingClientRect().right)
      }
    }
  }
}
</script>

<style scoped>
.controls {
  position: absolute;
  display: flex;
  width: 100%;
  top: 90%;
  height: 10%;
}
#progressBar {
  height: 35px;
  z-index: 5;
  width: 100%;
  align-self: center;
}
</style>
