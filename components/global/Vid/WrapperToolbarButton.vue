<template>
  <div>
    <span class="tag is-large">
      <span class="icon is-large">
        <i :class="icon" />
      </span>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    }
  }
}
</script>
