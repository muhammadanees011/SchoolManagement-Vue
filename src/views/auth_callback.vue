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
                <div class="mb-3">
                  <input id="password" v-model="credentials.password" placeholder="Password" type="password" label="Password" name="password" />
                  <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["password"]!==""'>Password is required</small>
                </div>
                <!-- <material-switch id="rememberMe" name="rememberMe">Remember me</material-switch> -->
                <div class="text-center">
                  <material-button class="my-4 mb-2" style="background-color: #573078;" fullWidth>Sign in</material-button>
                </div>
                <p class="mt-4 text-sm text-success text-center">
                  <!-- <small class="text-success text-gradient font-weight-bold">Forgot Password ?</small> -->
                  <router-link :to="{ name: 'ForgotPassword' }" class="font-weight-bold" style="color: #573078;">Forgot Password ?</router-link>
                  <br>
                  <br>
                  <span @click="loginWithMicrosoft" class="mslogin-link mt-3">
                    <img v-on:click="MSSignIn" class="me-2" style="width: 12px; height: 12px;" src="@/assets/img/logos/microsoft.png">
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
    mounted() {
        const code = this.$route.query.code; // Extract the code from query parameters
        if (code) {
        this.signIn(code);
        }
    },
    data() {
      return {
        unauthorized: false,
        formValidation:"",
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
      //------------MICROSOFT SIGNOUT-------------
      async SignOut() {
        await this.$msalInstance
        .logout({})
        .then(() => {
          this.$emitter.emit('logout', 'logging out');
        })
        .catch(error => {
          console.error(error);
        });
      },
      //----------TOASTS---------------------
      snackbarMsg(message) {
        this.$snackbar.add({
          type: 'error',
          text: message,
          background: 'white',
        })
      },
      //------------SignIn---------------
      async signIn(data) {
        try {
          const response = await axiosClient.post('/auth_callback', {code:data})
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
          if (error.response.status == 500) {
            this.snackbarMsg('user was not found in StudentPay Portal!')
            window.location.href = 'https://login.microsoftonline.com/cb811789-d752-4ec2-8215-356e22c04d4f/oauth2/v2.0/logout?post_logout_redirect_uri=' + encodeURIComponent('https://staging.student-pay.co.uk/sign-in');
            // const newRoute = this.$router.resolve({ name: 'SignIn' }).href;
            // window.location.href = newRoute;
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
  </style>
  