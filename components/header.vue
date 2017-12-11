<template>
<div id="header">
  <div class="header-navigation boundaries">
    <nuxt-link v-if="user" class="user" :to="localePath('/admin')">
      {{ user.isAdmin ? '★' : '' }} {{ user.displayName ? user.displayName : user.email }}
    </nuxt-link>
    <nuxt-link v-show="$route.name != 'index'" class="logo" :to="localePath('/')">
      <img src="~assets/images/logo-brandmark.svg" alt="Logo">
    </nuxt-link>
    <ul class="header-navigation-menu">
      <nuxt-link v-ripple tag="li" :to="localePath(`${main[2].path}`)">
        <a>{{ $t(`${main[2].label}`) }}</a>
      </nuxt-link>
      <li class="menu">
        <a href="javascript:;" v-ripple v-on:click.stop="openNavigation()">Menu</a>
      </li>
    </ul>
    <v-btn class="hamburger" :class="{'rainbow': hasBackgroundAnimation}" v-on:click.stop="openNavigation()" fab role="navigation">
      <v-icon>menu</v-icon>
    </v-btn>
  </div>
</div>
</template>

<script>
import { main } from '~/assets/menus.js'

export default {
  props: {
    hasBackgroundAnimation: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      main: main,
      openNavigation: function () {
        this.$emit('drawer', true)
      }
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  }
}
</script>

<style lang="scss" scoped>
@import "header.scss";
</style>
le>
