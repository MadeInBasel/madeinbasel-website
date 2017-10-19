<template>
<div id="admin">
  <section class="admin">
    <div class="section-inner boundaries">

      <h1>Admin</h1>
      <div v-if="user" class="user">
        <img :src="user.photoURL" class="thumb" alt="Thumb">
        <div><strong>{{ user.displayName }}</strong></div>
        <div>{{ user.email }}</div>
        <div>UID: {{ user.uid }}</div>
        <v-btn primary @click="logOut">Log out</v-btn>
      </div>
      <div v-else id="firebaseui-auth-container"></div>
    </div>
  </section>
  <section v-if="user">
    <div class="section-inner boundaries">
      <h2>Unverified Members</h2>
      <component-members :verified=false></component-members>
    </div>
  </section>
  <section>
    <div class="section-inner boundaries">
      <h2>Verified Members</h2>
      <component-members></component-members>
    </div>
  </section>
</div>
</template>

<script>
import _ from 'underscore'
import { config } from '~/assets/firebase.js'
var firebase = require('firebase')
import members from '~/components/members.vue'

require('firebase/firestore')

export default {
  components: {
    'component-members': members
  },
  head() {
    return {
      title: 'Admin'
    }
  },
  methods: {
    logOut() {
      firebase.auth().signOut()
      this.$store.commit('UPDATE_USER', null)
    },
    showFirebaseUI() {
      var firebaseui = require('firebaseui')
      var uiConfig = {
        signInSuccessUrl: '/admin',
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ]
      }
      var ui = new firebaseui.auth.AuthUI(firebase.auth())
      ui.start('#firebaseui-auth-container', uiConfig)
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  beforeCreate() {
    if (!firebase.apps.length) {
      firebase.initializeApp(config)
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.commit('UPDATE_USER', user)
      } else {
        this.showFirebaseUI()
      }
    })
  }
}
</script>

<style lang="scss">
@import 'admin.scss';
</style>
