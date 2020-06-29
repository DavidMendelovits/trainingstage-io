<template>
  <div :class="`modal ${promptStatus}`">
    <div class="modal-background" @click="exit" />
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Link or Upload a video</p>
        <button class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <WrapperInputForm v-on:submitted="getInput"/>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success">Save changes</button>
        <button class="button">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    promptStatus () {
      return (this.$store.state.inputModal)
      ? 'is-active'
      : ''
    }
  },
  methods: {
    exit (e) {
      console.log('touchBackground()', e)
      this.$store.commit('TOGGLE_INPUT')
    },
    getInput (data) {
      console.log('getInput()', data)
      this.$emit('input', data)
      this.exit()
    }
  }
}
</script>
