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
                  <img class="ms-5" style="width: 200px; height: 45px;" src="@/assets/img/logos/StudentPay-logo.png">
                  <h5 class="text-white text-center mt-2">Reset Password</h5>
                </div>
              </div>
              <div class="card-body">
                <small class="text-danger" v-if="unauthorized">Incorrect Email or Password</small>
                <!-- <form role="form" class="text-start mt-3"> -->
                <div class="mb-3">
                  <input id="email" v-model="credentials.new_password" placeholder="password" type="password" label="Password" name="pass" />
                  <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["new_password"]!==""'>password is required</small>
                </div>
                <div class="mb-3">
                  <input id="otp" v-model="credentials.new_password_confirmation" placeholder="confirm password" type="password" label="Confirm Password" name="password" />
                  <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["password_confirmation"]!==""'>confirm password is required</small>
                </div>
                <div class="text-center">
                  <material-button class="my-4 mb-2" @click="setNewPassword" variant="gradient" color="success" fullWidth>Reset</material-button>
                </div>
                <p class="mt-4 text-sm text-success text-center">
                  <small class="text-success text-gradient font-weight-bold">Go back to </small>
                  <router-link :to="{ name: 'SignIn' }" class="text-success text-gradient font-weight-bold">SignIn</router-link>
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
//   import MaterialSwitch from '@/components/MaterialSwitch.vue'
  import MaterialButton from '@/components/MaterialButton.vue'
  import { mapMutations } from 'vuex'
  import axiosClient from '../axios'
  import cloneDeep from 'lodash/cloneDeep';
  
  export default {
    components: {
      Navbar,
      // MaterialInput,
    //   MaterialSwitch,
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
        email:'',
        unauthorized: false,
        formValidation:'',
        isOTP:false,
        credentials: {
          email: '',
          otp:'',
          new_password: '',
          new_password_confirmation: '',
        },
      }
    },
    methods: {
      ...mapMutations(['toggleEveryDisplay', 'toggleHideConfig']),
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
  
      //------------Request Otp---------------
      async setNewPassword() {
        if(this.validateForm()){
         return;
        }
        this.credentials.email=this.$route.params.email
        this.credentials.otp=this.$route.params.otp
        let data=this.credentials
        try {
          await axiosClient.post('/set_new_password',data)
          this.$router.push({ name: 'SignIn'});
        } catch (error) {
         console.log(error)
        }
      },
    },
  }
  </script>
  
  <style scoped></style>
  