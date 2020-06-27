<template>
  <div class="container">
    <div class="content" id="container">
      <v-embed :options="options">
        {{ source }}
      </v-embed>
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
</style>
