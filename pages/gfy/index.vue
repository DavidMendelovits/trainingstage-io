<template>
  <div class="container">
    <h1>
      {{ this.$auth.loggedIn}}
    </h1>
    <a :href="gfyAuthLink">clck here</a>
  </div>
</template>

<script>
import { useContext } from 'nuxt-composition-api'
import { onMounted, ref, computed, reactive } from '@vue/composition-api'

export default {
  props: {

  },
  setup (props) {
    console.log('setup')
    const makeLink = (baseURL, clientID, state, redirect) => {
      const scope = '&scope=all'
      const responseType = '&response_type=code'
      return `${baseURL}${clientID}${scope}${state}${responseType}${redirect}`
    }
    const ctx = useContext()
    console.log(ctx)
    const c_id = ctx.$config.client_id
    console.log(c_id)
    const redirect = 'http%3A%2F%2Flocalhost%3A3000%2Fgfy%2Fcallback'
    const gfyAuthLink
      = makeLink('https://gfycat.com/oauth/authorize', `?client_id=${c_id}`, '&state=testing123', `&redirect_uri=${redirect}`)

    // console.log(ctx)

    const route = ctx.route
    console.log(route)
    const hash = ref(route.hash)
    console.log(hash.value)

    return {
      gfyAuthLink,
      route,
      hash
    }
  },
  async asyncData ({ params, query, route, $auth }) {
    console.log('asyncDATA')
    console.log('route', await route)
    return {
    }
  }
}
</script>
