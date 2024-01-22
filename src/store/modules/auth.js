// ----------Auth Module----------
const state = {
  user: localStorage.getItem('user'),
  accessToken: localStorage.getItem('token'),
  userPermissions:[],
}
const getters = {
  getPermissions(state) {
    return state.userPermissions
  },
}
const mutations = {
  setPermissions(state, data) {
    state.userPermissions = data
  },
}
const actions = {
  updatePermissions({ commit }, data) {
    commit('setPermissions', data)
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
}
