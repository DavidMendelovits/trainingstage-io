<template>
  <div class="main">
    <article class="message">
      <div class="message-header">
        <p>
          {{ h }}
        </p>
      </div>
      <div class="message-body">
        {{ b }}
      </div>
    </article>
  </div>
</template>

<script>
export default {
  props: {
    header: {
      type: String,
      default: 'Header'
    },
    body: {
      type: String,
      default: 'body'
    }
  },
  setup (props) {
    const h = props.header
    const b = props.body

    return {
      h,
      b
    }
  }
}
</script>
