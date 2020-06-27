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
        <div class="level-item tag is-large">
          <button class="button">
            <span class="icon" v-on:click="toggleSplit">
              <i v-show="!this.split" class="icon-frame" />
              <i class="icon-frame" />
            </span>
          </button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data () {
    return {
      split: false,
      frame: 'icon-frame',
      split: false
    }
  },
  methods: {
    promptUserInput () {
      console.log('promptUserInput()')
      this.$emit('paperclick')
    },
    toggleSplit () {
      if (!(this.split = !this.split)) {
      }
    },
  }
}
</script>
