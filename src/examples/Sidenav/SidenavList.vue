<template>
  <div class="w-auto collapse navbar-collapse vh-100" id="sidenav-collapse-main">
    <ul class="navbar-nav">
      <li class="nav-item" >
        <sidenav-collapse :to="{ name: 'Dashboard' }" :aria-controls="''" v-bind:collapse="false" collapseRef="dashboard" navText="Dashboard">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">dashboard</i>
          </template>
        </sidenav-collapse>
      </li>
      <template v-if="user && user.role=='parent'">
        <li class="nav-item">
        <sidenav-collapse :to="{ name: 'list-childrens' }" :aria-controls="''" v-bind:collapse="false" collapseRef="childrens" navText="My Childrens">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">business</i>
          </template>
        </sidenav-collapse>
      </li>
      </template>
      <template v-if="user && user.role=='super_admin'">
        <li class="nav-item">
        <sidenav-collapse :to="{ name: 'list-organizations' }" :aria-controls="''" v-bind:collapse="false" collapseRef="organizations" navText="Organizations">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">business</i>
            
          </template>
        </sidenav-collapse>
      </li>
      </template>
      <template v-if="user && user.role=='super_admin' || user.role=='organization_admin'" >
          <li v-if="userPermissions.view_admin" class="nav-item">
          <sidenav-collapse :to="{ name: 'list-organization-admins' }" :aria-controls="''" v-bind:collapse="false" collapseRef="organization-admins" navText="Organization Admins">
            <template v-slot:icon>
              <i class="material-icons-round opacity-10 fs-5">admin_panel_settings</i>
            </template>
          </sidenav-collapse>
        </li>
      </template>
      <template  v-if="user && user.role=='super_admin' || user.role=='organization_admin'"> 
      <li v-if="userPermissions.view_school" class="nav-item">
        <!-- <sidenav-collapse :to="{ name: 'list-schools' }" :aria-controls="''" v-bind:collapse="false" collapseRef="schools" navText="Schools/Colleges">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">account_balance</i>
          </template>
        </sidenav-collapse> -->
        <a class="nav-link text-white" data-bs-toggle="collapse" aria-expanded="false" href="#schools">
          <i class="material-icons-round opacity-10 fs-5">people</i>
          <span class="sidenav-normal me-3 ms-2 ps-1">Schools <b class="caret"></b></span>
        </a>
        <div id="schools" class="collapse">
          <ul class="nav nav-sm flex-column">
            <li class="nav-item">
              <router-link :to="{ name: 'list-schools' }" class="nav-link">
                <i class="material-icons-round small-dot">fiber_manual_record</i>
                <span class="sidenav-normal me-3 ms-3 ps-1 text-white">Schools List</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'archived-schools' }" class="nav-link">
                <i class="material-icons-round small-dot">fiber_manual_record</i>
                <span class="sidenav-normal me-3 ms-3 ps-1 text-white">Archived Schools</span>
              </router-link>
            </li>
          </ul>
        </div>
      </li>
      <li v-if="userPermissions.roles" class="nav-item">
        <sidenav-collapse :to="{ name: 'list-roles' }" :aria-controls="''" v-bind:collapse="false" collapseRef="roles" navText="Roles & Permissions">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">security</i>
          </template>
        </sidenav-collapse>
      </li>
      </template>

      <template  v-if="user && user.role=='staff' || user.role=='super_admin' || user.role=='organization_admin'">
      <li v-if="userPermissions.view_student" class="nav-item">
        <a class="nav-link text-white" data-bs-toggle="collapse" aria-expanded="false" href="#projectsExample">
          <i class="material-icons-round opacity-10 fs-5">people</i>
          <span class="sidenav-normal me-3 ms-2 ps-1">Students <b class="caret"></b></span>
        </a>
        <div id="projectsExample" class="collapse">
          <ul class="nav nav-sm flex-column">
            <li class="nav-item">
              <router-link :to="{ name: 'list-students' }" class="nav-link">
                <i class="material-icons-round small-dot">fiber_manual_record</i>
                <span class="sidenav-normal me-3 ms-3 ps-1 text-white">Students List</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'archived-students' }" class="nav-link">
                <i class="material-icons-round small-dot">fiber_manual_record</i>
                <span class="sidenav-normal me-3 ms-3 ps-1 text-white">Archived Students</span>
              </router-link>
            </li>
          </ul>
        </div>
      </li>

      <li v-if="userPermissions.view_attribute" class="nav-item">
        <sidenav-collapse :to="{ name: 'list-attributes' }" :aria-controls="''" v-bind:collapse="false" collapseRef="student-attributes" navText="Attributes">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">apps</i>
          </template>
        </sidenav-collapse>
        </li>

      </template>

      <!-- <template  v-if="user && user.role=='staff' || user.role=='super_admin' || user.role=='organization_admin'">
        <li v-if="userPermissions.view_student" class="nav-item">
        <sidenav-collapse :to="{ name: 'list-students' }" :aria-controls="''" v-bind:collapse="false" collapseRef="students" navText="Students">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">people</i>
          </template>
        </sidenav-collapse>
        </li>
      </template> -->
      <template  v-if="user && user.role=='super_admin' || user.role=='organization_admin'">
      <li  v-if="userPermissions.view_staff"  class="nav-item">
        <!-- <sidenav-collapse :to="{ name: 'list-staff' }" :aria-controls="''" v-bind:collapse="false" collapseRef="staff" navText="Staff">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">portrait</i>
          </template>
        </sidenav-collapse> -->

        <a class="nav-link text-white" data-bs-toggle="collapse" aria-expanded="false" href="#staffNav">
          <i class="material-icons-round opacity-10 fs-5">portrait</i>
          <span class="sidenav-normal me-3 ms-2 ps-1">Staff <b class="caret"></b></span>
        </a>
        <div id="staffNav" class="collapse">
          <ul class="nav nav-sm flex-column">
            <li class="nav-item">
              <router-link :to="{ name: 'list-staff' }" class="nav-link">
                <i class="material-icons-round small-dot">fiber_manual_record</i>
                <span class="sidenav-normal me-3 ms-3 ps-1 text-white">Staff List</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'archived-staff' }" class="nav-link">
                <i class="material-icons-round small-dot">fiber_manual_record</i>
                <span class="sidenav-normal me-3 ms-3 ps-1 text-white">Archived Staff</span>
              </router-link>
            </li>
          </ul>
        </div>
        
      </li>

      
      <li  v-if="userPermissions.view_parent"  class="nav-item">
        <sidenav-collapse :to="{ name: 'list-parent' }" :aria-controls="''" v-bind:collapse="false" collapseRef="parents" navText="Parents">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">people</i>
          </template>
        </sidenav-collapse>
      </li>
      </template>
      <li class="nav-item" v-if="user && user.role=='student' || user.role=='parent'">
        <sidenav-collapse :to="{ name: 'payment_account' }" :aria-controls="''" v-bind:collapse="false" collapseRef="transaction history" navText="Topup Account">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">credit_card</i>
          </template>
        </sidenav-collapse>
      </li>
      <li  v-if="user && user.role=='student'"  class="nav-item">
        <sidenav-collapse :to="{ name: 'transaction-history' }" :aria-controls="''" v-bind:collapse="false" collapseRef="transaction history" navText="Transaction History">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">receipt</i>
          </template>
        </sidenav-collapse>
      </li>
      <li  v-if="userPermissions.transaction_history"  class="nav-item">
        <sidenav-collapse :to="{ name: 'transaction-history' }" :aria-controls="''" v-bind:collapse="false" collapseRef="transaction history" navText="Transaction History">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">receipt</i>
          </template>
        </sidenav-collapse>
      </li>
      <template v-if="user && user.role=='parent'">
        <li class="nav-item">
        <sidenav-collapse :to="{ name: 'list-active-payments' }" :aria-controls="''" v-bind:collapse="false" collapseRef="active-payments" navText="Active Payment Items">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">business</i>
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse :to="{ name: 'list-historical-payments' }" :aria-controls="''" v-bind:collapse="false" collapseRef="historical-payments" navText="Historical Payment Items">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">business</i>
          </template>
        </sidenav-collapse>
      </li>
      </template>
      <template v-if="user && user.role!=='parent'">
        <li  v-if="userPermissions.view_trip"  class="nav-item">
        <sidenav-collapse :to="{ name: 'list-trips' }" :aria-controls="''" v-bind:collapse="false" collapseRef="trips" navText="Trips">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">directions_bus</i>
          </template>
        </sidenav-collapse>
      </li>
      <li  v-if="user && user.role=='student'" class="nav-item">
        <sidenav-collapse :to="{ name: 'list-trips' }" :aria-controls="''" v-bind:collapse="false" collapseRef="trips" navText="Trips">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">directions_bus</i>
          </template>
        </sidenav-collapse>
      </li>
      <li  v-if="userPermissions.view_shop" class="nav-item">
        <sidenav-collapse :to="{ name: 'shop-items' }"  :aria-controls="''" v-bind:collapse="false" collapseRef="shop" navText="Shop">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">store</i>
          </template>
        </sidenav-collapse>
      </li>
      <li  v-if="user && user.role=='student'" class="nav-item">
        <sidenav-collapse :to="{ name: 'shop-items' }"  :aria-controls="''" v-bind:collapse="false" collapseRef="shop" navText="Shop">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">store</i>
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse :to="{ name: 'list-courses' }"  :aria-controls="''" v-bind:collapse="false" collapseRef="meals" navText="Courses">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">book</i>
          </template>
        </sidenav-collapse>
      </li>
      </template>
      <li  v-if="userPermissions.support"  class="nav-item">
        <sidenav-collapse url="#" :aria-controls="''" v-bind:collapse="false" collapseRef="support" navText="Support">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">support_agent</i>
          </template>
        </sidenav-collapse>
      </li>
      <li  v-if="user && user.role=='student'" class="nav-item">
        <sidenav-collapse url="#" :aria-controls="''" v-bind:collapse="false" collapseRef="support" navText="Support">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">support_agent</i>
          </template>
        </sidenav-collapse>
      </li>
    </ul>
  </div>
