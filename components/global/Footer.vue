<template>
  <footer class="footer">
    <div class="container">
      <div class="columns is-mobile">
        <div class="column">
          <div class="box content">
            <h1>Contact</h1>
            <b>TrainingstageDev@gmail.com</b>
          </div>
        </div>
        <div class="column">
          <div
            v-for="(item, idx) in external_links" :key="idx"
          >
            <Social
              :icon="`icon-social-${item.label}`"
              :iconLabel="item.label"
              :link="item.site"
            />
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
import {reactive, computed} from '@vue/composition-api'

export default {
  props: {
    social: {
      type: Array,
      required: false,
      default: null
    }
  },
  setup (props) {
    const socialMedia = [
      {
        label: 'instagram',
        site: 'https://www.instagram.com/training_stage'
      },
      {
        label: 'facebook',
        site: 'https://www.facebook.com'
      },
      {
        label: 'youtube',
        site: 'https://www.youtube.com'
      }
    ]
    const external_links = reactive(computed(() => {
      return (props.social || socialMedia)
    }))
    return {
      external_links
    }
  }
}
</script>
