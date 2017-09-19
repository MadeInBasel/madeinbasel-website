<template>
<footer id="footer">
  <div class="footer-inner boundaries">
    <component-address />
    <component-language />
    <div class="menu" :title="$t('about')">
      <ul>
        <li v-for="item in social">
          <a :href="item.url" target="_blank" rel="noopener">{{ item.label }}</a>
        </li>
      </ul>
    </div>
  </div>
</footer>
</template>

<script>
import address from '~/components/contactAddress.vue'
import language from '~/components/language.vue'
import { social } from '~/assets/menus.js'

export default {
  components: {
    'component-address': address,
    'component-language': language
  },
  data() {
    return {
      social: social
    }
  },
  i18n: {
    messages: {
      en: {
        about: 'About'
      },
      de: {
        about: 'Über'
      }
    }
  }
}
</script>

<style lang="scss">
@import "footer.scss";
</style>