</template>
<script>
import SidenavCollapse from './SidenavCollapse.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'SidenavList',
  props: {
    cardBg: String,
  },
  mounted(){
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
    this.setActiveColor();
  },
  computed: {
    ...mapGetters(['getBrandingSetting']),
    userPermissions() {
      return this.$permissions.userPermissions.value;
    },
  },
  data() {
    return {
      user:'',
      title: 'StudentPay',
      controls: 'dashboardsExamples',
      isActive: 'active',
    }
  },
  methods:{
    setActiveColor() {
      // let activeColor=this.getBrandingSetting.secondary_color ?
      // this.getBrandingSetting.secondary_color : '#573078';
      // document.querySelector('.navbar-nav .active') ? 
      // document.querySelector('.navbar-nav .active').style.setProperty('--active-bg-color', activeColor):'';

      let bgColor=this.getBrandingSetting.primary_color ?
      this.getBrandingSetting.primary_color : '#573078';
      document.querySelector('.sidenav-header').style.setProperty('--navheader-bg-color', bgColor);

      document.querySelector('.navbar-nav').style.setProperty('--nav-bg-color', bgColor);

      document.querySelector('#sidenav-collapse-main').style.setProperty('--nav-bg-color', bgColor);

      // document.querySelector('thead tr th').style.setProperty('--nav-bg-color', bgColor);
      bgColor = '#573078'; // Example color value
      document.querySelectorAll('thead tr th').forEach(function(th) {
        th.style.setProperty('--nav-bg-color', bgColor);
      });
    },
    navLegacy(routeName){
      this.$router.push({ name: routeName });
    },
    isActiveRoute(routeName) {
      return this.$route.name === routeName;
    }
  },
  components: {
    SidenavCollapse,
  },
}
</script>

<style>
.navbar-nav .active {
  background-color: var(--active-bg-color) !important;
}
#sidenav-collapse-main::-webkit-scrollbar {
  width: 0px;
}
.sidenav-footer {
  position: fixed !important;
  bottom: 0 !important;
  width: 100%;
}
.small-dot {
  font-size: 10px !important;
}
.sidenav-header{
  background-color: var(--navheader-bg-color) !important;
}
.navbar-nav{
  background-color: var(--nav-bg-color) !important;
}
#sidenav-collapse-main{
  background-color: var(--nav-bg-color) !important;
}
thead tr th{
  background-color: var(--nav-bg-color) !important;
}

</style>