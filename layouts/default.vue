<template>
<v-app id="layout" class="rainbow scrollTop scrollTopExtended" v-scroll="onScroll">
  <app-header v-on:drawer="toggleNavigation"></app-header>
  <v-navigation-drawer id="navigation" class="pb-0" persistent temporary right height="100%" enable-resize-watcher v-model="drawer">
    <nuxt-link class="emblem" :to="localePath('/')">
      <img class="logo" src="~assets/images/logo.svg" alt="Logo">
    </nuxt-link>
    <v-list dense>
      <v-list-tile v-for="(item, i) in main" :key="i" nuxt exact v-ripple :to="localePath(`${item.path}`)">
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
    <v-btn class="btn-close-top" small icon v-on:click="drawer=false">
      <v-icon>close</v-icon>
    </v-btn>
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
    social: social,
    offsetTop: 0
  }),
  methods: {
    toggleNavigation: function (state) {
      this.drawer = state
    },
    onScroll(e) {
      this.offsetTop = window.pageYOffset || document.documentElement.scrollTop
      var $layout = $(this.$el)
      var self = this
      _.throttle(function () {
        $layout.toggleClass('scrollTop', self.offsetTop < 10)
        $layout.toggleClass('scrollTopExtended', self.offsetTop < window.screen.height / 4)
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
  }
}
</script>

<style lang="scss">
@import "default.scss";
</style>
