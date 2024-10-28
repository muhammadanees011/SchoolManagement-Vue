// ----------CART MODULE----------
const state = {
  cartItemCounter:null
}
const getters = {
  getCartItemCounter(state) {
    return state.cartItemCounter
  },
}
const mutations = {
  setCartItemCounter(state, data) {
    state.cartItemCounter = data
  },
}
const actions = {
  updateCartItemCounter({ commit }, data) {
    commit('setCartItemCounter', data)
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
}
