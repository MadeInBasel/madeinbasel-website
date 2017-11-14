<template>
<div class="component-socialMenu">
  <ul>
    <li v-for="(item, i) in social" :key="i" :class="item.label.toLowerCase()">
      <a :href="item.url" target="_blank" rel="noopener">{{ $t(item.label) }}</a>
    </li>
  </ul>
</div>
</template>

<script>
import { social } from '~/assets/menus.js'

export default {
  data() {
    return {
      social: social
    }
  }
}
</script>

<style lang="scss">
@import "socialMenu.scss";
</style>
