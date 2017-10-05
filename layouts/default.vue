<template>
<v-app id="layout" class="scrollTop scrollTopExtended">
  <div id="background"></div>
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
  </v-navigation-drawer>
  <div id="page">
    <nuxt />
  </div>
  <app-footer />
</v-app>
</template>

<script>
import { TimelineMax, Linear } from 'gsap'
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
        $self.toggleClass('scrollTopExtended', $(document).scrollTop() < window.screen.height / 4)
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
    return
    var index = document.querySelector('#background')
    var bg = new TimelineMax({ repeat: -1 })

    bg.to(index, 5, { backgroundColor: '#00ffff', ease: Linear.easeNone })
      .to(index, 5, { backgroundColor: '#ff9eff', ease: Linear.easeNone })
      .to(index, 5, { backgroundColor: '#78ffcc', ease: Linear.easeNone })

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
