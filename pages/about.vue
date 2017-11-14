<template>
<div id="legal">
  <component-section class="impressum">
    <h1>{{ $t('pages.about') }}</h1>

    <v-layout wrap>
      <v-flex xs12 sm6 order-sm2>
        <div><strong>Impressum</strong></div>
        <component-address />

        <div><strong>Social</strong></div>
        <component-socialMenu />
        <v-dialog class="contact-dialog" v-model="contactDialog" max-width="600" content-class="dialog--custom dialog--contact">
          <v-btn class="btn-contact" color="primary" slot="activator">{{ $t('contactForm') }}</v-btn>
          <component-contact-form />
          <v-btn class="btn-x" fab small @click="contactDialog = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-dialog>
      </v-flex>
      <v-flex xs12 sm6>
        <div class="team">
          <div class="team-heading">{{ $t('team.lead') }}</div>
          <div>Christophe Schwyzer</div>
          <div class="team-heading">{{ $t('team.editorial') }}</div>
          <div>Olivier Christe</div>
          <div class="team-heading">{{ $t('team.logo') }}</div>
          <div>David Steiner</div>
          <div class="team-heading">{{ $t('team.support') }}</div>
          <div>Lara Schnell</div>
          <div>Nicolas Schmutz</div>
          <div>Remo Kübler</div>
          <div>Reto Kaiser</div>
        </div>
      </v-flex>
    </v-layout>
  </component-section>

  <component-section dark class="membership">
    <template v-if="user">
      <h2 v-html="$t('membership.heading', {user: user.displayName})"></h2>
      <div class="abstract">
        <img v-if="user.photoURL" :src="user.photoURL" class="thumb" alt="Thumb">
        <div>
          {{ $t('membership.abstract') }}
        </div>
      </div>
      <div class="text-xs-center">
        <v-btn outline dark large :to="localePath('/admin')">
          {{ $t('pages.admin') }}</v-btn>
      </div>
      <div class="text-xs-center">
        <v-btn flat dark large :to="localePath('/apply')">
          {{ $t('buttons.applyNew') }}</v-btn>
      </div>
    </template>
    <template v-else>
      <h2>{{ $t('apply.heading')}}</h2>
      <div class="abstract" v-html="$t('apply.abstract', {mib: '<strong>MADE IN BASEL</strong>'})"></div>
      <div class="text-xs-center">
        <v-btn outline dark large :to="localePath('/apply')">{{ $t('pages.apply') }}</v-btn>
      </div>
      <div class="mt-2 text-xs-center">
        <small>{{ $t('existingMemberQuestion') }} <nuxt-link :to="localePath('/admin')">{{ $t('buttons.login') }}</nuxt-link></small>
      </div>
    </template>
  </component-section>

  <component-section class="legal">
    <h2>{{ $t('legal') }}</h2>
    <component-terms />
    <h4>{{ $t('disclaimer.heading') }}</h4>
    <p>{{ $t('disclaimer.content') }}</p>

    <h4>{{ $t('copyright.heading') }}</h4>
    <p>{{ $t('copyright.content') }}</p>

    <h4>{{ $t('cookies.heading') }}</h4>
    <p v-html="$t('cookies.content')"></p>
  </component-section>

</div>
</template>

<script>
import address from '~/components/contactAddress.vue'
import terms from '~/components/terms.vue'
import contactForm from '~/components/contactForm.vue'
import section from '~/components/section.vue'
import socialMenu from '~/components/socialMenu.vue'
import login from '~/components/login.vue'

