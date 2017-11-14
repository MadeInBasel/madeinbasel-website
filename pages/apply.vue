<template>
<div id="apply">
  <component-section class="join">
    <h1>{{ $t('pages.apply') }}</h1>
    <div class="abstract" v-html="$t('abstract')"></div>
    <component-join v-on:success="dialog=true" />
    <small class="apply-addendum center-block"><span v-html="$t('sponsor-notice', {mib: '<strong>Made in Basel</strong>'})"></span>&nbsp; <a href="mailto:hello@madeinbasel.org">hello@madeinbasel.org</a></small>
    <v-dialog v-model="dialog" max-width="600" content-class="dialog--custom dialog--done">
      <div class="text-xs-center done">
        <v-icon color="success">check_circle</v-icon>
      </div>
      <h3>{{ $t('success.heading ')}}!</h3>
      <div class="abstract">
        {{ $t('success.abstract ')}}
      </div>
      <div class="text-xs-center">
        <div class="mb-2">
          <v-btn color="primary" href="/files/MadeInBasel-LogoPackage.zip" download="MadeInBasel-LogoPackage">
            <v-icon>file_download</v-icon> {{ $t('buttons.downloadLogoPackage') }}</v-btn>
        </div>
      </div>
      <div class="dialog-footer">
        <v-btn class="btn-close" flat small @click="dialog = false">{{ $t('buttons.close' )}}</v-btn>
      </div>
    </v-dialog>
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
      title: this.$t('pages.apply'),
      meta: [{
        hid: 'og:title',
        property: 'og:title',
        content: this.$t('pages.apply')
      }]
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
        abstract: 'Take a couple of minutes to fill out the application. The more details you provide, the more likely it is to get your membership approved. Complete profiles make it easier for others to find and contact you.',
        success: {
          heading: 'Thank You',
          abstract: 'Your application will be reviewed. We\'ll contact you in the coming days.'
        }
      },
      de: {
        abstract: 'Nimm dir ein paar Minuten Zeit um die Bewerbung auszufüllen. Ausführliche Angaben tragen zum Erfolg der Bewerbung bei. Photos und bedachte Inhalte helfen um aus der Masse hervorzutreten und von Kunden und Partnern entdeckt zu werden.',
        success: {
          heading: 'Vielen Dank',
          abstract: 'Deine Angaben werden geprüft. Wir melden uns in den nächsten Tagen bei dir.'
        }

      }
    }
  }
}
</script>

<style lang="scss">
@import 'apply.scss';
</style>
