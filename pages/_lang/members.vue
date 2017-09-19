<template>
<div id="contact">
  <section class="boundaries">
    <h1>{{ $t('pages.members') }}</h1>
    <component-members />
    <v-btn primary :to="localePath('/join')">{{ $t('pages.join') }}</v-btn>
  </section>
</div>
</template>

<script>
import members from '~/components/members.vue'

export default {
  head() {
    return {
      title: this.$t('pages.members')
    }
  },
  components: {
    'component-members': members
  }
}
</script>

<style lang="scss">
@import "members.scss";
</style>
