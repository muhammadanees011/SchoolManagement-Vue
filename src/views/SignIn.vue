<template>
  <navbar btnBackground="bg-gradient-success" />
  <div
    class="page-header align-items-start min-vh-100"
    :style="{
      backgroundImage: 'url(' + require('@/assets/img/background.jpg') + ')',
    }"
    style="background-size: cover; background-repeat: no-repeat; background-position: center"
  >
    <span class="mask bg-gradient-dark opacity-6"></span>
    <div class="container my-auto">
      <div class="row">
        <div class="col-lg-4 col-md-8 col-12 mx-auto">
          <div class="card z-index-0 fadeIn3 fadeInBottom">
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div class=" border-radius-lg py-3 pe-1" style="background-color: #573078;">
                <img class="ms-5" style="width: 200px; height: 45px;" src="@/assets/img/logos/StudentPay-logo.png">
                <h4 class="text-white font-weight-bolder text-center mt-2 "> Sign in </h4>
              </div>
            </div>
            <div class="card-body">
              <small class="text-danger" v-if="unauthorized">Incorrect Email or Password</small>
              <!-- <form role="form" class="text-start mt-3"> -->
              <div class="mb-3">
                <input id="email" v-model="credentials.email" placeholder="Email" type="email" label="Email" name="email" />
                <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["email"]!==""'>Email is required</small>
              </div>
              <div class="d-flex">
                <input id="password" v-model="credentials.password" 
                placeholder="Password"
                :type="showPassword ? 'text' : 'password'" 
                label="Password" name="password" />
                <span @click="togglePasswordVisibility" class="eye-icon" style="margin-left: -25px; margin-top: 7px;">
                  <i :class="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"></i>
                </span>
              </div>
              <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["password"]!==""'>Password is required</small>
              <!-- <material-switch id="rememberMe" name="rememberMe">Remember me</material-switch> -->
              <div class="text-center">
                <material-button class="my-4 mb-2 custom-signin-btn" @click="signIn" style="background-color: #573078 !important;" fullWidth>Sign in</material-button>
              </div>
              <p class="mt-4 text-sm text-success text-center">
                <!-- <small class="text-success text-gradient font-weight-bold">Forgot Password ?</small> -->
                <router-link :to="{ name: 'ForgotPassword' }" class="font-weight-bold" style="color: #573078;">Forgot Password ?</router-link>
                <br>
                <br>
                <span @click="loginWithMicrosoft" class="mslogin-link mt-3">
                  <img class="me-2" style="width: 12px; height: 12px;" src="@/assets/img/logos/microsoft.png">
                  <small class="mslogin">SignIn with Microsoft</small>
                </span>
              </p>
              <!-- </form> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/examples/PageLayout/Navbar.vue'
import MaterialButton from '@/components/MaterialButton.vue'
import { mapMutations } from 'vuex'
import axiosClient from '../axios'
import cloneDeep from 'lodash/cloneDeep';

export default {
  name: 'sign-in',
  components: {
    Navbar,
    MaterialButton,
  },
  beforeMount() {
    this.toggleEveryDisplay()
    this.toggleHideConfig()
  },
  beforeUnmount() {
    this.toggleEveryDisplay()
    this.toggleHideConfig()
  },
  async created() {
  },
  mounted() {
  },
  data() {
    return {
      unauthorized: false,
      formValidation:"",
      showPassword: false,
      credentials: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    ...mapMutations(['toggleEveryDisplay', 'toggleHideConfig']),

    loginWithMicrosoft() {
      window.location.href = this.$env_vars.BASE_URL+'/auth/redirect';
    },

    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    //------------VALIDATE FORM-------------
    validateForm(){
      let status=false
      let validate=''
      validate=cloneDeep(this.credentials)
      for(let item in this.credentials){
        if(this.credentials[item]==''){
          validate[item]="is required"
          status=true
        }else{
          validate[item]=''
        }
      }
      this.formValidation=validate
      return status;
    },
    //------------SignIn---------------
    async signIn() {
      if(this.validateForm()){
        return;
      }
      try {
        const response = await axiosClient.post('/login', this.credentials)
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
        if (error.response.status == 401) {
          this.unauthorized = true
        }
      }
    },
  },
}
</script>

<style scoped>
.mslogin{
  font-size: 11px;
}
.mslogin-link{
  cursor: pointer;
}

.custom-signin-btn.btn-success {
  background-color: #573078 !important;
  border-color: #573078 !important;
}
</style>
