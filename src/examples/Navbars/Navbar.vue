<template>
  <nav class="shadow-none navbar navbar-main navbar-expand-lg border-radius-xl" v-bind="$attrs" id="navbarBlur" data-scroll="true" :class="isAbsolute ? 'mt-4' : 'mt-0'">
    <div class="px-3 py-1 container-fluid">
      <!-- <breadcrumbs :currentPage="currentRouteName" :color="color" /> -->
      <div v-if="user.role!='super_admin'" class="organization-name mt-2 me-2">
        <h5>{{ organization_name }}</h5>
      </div>
      <div v-if="user.role=='super_admin'" class="organization-name mt-2 me-2">
        <h5>Super Admin</h5>
      </div>
      <template v-if="currentRouteName!='Profile'">
        <div v-if="!passwordStatus" class="change-pass-alert">
          <small class="pass-text">For security reasons, we kindly ask you to change your password,
            <router-link :to="{name:'Profile'}">
              <span class="click-link">click here</span> 
            </router-link>
              to change the password</small>
        </div>
      </template>
      <div class="mt-2 collapse navbar-collapse mt-sm-0 me-md-0 me-sm-4" :class="isRTL ? 'px-0' : 'me-sm-4'" id="navbar">
        <div class="pe-md-3 d-flex align-items-center" :class="isRTL ? 'me-md-auto' : 'ms-md-auto'">
          <!-- <material-input id="search" label="Search here" /> -->
        </div>
        <ul class="navbar-nav justify-content-end">
          <!-- <li class="nav-item d-flex align-items-center">
            <router-link :to="{ name: 'SignIn' }" class="px-0 nav-link font-weight-bold lh-1" :class="color ? color : 'text-body'">
              <i class="material-icons" :class="isRTL ? 'ms-sm-2' : 'me-sm-1'"> account_circle </i>
            </router-link>
          </li> -->

          <li class="nav-item dropdown d-flex align-items-center" :class="isRTL ? 'ps-2' : 'pe-2'">
            <a @click="getCartItems" href="#" class="p-0 nav-link lh-1" :class="[color ? color : 'text-body', showCart ? 'show' : '']" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="material-icons cursor-pointer">shopping_cart</i>
            </a>
            <ul class="cart px-2 py-3 cart-dropdown dropdown-menu dropdown-menu-end me-sm-n4" :class="showCart ? 'show' : ''" aria-labelledby="dropdownMenuButton">
              <template v-for="(item,index) in cartItemsList" :key="index" >
                <li  v-if="item.shop_item!==null"  class="text-white list-group-item bg-gray-100 border-0 d-flex p-4 mb-2 border-radius-lg">
                    <div class="d-flex flex-column">
                    <h6 class="mb-3 text-sm text-dark">
                      {{ item.shop_item ? item.shop_item.name :'' }} 
                      <span v-if="item.shop_item.product_type">({{ item.shop_item.product_type }})</span>
                    </h6>
                    <span class="mb-1 text-xs text-dark">
                        <!-- {{ item.shop_item ? item.shop_item.detail:'' }} -->
                    </span>
                    </div>
                    <div class="ms-auto text-end">
                        <span>
                          <span class="me-2 text-warning text-gradient text-sm font-weight-bold">
                            £{{formattedPrice(item.shop_item ? item.shop_item.price :0)}}
                          </span> 
                            <i @click="removeItemFromCart(item.id)" class="fas fa-minus-circle text-danger me-2" aria-hidden="true"></i>
                        </span>
                    </div>
                </li>
              </template>
              <template v-for="(item,index) in cartItemsList" :key="index" >
              <li  v-if="item.trip!==null" class="text-white list-group-item bg-gray-100 border-0 d-flex p-4 mb-2 border-radius-lg">
                  <div class="d-flex flex-column">
                  <h6 class="mb-3 text-sm text-dark">{{ item.trip ? item.trip.title:'' }} (Trip)</h6>
                  <span class="mb-1 text-xs text-dark">
                      <!-- {{ item.trip ? item.trip.description:'' }} -->
                  </span>
                  </div>
                  <div class="ms-auto text-end">
                      <span>
                        <span class="me-2 text-warning text-gradient text-sm font-weight-bold">
                          £{{formattedPrice(item.trip ? item.trip.budget:0)}}
                        </span> 
                        <i @click="removeItemFromCart(item.id),updateRemovedItem('trip')" class="fas fa-minus-circle text-danger me-2" aria-hidden="true"></i>
                      </span>
                  </div>
              </li>
              </template>
              <li v-if="cartItemsList.length>0" class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
                <button @click="navCheckout()" style="font-size: 12px; background-color: #573078;" class="me-3 trips-btn w-100 bg-gradient-grey shadow-grey text-white fw-5 p-2 border-radius-lg"> Checkout </button>
              </li>
              <li v-else class="list-group-item border-0 d-flex align-items-center justify-content-center p-4 mb-2 bg-warning-100 text-warning border-radius-lg">
                <small>Cart is empty</small>
              </li>
            </ul>
          </li>

          <li class="nav-item dropdown d-flex align-items-center" :class="isRTL ? 'ps-2' : 'pe-2'">
            <a href="#" class="p-0 nav-link lh-1" :class="[color ? color : 'text-body', showMenu ? 'show' : '']" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false" @click="showProfile = !showProfile">
              <i class="material-icons cursor-pointer"> account_circle </i>
            </a>
            <ul class="px-2 py-3 dropdown-menu dropdown-menu-end me-sm-n4" :class="showMenu ? 'show' : ''" aria-labelledby="dropdownMenuButton" @click="showMenu = !showMenu">
              <li v-if="user.role!=='staff' && user.role=='student' && user.role=='parent'" class="menu_item mb-2">
                <router-link :to="{ name: 'Profile' }">
                  <a class="dropdown-item border-radius-md" href="javascript:;">
                    <div class="py-1 d-flex">
                      <div class="d-flex flex-column justify-content-center">
                        <span class="d-flex align-items-center">
                          <i class="fas fa-user pb-0"></i> 
                          <h6 class="ms-1 pt-2 text-sm font-weight-normal"> <span class="font-weight-bold">{{ user.first_name}} {{user.last_name}} <small class="">({{ userRole }})</small></span> </h6>
                          </span>
                      </div>
                    </div>
                  </a>
                </router-link>
              </li>
              <li v-else class="menu_item mb-2">
                  <a class="dropdown-item border-radius-md" href="javascript:;">
                    <div class="py-1 d-flex">
                      <div class="d-flex flex-column justify-content-center">
                        <span class="d-flex align-items-center">
                          <i class="fas fa-user pb-0"></i> 
                          <h6 class="ms-1 pt-2 text-sm font-weight-normal"> <span class="font-weight-bold">{{ user.first_name}} {{user.last_name}} <small class="">({{ userRole }})</small></span> </h6>
                          </span>
                      </div>
                    </div>
                  </a>
              </li>
              <li class="menu_item mb-2" >
                <router-link :to="{name:'balance'}">
                <a class="dropdown-item border-radius-md" href="javascript:;">
                  <div class="py-1 d-flex">
                    <div class="d-flex flex-column justify-content-center">
                      <span class="d-flex  align-items-center">
                        <i class="fas fa-wallet "></i> 
                        <h6 class="ms-1 pt-2 text-sm font-weight-normal"> <span class="font-weight-bold">Wallet</span> </h6>
                      </span>
                    </div>
                  </div>
                </a>
                </router-link>
              </li>
              <li class="menu_item mb-2">
                <a @click="signOut" class="dropdown-item border-radius-md" href="javascript:;">
                  <div class="py-1 d-flex">
                    <div  class="d-flex flex-column justify-content-center">
                      <span class="d-flex align-items-center">
                      <i class="fas fa-power-off pb-0"></i> 
                      <h6  class="ms-1 pt-2 text-sm font-weight-normal"> <span class="font-weight-bold">Logout</span> </h6>
                      </span>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </li>
          <li class="nav-item d-xl-none ps-3 d-flex align-items-center">
            <a href="#" @click="toggleSidebar" class="p-0 nav-link text-body lh-1" id="iconNavbarSidenav">
              <div class="sidenav-toggler-inner">
                <i class="sidenav-toggler-line"></i>
                <i class="sidenav-toggler-line"></i>
                <i class="sidenav-toggler-line"></i>
              </div>
            </a>
          </li>
          <!-- <li class="px-3 nav-item d-flex align-items-center">
            <a
              class="p-0 nav-link lh-1"
              @click="toggleConfigurator"
              :class="color ? color : 'text-body'"
            >
              <i class="material-icons fixed-plugin-button-nav cursor-pointer">
                settings
              </i>
            </a>
          </li> -->
          <!-- <li class="nav-item dropdown d-flex align-items-center" :class="isRTL ? 'ps-2' : 'pe-2'">
            <a href="#" class="p-0 nav-link lh-1" :class="[color ? color : 'text-body', showMenu ? 'show' : '']" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false" @click="showMenu = !showMenu">
              <i class="material-icons cursor-pointer"> notifications </i>
            </a>
            <ul class="px-2 py-3 dropdown-menu dropdown-menu-end me-sm-n4" :class="showMenu ? 'show' : ''" aria-labelledby="dropdownMenuButton">
              <li class="mb-2">
                <a class="dropdown-item border-radius-md" href="javascript:;">
                  <div class="py-1 d-flex">
                    <div class="my-auto">
                      <img src="../../assets/img/team-2.jpg" class="avatar avatar-sm me-3" alt="user image" />
                    </div>
                    <div class="d-flex flex-column justify-content-center">
                      <h6 class="mb-1 text-sm font-weight-normal"> <span class="font-weight-bold">New message</span> from Laur </h6>
                      <p class="mb-0 text-xs text-secondary">
                        <i class="fa fa-clock me-1"></i>
                        13 minutes ago
                      </p>
                    </div>
                  </div>
                </a>
              </li>
              <li class="mb-2">
                <a class="dropdown-item border-radius-md" href="javascript:;">
                  <div class="py-1 d-flex">
                    <div class="my-auto">
                      <img src="../../assets/img/small-logos/logo-spotify.svg" class="avatar avatar-sm bg-gradient-dark me-3" alt="logo spotify" />
                    </div>
                    <div class="d-flex flex-column justify-content-center">
                      <h6 class="mb-1 text-sm font-weight-normal"> <span class="font-weight-bold">New album</span> by Travis Scott </h6>
                      <p class="mb-0 text-xs text-secondary">
                        <i class="fa fa-clock me-1"></i>
                        1 day
                      </p>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a class="dropdown-item border-radius-md" href="javascript:;">
                  <div class="py-1 d-flex">
                    <div class="my-auto avatar avatar-sm bg-gradient-secondary me-3">
                      <svg width="12px" height="12px" viewBox="0 0 43 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <title>credit-card</title>
                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <g transform="translate(-2169.000000, -745.000000)" fill="#FFFFFF" fill-rule="nonzero">
                            <g transform="translate(1716.000000, 291.000000)">
                              <g transform="translate(453.000000, 454.000000)">
                                <path
                                  class="color-background"
                                  d="M43,10.7482083 L43,3.58333333 C43,1.60354167 41.3964583,0 39.4166667,0 L3.58333333,0 C1.60354167,0 0,1.60354167 0,3.58333333 L0,10.7482083 L43,10.7482083 Z"
                                  opacity="0.593633743"
                                ></path>
                                <path
                                  class="color-background"
                                  d="M0,16.125 L0,32.25 C0,34.2297917 1.60354167,35.8333333 3.58333333,35.8333333 L39.4166667,35.8333333 C41.3964583,35.8333333 43,34.2297917 43,32.25 L43,16.125 L0,16.125 Z M19.7083333,26.875 L7.16666667,26.875 L7.16666667,23.2916667 L19.7083333,23.2916667 L19.7083333,26.875 Z M35.8333333,26.875 L28.6666667,26.875 L28.6666667,23.2916667 L35.8333333,23.2916667 L35.8333333,26.875 Z"
                                ></path>
                              </g>
                            </g>
                          </g>
                        </g>
                      </svg>
                    </div>
                    <div class="d-flex flex-column justify-content-center">
                      <h6 class="mb-1 text-sm font-weight-normal"> Payment successfully completed </h6>
                      <p class="mb-0 text-xs text-secondary">
                        <i class="fa fa-clock me-1"></i>
                        2 days
                      </p>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </li> -->
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
// import MaterialInput from '@/components/MaterialInput.vue'
// import Breadcrumbs from '../Breadcrumbs.vue'
import { mapMutations, mapState, mapActions } from 'vuex'

