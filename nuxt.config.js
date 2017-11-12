const webpack = require('webpack')

module.exports = {
  head: {
    title: 'Made in Basel',
    titleTemplate: '%s - Made in Basel',
    meta: [{
      charset: 'utf-8'
    },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Made in Basel - is an initiative to promote products and services from Basel, Switzerland. We support local production and help sustain a creative climate that encourages entrepreneurship and innovation. We put Basel on the map.'
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: 'Made in Basel, label, local, stories, handmade, crafts, products, innovation, Basel, Switzerland'
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    },
      {
        rel: 'apple-touch-icon',
        href: '/apple-touch-icon.png'
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://cdn.firebase.com/libs/firebaseui/2.4.0/firebaseui.css'
      }
    ],
    script: [{
      src: '/js/uploadcare.js'
    }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#191919'
  },

  css: [{
    src: '~assets/styles/app.styl',
    lang: 'styl'
  },
    {
      src: '~assets/styles/variables.scss',
      lang: 'scss'
    }
  ],

  plugins: [{
    src: '~plugins/vuetify.js'
  },
    {
      src: '~plugins/ga.js',
      ssr: false
    },
    {
      src: '~plugins/webFontLoader.js',
      ssr: false
    },
    {
      src: '~plugins/vueScrollReveal.js',
      ssr: false
    },
    {
      src: '~plugins/vue-esc.js',
      ssr: false
    },
    {
      src: '~plugins/firebase.js',
      ssr: false
    }
  ],

  modules: [
    ['~/modules/i18n-routes/index', {languages: ['en', 'de']}]
  ],

  /*
   ** Build configuration
   */
  build: {
    vendor: ['jquery', 'vuetify', 'underscore', 'vue-loading-spinner', 'vue-scroll-reveal'],
    /*
     ** Run ESLINT on save
     */
    extend (config, ctx) {
      if (ctx.client) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },

  generate: {
    routes: ['/en', '/de', '/en/admin', '/de/admin', '/en/stories', '/de/stories', '/en/apply', '/de/apply', '/en/label', '/de/label', '/en/explore', '/de/explore', '/en/about', '/de/about']
  }
}
