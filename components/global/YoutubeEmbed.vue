<template>
  <div class="content">
    <!-- <youtube :video-id="vidId" ref="youtube"></youtube> -->
    <youtube
      :video-id="vidId"
      ref="youtube"
    >
    </youtube>
    <button class="button" @click="play">
      Click meee
    </button>
  </div>
</template>
<script>
export default {
  props: {
    link: {
      default: 'https://youtu.be/oHg5SJYRHA0',
      type: String
    }
  },
  data () {
    return {
      isPlaying: false
    }
  },
  computed: {
    vidId () {
      return this.getID()
    }
  },
  methods: {
    getID () {
      return this.$youtube.getIdFromUrl('https://www.youtube.com/watch?v=fbzU6lcXT34')
    },
    play () {
      console.log(this.$refs.player)
      this.$refs.youtube.player.playVideo()
    },
    pause () {
      this.$refs.youtube.player.pauseVideo()
    }
  }
}
</script>

<style scoped>
.content {
  display: flex;
  contain: strict;
}
iframe {
  width: 100%;
  max-width: 650px;
}

</style>
