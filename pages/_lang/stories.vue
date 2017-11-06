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
        <i>{{ $t('placeholder') }}</i>
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
@import "stories.scss";
</style>
