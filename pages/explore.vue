<template>
<div id="explore">
  <component-section>
    <h1>{{ $t('pages.explore') }}</h1>
    <div class="abstract" v-html="$t('intro.abstract', {icon: '♥'})"></div>
    <component-members />
    <div class="text-xs-center">
      <component-newsletter />
    </div>
  </component-section>

  <component-section small dark>
    {{ $t('memberQuestion') }}
    <nuxt-link :to="localePath('/apply')">{{ $t('buttons.applyNow') }}</nuxt-link>
  </component-section>
</div>
</template>

<script>
import componentMembers from '~/components/members.vue'
import componentSection from '~/components/section.vue'
import componentNewsletter from '~/components/newsletter.vue'

export default {
  head() {
    return {
      title: this.$t('pages.explore'),
      meta: [{
        hid: 'og:title',
        property: 'og:title',
        content: this.$t('pages.explore')
      }]
    }
  },
  components: {
    componentMembers,
    componentSection,
    componentNewsletter
  },
  i18n: {
    messages: {
      en: {
        intro: {
          abstract: 'Below you will find the complete list of our members. Selected members have stories attached and are marked with a {icon}.'
        }
      },
      de: {
        intro: {
          abstract: 'Im Folgenden findest du das vollständige Verzeichnis der eingetragenen Mitglieder. Ausgewählte Produzenten werden von uns persönlich porträtiert und sind mit einem {icon} gekennzeichnet.'
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import "explore.scss";
</style>
