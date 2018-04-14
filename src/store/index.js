import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app.ts'
import user from './modules/user.ts'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user
  },
  getters
})

export default store
