<template>
<div class="component-members" @keyup.esc="dialog = false">
  <div v-if="user && user.isAdmin" class="admin-zone text-xs-center">
    <v-btn color="primary" :loading="!ready" :disabled="!ready" @click="getMembers()">
      <v-icon>cached</v-icon>Reload Members</v-btn>
  </div>
  <div v-show="!ready" class="spinner">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>

  <div v-if="(ready && !membersPaging.length)">
    <div class="emptyPaging text-xs-center">
      {{ $t('error.empty')}}
    </div>
  </div>
  <transition-group v-show="ready" name="transition-down" tag="div" class="layout members wrap">
    <v-flex v-show="ready" xs6 sm4 md3 v-for="(item, index) in membersPaging" :key="item.id">
      <nuxt-link class="member" v-ripple :to="{ path: $route.path + '#' + `${item.id}`}">
        <div class="member-cover">
          <div class="icon-container">
            <v-icon dark>photo</v-icon>
          </div>
          <img v-if="item.data.hasOwnProperty('organisationPhotos') && item.data.organisationPhotos" :src="item.data.organisationPhotos.cdnUrl + 'nth/0/-/preview/640x360/'" alt="Cover">
        </div>
        <div class="member-info">
          <img class="image" :src="item.data.organisationImage.cdnUrl + '-/preview/200x200/'" :alt="item.data.organisationName">
          <div class="name">
            <strong>{{ item.data.organisationName }}</strong>
          </div>
        </div>
      </nuxt-link>
    </v-flex>
  </transition-group>

  <v-dialog v-if="item.data" lazy v-model="dialog" max-width="600" content-class="dialog--custom" :fullscreen="$vuetify.breakpoint.xsOnly">
    <div class="dialog-content">
      <v-carousel hide-controls v-if="item.data.hasOwnProperty('organisationPhotos') && item.data.organisationPhotos">
        <v-carousel-item v-for="(image,i) in item.data.organisationPhotos.count" :key="i" :src="item.data.organisationPhotos.cdnUrl + 'nth/' + i + '/-/preview/960x540/'"></v-carousel-item>
        <v-carousel-item v-if="item.data.address.lng && item.data.address.lat" :src="'https://maps.googleapis.com/maps/api/staticmap?'+ zoom + size + mapStyles + '&markers=' + item.data.address.lat + ',' + item.data.address.lng +'&key=' + googleAPIKey"></v-carousel-item>
      </v-carousel>
      <div v-else class="map">
        <div class="map-placeholder">
          <div>
            <v-icon>map</v-icon>
          </div>
          {{ $t('mapPlaceholder') }}
        </div>
        <img v-if="item.data.address.lng && item.data.address.lat" :src="'https://maps.googleapis.com/maps/api/staticmap?'+ zoom + size + mapStyles + '&markers=' + item.data.address.lat + ',' + item.data.address.lng +'&key=' + googleAPIKey" alt="Google Maps">
      </div>

      <div class="content">
        <div class="content-logo">
          <img :src="item.data.organisationImage.cdnUrl + '-/preview/300x300/'" :alt="item.data.organisationName">
        </div>
        <div class="content-name">
          <strong>{{ item.data.organisationName }}</strong>
        </div>
        <div v-if="item.data.hasOwnProperty('industry') && item.data.industry >= 0">
          {{ $t('industries[' + `${item.data.industry}` + ']') }}
        </div>
        <div v-if="item.data.hasOwnProperty('timestamp')">
          <small>{{ $t('memberSince') }}: {{ getYear() }}</small>
        </div>
        <div v-if="item.data.hasOwnProperty('description')" class="content-description abstract">
          <q v-if="item.data.description.en && ($i18n.locale === 'en' || user)">{{ item.data.description.en }}</q>
          <q v-if="item.data.description.de && ($i18n.locale === 'de' || user)">{{ item.data.description.de }}</q>
        </div>

        <div class="content-buttons">
          <div v-if="item.data.hasOwnProperty('website') && item.data.website">
            <v-btn color="primary" :href="item.data.website" target="_blank" rel="noopener">{{ $t('buttons.visitWebsite') }}</v-btn>
          </div>
          <div v-if="item.data.hasOwnProperty('address') && item.data.address.formatted_address">
            <v-btn flat :href="'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(item.data.organisationName) + '+' + encodeURIComponent(item.data.address.formatted_address)" target="_blank" rel="noopener">{{ $t('buttons.map') }}</v-btn>
          </div>
        </div>

        <div class="content-social" v-if="item.data.hasOwnProperty('social')">
          <a v-if="item.data.social.hasOwnProperty('instagram') && item.data.social.instagram" :href="'https://instagram.com/' + item.data.social.instagram" target="_blank" rel="noopener">Instagram</a>
          <a v-if="item.data.social.hasOwnProperty('twitter') && item.data.social.twitter" :href="'https://twitter.com/' + item.data.social.twitter" target="_blank" rel="noopener">Twitter</a>
          <a v-if="item.data.social.hasOwnProperty('facebook') && item.data.social.facebook" :href="item.data.social.facebook" target="_blank" rel="noopener">Facebook</a>
        </div>

        <div v-if="user && (user.uid === item.data.owner || user.isAdmin)" class="admin" :class="{danger: confirmDelete}">
          <div class="admin-title">Admin</div>
          <div v-if="confirmDelete">
            <div class="abstract">
              {{ $t('admin.confirmDelete') }}
            </div>
            <v-btn v-if="user.uid === item.data.owner || user.isAdmin" color="error" :loading="loadingDelete" :disabled="loadingDelete" @click="deleteEntry(item.id)">
              {{ $t('buttons.confirm') }}</v-btn>
            <v-btn v-if="user.uid === item.data.owner || user.isAdmin" color="primary" @click="confirmDelete = false">
              {{ $t('buttons.cancel') }}</v-btn>
          </div>

          <div v-else>
            <v-btn v-if="user.uid === item.data.owner || user.isAdmin" color="error" @click="confirmDelete = true">
              {{ $t('buttons.delete') }}</v-btn>
            <v-btn v-if="user.isAdmin && !item.data.verified" color="primary" :loading="loadingVerify" :disabled="loadingVerify" @click="verifyEntry(item.id)">
              {{ $t('buttons.verify') }}</v-btn>
            <v-btn v-if="user.isAdmin && item.data.verified" outline :loading="loadingVerify" :disabled="loadingVerify" @click="revokeVerification(item.id)">
              {{ $t('buttons.revokeVerification') }}</v-btn>
          </div>
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
import _ from 'underscore'

