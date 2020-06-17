<template>
  <div>
    <div
      class="card"
      v-for="(blogPost, idx) in blogPosts"
      :key="idx"
    >
      <h1>
        {{ blogPost.title }}
      </h1>
      <h2>
        <nuxt-link :to="`blog/${blogPost.slug}`">
        {{ blogPost.slug }}
        </nuxt-link>
      </h2>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    blogPosts () {
      return this.$store.state.blogPosts
    }
  }
}
</script>
