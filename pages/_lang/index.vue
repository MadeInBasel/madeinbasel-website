<template>
<div id="index">
  <style media="screen">
    #header .logo {
      display: none;
    }
  </style>
  <section class="wallpaper boundaries">
    <div v-show="!ready" class="spinner">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <transition name="transition-down">
      <img v-show="ready" class="logo" src="~assets/images/logo.svg" alt="Logo">
    </transition>
    <div class="more">
      <v-icon>expand_more</v-icon>
    </div>
  </section>

  <section class="section--dark">
    <div class="wave wave-top"></div>
    <div class="section-inner">
      <div class="boundaries" v-scroll-reveal="{
    scale: 1,
    delay: 200,
    distance: '20px'
  }">
        <h2>{{ $t('intro.heading')}}</h2>
        <div class="abstract" v-html="$t('intro.abstract')"></div>
        <div class="text-xs-center">
          <v-btn outline dark large :to="localePath('/label')">{{ $t('buttons.learnMore') }}</v-btn>
        </div>
      </div>
    </div>
    <div class="wave wave-bottom"></div>
  </section>

  <section>
    <div class="section-inner boundaries" v-scroll-reveal="{
    scale: 1,
    delay: 200,
    distance: '20px'
  }">
      <h2>{{ $t('members.heading')}}</h2>
      <div class="abstract" v-html="$t('members.abstract')"></div>
      <component-members paging=8 />
      <div class="text-xs-center">
        <v-btn primary large :to="localePath('/members')">{{ $t('buttons.allMembers') }}</v-btn>
      </div>
      <div class="text-xs-center">
        <v-btn flat large :to="localePath('/join')">{{ $t('pages.join') }}</v-btn>
      </div>
    </div>
  </section>

  <section class="section--dark">
    <div class="wave wave-top"></div>
    <div class="section-inner">
      <div class="boundaries" v-scroll-reveal="{
    scale: 1,
    delay: 200,
    distance: '20px'
  }">
        <h2>{{ $t('join.heading')}}</h2>
        <div class="abstract" v-html="$t('join.abstract')"></div>
        <div class="text-xs-center">
          <v-btn outline dark large :to="localePath('/join')">{{ $t('pages.join') }}</v-btn>
        </div>
      </div>
    </div>
  </section>

</div>
</template>

<script>
import members from '~/components/members.vue'

export default {
  components: {
    'component-members': members
  },
  head() {
    return {
      title: this.$t('pages.home')
    }
  },
  data() {
    return {
      ready: false
    }
  },
  mounted() {
    this.ready = true
  },
  i18n: {
    messages: {
      en: {
        intro: {
          heading: 'The Label',
          abstract: '<strong>Made in Basel</strong> is an initiative to promote products and services from Basel, Switzerland. We support local production and help sustain a creative climate that encourages entrepreneurship and innovation. <strong>One city. One promise. One label.</strong>'
        },
        members: {
          heading: 'Explore',
          abstract: 'These companies and organisations are members.'
        },
        join: {
          heading: 'Join Us',
          abstract: 'Are you a Basel based company or organisation? Join us and get the badge today.'
        }
      },
      de: {
        intro: {
          heading: 'Das Label',
          abstract: '<strong>Made in Basel</strong> ist eine Initiative um Produkte und Dienstleistungen aus Basel zu bewerben. Wir fördern Innovation und Unternehmergeist, dokumentieren Basel\'s Vielfalt als Wohn-, Arbeits- und Kulturstadt.'
        },
        members: {
          heading: 'Neues Entdecken',
          abstract: 'In Basel\'s Hinterhöfen wird gebastelt, gelötet und geschraubt, in Kellern und Mansarden entstehen die Ideen von Morgen. <strong>Made in Basel</strong> dokumentiert Basel\'s Schaffen anhand augewählter Geschichten und einem öffentlichen Mitgliederverzeichnis.'
        },
        join: {
          heading: 'Mach mit!',
          abstract: '<strong>Made in Basel</strong> ist eine offene Plattform - grundsätzlich können alle in Basel ansässigen Personen und Institutionen beitreten und vom Label profitieren. Übrigens, das Ganze ist kostenlos. Mach mit!'
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import 'index.scss';
</style>
