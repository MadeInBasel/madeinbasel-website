<template>
<v-layout class="members" wrap>
  <v-flex xs6 sm3 v-for="(item,i) in memberPaging(paging)" :key="i">
    <v-dialog lazy v-model="item.dialog" width="600" content-class="dialog--custom">
      <nuxt-link class="member" v-ripple slot="activator" alt="Preview" to>
        <img :src="'/images/members/' +item.image" :alt="item.name">
      </nuxt-link>
      <div class="map">
        <img :src="'https://maps.googleapis.com/maps/api/staticmap?zoom=14&size=640x300' + mapStyles + '&markers=' + item.longitude + ',' + item.latitude +'&key=' + googleAPIKey" alt="Google Maps">
      </div>
      <div class="dialog-content">
        <div class="logo">
          <img :src="'/images/members/' +item.image" :alt="item.name">
        </div>
        <div class="description">
          {{ item.description }}
        </div>
        <div>
          <small>{{ $t('memberSince')}}: {{ item.memberSince }}</small>
        </div>
        <div v-if="item.hasOwnProperty('website')" class="text-xs-center">
          <v-btn flat outline :href="item.website" target="_blank ">{{ $t('buttons.visitWebsite') }}</v-btn>
        </div>
      </div>
    </v-dialog>
  </v-flex>
</v-layout>
</template>

<script>
import { members } from '~/assets/members.js'

export default {
  props: {
    paging: {
      type: String,
      default: 100
    }
  },
  data() {
    return {
      googleAPIKey: 'AIzaSyCS-zAs7ur43P-FaPYuFzTjbMZxUj8bDek',
      members: members,
      mapStyles: '&format=png&maptype=roadmap&style=feature:landscape%7Celement:geometry%7Ccolor:0xffffff&style=feature:poi.attraction%7Cvisibility:off&style=feature:poi.business%7Cvisibility:off&style=feature:poi.government%7Cvisibility:off&style=feature:poi.medical%7Cvisibility:off&style=feature:poi.place_of_worship%7Cvisibility:off&style=feature:poi.school%7Cvisibility:off&style=feature:poi.sports_complex%7Cvisibility:off&style=feature:road%7Celement:labels.icon%7Cvisibility:off&style=feature:road.arterial%7Celement:geometry%7Ccolor:0xdddddd&style=feature:road.arterial%7Celement:labels.icon%7Cvisibility:off&style=feature:road.highway%7Celement:geometry%7Ccolor:0xdddddd&style=feature:road.highway%7Celement:labels.icon%7Cvisibility:off&style=feature:road.local%7Celement:geometry%7Ccolor:0xeeeeee'
    }
  },
  methods: {
    memberPaging: function (paging) {
      return this.members.filter(function (item, index) {
        return index < paging
      })
    }
  },
  i18n: {
    messages: {
      en: {
        memberSince: 'Member since'
      },
      de: {
        memberSince: 'Mitglied seit'
      }
    }
  }
}
</script>

<style lang="scss">
@import "members.scss";
</style>
