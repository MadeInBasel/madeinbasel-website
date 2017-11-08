<template>
<div class="component-joinForm">
  <v-alert v-show="formSuccess" icon="done" color="success">
    {{ $t('form.successMessage') }}
  </v-alert>
  <v-alert v-show="firebaseError" icon="error" error>
    {{ $t('form.errorMessage') }}
  </v-alert>
  <v-form v-show="(!formSuccess && !firebaseError)" v-model="valid" ref="form">
    <v-stepper v-model="stepper" vertical>

      <v-stepper-step step="1" :complete="stepper > 1">{{ $t('form.step1.title') }}
        <small>{{ $t('form.step1.intro') }}</small>
      </v-stepper-step>
      <v-stepper-content step="1">
        <component-uploadcare v-on:success="setOrganisationImage" v-on:discard="resetOrganisationImage" :label="$t('buttons.uploadLogo')" crop="300x300 minimum" required />
        <v-text-field :label="$t('form.organisationName.label')" ref="organisationName" v-model="organisationName" :rules="organisationNameRules" required></v-text-field>
        <component-address v-on:success="setAddress" v-on:discard="resetAddress" />

        <v-flex xs9 sm6>
          <v-text-field :label="$t('form.website.label') + ' (URL)'" :rules="websiteRules" v-model="website"></v-text-field>
        </v-flex>

        <transition name="transition-up">
          <v-flex v-show="showInstagram" xs9 sm6>
            <v-text-field label="Instagram" prefix="@" v-model="social.instagram" append-icon="close" :append-icon-cb="() => (showInstagram = false, social.instagram = '')"></v-text-field>
          </v-flex>
        </transition>
        <transition name="transition-up">
          <v-flex v-show="showTwitter" xs9 sm6>
            <v-text-field label="Twitter" prefix="@" v-model="social.twitter" append-icon="close" :append-icon-cb="() => (showTwitter = false, social.twitter = '')"></v-text-field>
          </v-flex>
        </transition>
        <transition name="transition-up">
          <v-flex v-show="showFacebook" xs9 sm6>
            <v-text-field label="Facebook Page (URL)" :hint="'e.g. https://www.facebook.com/' + (organisationName ? usernamePreview(organisationName) : 'foo')" persistent-hint :rules="facebookRules" v-model="social.facebook" append-icon="close" :append-icon-cb="() => (showFacebook = false, social.facebook = '')"></v-text-field>
          </v-flex>
        </transition>
        <transition name="fade">
          <v-btn small round v-show="!showInstagram" class="caption mr-2" @click="showInstagram = true">+ Instagram</v-btn>
        </transition>
        <transition name="fade">
          <v-btn small round v-show="!showTwitter" class="caption mr-2" @click="showTwitter = true">+ Twitter</v-btn>
        </transition>
        <transition name="fade">
          <v-btn small round v-show="!showFacebook" class="caption mr-2" @click="showFacebook = true">+ Facebook</v-btn>
        </transition>

        <div class="text-xs-right">
          <v-btn color="primary" :disabled="validateStep1()" @click.native="stepper = 2">{{ $t('buttons.continue') }}</v-btn>
        </div>
      </v-stepper-content>

      <v-stepper-step step="2" :complete="stepper > 2">{{ $t('form.step2.title') }}
        <small>{{ $t('form.step2.intro') }}</small>
      </v-stepper-step>
      <v-stepper-content step="2">
        <div class="photos">
          <small>{{ $t('form.step2.photos') }}</small>
        </div>
        <component-uploadcare v-on:success="setOrganisationPhotos" multiple />

        <v-flex sm8>
          <v-select ref="foo" v-bind:items="industries" v-model="industry" :label="$t('form.industry.label')" autocomplete></v-select>
        </v-flex>

        <transition name="transition-up">
          <v-text-field v-show="showGerman" :label="$t('form.description.label.de')" v-model="description.de" :rules="descriptionRules" :counter="140"></v-text-field>
        </transition>
        <transition name="transition-up">
          <v-text-field v-show="showEnglish" :label="$t('form.description.label.en')" v-model="description.en" :rules="descriptionRules" :counter="140"></v-text-field>
        </transition>
        <transition name="fade">
          <v-btn small round v-show="!showGerman" class="caption mr-2" @click="showGerman = true">+ German</v-btn>
        </transition>
        <transition name="fade">
          <v-btn small round v-show="!showEnglish" class="caption mr-2" @click="showEnglish = true">+ Englisch</v-btn>
        </transition>

        <v-flex xs9 sm4>
          <v-radio-group v-model="employees" column :label="$t('form.employees.label')">
            <v-radio label="1-10" value="1-10"></v-radio>
            <v-radio label="11-100" value="11-100"></v-radio>
            <v-radio label="100+" value="100+"></v-radio>
          </v-radio-group>
        </v-flex>

        <v-checkbox :label="$t('form.featured.label')" :hint="$t('form.featured.hint')" persistent-hint v-model="featureRequest"></v-checkbox>
        <div class="text-xs-right">
          <v-btn flat @click.native="stepper = 1">{{ $t('buttons.back') }}</v-btn>
          <v-btn color="primary" @click.native="stepper = 3">{{ $t('buttons.continue') }}</v-btn>
        </div>

      </v-stepper-content>
      <v-stepper-step step="3">{{ $t('form.step3.title') }}
        <small>{{ $t('form.step3.intro') }}</small>
      </v-stepper-step>
      <v-stepper-content step="3">
        <component-login />
        <v-checkbox v-if="user" class="terms" :label="$t('form.terms.label')" :hint="$t('form.terms.hint')" persistent-hint v-model="terms" :rules="[v => !!v || $t('form.terms.error')]" required></v-checkbox>
        <div class="text-xs-right">
          <component-terms link />
          <v-btn flat @click.native="stepper = 2">{{ $t('buttons.back') }}</v-btn>
          <v-btn color="primary" @click="submit" :loading="stateLoading" :disabled="(!valid || stateLoading)">{{ $t('buttons.save') }}</v-btn>
        </div>
      </v-stepper-content>

    </v-stepper>
  </v-form>
