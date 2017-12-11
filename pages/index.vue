<template>
<div id="index" :class="{ready: ready}">
  <section class="wallpaper boundaries">
    <div>
      <div class="logo">
        <img class="logo-brandmark" src="~assets/images/logo-brandmark.svg" alt="Logo">
        <img class="logo-logotype" src="~assets/images/logo-logotype.svg" alt="Logo">
      </div>

      <div class="claim">{{ $t('claim') }}</div>
    </div>

    <div class="more">
      <v-icon>expand_more</v-icon>
    </div>
  </section>

  <component-section dark>
    <h2>{{ $t('intro.heading')}}</h2>
    <div class="abstract" v-html="$t('intro.abstract', {mib: '<strong>MADE IN BASEL</strong>'})"></div>
    <div class="text-xs-center">
      <v-btn outline dark large :to="localePath('/label')">{{ $t('buttons.learnMore') }}</v-btn>
    </div>
  </component-section>

  <component-section class="discover">
    <h2>{{ $t('members.heading')}}</h2>
    <div class="abstract" v-html="$t('members.abstract', {mib: '<strong>MADE IN BASEL</strong>'})"></div>

    <component-members paging=3 storiesOnly />
    <div class="text-xs-center">
      <v-btn color="primary" large :to="localePath('/explore')">{{ $t('buttons.allMembers') }}</v-btn>
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
      title: this.$t('pages.home'),
      meta: [{
        hid: 'og:title',
        property: 'og:title',
        content: this.$t('pages.home')
      }]
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
        claim: 'The source of local excellence',
        intro: {
          heading: 'The Label',
          abstract: '{mib} is an initiative to promote products and services from Basel, Switzerland. We support local production and help sustain a creative climate that encourages entrepreneurship and innovation. We put Basel on the map.'
        },
        members: {
          heading: 'Discover',
          abstract: 'In Basel\'s backyards, cellars  and attics people are working on tomorrow\'s ideas and products. {mib} documents extraordinary craftsmanship and tells the story about the people behind it.',
          subheading: 'Members'
        }
      },
      de: {
        claim: 'Erlesenes aus der Nachbarschaft',
        intro: {
          heading: 'Das Label',
          abstract: '{mib} ist eine Initiative, die Produkte und Dienstleistungen aus Basel bewirbt. Wir fördern Innovation, Vielfalt und Unternehmergeist. Damit helfen wir, Basel als Wohn-, Arbeits- und Kulturstadt auf der Weltkarte zu verankern.'
        },
        members: {
          heading: 'Neues Entdecken',
          abstract: 'In Basels Hinterhöfen wird gebastelt, gelötet und geschraubt. In Kellern und Mansarden entstehen die Ideen von Morgen. {mib} dokumentiert Basels Schaffen anhand ausgewählter Geschichten.',
          subheading: 'Mitglieder'
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import 'index.scss';
</style>
