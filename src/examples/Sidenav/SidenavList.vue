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
        <sidenav-collapse :to="{ name: 'list-childrens' }" :aria-controls="''" v-bind:collapse="false" collapseRef="childrens" navText="My Childrens">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">business</i>
          </template>
        </sidenav-collapse>
        <template v-for="(item,index) in childrens" :key="index">
          <li @click="selectChildren(item.student.id)" class="nav-item d-flex student">
            <div class="select"></div>
            <small class="text-white ms-1 ps-1">{{ item.student.first_name }} {{ item.student.last_name }}</small>
          </li>
        </template>
      </template>

      <template v-if="user && user.role=='student' || user.role=='staff'">
        <li class="nav-item">
          <sidenav-collapse :to="{ name: 'payment_account' }" :aria-controls="''" v-bind:collapse="false" collapseRef="topup" navText="Topup">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">business</i>
          </template>
          </sidenav-collapse>
      </li>
      </template>

      <template v-if="user && user.role=='super_admin'">
        <li class="nav-item">
        <sidenav-collapse :to="{ name: 'list-organizations' }" :aria-controls="''" v-bind:collapse="false" collapseRef="organizations" navText="Organisations">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">business</i>
            
          </template>
        </sidenav-collapse>
      </li>
      </template>
      <template v-if="user && user.role=='super_admin' || user.role=='organization_admin'" >
          <li v-if="userPermissions.view_admin" class="nav-item">
          <sidenav-collapse :to="{ name: 'list-organization-admins' }" :aria-controls="''" v-bind:collapse="false" collapseRef="organization-admins" navText="Organisation Admins">
            <template v-slot:icon>
              <i class="material-icons-round opacity-10 fs-5">admin_panel_settings</i>
            </template>
          </sidenav-collapse>
        </li>
      </template>
      <!-- <template  v-if="user && user.role=='super_admin' || user.role=='organization_admin'">  -->
      <li v-if="userPermissions.view_site" class="nav-item">
        <a class="nav-link text-white" data-bs-toggle="collapse" aria-expanded="false" href="#schools">
          <i class="material-icons-round opacity-10 fs-5">people</i>
          <span class="sidenav-normal me-3 ms-2 ps-1">Sites <b class="caret"></b></span>
        </a>
        <div id="schools" class="collapse">
          <ul class="nav nav-sm flex-column">
            <li class="nav-item">
              <router-link :to="{ name: 'list-schools' }" class="nav-link">
                <i class="material-icons-round small-dot">fiber_manual_record</i>
                <span class="sidenav-normal me-3 ms-3 ps-1 text-white">Sites List</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'archived-schools' }" class="nav-link">
                <i class="material-icons-round small-dot">fiber_manual_record</i>
                <span class="sidenav-normal me-3 ms-3 ps-1 text-white">Archived Sites</span>
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
      <!-- </template> -->

      <!-- <template  v-if="user && user.role=='staff' || user.role=='super_admin' || user.role=='organization_admin'"> -->
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

      <!-- </template> -->

      <!-- <template  v-if="user && user.role=='super_admin' || user.role=='organization_admin'"> -->
      <li  v-if="userPermissions.view_staff"  class="nav-item">

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

      
      <li v-if="user.role!=='staff' && user.role!=='student'"  class="nav-item">
        <sidenav-collapse :to="{ name: 'list-parent' }" :aria-controls="''" v-bind:collapse="false" collapseRef="parents" navText="Parents">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">people</i>
          </template>
        </sidenav-collapse>
      </li>
      <!-- </template> -->

      <template v-if="user && user.role!=='parent'">
      <!-- <template v-if="user && user.role=='super_admin' || user.role=='organization_admin'"> -->
      <li  v-if="userPermissions.view_course" class="nav-item">
        <a class="nav-link text-white" data-bs-toggle="collapse" aria-expanded="false" href="#courses">
          <i class="material-icons-round opacity-10 fs-5">store</i>
          <span class="sidenav-normal me-3 ms-2 ps-1">Courses <b class="caret"></b></span>
        </a>
        <div id="courses" class="collapse">
          <ul class="nav nav-sm flex-column">
            <li class="nav-item">
              <router-link :to="{ name: 'list-courses' }" class="nav-link">
                <i class="material-icons-round small-dot">fiber_manual_record</i>
                <span class="sidenav-normal me-3 ms-3 ps-1 text-white">All Courses</span>
              </router-link>
            </li>
          </ul>
        </div>

      </li>
      <!-- </template> -->

      
      <template v-if="(user && user.role!=='student') && (user && user.role!=='staff') && (user && user.role!=='parent')" >
        <li class="nav-item">
          <a class="nav-link text-white" data-bs-toggle="collapse" aria-expanded="false" href="#product_types">
            <i class="material-icons-round opacity-10 fs-5">category</i>
            <span class="sidenav-normal me-3 ms-2 ps-1">Product Types <b class="caret"></b></span>
          </a>
          <div id="product_types" class="collapse">
            <ul class="nav nav-sm flex-column">
              <li class="nav-item">
                <router-link :to="{ name: 'product-types' }" class="nav-link">
                  <i class="material-icons-round small-dot">fiber_manual_record</i>
                  <span class="sidenav-normal me-3 ms-3 ps-1 text-white">Product Types</span>
                </router-link>
              </li>
            </ul>
          </div>
        </li>
      </template>

      <template v-if="(user && user.role!=='student') && (user && user.role!=='staff')" >
        <li  v-if="userPermissions.view_shop" class="nav-item">
        <a class="nav-link text-white" data-bs-toggle="collapse" aria-expanded="false" href="#shop">
          <i class="material-icons-round opacity-10 fs-5">store</i>
          <span class="sidenav-normal me-3 ms-2 ps-1">Shop <b class="caret"></b></span>
        </a>
        <div id="shop" class="collapse">
          <ul class="nav nav-sm flex-column">
            <li class="nav-item">
              <router-link :to="{ name: 'shop-items' }" class="nav-link">
                <i class="material-icons-round small-dot">fiber_manual_record</i>
                <span class="sidenav-normal me-3 ms-3 ps-1 text-white">Shop Items</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'archived-shop-items' }" class="nav-link">
                <i class="material-icons-round small-dot">fiber_manual_record</i>
                <span class="sidenav-normal me-3 ms-3 ps-1 text-white">Archived Items</span>
              </router-link>
            </li>
          </ul>
        </div>

      </li>
      </template>

      <!-- <template v-if="user && user.role=='super_admin' || user.role=='organization_admin'"> -->
      <li v-if="userPermissions.purchase_history" class="nav-item">
        <sidenav-collapse :to="{ name: 'purchases-admin' }" :aria-controls="''" v-bind:collapse="false" collapseRef="purchasesadmin" navText="Purchase History">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">shopping_cart</i>
          </template>
        </sidenav-collapse>
      </li>
      <!-- </template> -->

      <!-- <template v-if="user && user.role=='super_admin' || user.role=='organization_admin'"> -->
      <li v-if="userPermissions.pending_installments" class="nav-item">
        <sidenav-collapse :to="{ name: 'installments' }" :aria-controls="''" v-bind:collapse="false" collapseRef="installments" navText="Pending Instalments">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">payments</i>
          </template>
        </sidenav-collapse>
      </li>
      <!-- </template> -->
      </template>

      <li  v-if="user && user.role=='student' || user.role=='staff'"  class="nav-item">
        <sidenav-collapse :to="{ name: 'installments' }" :aria-controls="''" v-bind:collapse="false" collapseRef="installments" navText="Pending Instalments">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">payments</i>
          </template>
        </sidenav-collapse>
      </li>

      <li    class="nav-item">
        <sidenav-collapse :to="{ name: 'paid-installments' }" :aria-controls="''" v-bind:collapse="false" collapseRef="paidinstallments" navText="Paid Instalments">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">payments</i>
          </template>
        </sidenav-collapse>
      </li>
      
      <!-- <template v-if="user && user.role=='super_admin' || user.role=='organization_admin'"> -->
        <li v-if="userPermissions.refunds" class="nav-item">
        <sidenav-collapse :to="{ name: 'refund' }" :aria-controls="''" v-bind:collapse="false" collapseRef="refunds" navText="Refunds">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">shopping_cart</i>
          </template>
        </sidenav-collapse>
      </li>
      <!-- </template> -->

      <li  v-if="user && user.role=='student' || user.role=='staff'"  class="nav-item">
        <sidenav-collapse :to="{ name: 'purchase-history' }" :aria-controls="''" v-bind:collapse="false" collapseRef="purchase history" navText="Purchase History">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">shopping_cart</i>
          </template>
        </sidenav-collapse>
      </li>

      <li  v-if="(user && user.role=='student') || (user && user.role=='staff')"  class="nav-item">
        <sidenav-collapse :to="{ name: 'transaction-history' }" :aria-controls="''" v-bind:collapse="false" collapseRef="transaction history" navText="Transaction History">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">receipt</i>
          </template>
        </sidenav-collapse>
      </li>

      <template v-if="(user && user.role!=='student') && (user && user.role!=='staff')" >
      <li  v-if="userPermissions.transaction_history"  class="nav-item">
        <sidenav-collapse :to="{ name: 'transaction-history' }" :aria-controls="''" v-bind:collapse="false" collapseRef="transaction history" navText="Transaction History">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">receipt</i>
          </template>
        </sidenav-collapse>
      </li>
    </template>
      <li  v-if="user && user.role!='student' && user.role!='staff' && user.role!='parent'" class="nav-item">
        <sidenav-collapse :to="{ name: 'configurations' }" :aria-controls="''" v-bind:collapse="false" collapseRef="configurations" navText="Configurations">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">settings</i>
          </template>
        </sidenav-collapse>
      </li>
      <li  v-if="user && user.role=='student' || user.role=='staff'" class="nav-item">
        <sidenav-collapse :to="{ name: 'support' }" :aria-controls="''" v-bind:collapse="false" collapseRef="support" navText="Support">
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
import axiosClient from '../../axios'

