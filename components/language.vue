<template>
<div class="language" :title="$t('language')">
  <template v-for="lang in Object.keys($i18n.messages)">
    <template v-if="$i18n.locale === lang">
      <strong>{{ $t('links.'+lang) }}</strong>
    </template>
    <template v-else>
      <nuxt-link :to="{ params: {lang: lang} }" active-class="none" exact>
        {{ $t('links.'+lang) }}
      </nuxt-link>
    </template>
  </template>
</div>
</template>

<script>
export default {
  i18n: {
    messages: {
      en: {
        language: 'Language',
        'links': {
          'de': 'DE',
          'en': 'EN'
        }
      },
      de: {
        language: 'Sprache',
        'links': {
          'de': 'DE',
          'en': 'EN'
        }
      }
    }
  }
}
</script>
