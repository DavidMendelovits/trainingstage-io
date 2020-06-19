<template>
  <div class="container">
    <div
      v-for="(entry, idx) of entries"
      :key="idx"
      class="card"
    >
      {{ entry.title }}
      <div class="card-content">

        <div v-html="$md.render(entry.body)" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const entries = await $content('blog').fetch()

    return {
      entries
    }
  }
}
</script>
