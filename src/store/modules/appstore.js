export default {
  state: {
    collapse: false
  },
  actions: {
    collapse({ commit }) {
      commit('collapse')
    }
  },
  mutations: {
    collapse(state) {
      state.collapse = !state.collapse
    }
  },
  namespaced: true
}
