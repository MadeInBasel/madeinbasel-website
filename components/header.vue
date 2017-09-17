<template>
<div id="header">
  <div class="header-background"></div>
  <div class="header-navigation boundaries">
    <nuxt-link v-ripple class="logo" alt="Home Page" :to="localePath('/')">
      Logo
      </svg>
    </nuxt-link>
    <ul class="header-navigation-menu">
      <nuxt-link v-for="(item, index) in main" key="index" v-if="index !== 0" v-ripple tag="li" :to="localePath(`${item.path}`)">
        <a>{{ $t(`${item.label}`) }}</a>
      </nuxt-link>
    </ul>
    <v-btn class="hamburger" v-on:click.stop="openNavigation()" fab flat dark role="navigation">
      <v-icon>menu</v-icon>
    </v-btn>
  </div>
</div>
</template>

<script>
import { main } from '~/assets/menus.js'

export default {
  data() {
    return {
      main: main,
      openNavigation: function () {
        this.$emit('drawer', true)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "header.scss";
</style>
le>
