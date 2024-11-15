import { createStore } from 'vuex'
import AuthModule from './modules/auth'
import organizationModule from './modules/organization'
import cart from './modules/cart'
import settings from './modules/settings'
import filterstate from './modules/filterstate'

export default createStore({
  modules: {
    auth: AuthModule,
    organization: organizationModule,
    cart: cart,
    settings: settings,
    filterstate: filterstate,
  },
  state: {
    hideConfigButton: false,
    isPinned: true,
    showConfig: false,
    sidebarType: 'bg-gradient-dark',
    isRTL: false,
    color: 'success',
    isNavFixed: false,
    isAbsolute: false,
    showNavs: true,
    showSidenav: true,
    showNavbar: true,
    showFooter: true,
    showMain: true,
    isDarkMode: false,
    navbarFixed: 'position-sticky blur shadow-blur left-auto top-1 z-index-sticky px-0 mx-4',
    absolute: 'position-absolute px-4 mx-0 w-100 z-index-2',
  },
  mutations: {
    toggleConfigurator(state) {
      state.showConfig = !state.showConfig
    },
    navbarMinimize(state) {
      const sidenav_show = document.querySelector('.g-sidenav-show')

      if (sidenav_show.classList.contains('g-sidenav-pinned')) {
        sidenav_show.classList.remove('g-sidenav-pinned')
        state.isPinned = true
      } else {
        sidenav_show.classList.add('g-sidenav-pinned')
        state.isPinned = false
      }
    },
    navbarFixed(state) {
      if (state.isNavFixed === false) {
        state.isNavFixed = true
      } else {
        state.isNavFixed = false
      }
    },
    toggleEveryDisplay(state) {
      state.showNavbar = !state.showNavbar
      state.showSidenav = !state.showSidenav
      state.showFooter = !state.showFooter
    },
    toggleHideConfig(state) {
      state.hideConfigButton = !state.hideConfigButton
    },
    color(state, payload) {
      state.color = payload
    },
  },
  actions: {
    setColor({ commit }, payload) {
      commit('color', payload)
    },
    test({ commit }, payload) {
      alert('TestHello')
      commit('color', payload)
    },
  },
  getters: {},
})
