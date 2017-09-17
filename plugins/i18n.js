import Vue from 'vue'
import VueI18n from 'vue-i18n'
import EN from '~/assets/locale/en.json'
import DE from '~/assets/locale/de.json'

Vue.use(VueI18n)

export default ({ app, isClient, store }) => {
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  app.i18n = new VueI18n({
    locale: store.state.locale,
    fallbackLocale: 'en',
    messages: {
      en: EN,
      de: DE
    },
    silentTranslationWarn: true
  })
}
