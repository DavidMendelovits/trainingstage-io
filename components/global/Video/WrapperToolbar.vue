<template>
  <div class="card">
    <nav class="level is-mobile">
      <div class="level-left">
        <div class="level-item">
          <WrapperToolbarButton icon="icon-rocket" />
        </div>
        <div class="level-item">
          <WrapperToolbarButton icon="icon-reload" />
        </div>
        <div class="level-item" @click="promptUserInput">
          <WrapperToolbarButton icon="icon-paper-clip" />
        </div>
      </div>
      <div class="level-right">
        right
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data () {
    return {
      split: false
    }
  },
  methods: {
    promptUserInput () {
      console.log('promptUserInput()')
      this.$emit('paperclick')
    }
  }
}
</script>
