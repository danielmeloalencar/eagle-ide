import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    grid: {x:1, y:1},
    pages: [],
    selectedComponent:null,
    activedPage:null
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
