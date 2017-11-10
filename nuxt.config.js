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
      src: '~plugins/i18n.js'
    },
    {
      src: '~plugins/localePath.js'
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
      src: '~plugins/firebase.js',
      ssr: false
    }
  ],

  router: {
    middleware: 'i18n'
  },

  /*
   ** Build configuration
   */
  build: {
    vendor: ['jquery', 'vuetify', 'underscore', 'vue-loading-spinner', 'vue-scroll-reveal'],
    /*
     ** Run ESLINT on save
     */
    extend(config, ctx) {
      config.devtool = false

      if (ctx.isClient) {
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
    routes: ['/', '/de', '/admin', 'de/admin', '/stories', 'de/stories', '/join', '/de/join', '/label', '/de/label', '/members', '/de/members', '/about', '/de/about']
  }
}
