<template>
  <div class="fixed-plugin"> </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'
import { activateDarkMode, deactivateDarkMode } from '@/assets/js/dark-mode'

export default {
  name: 'configurator',
  props: ['toggle'],
  methods: {
    ...mapMutations(['navbarMinimize', 'navbarFixed']),
    ...mapActions(['setColor']),

    sidebarColor(color = 'success') {
      document.querySelector('#sidenav-main').setAttribute('data-color', color)
      this.setColor(color)
    },

    sidebar(type) {
      this.$store.state.sidebarType = type
    },

    setNavbarFixed() {
      if (this.$route.name !== 'Profile' || this.$route.name !== 'All Projects') {
        this.$store.state.isNavFixed = !this.$store.state.isNavFixed
      }
    },

    darkMode() {
      if (this.$store.state.isDarkMode) {
        this.$store.state.isDarkMode = false
        deactivateDarkMode()
        return
      } else {
        this.$store.state.isDarkMode = true
        activateDarkMode()
      }
    },

    sidenavTypeOnResize() {
      let transparent = document.querySelector('#btn-transparent')
      let white = document.querySelector('#btn-white')
      if (window.innerWidth < 1200) {
        transparent.classList.add('disabled')
        white.classList.add('disabled')
      } else {
        transparent.classList.remove('disabled')
        white.classList.remove('disabled')
      }
    },
  },
  computed: {
    ...mapState(['isRTL', 'sidebarType']),
    sidenavResponsive() {
      return this.sidenavTypeOnResize
    },
  },
  beforeMount() {
    this.$store.state.isTransparent = 'bg-transparent'
    window.addEventListener('resize', this.sidenavTypeOnResize)
    window.addEventListener('load', this.sidenavTypeOnResize)
  },
}
</script>
