<template>
<div class="language" :title="$t('language')">
  <template v-if="$i18n.locale === 'en'">
    <strong>{{ $t('links.english') }}</strong> /
    <nuxt-link :to="`/de` + $route.fullPath" active-class="none" exact>
      {{ $t('links.german') }}
    </nuxt-link>
  </template>
  <template v-else>
    <strong>{{ $t('links.german') }}</strong> /
    <nuxt-link :to="$route.fullPath.replace(/^\/[^\/]+/, '')" active-class="none" exact>
      {{ $t('links.english') }}
    </nuxt-link>
  </template>
</div>
</template>

<script>
export default {
  methods: {
    path(url) {
      return (this.$i18n.locale === 'en' ? url : '/' + this.$i18n.locale + url)
    }
  },
  i18n: {
    messages: {
      en: {
        language: 'Language',
        'links': {
          'german': 'DE',
          'english': 'EN'
        }
      },
      de: {
        language: 'Sprache',
        'links': {
          'german': 'DE',
          'english': 'EN'
        }
      }
    }
  }
}
</script>
