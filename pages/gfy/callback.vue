<template>
  <div class="container">
    <!-- {{ path }} -->
  </div>
</template>

<script>
import { useContext, useAsync } from 'nuxt-composition-api'
import { onMounted, ref, computed, reactive } from '@vue/composition-api'
import axios from 'axios'
export default {
  setup () {
    const ctx = useContext()
    console.log(ctx.route.value)

    const {code, state} = ctx.query.value
    const axios = ctx.$axios
    const ip = useAsync(() => axios.get('https://www.icanhazip.com'))
    return {
      code,
      state,
      ip
    }
  },
  async asyncData ({$axios, $config, route, params}) {
    // const { code, state } = params
    // const test = params.code
    return {
      // code,
      // state,
      // test
    }
  },
  methods: {
  }
}
</script>
