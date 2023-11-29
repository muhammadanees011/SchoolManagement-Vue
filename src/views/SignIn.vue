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
              <div class="bg-gradient-success shadow-success border-radius-lg py-3 pe-1">
                <h4 class="text-white font-weight-bolder text-center mt-2 mb-0"> Sign in </h4>
                <div class="row mt-3">
                  <div class="col-2 text-center ms-auto">
                    <a class="btn btn-link px-3" href="javascript:;">
                      <i class="fab fa-facebook text-white text-lg"></i>
                    </a>
                  </div>
                  <div class="col-2 text-center px-1">
                    <a class="btn btn-link px-3" href="javascript:;">
                      <i class="fab fa-github text-white text-lg"></i>
                    </a>
                  </div>
                  <div class="col-2 text-center me-auto">
                    <a class="btn btn-link px-3" href="javascript:;">
                      <i class="fab fa-google text-white text-lg"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-body">
              <small class="text-danger" v-if="unauthorized">Incorrect Email or Password</small>
              <!-- <form role="form" class="text-start mt-3"> -->
              <div class="mb-3">
                <input id="email" v-model="credentials.email" placeholder="Email" type="email" label="Email" name="email" />
              </div>
              <div class="mb-3">
                <input id="password" v-model="credentials.password" placeholder="Password" type="password" label="Password" name="password" />
              </div>
              <material-switch id="rememberMe" name="rememberMe">Remember me</material-switch>
              <div class="text-center">
                <material-button class="my-4 mb-2" @click="signIn" variant="gradient" color="success" fullWidth>Sign in</material-button>
              </div>
              <p class="mt-4 text-sm text-center">
                Don't have an account?
                <router-link :to="{ name: 'SignUp' }" class="text-success text-gradient font-weight-bold">Sign up</router-link>
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
// import MaterialInput from '@/components/MaterialInput.vue'
import MaterialSwitch from '@/components/MaterialSwitch.vue'
import MaterialButton from '@/components/MaterialButton.vue'
import { mapMutations } from 'vuex'
import axiosClient from '../axios'

export default {
  name: 'sign-in',
  components: {
    Navbar,
    // MaterialInput,
    MaterialSwitch,
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
  data() {
    return {
      unauthorized: false,
      credentials: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    ...mapMutations(['toggleEveryDisplay', 'toggleHideConfig']),

    //------------SignIn---------------
    async signIn() {
      try {
        const response = await axiosClient.post('/login', this.credentials)
        let user = response.data ? response.data.user : null
        let token = response.data ? response.data.access_token : null
        localStorage.setItem('user',  JSON.stringify(user))
        localStorage.setItem('token', token)
        this.$router.push({ name: 'Dashboard' })
      } catch (error) {
        if (error.response.status == 401) {
          this.unauthorized = true
        }
      }
    },
  },
}
</script>

<style scoped></style>
