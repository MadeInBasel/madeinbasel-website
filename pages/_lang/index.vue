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

  <section class="section--dark border-bottom">
    <div class="boundaries">
      <h2>{{ $t('intro.heading')}}</h2>
      <div class="abstract" v-html="$t('intro.abstract')"></div>
      <div class="text-xs-center">
        <v-btn outline dark large :to="localePath('/label')">{{ $t('buttons.learnMore') }}</v-btn>
      </div>
    </div>
  </section>

  <section class="border-top border-bottom">
    <div class="boundaries">
      <h2>{{ $t('members.heading')}}</h2>
      <div class="abstract">
        {{ $t('members.abstract')}}
      </div>
      <component-members paging=8 />
      <div class="text-xs-center">
        <v-btn primary large :to="localePath('/members')">{{ $t('buttons.allMembers') }}</v-btn>
      </div>
      <div class="text-xs-center">
        <v-btn flat large :to="localePath('/join')">{{ $t('pages.join') }}</v-btn>
      </div>
    </div>
  </section>

  <section class="section--dark border-top">
    <div class="boundaries">
      <h2>{{ $t('join.heading')}}</h2>
      <div class="abstract" v-html="$t('join.abstract')"></div>
      <div class="text-xs-center">
        <v-btn outline dark large :to="localePath('/join')">{{ $t('pages.join') }}</v-btn>
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
          abstract: '<strong>Made in Basel</strong> ist eine Initiative um Produkte und Dienstleistungen aus Basel zu bewerben. Wir fördern Innovation und Unternehmergeist, setzen uns ein für ein vielfältiges, kreatives Klima und unterstützen Basel Qualitäten als Wohn-, Arbeits- und Kulturstadt.'
        },
        members: {
          heading: 'Entdecken',
          abstract: 'Basel ist vor allem bekannt für seine Pharmakonzerne, aber wussten Sie, dass es mehrere Messerschmiede in Basel gibt? In vielen Hinterhöfen wird gebastelt, gelötet und geschraubt, in Mansarden sind die Startups mit den Ideen von Morgen einquartiert. Gehen sie auf Entdeckungsreise.'
        },
        join: {
          heading: 'Beitreten',
          abstract: 'Alle in Basel ansässigen Personen und Institutionen können Teil von <strong>Made in Basel</strong> werden. Die Mitgliedschaft ist und bleibt kostenlos. Registriere dich und nutze das Label für dein Marketing. Registrierte Mitglieder werden auf der Webseite aufgeführt und profitieren zusätzlich von exklusiven Angeboten.'
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import 'index.scss';
</style>
