<template>
  <div v-if="memberData">
    <v-dialog v-if="memberData" v-model="dialogVisible" v-esc="closeMember" lazy max-width="600" content-class="dialog--custom dialog--member" :fullscreen="$vuetify.breakpoint.xsOnly">
      <div class="dialog-content">
        <v-carousel hide-controls v-if="memberData.hasOwnProperty('organisationPhotos') && memberData.organisationPhotos">
          <v-carousel-item v-for="(image,i) in memberData.organisationPhotos.count" :key="i" :src="memberData.organisationPhotos.cdnUrl + 'nth/' + i + '/-/preview/960x540/'"></v-carousel-item>
          <v-carousel-item v-if="memberData.address.lng && memberData.address.lat" :src="'https://maps.googleapis.com/maps/api/staticmap?'+ zoom + size + mapStyles + '&markers=' + memberData.address.lat + ',' + memberData.address.lng +'&key=' + googleAPIKey"></v-carousel-item>
        </v-carousel>
        <div v-else class="map">
          <div class="map-placeholder">
            <div>
              <v-icon>map</v-icon>
            </div>
            {{ $t('mapPlaceholder') }}
          </div>
          <img v-if="memberData.address.lng && memberData.address.lat" :src="'https://maps.googleapis.com/maps/api/staticmap?'+ zoom + size + mapStyles + '&markers=' + memberData.address.lat + ',' + memberData.address.lng +'&key=' + googleAPIKey" alt="Google Maps">
        </div>

        <div class="content">
          <div class="content-logo">
            <img :src="memberData.organisationImage.cdnUrl + '-/preview/300x300/'" :alt="memberData.organisationName">
          </div>
          <div class="content-name" :title="$t('memberSince') + ': ' + memberYear">
            <strong>{{ memberData.organisationName }}</strong>
          </div>
          <div class="content-industry" v-if="memberData.hasOwnProperty('industry') && memberData.industry >= 0">
            {{ $t('industries[' + `${memberData.industry}` + ']') }}
          </div>

          <div v-if="memberData.hasOwnProperty('description')" class="content-description abstract">
            <q v-if="memberData.description.en && ($i18n.locale === 'en' || isAuthor)">{{ memberData.description.en }}</q>
            <q v-if="memberData.description.de && ($i18n.locale === 'de' || isAuthor)">{{ memberData.description.de }}</q>
          </div>

          <div class="content-social">
            <v-btn flat icon v-if="memberData.hasOwnProperty('website') && memberData.website" :href="memberData.website" target="_blank" rel="noopener" :title="$t('buttons.visitWebsite')">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="#000000" d="M16.36,14C16.44,13.34 16.5,12.68 16.5,12C16.5,11.32 16.44,10.66 16.36,10H19.74C19.9,10.64 20,11.31 20,12C20,12.69 19.9,13.36 19.74,14M14.59,19.56C15.19,18.45 15.65,17.25 15.97,16H18.92C17.96,17.65 16.43,18.93 14.59,19.56M14.34,14H9.66C9.56,13.34 9.5,12.68 9.5,12C9.5,11.32 9.56,10.65 9.66,10H14.34C14.43,10.65 14.5,11.32 14.5,12C14.5,12.68 14.43,13.34 14.34,14M12,19.96C11.17,18.76 10.5,17.43 10.09,16H13.91C13.5,17.43 12.83,18.76 12,19.96M8,8H5.08C6.03,6.34 7.57,5.06 9.4,4.44C8.8,5.55 8.35,6.75 8,8M5.08,16H8C8.35,17.25 8.8,18.45 9.4,19.56C7.57,18.93 6.03,17.65 5.08,16M4.26,14C4.1,13.36 4,12.69 4,12C4,11.31 4.1,10.64 4.26,10H7.64C7.56,10.66 7.5,11.32 7.5,12C7.5,12.68 7.56,13.34 7.64,14M12,4.03C12.83,5.23 13.5,6.57 13.91,8H10.09C10.5,6.57 11.17,5.23 12,4.03M18.92,8H15.97C15.65,6.75 15.19,5.55 14.59,4.44C16.43,5.07 17.96,6.34 18.92,8M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
              </svg>
            </v-btn>
            <v-btn flat icon v-if="memberData.hasOwnProperty('address') && memberData.address.formatted_address" :href="'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(memberData.organisationName) + '+' + encodeURIComponent(memberData.address.formatted_address)" target="_blank" rel="noopener" title="Google Maps">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="#000000" d="M5,4A2,2 0 0,0 3,6V16.29L11.18,8.11C11.06,7.59 11,7.07 11,6.53C11,5.62 11.2,4.76 11.59,4H5M18,21A2,2 0 0,0 20,19V11.86C19.24,13 18.31,14.21 17.29,15.5L16.5,16.5L15.72,15.5C14.39,13.85 13.22,12.32 12.39,10.91C12.05,10.33 11.76,9.76 11.53,9.18L7.46,13.25L15.21,21H18M3,19A2,2 0 0,0 5,21H13.79L6.75,13.96L3,17.71V19M16.5,15C19.11,11.63 21,9.1 21,6.57C21,4.05 19,2 16.5,2C14,2 12,4.05 12,6.57C12,9.1 13.87,11.63 16.5,15M18.5,6.5A2,2 0 0,1 16.5,8.5A2,2 0 0,1 14.5,6.5A2,2 0 0,1 16.5,4.5A2,2 0 0,1 18.5,6.5Z" />
              </svg>
            </v-btn>
            <v-btn flat icon v-if="memberData.social.hasOwnProperty('twitter') && memberData.social.twitter" :href="'https://twitter.com/' + memberData.social.twitter" target="_blank" rel="noopener" title="Twitter">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="#000000" d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z" />
              </svg>
            </v-btn>
            <v-btn flat icon v-if="memberData.social.hasOwnProperty('facebook') && memberData.social.facebook" :href="memberData.social.facebook" target="_blank" rel="noopener" title="Facebook">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="#000000" d="M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M18,5H15.5A3.5,3.5 0 0,0 12,8.5V11H10V14H12V21H15V14H18V11H15V9A1,1 0 0,1 16,8H18V5Z" />
              </svg>
            </v-btn>
            <v-btn flat icon v-if="memberData.social.hasOwnProperty('instagram') && memberData.social.instagram" :href="'https://instagram.com/' + memberData.social.instagram" target="_blank" rel="noopener" title="Instagram">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="#000000" d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" />
              </svg>
            </v-btn>
          </div>
          <div v-if="isAuthor" class="admin" :class="{danger: confirmDelete}">
            <div class="admin-title">Admin</div>
            <div v-if="confirmDelete">
              <div class="abstract">
                {{ $t('admin.confirmDelete') }}
              </div>
              <v-btn v-if="isAuthor" color="error" :loading="loadingDelete" :disabled="loadingDelete" @click="deleteEntry(memberId)">
                {{ $t('buttons.confirm') }}
              </v-btn>
              <v-btn v-if="isAuthor" color="primary" @click="confirmDelete = false">
                {{ $t('buttons.cancel') }}
              </v-btn>
            </div>

            <div v-else>
              <v-btn v-if="isAuthor" color="error" @click="confirmDelete = true">
                {{ $t('buttons.delete') }}
              </v-btn>
              <v-btn v-if="user.isAdmin && !memberData.verified" color="primary" :loading="loadingVerify" :disabled="loadingVerify" @click="verifyEntry(memberId)">
                {{ $t('buttons.verify') }}
              </v-btn>
              <v-btn v-if="user.isAdmin && memberData.verified" outline :loading="loadingVerify" :disabled="loadingVerify" @click="revokeVerification(memberId)">
                {{ $t('buttons.revokeVerification') }}
              </v-btn>
            </div>
          </div>
        </div>
      </div>
      <v-btn class="btn-x" fab small @click="closeMember()">
        <v-icon>close</v-icon>
      </v-btn>
      <div class="dialog-footer">
        <v-btn class="btn-close" small flat @click="closeMember()">
          {{ $t('buttons.close') }}
        </v-btn>
      </div>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    props: {
      memberId: {type: String}
    },
    data: () => ({
      memberData: null,
      dialogVisible: true,
      googleAPIKey: 'AIzaSyCS-zAs7ur43P-FaPYuFzTjbMZxUj8bDek',
      zoom: 'zoom=14',
      size: '&size=640x360',
      mapStyles: '&format=png&maptype=roadmap&style=feature:landscape%7Celement:geometry%7Ccolor:0xffffff&style=feature:poi.attraction%7Cvisibility:off&style=feature:poi.business%7Cvisibility:off&style=feature:poi.government%7Cvisibility:off&style=feature:poi.medical%7Cvisibility:off&style=feature:poi.place_of_worship%7Cvisibility:off&style=feature:poi.school%7Cvisibility:off&style=feature:poi.sports_complex%7Cvisibility:off&style=feature:road%7Celement:labels.icon%7Cvisibility:off&style=feature:road.arterial%7Celement:geometry%7Ccolor:0xdddddd&style=feature:road.arterial%7Celement:labels.icon%7Cvisibility:off&style=feature:road.highway%7Celement:geometry%7Ccolor:0xdddddd&style=feature:road.highway%7Celement:labels.icon%7Cvisibility:off&style=feature:road.local%7Celement:geometry%7Ccolor:0xeeeeee',
      loadingVerify: false,
      loadingDelete: false,
      confirmDelete: false
    }),
    async mounted () {
      let document = await this.firestore.doc(`organisations/${this.memberId}`).get()
      this.memberData = document.data()
    },
    computed: {
      user () {
        return this.$store.state.user
      },
      firestore () {
        return this.$store.state.db
      },
      memberYear () {
        let year = ''
        if (this.memberData) {
          let date = new Date(this.memberData.timestamp)
          year = date.getFullYear()
        }
        return year
      },
      isAuthor () {
        return this.user && (this.user.isAdmin || (this.memberData && this.user.uid === this.memberData.owner))
      }
    },
    watch: {
      dialogVisible (value) {
        if (value === false) {
          this.closeMember()
        }
      }
    },
    methods: {
      closeMember () {
        this.$router.go(-1)
      },
      revokeVerification (id) {
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
      verifyEntry (id) {
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
      deleteEntry (id) {
        this.loadingDelete = true
        var self = this
        this.firestore.collection('organisations').doc(id).delete()
          .then(function () {
            self.loadingDelete = false
            self.confirmDelete = false
            self.dialog = false
            self.members = self.members.filter(item => {
              return memberId !== id
            })
            console.log('Successfully deleted!')
          })
          .catch(function (error) {
            console.error('Error writing document: ', error)
          })
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
  @import "member.scss";
</style>
