const webpack = require('webpack')

module.exports = {
  /*
   ** Headers of the page
   */
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
        content: 'Made in Basel'
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: 'Made in Basel'
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
    script: [
      { src: '/js/uploadcare.js' },
    ]
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
      src: '~plugins/vueSmoothScroll.js'
    },
    {
      src: '~plugins/VueScrollReveal.js',
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
    vendor: ['jquery', 'vuetify', 'underscore', 'vue-loading-spinner', 'vue-smooth-scroll', 'vue-scroll-reveal'],
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
    routes: ['/', '/de', '/admin', 'de/admin', '/contact', '/de/contact', '/join', '/de/join', '/label', '/de/label', '/members', '/de/members', '/terms', '/de/terms']
  }
}
