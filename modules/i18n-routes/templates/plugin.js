import Vue from 'vue'
import VueI18n from 'vue-i18n'
import './i18n-routes.middleware'

Vue.use(VueI18n)

export default ({app, store}) => {
  registerStoreModule(store, 'i18n-routes', {
    namespaced: true,
    state: () => ({
      language: null
    }),
    mutations: {
      setLanguage (state, language) {
        state.language = language
        app.i18n.locale = language
      }
    }
  })

  let messages = {}
  options.languages.forEach((lang) => {
    messages[lang] = require('~/assets/locale/' + lang + '.json')
  })
  app.i18n = new VueI18n({
    locale: store.state['i18n-routes'].language,
    fallbackLocale: options.languages[0],
    messages: messages,
    silentTranslationWarn: true
  })

  const localePathHelper = {
    install (app, options) {
      app.mixin({
        methods: {
          localePath: function (url) {
            return '/' + store.state['i18n-routes'].language + url
          }
        }
      })
    }
  }
  Vue.use(localePathHelper)
}

function registerStoreModule (store, name, definition) {
  // See https://github.com/vuejs/vuex/issues/789#issuecomment-305241136
  if (store.state[name]) {
    const currentState = store.state[name]
    const moduleState = definition.state
    definition.state = () => {
      definition.state = moduleState
      return currentState
    }
  }
  store.registerModule(name, definition)
}

const options = <%= serialize(options) %>
