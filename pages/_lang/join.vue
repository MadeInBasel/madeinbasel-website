<template>
<div id="join">
  <section class="join">
    <div class="section-inner boundaries">
      <h1>{{ $t('pages.join') }}</h1>
      <div class="abstract" v-html="$t('abstract')"></div>

      <v-alert v-show="formSuccess" icon="done" success>
        {{ $t('form.successMessage') }}
      </v-alert>
      <v-form v-show="!formSuccess" v-model="valid" ref="form">
        <v-stepper v-model="stepper" vertical>

          <v-stepper-step step="1" :complete="stepper > 1">{{ $t('form.step1.title') }}
            <small>{{ $t('form.step1.intro') }}</small>
          </v-stepper-step>
          <v-stepper-content step="1">
            <component-uploadcare v-on:success="setOrganisationImage" v-on:discard="resetOrganisationImage" />
            <v-text-field label="Organisation Name" ref="organisationName" v-model="organisationName" :rules="organisationNameRules" required></v-text-field>
            <v-text-field label="Address" v-model="address"></v-text-field>
            <v-text-field label="ZIP" v-model="zip" :rules="zipRules" :counter="4"></v-text-field>
            <div class="text-xs-right">
              <v-btn primary :disabled="validateStep1()" @click.native="stepper = 2">{{ $t('buttons.continue') }}</v-btn>
            </div>
          </v-stepper-content>

          <v-stepper-step step="2" :complete="stepper > 2">{{ $t('form.step2.title') }}
            <small>{{ $t('form.step2.intro') }}</small>
          </v-stepper-step>
          <v-stepper-content step="2">
            <v-text-field label="Website" :rules="websiteRules" v-model="website"></v-text-field>
            <v-text-field label="Description (English)" v-model="description.en" :rules="descriptionRules" :counter="140"></v-text-field>
            <v-text-field label="Description (Deutsch)" v-model="description.de" :rules="descriptionRules" :counter="140"></v-text-field>
            <v-checkbox label="Featured Story" hint="I want to get a personal portrayel on Made in Basel. Please contact me." :persistent-hint=true v-model="featureRequest"></v-checkbox>
            <div class="text-xs-right">
              <v-btn flat @click.native="stepper = 1">{{ $t('buttons.back') }}</v-btn>
              <v-btn primary @click.native="stepper = 3">{{ $t('buttons.continue') }}</v-btn>
            </div>

          </v-stepper-content>
          <v-stepper-step step="3">{{ $t('form.step3.title') }}
            <small>{{ $t('form.step3.intro') }}</small>
          </v-stepper-step>
          <v-stepper-content step="3">
            <v-text-field label="E-mail" v-model="email" :rules="emailRules" required></v-text-field>
            <v-checkbox label="I agree to the terms (AGBs)." v-model="terms" :rules="[v => !!v || 'You must agree to continue!']" required></v-checkbox>
            <div class="text-xs-right">
              <v-btn flat @click.native="stepper = 2">{{ $t('buttons.back') }}</v-btn>
              <v-btn @click="submit" :loading="stateLoading" :disabled="(!valid || stateLoading)">{{ $t('buttons.save') }}</v-btn>
            </div>
          </v-stepper-content>

        </v-stepper>
      </v-form>
    </div>
  </section>
</div>
</template>

<script>
import $ from 'jquery'
import uploadcare from '~/components/uploadcare.vue'
const firebase = require('firebase')
require('firebase/firestore')

export default {
  components: {
    'component-uploadcare': uploadcare
  },
  head() {
    return {
      title: this.$t('pages.join')
    }
  },
  data() {
    return {
      formSuccess: false,
      stateLoading: false,
      stepper: 0,
      valid: false,
      organisationImage: '',
      organisationName: '',
      organisationNameRules: [
        (v) => !!v || 'Name is required'
      ],
      description: {
        en: '',
        de: ''
      },
      descriptionRules: [
        (v) => (!v || v.length <= 140) || 'Description must be less than 140 characters'
      ],
      address: '',
      zip: '',
      zipRules: [
        (v) => (!v || /^40(01|05|10|5[1-9])$/.test(v)) || 'Zip Code must have 4 digits and be in Basel'
      ],
      website: '',
      websiteRules: [
        (v) => (!v || /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(v)) || 'Website must be valid'
      ],
      email: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      featureRequest: false,
      terms: false
    }
  },
  methods: {
    setOrganisationImage: function (data) {
      var imageData = data
      delete imageData.sourceInfo
      this.organisationImage = imageData
    },
    resetOrganisationImage: function () {
      this.organisationImage = ''
    },
    validateStep1() {
      return !this.organisationName || !this.organisationImage
    },
    submit() {
      if (this.$refs.form.validate()) {
        this.stateLoading = true
        var self = this
        var config = {
          apiKey: 'AIzaSyCaTOBcKbkvUq4mKbSvqHYy0uxzuL-t03E',
          authDomain: 'madeinbasel-1505858460376.firebaseapp.com',
          databaseURL: 'https://madeinbasel-1505858460376.firebaseio.com',
          projectId: 'madeinbasel-1505858460376',
          storageBucket: 'madeinbasel-1505858460376.appspot.com',
          messagingSenderId: '372112151128'
        }
        if (!firebase.apps.length) {
          firebase.initializeApp(config)
        }
        var db = firebase.firestore()
        var data = {
          organisationImage: this.organisationImage,
          organisationName: this.organisationName,
          description: this.description,
          address: this.address,
          zip: this.zip,
          website: this.website,
          email: this.email,
          featureRequest: this.featureRequest,
          terms: this.terms
        }

        db.collection('organisations').add(data)
          .then(function () {
            // Success
            self.formSuccess = true
            self.stateLoading = false
          }).then(function () {
            $.ajax({
              url: 'https://formspree.io/hello@madeinbasel.org',
              method: 'POST',
              data: {
                _subject: 'New Member - Made in Basel',
                data: data,
                dataType: 'json'
              }
            })
          })
          .catch(function (error) {
            console.error('Error adding document: ', error)
          })
      }
    },
    clear() {
      this.$refs.form.reset()
    }
  },
  i18n: {
    messages: {
      en: {
        abstract: 'It takes only 2 minutes, it\'s free forever and there are no strings attached. Sign up and to get represented on the website, and be able to download the <strong>Made in Basel</strong> label files to use at your disposal.',
        form: {
          step1: {
            title: 'Your Organisation',
            intro: 'Basic information about your organisation. Fields indicated with * are required.'
          },
          step2: {
            title: 'Your Mission',
            intro: 'Describe what you do'
          },
          step3: {
            title: 'Contact Info',
            intro: 'Let\'s keep in touch. We don\'t spam.'
          },
          successMessage: 'Thank you!'
        }
      },
      de: {
        form: {
          successMessage: 'Danke!'
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import 'join.scss';
</style>
