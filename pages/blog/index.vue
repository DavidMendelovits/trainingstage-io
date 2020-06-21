<template>
  <div>
    <div
      class="card"
      v-for="(post, idx) of posts"
      :key="idx"
    >
      <nuxt-link :to="{ path: `blog/${post.slug}` }">
      {{ post.slug }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ $content }) {
    const posts = await $content('posts').fetch()
    return {
      posts
    }
  }
}
</script>
