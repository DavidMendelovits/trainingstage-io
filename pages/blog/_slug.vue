<template>
  <div class="content">
    <nuxt-content :document="`${$md.render(post.body).body}`" />
  </div>
</template>

<script>
export default {
  async asyncData ({ app, params, $content }) {
    const post = await $content(`blog/${params.slug}`).fetch()
    const sample = await $content('blog/postsecond').fetch()
    console.log(post, post.body, sample)
    const md = app.$md.parse(post.body)
    return {
      post,
      md,
      sample
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
