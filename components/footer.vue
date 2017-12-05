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
      <div>
        <nuxt-link :to="localePath('/admin')">
          {{ $t('pages.admin') }}
        </nuxt-link>
        <component-newsletter link />
      </div>
    </div>

    <div class="menu" :title="$t('about')">
      <component-socialMenu />
    </div>
  </div>
</footer>
</template>

<script>
import address from '~/components/contactAddress.vue'
import language from '~/components/language.vue'
import socialMenu from '~/components/socialMenu.vue'
import componentNewsletter from '~/components/newsletter.vue'

export default {
  components: {
    'component-address': address,
    'component-language': language,
    'component-socialMenu': socialMenu,
    componentNewsletter
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