export default {
  components: {
    'component-address': address,
    'component-terms': terms,
    'component-contact-form': contactForm,
    'component-section': section,
    'component-socialMenu': socialMenu,
    'component-login': login
  },
  head() {
    return {
      title: this.$t('pages.about'),
      meta: [{
        hid: 'og:title',
        property: 'og:title',
        content: this.$t('pages.about')
      }]
    }
  },
  data() {
    return {
      contactDialog: false
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  i18n: {
    messages: {
      en: {
        contactForm: 'Contact Form',
        team: {
          lead: 'Lead/Website',
          editorial: 'Editorial/Stories',
          logo: 'Logo',
          support: 'Supporter'
        },
        membership: {
          heading: 'Hello {user}',
          abstract: 'Welcome back! You can manage your profile and membership listings on the admin page. Are you a serial entrepreneur? Feel free to file multiple applications.'
        },
        apply: {
          heading: 'Become a Member',
          abstract: 'Are you a Basel based entrepreneur offering products or services we should know about? Tell us about it. Apply now!'
        },
        legal: 'Legal Notices',
        terms: 'Terms (German)',
        disclaimer: {
          heading: 'Disclaimer',
          content: 'The content included in this Website has been compiled from a variety of sources and is subject to change without notice as are any products, programs, offerings, or technical information described in this Website. The Company makes no representation or warranty whatsoever regarding the completeness, quality, or adequacy of the Website or content, or the suitability, functionality, or operation of this web site or its content. By using this Website, you assume the risk that the content on this Website may be inaccurate, incomplete, or offensive or may not meet your needs and requirements.  The Company specifically disclaims all warranties, express or implied, including without limitation the warranties of merchantability, fitness for a particular purpose, and non-infringement with respect to this Website.  In no event will the Company be liable for any special, indirect, incidental or consequential damages even if company has been advised of the possibility of such damages.'
        },
        copyright: {
          heading: 'Copyright',
          content: 'All rights reserved. This website or any portion thereof may not be reproduced or used in any manner whatsoever without the express written permission of the publisher.'
        },
        cookies: {
          heading: 'Cookies',
          content: 'To make this site work properly, we sometimes place small data files called cookies on your device. Most big websites do this too.</br>A cookie is a small text file that a website saves on your computer or mobile device when you visit the site. It enables the website to remember your actions and preferences (such as login, language, font size and other display preferences) over a period of time, so you don’t have to keep re-entering them whenever you come back to the site or browse from one page to another.</br>You can control and/or delete cookies as you wish – for details, see  <a href="http://www.aboutcookies.org/" target="_blank" rel="noopener">aboutcookies.org</a>. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. If you do this, however, you may have to manually adjust some preferences every time you visit a site and some services and functionalities may not work.'
        }
      },
      de: {
        contactForm: 'Kontaktformular',
        team: {
          lead: 'Leitung/Webseite',
          editorial: 'Redaktion/Geschichten',
          logo: 'Logo',
          support: 'Unterstützer'
        },
        membership: {
          heading: 'Hallo {user}',
          abstract: 'Willkommen zurück! Du kannst dein Profil und deine eingetragenen Organisationen auf der Admin-Seite verwalten. Bist du Serienunternehmer? Es können mehrere Bewerbungen eingereicht werden.'
        },
        apply: {
          heading: 'Mitglied werden',
          abstract: 'Bist du Basler Unternehmer, der Produkte oder Dienstleistungen anbietet, von denen wir wissen sollten? Erzähle uns davon. Bewirb dich für eine Mitgliedschaft!'
        },
        legal: 'Rechtliche Hinweise',
        terms: 'Allgemeine Geschäftsbedingungen',
        disclaimer: {
          heading: 'Haftungsausschluss',
          content: 'Der Autor übernimmt keinerlei Gewähr hinsichtlich der inhaltlichen Richtigkeit, Genauigkeit, Aktualität, Zuverlässigkeit und Vollständigkeit der Informationen. Haftungsansprüche gegen den Autor wegen Schäden materieller oder immaterieller Art, welche aus dem Zugriff oder der Nutzung bzw. Nichtnutzung der veröffentlichten Informationen, durch Missbrauch der Verbindung oder durch technische Störungen entstanden sind, werden ausgeschlossen. Alle Angebote sind unverbindlich. Der Autor behält es sich ausdrücklich vor, Teile der Seiten oder das gesamte Angebot ohne gesonderte Ankündigung zu verändern, zu ergänzen, zu löschen oder die Veröffentlichung zeitweise oder endgültig einzustellen.'
        },
        copyright: {
          heading: 'Urheberrechte',
          content: 'Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos oder anderen Dateien auf der Website gehören ausschliesslich der "MADE IN BASEL" oder den speziell genannten Rechtsinhabern. Für die Reproduktion jeglicher Elemente ist die schriftliche Zustimmung der Urheberrechtsträger im Voraus einzuholen.'
        },
        cookies: {
          heading: 'Cookies',
          content: 'Damit dieses Internetportal ordnungsgemäß funktioniert, legen wir manchmal kleine Dateien – sogenannte Cookies – auf Ihrem Gerät ab. Das ist bei den meisten großen Websites üblich.</br>Ein Cookie ist eine kleine Textdatei, die ein Webportal auf Ihrem Rechner, Tablet-Computer oder Smartphone hinterlässt, wenn Sie es besuchen. So kann sich das Portal bestimmte Eingaben und Einstellungen (z. B. Login, Sprache, Schriftgröße und andere Anzeigepräferenzen) über einen bestimmten Zeitraum „merken“, und Sie brauchen diese nicht bei jedem weiteren Besuch und beim Navigieren im Portal erneut vorzunehmen.</br>Sie können Cookies nach Belieben steuern und/oder löschen. Wie, erfahren Sie hier: <a href="http://www.aboutcookies.org/" target="_blank" rel="noopener">aboutcookies.org</a>.  Sie können alle auf Ihrem Rechner abgelegten Cookies löschen und die meisten Browser so einstellen, dass die Ablage von Cookies verhindert wird. Dann müssen Sie aber möglicherweise einige Einstellungen bei jedem Besuch einer Seite manuell vornehmen und die Beeinträchtigung mancher Funktionen in Kauf nehmen.'
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import 'about.scss';
</style>
