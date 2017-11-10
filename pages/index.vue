<template></template>
<script>
import _ from 'underscore'
export default {
  beforeMount() {
    var lang = navigator.language || navigator.userLanguage
    var self = this
    if (this.$route.fullPath === '/') {
      var locale = lang.substring(0, 2) === 'de' ? 'de' : 'en'
      _.once(function () {
        self.$router.replace({ path: locale })
      }())
    }
  }
}
</script>
