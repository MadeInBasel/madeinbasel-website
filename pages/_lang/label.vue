<template>
<div id="label">
  <section class="intro">
    <div class="section-inner boundaries">
      <h1>{{ $t('pages.label') }}</h1>
      <div class="abstract" v-html="$t('intro.abstract')"></div>
      <img class="logo" src="~assets/images/logo.svg" alt="Logo">
    </div>
  </section>

  <section class="section--dark">
    <div class="wave wave-top"></div>
    <div class="section-inner">
      <div class="boundaries">
        <h2>{{ $t('mission.heading')}}</h2>
        <div class="abstract" v-html="$t('mission.abstract')"></div>
      </div>
    </div>
    <div class="wave wave-bottom"></div>
  </section>

  <section>
    <div class="section-inner boundaries">
      <h2>{{ $t('vision.heading')}}</h2>
      <div class="abstract" v-html="$t('vision.abstract')"></div>
    </div>
  </section>

  <section class="section--small section--dark">
    <div class="section-inner">
      <div class="boundaries">
        <small>{{ $t('intro.small') }}</small>
      </div>
    </div>
  </section>
</div>
</template>

<script>
export default {
  components: {},
  head() {
    return {
      title: this.$t('pages.label')
    }
  },
  i18n: {
    messages: {
      en: {
        intro: {
          abstract: 'sowas'
        },
        mission: {
          heading: 'Mission',
          abstract: ''
        },
        vision: {
          heading: 'Vision',
          abstract: '"Whoever has visions should go to the doctor." - <em>Helmut Schmidt</em>'
        }
      },
      de: {
        intro: {
          abstract: 'Hauptbestandteil von <strong>Made in Basel</strong> ist die unten abgebildetet geschützte Wort-Bild-Marke. Sie dient als Label und als Erkennungsmerkmal. Die Verwendung des Labels steht grundsätzlich allen in Basel ansässigen Institutionen und Personen frei*.',
          small: '*Unter Berücksichtigung der in den AGBs beschriebenen Voraussetzungen.'
        },
        mission: {
          heading: 'Mission',
          abstract: '<strong>Made in Basel</strong> ist eine Initiative um Produkte und Dienstleistungen aus Basel zu bewerben. Wir fördern Innovation und Unternehmergeist, setzen uns ein für ein vielfältiges, kreatives Klima und unterstützen Basel Qualitäten als Wohn-, Arbeits- und Kulturstadt. Das Qualitätslabel steht für hochwertige lokale Produkte und Dienstleistungen mit einem Hauch von Basel. Mitglieder bekennen sich zum Werkplatz Basel.'
        },
        vision: {
          heading: 'Vision',
          abstract: '"Wer Visionen hat, soll zum Arzt gehen." - <em>Helmut Schmidt</em>'
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import 'label.scss';
</style>