import axiosClient from '../../axios'

export default {
  name: 'navbar',
  data() {
    return {
      branding_settings:{
        primary_color:'',
        secondary_color:'',
        logo:''
      },
      passwordStatus:'',
      cartItemsList:'',
      user:'',
      organization_name:'',
      showCart:false,
      showMenu: false,
      showProfile: false,
    }
  },
  props: ['minNav', 'color'],
  created() {
    this.minNav
  },
  mounted(){
    this.getUser();
    this.isUpdatedRecently();
    this.getOrganizationName();
    // this.getUserPermissions();
    this.getUserRolePermissions();
  },
  methods: {
    ...mapActions(['updateRemovedItem','updatePermissions']),
    ...mapMutations(['navbarMinimize', 'toggleConfigurator']),

    toggleSidebar() {
      this.navbarMinimize()
    },
    getUser(){
      const userData = localStorage.getItem('user');
      if (userData) {
        this.user = JSON.parse(userData);
      }
    },
    //----------------GET USER PERMISSIONS------------
    async getUserPermissions(){
      let id = this.user.id
      try {
          let response= await axiosClient.get('getUserPermissions/'+id)
          response=response.data
          this.formattPermissions(response)
        } catch (error) {
          console.log(error)
        }
    },
    //----------------GET USER ROLE PERMISSIONS------------
    async getUserRolePermissions(){
      let id = this.user.id
      try {
          let response= await axiosClient.get('getUserRolePermissions/'+id)
          response=response.data
          this.restructurePermissions(response);
        } catch (error) {
          console.log(error)
        }
    },
    //-------------FORMAT & SAVE USER PERMISSIONS------------
    formattPermissions(data){
      let permissions=[];
      data.filter((item)=>{
        permissions.push(item.permission_name)
      });
      this.updatePermissions(permissions)
    },
    //-------------Restructure Permissions & SAVE USER PERMISSIONS------------
    restructurePermissions(data){
      let permissions=[];
      data.filter((item)=>{
        permissions.push(item.name)
      });
      this.updatePermissions(permissions)
    },
    //----------------FORMAT THE PRICE---------------
    formattedPrice(value){
        const formattedValue = parseFloat(value).toFixed(2);
        return formattedValue;
    },
    //---------CHECK IF PASSWORD UPDATED---------
    isUpdatedRecently() {
      let user = localStorage.getItem('user');
      user = JSON.parse(user);
      const createdDate = new Date(user.created_at);
      const updatedDate = new Date(user.updated_at);
      if(updatedDate > createdDate){
        this.passwordStatus=true;
      }else{
        this.passwordStatus=false;
      }
    },
    //------------SignOut---------------
    async signOut() {
      try {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('primary_color')
        localStorage.removeItem('secondary_color')
        localStorage.removeItem('logo')
        this.$router.push({ name: 'SignIn' })
        await axiosClient.post('/logout', localStorage.getItem('token'))
      } catch (error) {
        console.log(error)
      }
    },
    //------------GET ORGANIZATION NAME---------------
    async getOrganizationName(){
      if(this.user.role=='super_admin'){
        return
      }
      let data={
        'user_id':this.user.id,
        'role':this.user.role
      }
      try {
        const response=await axiosClient.post('/getOrganizationName',data)
        this.organization_name=response.data.organization_name;
        // this.branding_settings.primary_color=response.data.primary_color;
        // this.branding_settings.secondary_color=response.data.secondary_color;
        // this.branding_settings.logo=response.data.logo;
        // this.updateBrandingSetting(this.branding_settings);
      } catch (error) {
        console.log(error)
      }
    },
    //-----------GET CART ITEMS-----------
    async getCartItems(){
      this.showCart=!this.showCart
      if(this.showCart==false){
        return
      }
        try {
          const response=await axiosClient.get('/getUserCartItems')
          this.cartItemsList=response.data
        } catch (error) {
          console.log(error)
        }
    },
    //----------REMOVE ITEM FROM CART-----------
    async removeItemFromCart(id){
      this.showCart=true
      let data={
        "item_id":id
      }
      try {
          await axiosClient.post('/removeItemFromCart',data)
          this.removeItemFromList(id)
        } catch (error) {
          console.log(error)
        }
    },
    //----------------REMOVE ITEM FROM CART---------------
    removeItemFromList(id){
      const indexToRemove = this.cartItemsList.findIndex(item => item.id === id);
      this.cartItemsList.splice(indexToRemove,1)
      this.snackbarMsg('Item Removed Successfully')
    },
    //----------------REDIRECT TO CHECKOUT PAGE---------------
    navCheckout(){
      this.$router.push({ name: 'cart-checkout'});
    }
  },
  components: {
    // Breadcrumbs,
    // MaterialInput,
  },
  computed: {
    ...mapState(['isRTL', 'isAbsolute']),
    currentRouteName() {
      return this.$route.name
    },
    userRole(){
      if(this.user.role=='super_admin'){
        return "Admin"
      }else if(this.user.role=='school_user'){
        return "School"
      }else{
       return this.user.role
      }
    }
  },
}
</script>
<style>
.cart-dropdown{
  width: 340px !important;
  height: 300px !important;
  overflow-y: scroll;
}
.menu_item{
  height: 35px;
}
.change-pass-alert{
  width: 36rem !important;
  height: 2rem;
  background: rgba(238, 220, 130, 0.5);
  border: 1px solid black;
  border-radius: 6px;
}
.pass-text{
  color: black;
  margin-left: 10px;
  font-size: 10px;
}
.click-link{
  color: blueviolet;
  text-decoration-line: underline;
  cursor: pointer;
}
.organization-name{
  color: #010A21;
  width: 10rem;
}
.organization-name h5{
  font-size: 1rem;
}
</style>
