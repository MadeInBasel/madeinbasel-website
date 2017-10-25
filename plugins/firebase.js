/* eslint-disable */
import {
  config
} from '~/assets/firebase.js'

export default ({
  app,
  isClient,
  store
}) => {
  const firebase = require("firebase");
  require('firebase/firestore')

  if (!firebase.apps.length) {
    firebase.initializeApp(config)
  }
  var db = firebase.firestore()
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var data = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        isAdmin: false
      }
      var dbUser = {}
      var users = db.collection('users')
      users.doc(user.uid).get()
        .then(function(doc) {
          if (doc.exists) {
            dbUser = doc.data()
          } else {
            users.doc(user.uid).set(data)
            dbUser = data
          }
          store.commit('UPDATE_USER', dbUser)
        })

    } else {
      store.commit('UPDATE_USER', null)
    }
  })

  store.commit('FILL_DB', db)

}
