<template>
<div id="join">
  <section class="join" v-scroll-reveal="{
    scale: 1,
    delay: 200,
    distance: '20px'
  }">
    <div class="section-inner boundaries">
      <h1>{{ $t('pages.join') }}</h1>
      <div class="abstract" v-html="$t('abstract')"></div>

      <component-join />
    </div>
  </section>
  <section class="section--dark">
    <div class="wave wave-top"></div>
    <div class="section-inner">
      <div class="boundaries" v-scroll-reveal="{
  scale: 1,
  delay: 200,
  distance: '20px'
}">
        <h2>{{ $t('download.heading')}}</h2>
        <div class="abstract" v-html="$t('download.abstract')"></div>
        <div class="text-xs-center">
          <v-btn outline dark large href="/files/MadeInBasel-LogoPackage.zip" download="MadeInBasel-LogoPackage">
            <v-icon>file_download</v-icon> {{ $t('buttons.downloadLogoPackage') }}</v-btn>
        </div>
      </div>
    </div>
  </section>
</div>
</template>

<script>
import join from '~/components/joinForm.vue'

export default {
  components: {
    'component-join': join
  },
  head() {
    return {
      title: this.$t('pages.join')
    }
  },
  data() {
    return {

    }
  },
  methods: {

  },
  computed: {

  },
  i18n: {
    messages: {
      en: {
        abstract: 'It takes only 2 minutes and the membership is free. Want to tell your story? Make sure to set the option in step 2.',
        download: {
          heading: 'Downloads',
          abstract: 'Download the label files for your marketing purposes.'
        }
      },
      de: {
        abstract: 'Nimm dir 2 Minuten Zeit um mitzumachen. Die Mitgliedschaft ist kostenlos. Möchtest du ein persönliches Portrait? Wähle die Option in Schritt 2 und wir melden uns bei dir.',
        download: {
          heading: 'Downloads',
          abstract: 'Lade die Logo-Dateien zur freien Verwendung herunter.'
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import 'join.scss';
</style>
