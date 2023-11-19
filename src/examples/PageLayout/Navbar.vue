<template>
  <div>
    <!-- Navbar -->
    <nav class="top-0 navbar navbar-expand-lg position-absolute z-index-3" :class="isBlur ? isBlur : 'shadow-none my-2 navbar-transparent w-100'"> </nav>
    <!-- End Navbar -->
  </div>
</template>

<script>
import downArrWhite from '@/assets/img/down-arrow-white.svg'
import downArrBlack from '@/assets/img/down-arrow-dark.svg'

export default {
  name: 'navbar',
  data() {
    return {
      downArrWhite,
      downArrBlack,
    }
  },
  props: {
    btnBackground: String,
    isBlur: String,
    darkMode: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    darkModes() {
      return {
        'text-dark': this.darkMode,
      }
    },
  },
}
</script>
