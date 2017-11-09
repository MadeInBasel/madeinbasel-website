<template>
<footer id="footer">
  <div class="footer-inner boundaries">
    <component-address />
    <div>
      <component-language />
      <div>
        <a v-show="animations" href="javascript:;" @click="toggleAnimations(false)">{{ $t('animations.on') }}</a>
        <a v-show="!animations" href="javascript:;" @click="toggleAnimations(true)">{{ $t('animations.off') }}</a>
      </div>
    </div>

    <div class="menu" :title="$t('about')">
      <div>
        <nuxt-link :to="localePath('/admin')">
          {{ $t('pages.admin') }}
        </nuxt-link>
      </div>
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
  computed: {
    animations() {
      return this.$store.state.animations
    }
  },
  methods: {
    toggleAnimations(state) {
      this.$store.commit('TOGGLE_ANIMATIONS', state)
    }
  },
  i18n: {
    messages: {
      en: {
        about: 'About',
        animations: {
          on: 'Animations: ON',
          off: 'Animations: OFF'
        }
      },
      de: {
        about: 'Über',
        animations: {
          on: 'Animationen: AN',
          off: 'Animationen: AUS'
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import "footer.scss";
</style>
