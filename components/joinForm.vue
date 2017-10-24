<template>
<div class="component-joinForm">
  <v-alert v-show="formSuccess" icon="done" success>
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
        <component-uploadcare v-on:success="setOrganisationImage" v-on:discard="resetOrganisationImage" />
        <v-text-field :label="$t('form.organisationName.label')" ref="organisationName" v-model="organisationName" :rules="organisationNameRules" required></v-text-field>
        <component-address v-on:success="setAddress" v-on:discard="resetAddress" />
        <v-flex xs9 sm4>
          <v-text-field :label="$t('form.employees.label')" v-model="employees" type="number"></v-text-field>
        </v-flex>
        <div class="text-xs-right">
          <v-btn primary :disabled="validateStep1()" @click.native="stepper = 2">{{ $t('buttons.continue') }}</v-btn>
        </div>
      </v-stepper-content>

      <v-stepper-step step="2" :complete="stepper > 2">{{ $t('form.step2.title') }}
        <small>{{ $t('form.step2.intro') }}</small>
      </v-stepper-step>
      <v-stepper-content step="2">
        <v-flex xs9 sm6>
          <v-text-field :label="$t('form.website.label')" :rules="websiteRules" v-model="website"></v-text-field>
        </v-flex>
        <v-text-field :label="$t('form.description.label.de')" v-model="description.de" :rules="descriptionRules" :counter="140"></v-text-field>
        <v-text-field :label="$t('form.description.label.en')" v-model="description.en" :rules="descriptionRules" :counter="140"></v-text-field>
        <v-flex sm8>
          <v-select ref="foo" v-bind:items="industries" v-model="industry" :label="$t('form.industry.label')" autocomplete></v-select>
        </v-flex>
        <v-checkbox :label="$t('form.featured.label')" :hint="$t('form.featured.hint')" :persistent-hint=true v-model="featureRequest"></v-checkbox>
        <div class="text-xs-right">
          <v-btn flat @click.native="stepper = 1">{{ $t('buttons.back') }}</v-btn>
          <v-btn primary @click.native="stepper = 3">{{ $t('buttons.continue') }}</v-btn>
        </div>

      </v-stepper-content>
      <v-stepper-step step="3">{{ $t('form.step3.title') }}
        <small>{{ $t('form.step3.intro') }}</small>
      </v-stepper-step>
      <v-stepper-content step="3">
        <v-text-field :label="$t('form.email.label')" v-model="email" :rules="emailRules" required></v-text-field>
        <v-checkbox :label="$t('form.terms.label')" :hint="$t('form.terms.hint')" persistent-hint v-model="terms" :rules="[v => !!v || $t('form.terms.error')]" required></v-checkbox>
        <component-terms link />
        <div class="text-xs-right">
          <v-btn flat @click.native="stepper = 2">{{ $t('buttons.back') }}</v-btn>
          <v-btn primary @click="submit" :loading="stateLoading" :disabled="(!valid || stateLoading)">{{ $t('buttons.save') }}</v-btn>
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
import terms from '~/components/terms.vue'

export default {
  components: {
    'component-uploadcare': uploadcare,
    'component-address': address,
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
      organisationName: '',
      organisationNameRules: [
        (v) => !!v || this.$t('form.organisationName.error')
      ],
      employees: null,
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
        (v) => (!v || /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(v)) || this.$t('form.website.error')
      ],
      email: '',
      emailRules: [
        (v) => !!v || this.$t('form.email.error.required'),
        (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || this.$t('form.email.error.valid')
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
      if (this.$refs.form.validate()) {
        this.stateLoading = true
        var self = this
        var data = {
          timestamp: new Date(),
          organisationImage: this.organisationImage,
          organisationName: this.organisationName,
          address: this.address,
          employees: this.employees,
          description: this.description,
          industry: this.industries.findIndex(function (value) { return value === self.industry }),
          website: this.website,
          email: this.email,
          featureRequest: this.featureRequest,
          terms: this.terms,
          verified: false
        }
        this.firestore.collection('organisations').add(data)
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
            self.firebaseError = true
            console.error('Error adding document: ', error)
          })
      }
    },
    clear() {
      this.$refs.form.reset()
    }
  },
  computed: {
    firestore() {
      return this.$store.state.db
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
            intro: 'Describe what you do'
          },
          step3: {
            title: 'Contact Info',
            intro: 'Let\'s keep in touch. Won\'t be public and we don\'t spam.'
          },
          organisationName: {
            label: 'Organisation Name',
            error: 'Name is required'
          },
          employees: {
            label: 'Number of employees'
          },
          website: {
            label: 'Website',
            error: 'Website must be valid'
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
          email: {
            label: 'E-mail',
            error: {
              required: 'E-mail is required',
              valid: 'E-mail must be valid'
            }
          },
          terms: {
            label: 'Terms',
            hint: 'I agree to the terms (AGBs)',
            error: 'You must agree to continue!'
          },
          successMessage: 'Congratulations. Thank you for participating! Your information will be published within a couple days. Ideas, suggestions or want to become a sponsor? Contact us! hello@madeinbasel.org',
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
            intro: 'Beschreiben deine Tätigkeit'
          },
          step3: {
            title: 'Kontakt',
            intro: 'Kontaktangaben. Wird nicht veröffentlicht.'
          },
          organisationName: {
            label: 'Name Organisation',
            error: 'Name ist erforderlich'
          },
          employees: {
            label: 'Anzahl Angestellte'
          },
          website: {
            label: 'Webseite',
            error: 'Webseite muss gültig sein'
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
          email: {
            label: 'Email',
            error: {
              required: 'Email ist erforderlich',
              valid: 'Ungültige Emailadresse'
            }
          },
          terms: {
            label: 'AGBs',
            hint: 'Ich akzeptiere die Allgemeinen Geschäftsbedingungen (AGB)',
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
@import "~assets/styles/variables.scss";
</style>
