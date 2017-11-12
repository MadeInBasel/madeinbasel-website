<template>
  <div class="component-members">
    <div v-if="user && user.isAdmin" class="admin-zone text-xs-center">
      <v-btn color="primary" :loading="!members" :disabled="!members" @click="loadMembers()">
        <v-icon>cached</v-icon>
        Reload Members
      </v-btn>
    </div>
    <div v-show="!members" class="spinner">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>

    <div v-if="(members === [])">
      <div class="emptyPaging text-xs-center">
        {{ $t('error.empty')}}
      </div>
    </div>
    <transition-group v-show="members" name="transition-down" tag="div" class="layout members wrap">
      <v-flex v-show="members" xs6 sm4 md3 v-for="(item, index) in members" :key="item.id">
        <nuxt-link class="member" v-ripple :to="{ params: {memberId: item.id}}">
          <div class="member-cover">
            <div class="icon-container">
              <v-icon dark>photo</v-icon>
            </div>
            <img v-if="item.data.hasOwnProperty('organisationPhotos') && item.data.organisationPhotos" :src="item.data.organisationPhotos.cdnUrl + 'nth/0/-/resize/400x/'" alt="Cover">
          </div>
          <div class="member-info">
            <img class="image" :src="item.data.organisationImage.cdnUrl + '-/preview/160x160/'" :alt="item.data.organisationName">
            <div class="intro">
              <div class="intro-name">
                <strong>{{ item.data.organisationName }}</strong>
              </div>
              <div class="intro-industry">
                <span v-if="item.data.hasOwnProperty('industry') && item.data.industry >= 0">{{ $t('industries[' + `${item.data.industry}` + ']') }}</span>&nbsp;
              </div>
            </div>
          </div>
        </nuxt-link>
      </v-flex>
    </transition-group>

    <nuxt-child :key="$route.params.memberId" v-if="$route.params.memberId" />
  </div>
</template>

<script>
  import _ from 'underscore'

  export default {
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
    data () {
      return {
        members: null
      }
    },
    async mounted () {
      await this.loadMembers()
    },
    computed: {
      user () {
        return this.$store.state.user
      },
      firestore () {
        return this.$store.state.db
      }
    },
    methods: {
      async loadMembers () {
        this.members = await this.getMembers()
      },
      async getMembers () {
        let documents = await this.firestore.collection('organisations').get()
        let members = documents.docs.map((item) => ({
          id: item.id,
          data: item.data()
        }))
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
        this.$emit('count', members.length)
        return members
      }
    }
  }
</script>

<style lang="scss">
  @import "members.scss";
</style>
