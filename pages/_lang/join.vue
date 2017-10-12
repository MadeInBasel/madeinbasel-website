<template>
<div id="join">
  <section class="join">
    <div class="section-inner boundaries">
      <h1>{{ $t('pages.join') }}</h1>

      <form class="" action="index.html" method="post">
        <!-- <input type="hidden" role="uploadcare-uploader" name="content" data-public-key="f901c921fca98abca7b9" data-images-only data-system-dialog /> -->
        <v-text-field name="company-name" label="Company Name" id="name"></v-text-field>
      </form>
    </div>
  </section>
</div>
</template>

<script>
// import uploadcare from 'uploadcare-widget'
// import * as firebase from 'firebase'

const firebase = require('firebase')
// Required for side-effects
require('firebase/firestore')

export default {
  components: {},
  head() {
    return {
      title: this.$t('pages.join')
    }
  },
  mounted() {
    // console.log(uploadcare)
    // uploadcare.SingleWidget('[role=uploadcare-uploader]', {
    //   publicKey: 'f901c921fca98abca7b9',
    //   imagesOnly: true,
    //   systemDialog: true,
    //   crop: '300x200'
    // })

    // Initialize Firebase
    var config = {
      apiKey: 'AIzaSyCaTOBcKbkvUq4mKbSvqHYy0uxzuL-t03E',
      authDomain: 'madeinbasel-1505858460376.firebaseapp.com',
      databaseURL: 'https://madeinbasel-1505858460376.firebaseio.com',
      projectId: 'madeinbasel-1505858460376',
      storageBucket: 'madeinbasel-1505858460376.appspot.com',
      messagingSenderId: '372112151128'
    }
    firebase.initializeApp(config)
    var db = firebase.firestore()
    console.log(db)

    db.collection('users').add({
        first: 'Ada',
        last: 'Lovelace',
        born: 1815
      })
      .then(function (docRef) {
        console.log('Document written with ID: ', docRef.id)
      })
      .catch(function (error) {
        console.error('Error adding document: ', error)
      })
  },
  i18n: {
    messages: {
      en: {},
      de: {}
    }
  }
}
</script>

<style lang="scss">
@import 'join.scss';
</style>
