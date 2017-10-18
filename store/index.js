export const state = () => ({
  locales: ['en', 'de'],
  locale: 'en',
  user: null
})

export const mutations = {
  SET_LANG(state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  },
  UPDATE_USER(state, user) {
    state.user = user
  }
}
