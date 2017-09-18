<template>
<div id="header">
  <div class="header-navigation boundaries">
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
