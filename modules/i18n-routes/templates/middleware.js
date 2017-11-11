import middleware from './middleware'

middleware['i18n-routes'] = function ({isHMR, app, store, route, params, error, redirect}) {
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) {
    return
  }

  const lang = params.lang
  if (!lang) {
    return redirect('/' + options.languages[0])
  }

  if (options.languages.indexOf(lang) === -1) {
    return error({message: 'This page could not be found.', statusCode: 404})
  }

  store.commit('i18n-routes/setLanguage', lang)
}

const options = <%= serialize(options) %>
