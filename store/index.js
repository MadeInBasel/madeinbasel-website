import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      animations: true,
      user: null
    },
    mutations: {
      TOGGLE_ANIMATIONS(state, animations) {
        state.animations = animations
      },
      FILL_DB(state, db) {
        state.db = db
      },
      UPDATE_USER(state, user) {
        state.user = user
      }
    }
  })
}

export default createStore
