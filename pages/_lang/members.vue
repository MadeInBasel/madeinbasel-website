<template>
<div id="members">
  <section class="boundaries">
    <h1>{{ $t('pages.members') }}</h1>
    <div class="abstract" v-html="$t('intro.abstract', {icon: '♥'})"></div>
    <component-members />
    <div class="text-xs-center">
      <v-btn primary large :to="localePath('/join')">{{ $t('pages.join') }}</v-btn>
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
          abstract: 'sowas'
        }
      },
      de: {
        intro: {
          abstract: 'Im Folgenden finden Sie das vollständige Verzeichnis der eingetragenen Trägerschaft. Ausgewählte Mitglieder wurden von uns persönlich porträtiert und mit einem {icon} gekennzeichnet. Klicken sie auf das jeweilige Logo für mehr Informationen.'
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import "members.scss";
</style>
