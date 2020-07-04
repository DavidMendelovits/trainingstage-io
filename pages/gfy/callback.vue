<template>
  <div class="container">
    {{ path }}
  </div>
</template>

<script>
import { useContext } from 'nuxt-composition-api'
import { onMounted, ref, computed, reactive } from '@vue/composition-api'
export default {
  setup () {
    const {route} = useContext()
    console.log(route)
    const path = ref(computed(() => {
      return route.value.fullPath
    }))
    return {
      route,
      path
    }
  }
}
</script>
