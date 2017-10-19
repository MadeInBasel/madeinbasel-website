<template>
<div class="component-members" @keyup.esc="dialog = false">
  <div v-if="user" class="admin-zone text-xs-center">
    <v-btn primary :loading="!ready" :disabled="!ready" @click="getMembers()">
      <v-icon>cached</v-icon> Reload Members</v-btn>
  </div>
  <div v-show="!ready" class="spinner">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>

  <div v-if="!membersPaging.length">
    <div class="emptyPaging text-xs-center">
      {{ $t('error.empty')}}
    </div>
  </div>
  <transition-group v-show="ready" name="transition-down" tag="div" class="layout members wrap">
    <v-flex v-show="ready" xs6 sm3 v-for="(item, index) in membersPaging" :key="item.id">
      <nuxt-link class="member" v-ripple alt="Preview" :to="{ path: $route.path + '#' + `${item.id}`}">
        <img :src="item.data.organisationImage.cdnUrl" :alt="item.data.organisationName">
      </nuxt-link>
    </v-flex>
  </transition-group>

  <v-dialog v-if="item.data" lazy v-model="dialog" width="600" content-class="dialog--custom">
    <div class="dialog-content">
      <div class="map">
        <div class="map-placeholder">
          <div>
            <v-icon>map</v-icon>
          </div>
          {{ $t('mapPlaceholder') }}
        </div>
        <img v-if="item.data.address.lng && item.data.address.lat" :src="'https://maps.googleapis.com/maps/api/staticmap?zoom=14&size=640x300' + mapStyles + '&markers=' + item.data.address.lat + ',' + item.data.address.lng +'&key=' + googleAPIKey" alt="Google Maps">
      </div>
      <div class="content">
        <div class="content-logo">
          <img :src="item.data.organisationImage.cdnUrl" :alt="item.data.organisationName">
        </div>
        <div v-if="item.data.hasOwnProperty('description')" class="content-description abstract">
          <div v-if="$i18n.locale === 'en' || user">{{ item.data.description.en }}</div>
          <div v-if="$i18n.locale === 'de' || user">{{ item.data.description.de }}</div>
        </div>
        <div v-if="item.data.hasOwnProperty('timestamp')" class="text-xs-center">
          <small>{{ $t('memberSince')}}: {{ getYear() }}</small>
        </div>
        <div v-if="item.data.hasOwnProperty('website')" class="text-xs-center">
          <v-btn flat outline nuxt :href='item.data.website' target="_blank" rel="noopener">{{ $t('buttons.visitWebsite') }}</v-btn>
        </div>
        <div v-if="user" class="admin-zone text-xs-center">
          <v-btn error :loading="loadingDelete" :disabled="loadingDelete" @click="deleteEntry(item.id)">Delete</v-btn>
          <v-btn v-if="!item.data.verified" primary :loading="loadingVerify" :disabled="loadingVerify" @click="verifyEntry(item.id)">Verify</v-btn>
          <v-btn v-if="item.data.verified" :loading="loadingVerify" :disabled="loadingVerify" @click="revokeVerification(item.id)">Revoke Verification</v-btn>
        </div>
      </div>
    </div>
    <v-btn class="btn-close" fab small @click="dialog = false">
      <v-icon>close</v-icon>
    </v-btn>
  </v-dialog>
</div>
</template>

<script>
import { config } from '~/assets/firebase.js'
const firebase = require('firebase')
require('firebase/firestore')
import _ from 'underscore'

