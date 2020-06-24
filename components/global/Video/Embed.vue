<template>
  <div class="embed columns">
    <div class="column" id="container">
      <v-embed :options="options">
        {{ source }}
      </v-embed>
      <div @click="handleClick" class="is-overlay is-clipped" id="control">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: String
  },
  data () {
    return {
      options: {
        plugins: [
          {
            name: 'noembed',
            options: {
            }
          }
        ],
      },
    }
  },
  computed: {
    source () {
      return this.value
    }
  },
  methods: {
    handleClick (e) {
      console.log('handling click...', e)
      console.log(e.target.parentElement)
    }
  }
}
</script>

<style scoped>
#container {
  position: relative;
}
#control {
  position: absolute;
  top: 0px;
  left: 0px;
  height: 80%;
  z-index: 10;
}
</style>
