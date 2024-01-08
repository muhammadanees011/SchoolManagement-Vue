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
                <div class="border-radius-lg py-3 pe-1" style="background-color: #573078;">
                  <img class="ms-5" style="width: 200px; height: 45px;" src="@/assets/img/logos/StudentPay-logo.png">
                  <h5 class="text-white text-center mt-2">Forgot Password</h5>
                </div>
              </div>
              <div class="card-body">
                <small class="text-danger" v-if="unauthorized">Incorrect Email or Password</small>
                <!-- <form role="form" class="text-start mt-3"> -->
                <div class="mb-3" :class="{ 'mb-5 mt-5': isOTP === false }">
                  <input id="email" v-model="credentials.email" placeholder="Email" type="email" label="Email" name="email" />
                  <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["email"]!==""'>email is required</small>
                </div>
                <div v-if="isOTP" class="mb-3">
                  <input v-model="otp" id="otp" placeholder="otp" type="otp" label="OTP" name="otp" />
                  <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["otp"]!==""'>otp is required</small>
                </div>
                <div class="text-center">
                  <material-button class="my-4 mb-2" @click="requestOtp" style="background-color: #573078;" fullWidth>Next</material-button>
                </div>
                <p class="mt-4 text-sm text-success text-center">
                  <!-- <small class="text-success text-gradient font-weight-bold">SignIn</small> -->
                  <!-- <router-link :to="{ name: 'SignIn' }" class="text-success text-gradient font-weight-bold">SignIn</router-link> -->
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
    name: 'sign-in',
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
        unauthorized: false,
        isOTP:false,
        formValidation:'',
        otp:'',
        credentials: {
          email: '',
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
      async requestOtp() {
        if(this.isOTP){
          this.verifyOtp();
          return
        }
        if(this.validateForm()){
         return;
        }
        try {
          const response = await axiosClient.post('/forgot_password', this.credentials)
          this.isOTP=true
          console.log(response)
        } catch (error) {
         console.log(error)
        }
      },
      async verifyOtp(){
        if(this.validateForm()){
         return;
        }
        let data={
          'email':'',
          'otp':''
        }
        data.email=this.credentials.email
        data.otp=this.otp
        try {
          await axiosClient.post('/forgot_password_verify_otp', data)
          this.$router.push({ name: 'ResetPassword', params: {email:this.credentials.email,otp:this.otp} });
          return
        } catch (error) {
         console.log(error)
        }
      }
    },
  }
  </script>
  
  <style scoped></style>
  