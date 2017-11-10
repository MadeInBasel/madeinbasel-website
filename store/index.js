import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      locales: ['en', 'de'],
      locale: 'en',
      animations: true,
      user: null
    },
    mutations: {
      SET_LANG(state, locale) {
        if (state.locales.indexOf(locale) !== -1) {
          state.locale = locale
        }
      },
      TOGGLE_ANIMATIONS(state, animations) {
        state.animations = animations
      },
      FILL_DB(state, db) {
        state.db = db
      },
      UPDATE_USER(state, user) {
        state.user = user
      }
    }
  })
}

export default createStore
