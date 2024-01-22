// ----------CART MODULE----------
const state = {
    removedItem: null,
  }
  const getters = {
    getRemovedItem(state) {
      return state.removedItem
    },
  }
  const mutations = {
    setRemovedItem(state, data) {
      state.removedItem = data
    },
  }
  const actions = {
    updateRemovedItem({ commit }, data) {
      commit('setRemovedItem', data)
    },
  }
  
  export default {
    state,
    mutations,
    actions,
    getters,
  }
  