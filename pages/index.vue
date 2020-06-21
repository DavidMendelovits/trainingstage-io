<template>
  <div>
    <SiteHero />
    <Stage />
    <!-- <InstaEmbed hideCaption url="https://www.instagram.com/p/CBWIdLoHplg/" /> -->
    <YoutubeEmbed />
    </div>
</template>

<script>
export default {
  head () {
    return {
      script: [{ src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }]
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style scoped>

.image {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  opacity: 30%;
}
.content {
  position: absolute;
  z-index: 1;
}
.card {
  position: relative;
  width: 100%;
}
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
