<template>
  <main class="main-content position-relative max-height-vh-100 h-100 overflow-x-hidden">
    <router-view />
  </main>
</template>
<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'DefaultLayout',
  components: {},
  methods: {
    ...mapMutations(['toggleConfigurator', 'navbarMinimize']),
  },
  computed: {
    ...mapState(['isRTL', 'color', 'isAbsolute', 'isNavFixed', 'navbarFixed', 'absolute', 'showSidenav', 'showNavbar', 'showFooter', 'showConfig', 'hideConfigButton']),
  },
  beforeMount() {
    this.$store.state.isTransparent = 'bg-transparent'

    const sidenav = document.getElementsByClassName('g-sidenav-show')[0]

    if (window.innerWidth > 1200) {
      sidenav.classList.add('g-sidenav-pinned')
    }
  },
}
</script>

<style>
</style>
