import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    grid: { x: 1, y: 1 },
    selectedComponent: null,
    selectedBeforeComponent: null,
    activePage: 0,
    project: {
      projectName: "Untitled",
      projectPath: null,
      pages: [],
    },
  },

  mutations: {},
  actions: {},
  modules: {},
});