export default {
  name: 'SidenavList',
  props: {
    cardBg: String,
  },
  updated(){
    // this.buttonColor()
  },
  mounted(){
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
    this.setActiveColor();
    this.getChildrens();
  },
  computed: {
    ...mapGetters(['getBrandingSetting']),
    userPermissions() {
      return this.$permissions.userPermissions.value;
    },
  },
  data() {
    return {
      childrens:'',
      user:'',
      title: 'StudentPay',
      controls: 'dashboardsExamples',
      isActive: 'active',
    }
  },
  methods:{
    //---------------GET CHILDRENS FOR PARENT--------------
    async getChildrens(){
      if(this.user && this.user.role=='parent'){
        let parentId=this.user.id;
        try {
        const response= await axiosClient.get('getChildrensOfParent/'+parentId)
        this.childrens=response.data
        } catch (error) {
        console.log(error)
        }
      }
    },
    //----------------SELECT CHILDREN----------------
    async selectChildren(studentId){
      if(this.user && this.user.role=='parent'){
        let parentId=this.user.id;
        let data={
          parent_id:parentId,
          student_id:studentId
        }
        try {
        let response=await axiosClient.post('/selectChildren',data)
        let user = response.data ? response.data.user : null
        let token = response.data ? response.data.access_token : null
        localStorage.setItem('user',  JSON.stringify(user))
        localStorage.setItem('token', token)
        let primary_color=response.data.primary_color;
        let secondary_color=response.data.secondary_color;
        let logo=response.data.logo;
        localStorage.setItem('primary_color', primary_color)
        localStorage.setItem('secondary_color', secondary_color)
        localStorage.setItem('logo', logo)
        const newRoute = this.$router.resolve({ name: '/' }).href;
        window.location.href = newRoute;
        } catch (error) {
        console.log(error)
        }
      }
    },

    setActiveColor() {
      
      let bgColor=this.getBrandingSetting.primary_color !='null' ? this.getBrandingSetting.primary_color : '#010A21';
      // bgColor='#010A21'
      document.querySelector('.sidenav-header').style.setProperty('--navheader-bg-color', bgColor);

      document.querySelector('.navbar-nav').style.setProperty('--nav-bg-color', bgColor);

      document.querySelector('#sidenav-collapse-main').style.setProperty('--nav-bg-color', bgColor);
      
    },

    buttonColor(){
      let bgColor=this.getBrandingSetting.primary_color !='null' ? this.getBrandingSetting.primary_color : '#010A21';
      const buttons = document.querySelectorAll('.btn');
      console.log('btn',buttons)
      buttons.forEach(button => {
          button.style.backgroundColor = bgColor ;
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
.select{
  height:12px;
  width: 12px;
  border-radius:10px;
  background-color: white;
  margin-top: 5px;
  margin-left: 40px;
}
.student{
  cursor: pointer;
}
</style>