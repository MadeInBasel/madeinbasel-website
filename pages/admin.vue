<template>
<div id="admin">
  <component-section class="admin">
    <h1>{{ $t('pages.admin') }}</h1>
    <div v-if="user" class="user">
      <img v-if="user.photoURL" :src="user.photoURL" class="thumb" alt="Thumb">
      <div @click="showUID = true" :title="'UID: '+ user.uid "><strong>{{ user.displayName }}</strong></div>
      <div>{{ user.email }}</div>
      <div v-show="showUID">UID: {{ user.uid }}</div>
      <div>
        <a href="javascript:;" @click="dialogDelete = true">{{ $t('buttons.deleteAccount') }}</a>
        <v-dialog lazy v-model="dialogDelete" max-width="600" content-class="dialog--custom dialog--delete">
          <h3>{{ $t('delete.heading') }}</h3>
          <div class="abstract">
            {{ $t('delete.abstract') }}
          </div>
          <div class="text-xs-center reason">
            <div class="">
              {{ $t('delete.reason') }}
              <div>
                <a href="mailto:hello@madeinbasel.org">hello@madeinbasel.org</a>
              </div>
            </div>
          </div>
          <div v-if="errorDelete" class="errorDelete">
            <div>
              {{ errorDelete }}
            </div>
            <component-login :logOutButton=true />
          </div>
          <div class="text-xs-center">
            <v-btn color="error" :loading="loadingDelete" :disabled="loadingDelete" @click="deleteAccount()">{{ $t('buttons.deleteAccount') }}</v-btn>
            <v-btn color="primary" @click="dialogDelete = false">{{ $t('buttons.cancel') }}</v-btn>
          </div>
        </v-dialog>
      </div>
    </div>
    <component-login :logOutButton=true />
  </component-section>

  <component-section v-if="user && !user.isAdmin" v-show="verifiedCount">
    <h2>{{ $t('entries' )}}</h2>
    <div class="abstract">
      {{ $t('verified')}} ({{ verifiedCount }})
    </div>
    <component-members :isOwner=true v-on:count="handleVerified"></component-members>
  </component-section>

  <component-section v-if="user && !user.isAdmin" v-show="pendingCount">
    <h2>{{ $t('entries')}}</h2>
    <div class="abstract">
      {{ $t('verificationPending')}} ({{ pendingCount }})
    </div>
    <component-members :verified=false :isOwner=true v-on:count="handlePending"></component-members>
  </component-section>

  <component-section v-if="user && user.isAdmin">
    <h2>Unverified Members</h2>
    <component-members :verified=false></component-members>
  </component-section>

  <component-section v-if="user && user.isAdmin">
    <h2>Verified Members</h2>
    <component-members></component-members>
  </component-section>

  <div class="text-xs-center">
    <v-btn color="primary" large :to="localePath('/apply')">
      {{ $t('buttons.applyNew') }}</v-btn>
  </div>

  <component-section dark v-if="user" hideBottomWave>
    <h2>{{ $t('download.heading')}}</h2>
    <div class="abstract" v-html="$t('download.abstract', {mib: '<strong>MADE IN BASEL</strong>'})"></div>
    <div class="text-xs-center">
      <v-btn outline dark large href="/files/MadeInBasel-LogoPackage.zip" download="MadeInBasel-LogoPackage">
        <v-icon>file_download</v-icon> {{ $t('buttons.downloadLogoPackage') }}</v-btn>
    </div>
  </component-section>
</div>
</template>

<script>
import _ from 'underscore'
import members from '~/components/members.vue'
import login from '~/components/login.vue'
import section from '~/components/section.vue'
var firebase = require('firebase')

export default {
  components: {
    'component-members': members,
    'component-login': login,
    'component-section': section
  },
  head() {
    return {
      title: 'Admin',
      meta: [{
        hid: 'og:title',
        property: 'og:title',
        content: this.$t('pages.admin')
      }]
    }
  },
  data() {
    return {
      dialogDelete: false,
      loadingDelete: false,
      errorDelete: '',
      verifiedCount: false,
      pendingCount: false,
      showUID: false
    }
  },
  methods: {
    handlePending(count) {
      this.pendingCount = count
    },
    handleVerified(count) {
      this.verifiedCount = count
    },
    deleteAccount() {
      this.loadingDelete = true
      var self = this
      this.firestore.collection('users').doc(this.user.uid).delete()
        .then(function () {
          var user = firebase.auth().currentUser
          user.delete().then(function () {
            self.loadingDelete = false
            self.dialogDelete = false
            self.$store.commit('UPDATE_USER', null)
            console.log('Successfully deleted!')
          }).catch(function (error) {
            self.errorDelete = error.message
            console.error('Error deleting user: ', error)
          })
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    firestore() {
      return this.$store.state.db
    }
  },
  i18n: {
    messages: {
      en: {
        delete: {
          heading: 'So sad!',
          abstract: 'Be aware. Registered organisations remain on the platform unless they have been deleted prior to this action. You will not be able to recover your account.',
          reason: 'What went wront? We appreciate suggestions, ideas and construcutive criticism.'
        },
        entries: 'My Entries',
        verified: 'verified',
        verificationPending: 'Verification pending',
        download: {
          heading: 'Downloads',
          abstract: 'Download the {mib} label files for your marketing purposes. We\'d be happy if our logo finds a place on your website!'
        }
      },
      de: {
        delete: {
          heading: 'Oh noooo!',
          abstract: 'Achtung. Registrierte Organisationen bleiben auf der Plattform bestehen falls sie nicht vorher gelöscht wurden. Das Konto kann nicht wiederhergestellt werden.',
          reason: 'Was ist schiefgegangen? Wir schätzen Anregungen, Ideen und konstruktive Kritik.'
        },
        entries: 'Meine Einträge',
        verified: 'geprüft',
        verificationPending: 'Prüfung ausstehend',
        download: {
          heading: 'Downloads',
          abstract: 'Lade die {mib}-Logo-Dateien zur freien Verwendung herunter. Wir freuen uns, wenn unser Logo einen Platz auf deiner Webseite findet!'
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import 'admin.scss';
</style>
