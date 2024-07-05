// ----------SETTING MODULE----------
const state = {
    brandingSetting:{
        primary_color: localStorage.getItem('primary_color'),
        secondary_color: localStorage.getItem('secondary_color'),
        logo: localStorage.getItem('logo')
    },
  }
  const getters = {
    getBrandingSetting(state) {
      return state.brandingSetting
    },
  }
  const mutations = {
    setBrandingSetting(state, data) {
      state.brandingSetting = data
    },
  }
  const actions = {
    updateBrandingSetting({ commit }, data) {

      commit('setBrandingSetting', data)
    },
  }
  
  export default {
    state,
    mutations,
    actions,
    getters,
  }
  