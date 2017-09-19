<template>
<div id="header">
  <div class="header-navigation boundaries">
    <nuxt-link class="logo" :to="localePath('/')">
      <img src="~assets/images/logo-seal.svg" alt="Logo">
    </nuxt-link>
    <ul class="header-navigation-menu">
      <nuxt-link v-ripple tag="li" :to="localePath(`${main[1].path}`)">
        <a>{{ $t(`${main[1].label}`) }}</a>
      </nuxt-link>
      <li class="menu">
        <a href="javascript:;" v-ripple v-on:click.stop="openNavigation()">Menu</a>
      </li>
    </ul>
    <v-btn class="hamburger" v-on:click.stop="openNavigation()" fab role="navigation">
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
