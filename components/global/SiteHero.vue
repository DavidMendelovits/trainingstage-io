<template>
  <div class="hero is-primary has-background">
    <img alt="Fill Murray" class="hero-background is-transparent" src="/brand.png" />
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          Training Stage
        </h1>
        <h3 class="subtitle">
          Train Like the World is Watching
        </h3>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero.has-background {
  position: relative;
  overflow: hidden;
}
.hero-background {
  position: absolute;
  object-fit: cover;
  object-position: center center;
  width: 100%;
  height: 100%;
}
.hero-background.is-transparent {
  opacity: 0.3;
}
</style>
