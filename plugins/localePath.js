import Vue from 'vue'

export default ({
  app,
  store
}) => {
  const pathHelper = {
    install(app, options) {
      app.mixin({
        methods: {
          localePath: function(url) {
            return '/' + store.state.locale + url
          }
        }
      })
    }
  }
  Vue.use(pathHelper)
}
