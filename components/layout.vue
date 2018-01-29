<template>
<v-app id="layout" class="scrollTop scrollTopExtended" :class="{ 'no-animations': !animations, 'rainbow': hasBackgroundAnimation }" v-scroll="onScroll">
  <div class="layout-inner">
    <v-navigation-drawer id="navigation" class="pb-0" persistent temporary right height="100%" enable-resize-watcher v-model="drawer">
      <nuxt-link class="logo" :to="localePath('/')">
        <img src="~assets/images/logo.svg" alt="Logo">
      </nuxt-link>
      <v-list dense>
        <v-list-tile v-for="(item, i) in main.slice(1)" :key="i + '1'" nuxt exact v-ripple :to="localePath(`${item.path}`)">
          <v-list-tile-action>
            <v-icon class="grey--text text--darken-1">{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>
            {{ $t(`${item.label}`) }}
          </v-list-tile-title>
        </v-list-tile>
        <v-divider inset></v-divider>
        <v-list-tile v-for="(item, i) in social.slice(0, -1)" :key="i+ '2'" nuxt v-ripple :href="item.url" target="_blank" rel="noopener">
          <v-list-tile-action>
            <v-icon class="grey--text text--darken-1">launch</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>
            {{ $t(`${item.label}`) }}
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
      <app-language/>
      <v-btn class="btn-close" color="primary" v-on:click="drawer=false">{{ $t('buttons.close') }}</v-btn>
      <v-btn class="btn-close-top" small icon v-on:click="drawer=false">
        <v-icon>close</v-icon>
      </v-btn>
    </v-navigation-drawer>
    <app-header v-on:drawer="toggleNavigation" :hasBackgroundAnimation="hasBackgroundAnimation"></app-header>
    <main id="page">
      <v-content>
        <nuxt />
      </v-content>
    </main>
  </div>
  <app-footer />
</v-app>
</template>

<script>
import { main, social } from '~/assets/menus.js'
import header from '~/components/header.vue'
import footer from '~/components/footer.vue'
import language from '~/components/language.vue'
import _ from 'underscore'

export default {
  components: {
    'app-header': header,
    'app-footer': footer,
    'app-language': language
  },
  props: {
    hasBackgroundAnimation: {
      type: Boolean,
      default: false
    }
  },
  head() {
    return {
      htmlAttrs: {
        lang: this.$i18n.locale
      },
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('meta.description')
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.$t('meta.keywords')
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'website'
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: 'https://www.madeinbasel.org' + this.$route.fullPath
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: 'https://www.madeinbasel.org/images/og-image.jpg'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.$t('meta.description')
        },
        {
          hid: 'og:site_name',
          property: 'og:site_name',
          content: 'MADE IN BASEL'
        },
        {
          hid: 'og:locale',
          property: 'og:locale',
          content: this.$i18n.locale
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary'
        },
        {
          hid: 'twitter:site',
          name: 'twitter:site',
          content: '@madeinbasel'
        },
        {
          hid: 'twitter:creator',
          name: 'twitter:creator',
          content: '@stophecom'
        }
      ]
    }
  },
  data: () => ({
    drawer: false,
    main: main,
    social: social,
    offsetTop: 0
  }),
  methods: {
    toggleNavigation: function(state) {
      this.drawer = state
    },
    onScroll(e) {
      this.offsetTop = window.pageYOffset || document.documentElement.scrollTop
      var layout = this.$el
      var self = this
      _.throttle(function() {
        layout.classList.toggle('scrollTop', self.offsetTop < 10)
        layout.classList.toggle(
          'scrollTopExtended',
          self.offsetTop < window.screen.height / 4
        )
      }, 100)()
    }
  },
  computed: {
    animations() {
      return this.$store.state.animations
    }
  },
  i18n: {
    messages: {
      en: {
        meta: {
          description:
            'MADE IN BASEL is an initiative to promote products and services from Basel, Switzerland.',
          keywords:
            'MADE IN BASEL, label, local, excellence, stories, handmade, crafts, products, innovation, Basel, Switzerland'
        }
      },
      de: {
        meta: {
          description:
            'MADE IN BASEL ist eine Initiative, die Produkte und Dienstleistungen aus Basel bewirbt.',
          keywords:
            'MADE IN BASEL, Label, Kaufen, Lokal, Exzellenz, Geschichten, Handarbeit, Handwerk, Produkte, Innovation, Basel, Schweiz'
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import 'layout.scss';
</style>
