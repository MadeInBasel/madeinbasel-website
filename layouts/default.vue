<template>
<v-app id="layout" class="scrollTop scrollTopExtendend">
  <app-header v-on:drawer="toggleNavigation"></app-header>
  <v-navigation-drawer id="navigation" class="pb-0" persistent temporary right height="100%" enable-resize-watcher v-model="drawer">
    <nuxt-link class="emblem" :to="localePath('/')">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 353">
        <title>emblem</title>
        <rect x="199.62" y="213.56" width="121.69" height="121.69" />
        <polygon points="127.28 335.25 174.9 335.25 174.9 91.83 127.28 141.22 127.28 335.25" />
        <polygon points="127.28 17.75 127.28 116.53 174.9 67.14 174.9 17.75 127.28 17.75" />
        <path d="M65.56,188.48,28.7,213.74V335.25H53.37V300a12.19,12.19,0,0,1,12.19-12.19h0A12.19,12.19,0,0,1,77.75,300v35.28h24.67V213.74Z" />
      </svg>
    </nuxt-link>
    <v-list dense>
      <v-list-tile nuxt exact v-ripple :to="localePath(`${main[0].path}`)">
        <v-list-tile-action>
          <v-icon class="grey--text text--darken-1">{{ main[0].icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>
          {{ $t(`${main[0].label}`) }}
        </v-list-tile-title>
      </v-list-tile>
      <v-list-tile v-for="(item, i) in main.slice(1)" :key="i" nuxt v-ripple :to="localePath(`${item.path}`)">
        <v-list-tile-action>
          <v-icon class="grey--text text--darken-1">{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>
          {{ $t(`${item.label}`) }}
        </v-list-tile-title>
      </v-list-tile>
      <v-divider inset></v-divider>
      <v-list-tile v-for="(item, i) in about" :key="i" nuxt v-ripple :to="localePath(`${item.path}`)">
        <v-list-tile-action>
          <v-icon class="grey--text text--darken-1">{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>
          {{ $t(`${item.label}`) }}
        </v-list-tile-title>
      </v-list-tile>
      <v-divider inset></v-divider>
      <v-list-tile v-for="(item, i) in social" :key="i" nuxt v-ripple :href="item.url" target="_blank" rel="noopener">
        <v-list-tile-action>
          <v-icon class="grey--text text--darken-1">launch</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>
          {{ $t(`${item.label}`) }}
        </v-list-tile-title>
      </v-list-tile>
    </v-list>
    <app-language/>
    <v-btn class="btn-close" primary v-on:click="drawer=false">{{ $t('buttons.close') }}</v-btn>
  </v-navigation-drawer>
  <div id="page">
    <nuxt />
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
import $ from 'jquery'

export default {
  components: {
    'app-header': header,
    'app-footer': footer,
    'app-language': language
  },
  data: () => ({
    drawer: false,
    main: main,
    social: social
  }),
  methods: {
    toggleNavigation: function (state) {
      this.drawer = state
    },
    handleScroll: function () {
      var $self = $(this.$el)
      _.throttle(function () {
        $self.toggleClass('scrollTop', $(document).scrollTop() < 10)
        $self.toggleClass('scrollTopExtendend', $(document).scrollTop() < window.screen.height / 8)
      }, 100)()
    }
  },
  beforeMount() {
    var lang = navigator.language || navigator.userLanguage
    var self = this
    if (this.$i18n.locale === 'en' && lang.substring(0, 2) === 'de') {
      _.once(function () {
        self.$router.replace({ path: `/de` + self.$route.fullPath })
      }())
    }
  },
  mounted() {
    this.handleScroll()
    document.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy: function () {
    document.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="scss">
@import "default.scss";
</style>
