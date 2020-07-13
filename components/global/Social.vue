<template>
  <a class="social" :href="link">
    <span class="icon is-medium">
      <i :class="icon">
      </i>
    </span>
    <span class="tag">
      {{ iconLabel }}
    </span>
  </a>
</template>

<script>
export default {
  props: {
    icon: {
      required: true
    },
    iconLabel: {
      required: true
    },
    link: {
      required: true
    }
  },
  setup (props) {

  }
}
</script>