export default {
  created() {
    this.getMembers()
  },
  props: {
    paging: {
      type: String,
      default: '100'
    },
    verified: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      dialog: false,
      item: {},
      ready: false,
      googleAPIKey: 'AIzaSyCS-zAs7ur43P-FaPYuFzTjbMZxUj8bDek',
      members: [],
      mapStyles: '&format=png&maptype=roadmap&style=feature:landscape%7Celement:geometry%7Ccolor:0xffffff&style=feature:poi.attraction%7Cvisibility:off&style=feature:poi.business%7Cvisibility:off&style=feature:poi.government%7Cvisibility:off&style=feature:poi.medical%7Cvisibility:off&style=feature:poi.place_of_worship%7Cvisibility:off&style=feature:poi.school%7Cvisibility:off&style=feature:poi.sports_complex%7Cvisibility:off&style=feature:road%7Celement:labels.icon%7Cvisibility:off&style=feature:road.arterial%7Celement:geometry%7Ccolor:0xdddddd&style=feature:road.arterial%7Celement:labels.icon%7Cvisibility:off&style=feature:road.highway%7Celement:geometry%7Ccolor:0xdddddd&style=feature:road.highway%7Celement:labels.icon%7Cvisibility:off&style=feature:road.local%7Celement:geometry%7Ccolor:0xeeeeee',
      loadingVerify: false,
      loadingDelete: false
    }
  },
  methods: {
    getMembers: function () {
      this.ready = false
      if (!firebase.apps.length) {
        firebase.initializeApp(config)
      }
      var db = firebase.firestore()
      var self = this

      db.collection('organisations')
        .get()
        .then(function (querySnapshot) {
          self.members = querySnapshot.docs.map(function (item) {
            return {
              id: item.id,
              data: item.data()
            }
          })
          self.ready = true
          self.handleDialogVisibility()
        })
        .catch(function (error) {
          console.log('Error getting documents: ', error)
        })
    },
    handleDialogVisibility: function () {
      var openDialog = this.$route.hash ? this.$route.hash.slice(1) : false
      var self = this
      if (openDialog) {
        _.defer(function () {
          var activeDialog = self.membersPaging.filter(function (item, index) {
            return openDialog === item.id
          })
          if (activeDialog.length === 1) {
            self.item = activeDialog[0]
            self.dialog = true
          }
        })
      } else {
        this.dialog = false
      }
    },
    getYear: function () {
      var year = ''
      if (this.item.data) {
        let date = new Date(this.item.data.timestamp)
        year = date.getFullYear()
      }
      return year
    },
    revokeVerification(id) {
      this.loadingVerify = true
      var self = this
      var db = firebase.firestore()
      db.collection('organisations').doc(id).update({
          verified: false
        })
        .then(function () {
          self.loadingVerify = false
          self.dialog = false
          self.members.map(function (element) {
            if (element.id === id) {
              element.data.verified = false
            }
            return element
          })
          console.log('Verification Revoked')
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
    },
    verifyEntry(id) {
      this.loadingVerify = true
      var self = this
      var db = firebase.firestore()
      db.collection('organisations').doc(id).update({
          verified: true
        })
        .then(function () {
          self.loadingVerify = false
          self.dialog = false

          self.members.map(function (element) {
            if (element.id === id) {
              element.data.verified = true
            }
            return element
          })
          console.log('Set to verified!')
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
    },
    deleteEntry(id) {
      this.loadingDelete = true
      var self = this
      var db = firebase.firestore()
      db.collection('organisations').doc(id).delete()
        .then(function () {
          self.loadingDelete = false
          self.dialog = false
          self.members = self.members.filter(item => {
            return item.id !== id
          })
          console.log('Successfully deleted!')
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
    membersPaging() {
      let members = this.members
      if (members) {
        members = members.filter(item => {
          if (this.verified) {
            return item.data.hasOwnProperty('verified') && item.data.verified === true
          } else {
            return !item.data.hasOwnProperty('verified') || item.data.verified === false
          }
        })
        members = members.slice(0, this.paging)
      }
      return members
    }
  },
  watch: {
    '$route': 'handleDialogVisibility',
    dialog: function (state) {
      var self = this
      if (!state) {
        self.$router.go(-1)
      }
    }
  },
  i18n: {
    messages: {
      en: {
        memberSince: 'Member since',
        mapPlaceholder: 'Address unknown'
      },
      de: {
        memberSince: 'Mitglied seit',
        mapPlaceholder: 'Adresse unbekannt'
      }
    }
  }
}
</script>

<style lang="scss">
@import "members.scss";
</style>
