const {resolve} = require('path')

module.exports = function (moduleOptions) {
  const defaults = {
    languages: ['en']
  }
  moduleOptions = Object.assign({}, defaults, moduleOptions)

  // Add middleware
  this.addTemplate({
    src: resolve(__dirname, './templates/middleware.js'),
    fileName: 'i18n-routes.middleware.js',
    options: moduleOptions
  })
  this.options.router.middleware.push('i18n-routes')

  // Add plugin
  this.addPlugin({
    src: resolve(__dirname, './templates/plugin.js'),
    fileName: 'i18n-routes.plugin.js',
    options: moduleOptions
  })

  // Add routes
  this.extendRoutes(function (routes) {
    routes.forEach(route => {
      const {path} = route
      route.path = `/:lang(\\w{2})${path}`
    })
    routes.push({
      path: '/',
      component: 'pages/index.vue'
    })
    return routes
  })
}
