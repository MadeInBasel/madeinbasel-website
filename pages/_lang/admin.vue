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
        <v-btn color="primary" @click="logOut">Log out</v-btn>
      </div>
      <div v-show="!user" id="firebaseui-auth-container"></div>
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
import members from '~/components/members.vue'

export default {
  components: {
    'component-members': members
  },
  head() {
    return {
      title: 'Admin'
    }
  },
  data() {
    return {
      ui: null
    }
  },
  methods: {
    logOut() {
      var firebase = require('firebase')
      firebase.auth().signOut()
      this.$store.commit('UPDATE_USER', null)
      this.showFirebaseUI()
    },
    showFirebaseUI() {
      if (process.browser && !this.user) {
        var firebase = require('firebase')
        var firebaseui = require('firebaseui')
        var uiConfig = {
          signInSuccessUrl: '/admin',
          signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID
          ]
        }
        if (!this.ui) {
          this.ui = new firebaseui.auth.AuthUI(firebase.auth())
        } else {
          this.ui.delete()
        }
        this.ui.start('#firebaseui-auth-container', uiConfig)
      }
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  mounted() {
    var self = this
    _.defer(function () {
      self.showFirebaseUI()
    })

  }
}
</script>

<style lang="scss">
@import 'admin.scss';
</style>
