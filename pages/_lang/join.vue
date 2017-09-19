<template>
<div id="join">
  <section class="join boundaries">
    <h1>{{ $t('pages.join') }}</h1>

    <form class="" action="index.html" method="post">
      <input type="hidden" role="uploadcare-uploader" name="content" data-public-key="f901c921fca98abca7b9" data-images-only data-system-dialog />
    </form>

  </section>
</div>
</template>

<script>
import uploadcare from 'uploadcare-widget'

export default {
  components: {},
  head() {
    return {
      title: this.$t('pages.join')
    }
  },
  data() {

  },
  mounted() {
    console.log(uploadcare)
    // uploadcare.SingleWidget('[role=uploadcare-uploader]', {
    //   publicKey: 'f901c921fca98abca7b9',
    //   imagesOnly: true,
    //   systemDialog: true,
    //   crop: '300x200'
    // })
  },
  i18n: {
    messages: {
      en: {

      },
      de: {}
    }
  }
}
</script>

<style lang="scss">
@import 'join.scss';
</style>
