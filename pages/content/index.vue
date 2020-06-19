<template>
  <div class="container">
    <pre>
      {{ entry }}
    </pre>
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const entry = await $content('tutorials').fetch()

    return {
      entry
    }
  }
}
</script>
