// ----------FILTER MODULE----------
const state = {
    filterString:{
        filterBy:'',
        searchString:''
    },
  }
  const getters = {
    getFilterString(state) {
      return state.filterString
    },
  }
  const mutations = {
    setFilterString(state, data) {
      state.filterString = data
    },
  }
  const actions = {
    updateFilterString({ commit }, data) {
      commit('setFilterString', data)
    },
  }
  
  export default {
    state,
    mutations,
    actions,
    getters,
  }
  