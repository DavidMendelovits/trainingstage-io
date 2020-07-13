<template>
  <div class="">
    <div class="columns">
      <div class="column">
        <Wrap />
      </div>
      <div v-if="split" class="column">
        <Wrapper />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, reactive } from '@vue/composition-api'
import { useContext } from 'nuxt-composition-api'
export default {
  setup () {
    const { store } = useContext()
    let userIn = ref(computed(() => {
      return store.state.userVideo[0]
    }))

    let split = reactive(computed(() => {
      return store.state.split
    }))

    return {
      split: split,
      userIn
    }
  }
}
</script>
