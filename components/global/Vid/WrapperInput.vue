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
import { useContext } from 'nuxt-composition-api'
import { ref, computed, reactive } from '@vue/composition-api'

export default {
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const { store } = useContext()
    const promptStatus = computed(() => {
      return (store.state.inputModal)
      ? 'is-active'
      : ''
    })
    const exit = (e) => {
      store.commit('TOGGLE_INPUT')
    }
    const getInput = (data) => {
      emit('input', data)
      exit()
    }
    return {
      promptStatus,
      exit,
      getInput
    }
  }
}
</script>