export default {
  mounted() {
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
    },
    isOwner: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialog: false,
      item: {},
      ready: false,
      members: [],
      googleAPIKey: 'AIzaSyCS-zAs7ur43P-FaPYuFzTjbMZxUj8bDek',
      zoom: 'zoom=14',
      size: '&size=640x360',
      mapStyles: '&format=png&maptype=roadmap&style=feature:landscape%7Celement:geometry%7Ccolor:0xffffff&style=feature:poi.attraction%7Cvisibility:off&style=feature:poi.business%7Cvisibility:off&style=feature:poi.government%7Cvisibility:off&style=feature:poi.medical%7Cvisibility:off&style=feature:poi.place_of_worship%7Cvisibility:off&style=feature:poi.school%7Cvisibility:off&style=feature:poi.sports_complex%7Cvisibility:off&style=feature:road%7Celement:labels.icon%7Cvisibility:off&style=feature:road.arterial%7Celement:geometry%7Ccolor:0xdddddd&style=feature:road.arterial%7Celement:labels.icon%7Cvisibility:off&style=feature:road.highway%7Celement:geometry%7Ccolor:0xdddddd&style=feature:road.highway%7Celement:labels.icon%7Cvisibility:off&style=feature:road.local%7Celement:geometry%7Ccolor:0xeeeeee',
      loadingVerify: false,
      loadingDelete: false,
      confirmDelete: false
    }
  },
  methods: {
    getMembers: function () {
      this.ready = false
      var self = this
      this.firestore.collection('organisations')
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
      this.firestore.collection('organisations').doc(id).update({
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
      this.firestore.collection('organisations').doc(id).update({
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
      this.firestore.collection('organisations').doc(id).delete()
        .then(function () {
          self.loadingDelete = false
          self.confirmDelete = false
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
    firestore() {
      return this.$store.state.db
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
        if (this.isOwner && this.user) {
          members = members.filter(item => {
            return item.data.hasOwnProperty('owner') && item.data.owner === this.user.uid
          })
        }
        members = members.slice(0, this.paging)
      }
      this.$emit('count', members.length)
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
        mapPlaceholder: 'Address unknown',
        admin: {
          confirmDelete: 'Are you sure? Your listing will be removed permanently.'
        }
      },
      de: {
        memberSince: 'Mitglied seit',
        mapPlaceholder: 'Adresse unbekannt',
        admin: {
          confirmDelete: 'Bist du sicher? Dein Eintrag wird permanent gelöscht.'
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import "members.scss";
</style>
