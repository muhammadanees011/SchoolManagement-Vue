<template>
  <div class="w-auto collapse navbar-collapse vh-100" id="sidenav-collapse-main">
    <ul class="navbar-nav">
      <li class="nav-item" >
        <sidenav-collapse url="#" :aria-controls="''" v-bind:collapse="false" collapseRef="dashboard" navText="Dashboard">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">dashboard</i>
          </template>
        </sidenav-collapse>
      </li>
      <template v-if="user && user.role=='parent'">
        <li class="nav-item">
        <sidenav-collapse :to="{ name: 'list-childrens' }" :aria-controls="''" v-bind:collapse="false" collapseRef="childrens" navText="Childrens">
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
      <li  v-if="user && user.role=='super_admin'" class="nav-item">
        <sidenav-collapse :to="{ name: 'list-organization-admins' }" :aria-controls="''" v-bind:collapse="false" collapseRef="organization-admins" navText="Organization Admins">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">business</i>
          </template>
        </sidenav-collapse>
      </li>
      <template  v-if="user && user.role=='super_admin' || user.role=='organization_admin'">
      <li class="nav-item">
        <sidenav-collapse :to="{ name: 'list-schools' }" :aria-controls="''" v-bind:collapse="false" collapseRef="schools" navText="Schools/Colleges">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">account_balance</i>
          </template>
        </sidenav-collapse>
      </li>
      </template>
      <template  v-if="user && user.role=='staff' || user.role=='super_admin' || user.role=='organization_admin'">
        <li class="nav-item">
        <sidenav-collapse :to="{ name: 'list-students' }" :aria-controls="''" v-bind:collapse="false" collapseRef="students" navText="Students">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">people</i>
          </template>
        </sidenav-collapse>
        </li>
      </template>
      <template  v-if="user && user.role=='super_admin' || user.role=='organization_admin'">
      <li class="nav-item">
        <sidenav-collapse :to="{ name: 'list-staff' }" :aria-controls="''" v-bind:collapse="false" collapseRef="staff" navText="Staff">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">people</i>
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
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
      <li class="nav-item">
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
        <li class="nav-item">
        <sidenav-collapse :to="{ name: 'list-trips' }" :aria-controls="''" v-bind:collapse="false" collapseRef="trips" navText="Trips">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">directions_bus</i>
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse @click="navLegacy('shop-items')"  :aria-controls="''" v-bind:collapse="false" collapseRef="shop" navText="Shop">
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
      <li class="nav-item">
        <sidenav-collapse url="#" :aria-controls="''" v-bind:collapse="false" collapseRef="support" navText="Support">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">support_agent</i>
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse url="#" :aria-controls="''" v-bind:collapse="false" collapseRef="Help" navText="Help">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">help</i>
          </template>
        </sidenav-collapse>
      </li>
    </ul>
  </div>
</template>
<script>
import SidenavCollapse from './SidenavCollapse.vue'

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
    navLegacy(routeName){
      this.$router.push({ name: routeName });
    },
  },
  components: {
    SidenavCollapse,
  },
}
</script>

<style>
.navbar-nav .active {
  background-color: #573078 !important;
}
#sidenav-collapse-main::-webkit-scrollbar {
  width: 0px;
}
</style>