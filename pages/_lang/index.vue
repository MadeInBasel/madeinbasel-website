<template>
<div id="index">
  <style media="screen">
    #header .logo {
      display: none;
    }
  </style>
  <section class="wallpaper boundaries">
    <div v-show="!ready" class="spinner">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <transition name="transition-down">
      <img v-show="ready" class="logo" src="~assets/images/logo.svg" alt="Logo">
    </transition>
    <div class="more">
      <v-icon>expand_more</v-icon>
    </div>
  </section>

  <component-section dark>
    <h2>{{ $t('intro.heading')}}</h2>
    <div class="abstract" v-html="$t('intro.abstract', {mib: '<strong>Made in Basel</strong>'})"></div>
    <div class="text-xs-center">
      <v-btn outline dark large :to="localePath('/label')">{{ $t('buttons.learnMore') }}</v-btn>
    </div>
  </component-section>

  <component-section>
    <h2>{{ $t('members.heading')}}</h2>
    <div class="abstract" v-html="$t('members.abstract', {mib: '<strong>Made in Basel</strong>'})"></div>
    <component-members paging=8 />
    <div class="text-xs-center">
      <v-btn color="primary" large :to="localePath('/members')">{{ $t('buttons.allMembers') }}</v-btn>
    </div>
  </component-section>

</div>
</template>

<script>
import members from '~/components/members.vue'
import section from '~/components/section.vue'

export default {
  components: {
    'component-members': members,
    'component-section': section
  },
  head() {
    return {
      title: this.$t('pages.home')
    }
  },
  data() {
    return {
      ready: false
    }
  },
  mounted() {
    this.ready = true
  },
  i18n: {
    messages: {
      en: {
        intro: {
          heading: 'The Label',
          abstract: '{mib} is an initiative to promote products and services from Basel, Switzerland. We support local production and help sustain a creative climate that encourages entrepreneurship and innovation. We put Basel on the map.'
        },
        members: {
          heading: 'Discover',
          abstract: 'In Basel\'s backyards, cellars  and attics people are working on tomorrow\'s ideas and products. {mib} documents extraordinary craftsmanship and tells the story about the people behind it. We also maintain a public registry.'
        }
      },
      de: {
        intro: {
          heading: 'Das Label',
          abstract: '{mib} ist eine Initiative, die Produkte und Dienstleistungen aus Basel bewirbt. Wir fördern Innovation, Vielfalt und Unternehmergeist. Damit helfen wir, Basel als Wohn-, Arbeits- und Kulturstadt auf der Weltkarte zu verankern.'
        },
        members: {
          heading: 'Neues Entdecken',
          abstract: 'In Basels Hinterhöfen wird gebastelt, gelötet und geschraubt. In Kellern und Mansarden entstehen die Ideen von Morgen. {mib} dokumentiert Basels Schaffen anhand ausgewählter Geschichten. Es wird zudem ein Verzeichnis über Mitglieder geführt.'
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import 'index.scss';
</style>
