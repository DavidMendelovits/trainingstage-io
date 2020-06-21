<template>
  <div class="content">
    <nuxt-content :document="post" />
  </div>
</template>

<script>
export default {
  async asyncData ({ app, params, $content }) {
    const post = await $content(`posts/${params.slug}`).fetch()
    return {
      post
    }
  },
  computed: {
  }
}
</script>

<style>
.nuxt-content {
  overflow: scroll;
}
</style>
