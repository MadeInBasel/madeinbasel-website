module.exports = {
  head: {
    title: 'MADE IN BASEL',
    titleTemplate: '%s - MADE IN BASEL',

    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      }
    ],
    link: [
      {
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
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://cdn.firebase.com/libs/firebaseui/2.4.0/firebaseui.css'
      }
    ],
    script: [
      {
        src: '/js/uploadcare.js'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#191919'
  },

  css: [
    {
      src: '~assets/styles/app.styl',
      lang: 'styl'
    },
    {
      src: '~assets/styles/variables.scss',
      lang: 'scss'
    }
  ],

  plugins: [
    {
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
      src: '~plugins/firebase.js',
      ssr: false
    }
  ],

  modules: [
    [
      'nuxt-i18n-module',
      {
        languages: ['en', 'de']
      }
    ]
  ],

  /*
   ** Build configuration
   */
  build: {
    analyze: true,
    vendor: ['vuetify'],
    /*
     ** Run ESLINT on save
     */
    extend(config, { isClient }) {
      if (isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
