<template>
<div id="index">
  <style media="screen">
    #header .logo {
      display: none;
    }
  </style>
  <section class="wallpaper boundaries">
    <img class="logo" src="~assets/images/logo.svg" alt="Logo">
    <div class="more">
      <v-icon>expand_more</v-icon>
    </div>
  </section>

  <section class="section--dark">
    <div class="boundaries">
      <h2>{{ $t('intro.heading')}}</h2>
      <div class="abstract">
        {{ $t('intro.abstract')}}
      </div>
    </div>
  </section>

  <section>
    <div class="boundaries">
      <h2>{{ $t('about.heading')}}</h2>
      <div class="abstract">
        {{ $t('about.abstract')}}
      </div>
    </div>
  </section>

  <section class="section--dark">
    <div class="boundaries">
      <h2>{{ $t('members.heading')}}</h2>
      <div class="abstract">
        {{ $t('members.abstract')}}
      </div>
      <component-members paging=8 />
      <div class="text-xs-center">
        <v-btn primary :to="localePath('/join')">{{ $t('pages.join') }}</v-btn>
      </div>

    </div>
  </section>

  <section>
    <div class="boundaries">
      <h2>{{ $t('join.heading')}}</h2>
      <div class="abstract">
        {{ $t('join.abstract')}}
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
  scrollToTop: true,
  head() {
    return {
      title: this.$t('pages.home')
    }
  },
  i18n: {
    messages: {
      en: {
        intro: {
          heading: 'A label is a promise',
          abstract: 'Basel is the home of some amazing services and products created by even more amazing people. With the "Made in Basel" label, we want to underline this fact. We help sustain a creative climate which encourages entrepreneurship and innovation, and creates employment opportunities for a diverse local workforce.'
        },
        about: {
          heading: 'About',
          abstract: 'Made in Basel is an initiative to promote products and services from Basel, Switzerland.'
        },
        members: {
          heading: 'Members',
          abstract: 'These companies are already members.'
        },
        join: {
          heading: 'Become a part',
          abstract: 'Do you create Products made in Basel? Are you an entrepeneur with a great service with headquarters in the city? Great - join us today and get the badge.'
        }
      },
      de: {
        intro: {
          heading: 'Mehrwert für Basel und die Welt'
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import 'index.scss';
</style>
