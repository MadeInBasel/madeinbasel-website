<template>
<div id="members">
  <section>
    <div class="section-inner boundaries" v-scroll-reveal="{
    scale: 1,
    delay: 200,
    distance: '20px'
  }">
      <h1>{{ $t('pages.stories') }}</h1>
      <div class="abstract" v-html="$t('intro.abstract')"></div>
      <div class="text-xs-center">
        <i>coming soon</i>
      </div>

    </div>
  </section>
</div>
</template>

<script>
export default {
  head() {
    return {
      title: this.$t('pages.stories')
    }
  },
  i18n: {
    messages: {
      en: {
        intro: {
          abstract: 'Here you can find stories about selected products from Basel. From handicraft to industrial production - get an insight into the studios and production sites and the people working there.'
        }
      },
      de: {
        intro: {
          abstract: 'Hier findest du Geschichten zu ausgewählten Produkten aus Basel. Von Handwerk bis Industrieproduktion - erhalte Einblick in die Ateliers und Produktionsstätten und deren Verantwortlichen.'
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import "stories.scss";
</style>
