<template></template>

<script>
  export default {
    beforeMount () {
      this.$router.replace({name: 'index', params: {lang: this.detectLanguage()}})
    }
  }
</script>
