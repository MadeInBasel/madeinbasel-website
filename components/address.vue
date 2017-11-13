<template>
<div class="component-address">
  <div v-show="loading" class="spinner">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>

  <div v-if="results" class="proposition mb-4">
    <small v-if="!addressConfirmed">{{ $t('verify') }}</small>
    <div>
      <v-icon :color="addressConfirmed ? 'success': ''">place</v-icon><span v-text="results[0].formatted_address" class="mr-2"></span>
      <small v-if="addressConfirmed"><a @click="customAddress = true, addressConfirmed = '', $emit('discard')" href="javascript:;">{{ $t('buttons.edit') }}</a></small>
      <template v-if="!addressConfirmed">
        <v-btn color="success" flat small icon @click="confirmAddress(results[0])" :title="$t('buttons.yes')">
          <v-icon>done</v-icon>
        </v-btn>
        <v-btn color="error" flat small icon @click="results = null, customAddress = true, showError(true)" :title="$t('buttons.no')">
          <v-icon>close</v-icon>
        </v-btn>
      </template>
    </div>
  </div>

  <transition name="transition-up">
    <div v-show="customAddress">
      <v-text-field :label="$t('label')" ref="address" v-model.lazy="addressSearch" :rules="addressRules" v-on:input="updateMap"></v-text-field>
    </div>
  </transition>

</div>
</template>

<script>
import $ from 'jquery'
import _ from 'underscore'

export default {
  data() {
    return {
      loading: false,
      results: null,
      customAddress: false,
      addressSearch: '',
      addressConfirmed: '',
      addressError: false,
      addressRules: [
        (v) => (!v || !this.addressError) || this.$t('errorMessage')
      ]
    }
  },
  props: {
    nameQuery: {
      type: String,
      default: ''
    }
  },
  computed: {
    addressQuery() {
      return this.addressSearch ? this.addressSearch : this.nameQuery
    }
  },
  watch: {
    nameQuery: function () {
      this.updateMap()
    }
  },
  methods: {
    updateMap: _.debounce(function () {
      var self = this
      var components = '&components=country:Switzerland'
      var addressParam = '&address=' + encodeURIComponent(self.addressQuery) + '+Basel'
      var apiKey = '&key=AIzaSyAdBXoAqNNmpPjgqq09Zn9kMpBDMOyeMns'
      this.loading = true
      this.addressConfirmed = ''

      $.ajax({
        url: 'https://maps.googleapis.com/maps/api/geocode/json?' + components + addressParam + apiKey
      }).then(function (response) {
        if (response.results.length) {
          self.loading = false
          if (response.results[0].geometry.location_type === 'APPROXIMATE') {
            self.results = null
            if (self.customAddress) {
              self.showError(true)
            }
            self.customAddress = true
          } else {
            self.results = response.results
            self.showError(false)
          }
        }
      })
    }, 600),
    confirmAddress(item) {
      this.$emit('success', item)
      this.addressConfirmed = item
      this.customAddress = false
    },
    showError(state) {
      this.addressError = state
      this.$refs.address.validate()
    }
  },
  i18n: {
    messages: {
      en: {
        label: 'Address',
        verify: 'Is the following address correct?',
        errorMessage: 'Please provide exact address in Basel'
      },
      de: {
        label: 'Adresse',
        verify: 'Ist die folgende Adresse korrekt?',
        errorMessage: 'Bitte genau Adresse in Basel angeben'
      }
    }
  }
}
</script>

<style lang="scss">
@import "address.scss";
</style>
