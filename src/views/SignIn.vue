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
                <material-button class="my-4 mb-2" @click="signIn" style="background-color: #573078;" fullWidth>Sign in</material-button>
              </div>
              <p class="mt-4 text-sm text-success text-center">
                <!-- <small class="text-success text-gradient font-weight-bold">Forgot Password ?</small> -->
                <router-link :to="{ name: 'ForgotPassword' }" class="font-weight-bold" style="color: #573078;">Forgot Password ?</router-link>
                <br>
                <hr/>
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
import { PublicClientApplication } from '@azure/msal-browser';
// import { mapGetters } from 'vuex'
import Navbar from '@/examples/PageLayout/Navbar.vue'
// import MaterialInput from '@/components/MaterialInput.vue'
// import MaterialSwitch from '@/components/MaterialSwitch.vue'
import MaterialButton from '@/components/MaterialButton.vue'
import { mapMutations } from 'vuex'
import axiosClient from '../axios'
import cloneDeep from 'lodash/cloneDeep';

export default {
  name: 'sign-in',
  components: {
    Navbar,
    // MaterialInput,
    // MaterialSwitch,
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
    this.$msalInstance = new PublicClientApplication(
      this.msalConfig,
    );
  },
  mounted() {
    const accounts = this.$msalInstance.getAllAccounts();
    if (accounts.length == 0) {
      return;
    }
    this.account = accounts[0];
    this.$emitter.emit('login', this.account);
  },
  data() {
    return {
      msalConfig: {
        auth: {
          clientId: '84e7c1e4-cd74-42c8-84fe-5ba42ee2049a',
          authority: 'https://login.microsoftonline.com/f8cdef31-a31e-4b4a-93e4-5f571e91255a',
        },
        cache: {
          cacheLocation: 'localStorage',
        },
      },
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
    //------------MICROSOFT SIGNIN-------------
    async MSSignIn() {
      await this.$msalInstance.loginPopup({})
      .then(() => {
        const myAccounts = this.$msalInstance.getAllAccounts();
        this.account = myAccounts[0];
        this.$emitter.emit('login', this.account);
      })
      .catch(error => {
        console.error(`error during authentication: ${error}`);
      });
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
</style>
