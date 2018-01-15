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
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.$t('pages.explore')
        }
      ]
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
          abstract:
            "From handicrafts, culinary delights to curiosities - get an insight into the multifaceted creativity of Basel's neighbourhoods and get to know the people behind the products."
        }
      },
      de: {
        intro: {
          abstract:
            'Von Kunsthandwerk, über Kulinarisches bis zu Kuriositäten - erhalte Einblick in das vielfältige Schaffen aus Basels Quartieren und lerne die Menschen hinter den Produkten kennen.'
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import 'explore.scss';
</style>
