import Vue from 'vue'
import VueScrollReveal from 'vue-scroll-reveal'

Vue.use(VueScrollReveal)

export default ({
  app
}) => {
  const config = {
    install(app, options) {
      app.prototype.$vueScrollRevealConfig = {
        scale: 1,
        delay: 200,
        distance: '20px'
      }
    }
  }
  Vue.use(config)
}
