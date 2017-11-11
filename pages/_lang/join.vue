<template>
<div id="join">
  <component-section class="join">
    <h1>{{ $t('pages.join') }}</h1>
    <div class="abstract" v-html="$t('abstract')"></div>
    <component-join v-on:success="dialog=true" />
    <small class="join-addendum center-block"><span v-html="$t('free-notice', {mib: '<strong>Made in Basel</strong>'})"></span>&nbsp; <a href="mailto:hello@madeinbasel.org">hello@madeinbasel.org</a></small>
    <v-dialog v-model="dialog" max-width="600" content-class="dialog--custom dialog--done">
      <div class="dialog-content">
        <div class="text-xs-center done">
          <v-icon color="success">check_circle</v-icon>
        </div>
        <h3>{{ $t('success.heading ')}}!</h3>
        <div class="abstract">
          {{ $t('success.abstract ')}}
        </div>
        <div class="text-xs-center">
          <a href="https://twitter.com/madeinbasel" target="_blank">Follow @madeinbasel</a>
        </div>
      </div>
      <div class="dialog-footer">
        <v-btn small flat class="btn-close" @click="dialog = false">{{ $t('buttons.close' )}}</v-btn>
      </div>
    </v-dialog>
  </component-section>
  <component-section dark hideBottomWave>
    <h2>{{ $t('download.heading')}}</h2>
    <div class="abstract" v-html="$t('download.abstract', {mib: '<strong>Made in Basel</strong>'})"></div>
    <div class="text-xs-center">
      <v-btn outline dark large href="/files/MadeInBasel-LogoPackage.zip" download="MadeInBasel-LogoPackage">
        <v-icon>file_download</v-icon> {{ $t('buttons.downloadLogoPackage') }}</v-btn>
    </div>
  </component-section>
</div>
</template>

<script>
import join from '~/components/joinForm.vue'
import section from '~/components/section.vue'

export default {
  components: {
    'component-join': join,
    'component-section': section
  },
  head() {
    return {
      title: this.$t('pages.join')
    }
  },
  data() {
    return {
      dialog: false
    }
  },
  i18n: {
    messages: {
      en: {
        abstract: 'It takes only 2 minutes to participate and the membership is free*. The more details you provide, the easier it is for others to find you.',
        download: {
          heading: 'Downloads',
          abstract: 'Download the {mib} label files for your marketing purposes. We\'d be happy if our logo finds a place on your website!'
        },
        success: {
          heading: 'Congratulations',
          abstract: 'Your data will be checked and your listing will be activated within the next days.'
        }
      },
      de: {
        abstract: 'Nimm dir 2 Minuten Zeit um mitzumachen. Die Mitgliedschaft ist kostenlos*. Ausführliche Angaben helfen, um aus der Masse hervorzutreten und von Kunden und Partnern entdeckt zu werden.',
        download: {
          heading: 'Downloads',
          abstract: 'Lade die {mib}-Logo-Dateien zur freien Verwendung herunter. Wir freuen uns, wenn unser Logo einen Platz auf deiner Webseite findet!'
        },
        success: {
          heading: 'Gratulation',
          abstract: 'Deine Angaben werden geprüft und in den nächsten Tagen freigeschaltet.'
        }

      }
    }
  }
}
</script>

<style lang="scss">
@import 'join.scss';
</style>