</div>
</template>

<script>
import $ from 'jquery'
import uploadcare from '~/components/uploadcare.vue'
import address from '~/components/address.vue'
import login from '~/components/login.vue'
import terms from '~/components/terms.vue'

export default {
  components: {
    'component-uploadcare': uploadcare,
    'component-address': address,
    'component-login': login,
    'component-terms': terms
  },
  data() {
    return {
      formSuccess: false,
      firebaseError: false,
      stateLoading: false,
      stepper: 0,
      valid: false,
      organisationImage: '',
      organisationPhotos: '',
      organisationName: '',
      organisationNameRules: [
        (v) => !!v || this.$t('form.organisationName.error')
      ],
      employees: '1-10',
      employeesRules: [
        (v) => !!v || this.$t('form.employees.error')
      ],
      showInstagram: false,
      showTwitter: false,
      showFacebook: false,
      showEnglish: false,
      showGerman: false,
      social: {
        instagram: '',
        twitter: '',
        facebook: ''
      },
      facebookRules: [
        (v) => (!v || /http(s)?:\/\/(www\.)?facebook\.com\/\b([-a-zA-Z0-9@:%_\+.~#?&//=]+?)/.test(v)) || this.$t('form.website.error', { url: 'https://www.facebook.com/wiewaersmalmit/' })
      ],
      description: {
        en: '',
        de: ''
      },
      descriptionRules: [
        (v) => (!v || v.length <= 140) || this.$t('form.description.error')
      ],
      industry: null,
      industries: this.$t('industries'),
      address: {},
      website: '',
      websiteRules: [
        (v) => (!v || /http(s)?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(v)) || this.$t('form.website.error', { url: 'https://www.example.com' })
      ],
      featureRequest: false,
      terms: false
    }
  },
  mounted() {
    this.showEnglish = this.$i18n.locale === 'en'
    this.showGerman = this.$i18n.locale === 'de'
  },
  methods: {
    setOrganisationImage: function (data) {
      var imageData = data
      delete imageData.sourceInfo
      this.organisationImage = imageData
    },
    setOrganisationPhotos: function (data) {
      this.organisationPhotos = data
    },
    resetOrganisationImage: function () {
      this.organisationImage = ''
    },
    setAddress: function (data) {
      this.address.formatted_address = data.formatted_address
      this.address.lat = data.geometry.location.lat
      this.address.lng = data.geometry.location.lng
    },
    resetAddress: function () {
      this.address = {}
    },
    validateStep1() {
      return !this.organisationName || !this.organisationImage
    },
    submit() {
      if (this.user && this.$refs.form.validate()) {
        this.stateLoading = true
        var self = this
        var data = {
          timestamp: new Date(),
          organisationImage: this.organisationImage,
          organisationPhotos: this.organisationPhotos,
          organisationName: this.organisationName,
          address: this.address,
          employees: this.employees,
          description: this.description,
          industry: this.industries.findIndex(function (value) { return value === self.industry }),
          website: this.website,
          social: this.social,
          featureRequest: this.featureRequest,
          terms: this.terms,
          owner: this.user.uid,
          email: this.user.email,
          verified: false
        }
        self.firestore.collection('organisations').add(data)
          .then(function () {
            // Success
            self.formSuccess = true
            self.stateLoading = false
            self.$emit('success')
          })
          .then(function () {
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
            self.firebaseError = true
            console.error('Error adding document: ', error)
          })
      } else {
        console.error('Error submitting the form. Form invalid or no user.')
      }
    },
    clear() {
      this.$refs.form.reset()
    },
    usernamePreview(string) {
      var short = string.split(/[\s]/)
      return short.length ? short[0] : string
    }
  },
  computed: {
    firestore() {
      return this.$store.state.db
    },
    user() {
      return this.$store.state.user
    }
  },
  i18n: {
    messages: {
      en: {
        form: {
          step1: {
            title: 'Your Organisation',
            intro: 'Basic information about your organisation. Fields indicated with * are required.'
          },
          step2: {
            title: 'Your Mission',
            intro: 'Describe what you do.',
            photos: 'Show us your workplace wich a couple of images. First one will be used as the cover image.'
          },
          step3: {
            title: 'Account',
            intro: 'Let\'s keep in touch. Won\'t be public and we don\'t spam.'
          },
          organisationName: {
            label: 'Organisation Name',
            error: 'Name is required'
          },
          employees: {
            label: 'Number of employees',
            error: 'Number of employees is required'
          },
          website: {
            label: 'Website',
            error: 'A valid URL looks like this: {url}'
          },
          description: {
            label: {
              en: 'Description English',
              de: 'Description German'
            },
            error: 'Description must be less than 140 characters'
          },
          industry: {
            label: 'Industry'
          },
          featured: {
            label: 'Featured Story',
            hint: 'I want to get a personal portrayel on Made in Basel. Please contact me.'
          },
          terms: {
            label: 'I agree…',
            hint: '…to the terms (AGBs)',
            error: 'You must agree to continue!'
          },
          successMessage: 'Congratulations. Thank you for participating! Your information will be published within a couple days. Do you have ideas or suggestions or want to become a sponsor? Contact us! hello@madeinbasel.org',
          errorMessage: 'Something went wront. Please try again or contact us hello@madeinbasel.org'
        }
      },
      de: {
        form: {
          step1: {
            title: 'Deine Organisation',
            intro: 'Felder mit * sind zwingend erforderlich.'
          },
          step2: {
            title: 'Deine Mission',
            intro: 'Beschreibe deine Tätigkeit',
            photos: 'Zeig uns deinen Arbeitsplatz mit ein paar Photos. Das erste Bild wird als Cover benützt.'
          },
          step3: {
            title: 'Benutzerkonto',
            intro: 'Kontaktangaben. Wird nicht veröffentlicht.'
          },
          organisationName: {
            label: 'Name Organisation',
            error: 'Name ist erforderlich'
          },
          employees: {
            label: 'Anzahl Angestellte',
            error: 'Anzahl Angestellte ist erforderlich'
          },
          website: {
            label: 'Webseite',
            error: 'Ein Beispiel einer gültigen URL: {url}'
          },
          description: {
            label: {
              en: 'Beschreibung Englisch',
              de: 'Beschreibung Deutsch'
            },
            error: 'Beschreibung darf 140 Zeichen nicht überschreiten'
          },
          industry: {
            label: 'Branche'
          },
          featured: {
            label: 'Persönlichs Portrait',
            hint: 'Ich möchte ein persönliches Portrait auf Made in Basel. Bitte um Kontaktaufnahme'
          },
          terms: {
            label: 'Ich akzeptiere…',
            hint: '…die Allgemeinen Geschäftsbedingungen (AGB)',
            error: 'Akzeptiere die AGBs um fortzufahren!'
          },
          successMessage: 'Gratulation. Danke fürs Mitmachen! Deine Informationen werden in den nächsten Tagen publiziert. Hast du Ideen, Anregungen oder den Wunsch Sponsor zu werden? Melde dich! hello@madeinbasel.org',
          errorMessage: 'Es ist ein Fehler aufgetreten. Bitte versuche es erneut oder kontaktiere uns via Email: hello@madeinbasel.org'
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import "joinForm.scss";
</style>
