<template>
<div id="stories">
  <component-section>
    <h1>{{ $t('pages.stories') }}</h1>
    <div class="abstract" v-html="$t('intro.abstract')"></div>
    <component-members storiesOnly />
  </component-section>
</div>
</template>

<script>
import section from '~/components/section.vue'
import componentMembers from '~/components/members.vue'

export default {
  head() {
    return {
      title: this.$t('pages.stories'),
      meta: [{
        hid: 'og:title',
        property: 'og:title',
        content: this.$t('pages.stories')
      }]
    }
  },
  components: {
    'component-section': section,
    componentMembers
  },
  i18n: {
    messages: {
      en: {
        intro: {
          abstract: 'Here you\'ll find stories about selected products from Basel. From handicraft to industrial production - get an insight into the studios and production sites and get to know the people behind the products.'
        }
      },
      de: {
        intro: {
          abstract: 'Hier findest du Geschichten zu ausgewählten Produzenten aus Basel. Vom Handwerk zur Industrieproduktion - erhalte Einblick in die Ateliers und Produktionsstätten und lerne die Menschen hinter den Produkten kennen.'
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import "index.scss";
</style>
