<template>
<div id="index">
  <section class="wallpaper">
    <img class="logo" src="~assets/images/logo.svg" alt="Logo">
  </section>
</div>
</template>

<script>
import { TimelineMax, Linear } from 'gsap'

export default {
  components: {},
  scrollToTop: true,
  head() {
    return {
      title: this.$t('pages.home')
    }
  },
  mounted() {
    var index = document.querySelector('#index')
    var bg = new TimelineMax({ repeat: -1 })

    bg.to(index, 5, { backgroundColor: '#00ffff', ease: Linear.easeNone })
      .to(index, 5, { backgroundColor: '#ff9eff', ease: Linear.easeNone })
      .to(index, 5, { backgroundColor: '#78ffcc', ease: Linear.easeNone })
  },
  i18n: {
    messages: {
      en: {

      },
      de: {}
    }
  }
}
</script>

<style lang="scss">
@import 'index.scss';
</style>
