<template>
  <div>
    <nav class="navbar has-shadow  is-transparent" role="navigation" aria-label="main navigation">
      <div class="navbar-brand dense">
        <nuxt-link class="navbar-item" to="/">
          <img id="brand-item" src="/brand.png">
        </nuxt-link>
        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          :class="{'is-active': isOpen}"
          @click="isOpen = !isOpen"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
        </div>
        <div
          class="navbar-menu"
          :class="{'is-active': isOpen}"
        >
        <div class="columns" @click="isOpen = !isOpen">
          <nuxt-link to="/" class="navbar-item column">Home</nuxt-link>
          <nuxt-link to="/blog" class="navbar-item column">Blog</nuxt-link>
          <nuxt-link to="/content" class="navbar-item column">Something Else</nuxt-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isOpen: false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
