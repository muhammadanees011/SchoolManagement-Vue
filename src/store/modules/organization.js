// ----------Auth Module----------
const state = {
  organizationList: null,
}
const getters = {
  getOrganizationList(state) {
    return state.organizationList
  },
}
const mutations = {
  setOrganizationList(state, data) {
    state.organizationList = data
  },
}
const actions = {
  updateOrganizationList({ commit }, data) {
    commit('setOrganizationList', data)
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
}
