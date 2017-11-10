<template>
<section class="section" :class="{'section--dark': dark, 'section--small': small}">
  <div v-if="dark && !small" class="wave wave-top"></div>
  <div class="section-inner">
    <div class="boundaries" v-scroll-reveal="{
    scale: 1,
    delay: 200,
    distance: '20px'
  }">
      <slot></slot>
    </div>
  </div>
  <div v-if="dark && !small &&!hideBottomWave" class="wave wave-bottom"></div>
</section>
</template>

<script>
export default {
  props: {
    dark: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    hideBottomWave: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
@import "section.scss";
</style>
