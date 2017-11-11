export default function ({isHMR, app, store, route, params, error, redirect}) {
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) {
    return
  }

  const lang = params.lang
  if (!lang) {
    const langDefault = 'en'
    return redirect(`/${langDefault}`)
  }

  if (store.state.locales.indexOf(lang) === -1) {
    return error({message: 'This page could not be found.', statusCode: 404})
  }

  store.commit('SET_LANG', lang)
  app.i18n.locale = store.state.locale
}
