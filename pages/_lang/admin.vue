<template>
<div id="admin">
  <section class="admin">
    <div class="section-inner boundaries">
      <h1>Admin</h1>
      <div v-if="user" class="user">
        <img v-if="user.photoURL" :src="user.photoURL" class="thumb" alt="Thumb">
        <div><strong>{{ user.displayName }}</strong></div>
        <div>{{ user.email }}</div>
        <div>UID: {{ user.uid }}</div>
      </div>
      <component-login :logOutButton=true />
    </div>
  </section>
  <section v-if="user && !user.isAdmin">
    <div class="section-inner boundaries">
      <h2>My Entries</h2>
      <div class="abstract">
        (verified)
      </div>
      <component-members :isOwner=true></component-members>
    </div>
  </section>
  <section v-if="user && !user.isAdmin">
    <div class="section-inner boundaries">
      <h2>My Entries</h2>
      <div class="abstract">
        (Verification pending)
      </div>
      <component-members :verified=false :isOwner=true></component-members>
    </div>
  </section>
  <section v-if="user && user.isAdmin">
    <div class="section-inner boundaries">
      <h2>Unverified Members</h2>
      <component-members :verified=false></component-members>
    </div>
  </section>
  <section v-if="user && user.isAdmin">
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
import login from '~/components/login.vue'

export default {
  components: {
    'component-members': members,
    'component-login': login
  },
  head() {
    return {
      title: 'Admin'
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  }
}
</script>

<style lang="scss">
@import 'admin.scss';
</style>
