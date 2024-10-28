<template>
  <aside
    id="sidenav-main"
    class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 ms-3"
    :class="`${
      isRTL ? 'me-3 rotate-caret fixed-end' : 'fixed-start ms-3'
    } ${sidebarType}`"
  >
    <div class="sidenav-header">
      <i
        class="top-0 p-3 cursor-pointer fas fa-times text-secondary opacity-5 position-absolute end-0 d-none d-xl-none"
        aria-hidden="true"
        id="iconSidenav"
      ></i>
      <a class="m-0 navbar-brand" href="/">
        <template v-if="getBrandingSetting.logo!=='null'">
          <div class="d-flex flex-column justify-content-center align-items-center" style="margin-top: -21px;">
            <img :src="StudentPayLogo" class="navbar-brand-img branding-logo h-50" alt=""/>
            <p class="ms-2 font-weight-bold text-white" style="font-size: 15px; margin-right: 20px; margin-top: 4px;">StudentPay Portal</p>
            <br>
          </div>
        </template>
        <img v-else src="@/assets/img/logos/StudentPay-logo.png" class="navbar-brand-img h-100" alt="main_logo"/>
      </a>
    </div>
    <!-- <hr class="horizontal" style="background-color: #573078 !important;" /> -->
    <sidenav-list />
  </aside>
</template>
<script>
import SidenavList from "./SidenavList.vue";
import logo from "@/assets/img/logos/mastercard.png";
// import StudentPayLogo from "@/assets/img/logos/StudentPay-logo.png";
import logoDark from "@/assets/img/logos/mastercard.png";
import { mapState, mapGetters } from "vuex";

export default {
  name: "index",
  components: {
    SidenavList,
  },
  mounted(){
    this.setLogo()
  },
  data() {
    return {
      logo,
      logoDark,
      StudentPayLogo:'',
    };
  },
  computed: {
    ...mapGetters(['getBrandingSetting']),
    ...mapState(["isRTL", "sidebarType", "isDarkMode"]),
  },
  methods:{
    setLogo(){
      this.StudentPayLogo = this.$env_vars.BASE_URL + this.getBrandingSetting.logo
    }
  },
};
</script>

<style>
 .navbar-vertical .branding-logo {
    max-width: 100px !important;
    max-height: 4rem !important;
}
.sidenav-header {
    height: 5.9rem !important;
    /* margin-bottom: 1px; */
}
</style>
