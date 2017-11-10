<template>
<div class="component-address">
  <div v-if="!address" class="address-preview">
    <div v-show="addressProposition" class="proposition">
      <div><small><strong>{{ $t('proposition') }}</strong></small></div>
      <span v-text="addressProposition.formatted_address" class="mr-2"></span>
      <v-btn color="primary" round small @click="acceptAddress()">{{ $t('buttons.accept') }}</v-btn>
    </div>
    <v-text-field :label="$t('label')" ref="address" v-model.lazy="addressSearch" :rules="addressRules" v-on:input="updateMap"></v-text-field>
  </div>
  <div v-else class="address-accepted">
    <span v-text="addressProposition.formatted_address" class="mr-2"></span>
    <v-btn round small @click="editAddress()">{{ $t('buttons.edit') }}</v-btn>
  </div>
</div>
</template>

<script>
import $ from 'jquery'
import _ from 'underscore'

export default {
  data() {
    return {
      addressSearch: '',
      addressProposition: '',
      address: '',
      addressError: false,
      addressRules: [
        (v) => (!v || !this.addressError) || this.$t('errorMessage')
      ]
    }
  },
  methods: {
    updateMap: _.debounce(function () {
      var self = this
      var components = 'components=locality:Basel|country:Switzerland'
      var addressParam = '&address=' + encodeURIComponent(self.addressSearch)
      var apiKey = '&key=AIzaSyAdBXoAqNNmpPjgqq09Zn9kMpBDMOyeMns'

      $.ajax({
        url: 'https://maps.googleapis.com/maps/api/geocode/json?' + components + addressParam + apiKey
      }).then(function (response) {
        if (response.results.length) {
          if (response.results.length > 1) {
            self.validateAddress(true)
          } else {
            var result = response.results[0]
            if (result.geometry.location_type === 'APPROXIMATE') {
              self.validateAddress(true)
            } else {
              self.validateAddress(false)
              self.addressProposition = result
            }
          }
        }
      })
    }, 600),
    validateAddress(state) {
      this.addressError = state
      this.$refs.address.validate()
    },
    editAddress() {
      this.address = ''
      this.$emit('discard')
    },
    acceptAddress() {
      this.address = this.addressProposition
      this.$emit('success', this.address)
    }
  },
  i18n: {
    messages: {
      en: {
        label: 'Address',
        proposition: 'Is this correct?',
        errorMessage: 'Please provide exact address in Basel'
      },
      de: {
        label: 'Adresse',
        proposition: 'Ist folgende Adresse korrekt?',
        errorMessage: 'Bitte genau Adresse in Basel angeben'
      }
    }
  }
}
</script>
