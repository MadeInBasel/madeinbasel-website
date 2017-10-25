<template>
<div id="members">
  <section>
    <div class="section-inner boundaries" v-scroll-reveal="{
    scale: 1,
    delay: 200,
    distance: '20px'
  }">
      <h1>{{ $t('pages.members') }}</h1>
      <div class="abstract" v-html="$t('intro.abstract', {icon: '♥'})"></div>
      <component-members />
      <div class="text-xs-center">
        <v-btn color="primary" large :to="localePath('/join')">{{ $t('pages.join') }}</v-btn>
      </div>
    </div>
  </section>
</div>
</template>

<script>
import members from '~/components/members.vue'

export default {
  head() {
    return {
      title: this.$t('pages.members')
    }
  },
  components: {
    'component-members': members
  },
  i18n: {
    messages: {
      en: {
        intro: {
          abstract: 'Below you will find the complete list of our members. Selected members have stories attached and are marked with a {icon}. Click on the respective logo for more information.'
        }
      },
      de: {
        intro: {
          abstract: 'Im Folgenden finden Sie das vollständige Mitgliederverzeichnis. Ausgewählte Mitglieder wurden von uns persönlich porträtiert und mit einem {icon} gekennzeichnet. Klicken sie auf das jeweilige Logo für mehr Informationen.'
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import "members.scss";
</style>
