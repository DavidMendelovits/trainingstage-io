<template>
  <div class="content">
    <nuxt-content :document="post" />
  </div>
</template>

<script>
export default {
  async asyncData ({ params, $content }) {
    const post = await $content(`blog/${params.slug}`).fetch()
    console.log(post)
    return {
      post
    }
  }
}
</script>
