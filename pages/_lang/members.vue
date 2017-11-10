<template>
<div id="members">
  <component-section>
    <h1>{{ $t('pages.members') }}</h1>
    <div class="abstract" v-html="$t('intro.abstract', {icon: '♥'})"></div>
    <component-members />
  </component-section>

  <component-section dark hideBottomWave>
    <h2>{{ $t('join.heading')}}</h2>
    <div class="abstract" v-html="$t('join.abstract', {mib: '<strong>Made in Basel</strong>'})"></div>
    <div class="text-xs-center">
      <v-btn outline dark large :to="localePath('/join')">{{ $t('pages.join') }}</v-btn>
    </div>
  </component-section>

  <component-section small dark>
    <small class="center-block"><span v-html="$t('free-notice', {mib: '<strong>Made in Basel</strong>'})"></span>&nbsp; <a href="mailto:hello@madeinbasel.org">hello@madeinbasel.org</a></small>
  </component-section>
</div>
</template>

<script>
import members from '~/components/members.vue'
import section from '~/components/section.vue'

export default {
  head() {
    return {
      title: this.$t('pages.members')
    }
  },
  components: {
    'component-members': members,
    'component-section': section
  },
  i18n: {
    messages: {
      en: {
        intro: {
          abstract: 'Below you will find the complete list of our members. Selected members have stories attached and are marked with a {icon}.'
        },
        join: {
          heading: 'Join Us',
          abstract: '{mib} is an open platform. In general, all citizens and institutions with residence in Basel may join and benefit from the label. And yes, it\'s free*. Join in!'
        }
      },
      de: {
        intro: {
          abstract: 'Im Folgenden findest du das vollständige Verzeichnis der eingetragenen Mitglieder. Ausgewählte Produzenten werden von uns persönlich porträtiert und sind mit einem {icon} gekennzeichnet.'
        },
        join: {
          heading: 'Mach mit!',
          abstract: '{mib} ist eine offene Plattform. Grundsätzlich können alle in Basel ansässigen Personen und Institutionen beitreten und vom Label profitieren. Übrigens, das Ganze ist kostenlos*. Mach mit!'
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import "members.scss";
</style>
