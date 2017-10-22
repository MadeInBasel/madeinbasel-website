/* eslint-disable */
import {
  config
} from '~/assets/firebase.js'

export default ({
  app,
  isClient,
  store
}) => {
  if (isClient) {
    var firebase = require("firebase");
    require('firebase/firestore')

    if (!firebase.apps.length) {
      firebase.initializeApp(config)
    }

    firebase.auth().onAuthStateChanged((user) => {
      store.commit('UPDATE_USER', user)
    })
    store.commit('FILL_DB', firebase.firestore())
  }
}
