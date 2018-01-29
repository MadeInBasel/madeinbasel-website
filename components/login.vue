<template>
<div class="component-login">
  <div v-show="!user" id="firebaseui-auth-container"></div>
  <div v-if="user">
    <div v-if="logOutButton" class="text-xs-center">
      <v-btn color="primary" @click="logOut">{{ $t('buttons.logout') }}</v-btn>
    </div>
    <div v-else>
      {{ $t('authenticated') }} {{ user.displayName ? user.displayName : user.email }} (<a href="javascript:;" @click="logOut">{{ $t('buttons.logout') }}</a>)
    </div>
  </div>
</div>
</template>

<script>
import _ from 'underscore'
var firebase = require('firebase')

export default {
  props: {
    logOutButton: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      ui: null
    }
  },
  methods: {
    logOut() {
      firebase.auth().signOut()
      this.showFirebaseUI()
    },
    showFirebaseUI() {
      var firebaseui = require('firebaseui')
      var self = this
      var uiConfig = {
        callbacks: {
          signInSuccess: function(currentUser, credential, redirectUrl) {
            return false
          }
        },
        signInSuccessUrl: false,
        signInFlow: 'popup',
        credentialHelper: [firebaseui.auth.CredentialHelper.NONE],
        signInOptions: [
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
          firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ]
      }
      var ui
      if (firebaseui.auth.AuthUI.getInstance()) {
        ui = firebaseui.auth.AuthUI.getInstance()
      } else {
        ui = new firebaseui.auth.AuthUI(firebase.auth())
      }
      ui.reset()
      ui.start('#firebaseui-auth-container', uiConfig)
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  mounted() {
    this.showFirebaseUI()
  },
  i18n: {
    messages: {
      en: {
        authenticated: 'Logged in as:'
      },
      de: {
        authenticated: 'Angemeldet als:'
      }
    }
  }
}
</script>
