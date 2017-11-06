<template>
<div id="label">
  <section class="intro">
    <div class="section-inner boundaries" v-scroll-reveal="{
    scale: 1,
    delay: 200,
    distance: '20px'
  }">
      <h1>{{ $t('pages.label') }}</h1>
      <div class="abstract" v-html="$t('intro.abstract')"></div>
      <img class="logo" src="~assets/images/logo.svg" alt="Logo">
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
        <h2>{{ $t('mission.heading')}}</h2>
        <div class="abstract" v-html="$t('mission.abstract')"></div>
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
      <div class="benefits">
        <h2>{{ $t('benefits.heading')}}</h2>
        <div class="abstract">
          {{ $t('benefits.abstract')}}
        </div>
        <v-layout wrap>
          <v-flex md6 class="box">
            <div class="box-inner">
              <h4>{{ $t('benefits.consumers.heading') }}</h4>
              <ul>
                <li v-for="(item, i) in $t('benefits.consumers.arguments')" :key="i">{{ item }}</li>
              </ul>
            </div>
          </v-flex>
          <v-flex md6 class="box">
            <div class="box-inner">
              <h4>{{ $t('benefits.manufacturers.heading') }}</h4>
              <ul>
                <li v-for="(item, i) in $t('benefits.manufacturers.arguments')" :key="i">{{ item }}</li>
              </ul>
            </div>
          </v-flex>
        </v-layout>
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
        <h2>{{ $t('vision.heading')}}</h2>
        <div class="abstract" v-html="$t('vision.abstract')"></div>
      </div>

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
          abstract: 'The main aspect of <strong>Made in Basel</strong> is the trade-mark shown below. It serves as a label and a distinctive brand. The use of the label is free of charge for all institutions and residents of Basel*.',
          small: '*See terms for more details.'
        },
        mission: {
          heading: 'Mission',
          abstract: '<strong>Made in Basel</strong> is an initiative to promote products and services from Basel. We support innovation and entrepreneurial spirit, sustain a diverse, creative climate where ideas and people can prosper. The label stands for high-quality local products and services with a unique spirit. Members are committed to Basel as a place to live, work and recreate.'
        },
        benefits: {
          heading: 'Why does it matter?',
          abstract: 'Basel has a extraordinarily diverse workforce that gives the city much of its character and soul. The label "Made in Basel" intends to benefit both, consumers and manufactures. Here is how:',
          consumers: {
            heading: 'For Consumers',
            arguments: [
              'Shop directly from local manufacturers',
              'Find the latest products and services',
              'Reduce carbon emissions and promote sustainable development by buying local',
              'Create jobs in your community'
            ]

          },
          manufacturers: {
            heading: 'For Manufacturers',
            arguments: [
              'Expand markets and reach more consumers',
              'Find local suppliers and contractors',
              'Use the “Made in Basel” logo to educate consumers about your products',
              'Connect with the local community to stay abreast of news and best practices'
            ]
          }
        },
        vision: {
          heading: 'Vision',
          abstract: '"Whoever has visions should go to the doctor." - <em>Helmut Schmidt</em>'
        }
      },
      de: {
        intro: {
          abstract: 'Hauptbestandteil von <strong>Made in Basel</strong> ist die unten abgebildete geschützte Wort-Bild-Marke. Sie dient als Label und als Erkennungsmerkmal. Die Verwendung des Labels steht grundsätzlich allen in Basel ansässigen Institutionen und Personen frei*.',
          small: '*Unter Berücksichtigung der in den AGBs beschriebenen Voraussetzungen.'
        },
        mission: {
          heading: 'Mission',
          abstract: '<strong>Made in Basel</strong> ist eine Initiative um Produkte und Dienstleistungen aus Basel zu bewerben. Wir fördern Innovation und Unternehmergeist, setzen uns für ein vielfältiges, kreatives Klima ein und unterstützen Basels Qualitäten als Wohn-, Arbeits- und Kulturstadt. Das Label steht für hochwertige lokale Produkte und Dienstleistungen mit einem Hauch Basel. Mitglieder bekennen sich zum Werkplatz Basel. '
        },
        benefits: {
          heading: 'Warum ist\'s interessant?',
          abstract: 'Basel besitzt eine ausserordentlich Vielfalt an Werktätigen, die mithelfen der Stadt Charakter und Seele zu verleihen. Das Label "Made in Basel" kommt sowohl Konsumenten als auch Herstellern zugute:',
          consumers: {
            heading: 'Für Konsumenten',
            arguments: [
              'Kaufe direkt beim lokalen Produzenten',
              'Lerne neue Produkte und Dienstleistungen kennen',
              'Reduziere CO2-Emissionen und fördere eine nachhaltige Entwicklung durch den Kauf lokaler Produkte',
              'Schaffe Arbeitsplätze in deiner Nachbarschaft'
            ]

          },
          manufacturers: {
            heading: 'Für Hersteller',
            arguments: [
              'Erweitere deine Märkte und erreiche mehr Konsumenten',
              'Finde lokale Lieferanten und Auftragnehmer, optimiere Lieferketten',
              'Verwende das “Made in Basel” Logo um Verbraucher über deine Produkte aufzuklären',
              'Trete in Kontakt mit lokalen Herstellern um über Neuigkeiten und bewährte Verfahren auf dem Laufenden zu bleiben'
            ]
          }
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
