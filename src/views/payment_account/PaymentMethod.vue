
<template>
    <div>
      <div class="card">
        <div class="card-header">
        </div>
        <div class="card-body row">
            <div class="col-md-5">
            <div class="row d-flex">
                <div style="background-color: #F5F5F5;" class=" mb-1 card card-body border bg-gray card-plain border-radius-lg d-flex">
                <p class="text-dark">Your Payment Information</p>
                </div>
            </div>

            <div id="card-element" class="StripeElement">
            </div>

            <div class="row d-flex mt-1">
            <div class="col-md-5 bg-white name-row p-2 holder_name">
                <label>Card Holder Name</label>
                <input id="card-holder-name" type="text" class="bg-white w-100  mb-2">
            </div>
            </div>

            <div class="row d-flex">
                <button @click="submitPaymentMethod" style="font-size: 12px" class="save_btn mx-auto me-3 w-50 mt-3 trips-btn bg-gradient-grey shadow-grey text-dark fw-5 p-2 border-radius-lg"> Save Payment Method </button>
            </div>
            </div>


            <div class="col-md-5 ms-auto">
                <template v-for="(item,index) in userCards" :key="index">
                    <div :class="{ 'selected': isSelected === index }" @click="toggleSelection(index,$event)"
                    class=" mb-1 card card-body border card-plain border-radius-lg d-flex align-items-center flex-row">
                    <img v-if="item.card.brand=='visa'" class="w-10 me-3 mb-0" src="@/assets/img/logos/visa.png" alt="logo"/>
                    <img v-if="item.card.brand=='mastercard'" class="w-10 me-3 mb-0" src="@/assets/img/logos/mastercard.png" alt="logo"/>
                    <h6 class="mb-0">
                        **** **** **** {{ item.card.last4 }}
                    </h6>
                    <i @click="confirmDelete(item.id)"
                        class="fas fa-trash-alt ms-auto text-dark cursor-pointer"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title
                        aria-hidden="true"
                        data-bs-original-title="Edit Card"
                        aria-label="Edit Card"
                    ></i>
                    <span class="sr-only">Edit Card</span>
                    </div>
                </template>
            </div>

        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axiosClient from '../../axios'
  import Swal from 'sweetalert2';  
  
  export default {
    mounted(){
      this.includeStripe('js.stripe.com/v3/', function(){
          this.configureStripe();
      }.bind(this) );
      this.getUser();
      this.getCustomerPaymentMethods();
    },
    data(){
        return {
          userCards:'',
          user:'',
          card_token:'',
          intentToken:'',
          name: '',
          addPaymentStatus: 0,
          addPaymentStatusError: '',
          stripe: '',
          elements: '',
          card: '',
          stripeAPIToken: 'pk_test_51NL39OA54mv9Tt3cBvUM2bicn8hMv5NhdEuvJcjgezES5zhVCGMOf5IUoqjglR8UfAWjVFStR2iPn3yLvMF3XcpM00Q0oowpaJ'
        }
    },
    methods: {
    confirmDelete(id) {
        Swal.fire({
          title: 'Are you sure?',
          text: "Item will be deleted permanently and you will not be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
          customClass: {
            popup: 'custom-swal'
          }
        }).then((result) => {
          if (result.isConfirmed) {
            this.removePaymentMethod(id)
          }
        });
    },

    includeStripe( URL, callback ){
      let documentTag = document, tag = 'script',
          object = documentTag.createElement(tag),
          scriptTag = documentTag.getElementsByTagName(tag)[0];
      object.src = '//' + URL;
      if (callback) { object.addEventListener('load', function (e) { callback(null, e); }, false); }
      scriptTag.parentNode.insertBefore(object, scriptTag);
    },

    configureStripe(){
      this.stripe = window.Stripe( this.stripeAPIToken );
      this.elements = this.stripe.elements();
      this.card = this.elements.create('card');
      this.card.mount('#card-element');
    },

    generateToken() {
        this.stripe.createToken(this.card)
        .then((result) => {
            this.savePaymentMethod(result.token.id);
        })
        .catch((error) => {
            console.error('Error generating token:', error);
        });
    },

    submitPaymentMethod(){
      this.generateToken()
      this.addPaymentStatus = 1;
      this.stripe.confirmCardSetup(
          this.intentToken.client_secret, {
              payment_method: {
                  card: this.card,
                  billing_details: {
                      name: this.name
                  }
              }
          }
      ).then(function(result) {
        console.log('CreateToken',result)
          if (result.error) {
              this.addPaymentStatus = 3;
              this.addPaymentStatusError = result.error.message;
          } else {
              this.addPaymentStatus = 2;
              this.card.clear();
              this.name = '';
          }
      }.bind(this));
    },

    async savePaymentMethod(token){
      let user=localStorage.getItem('user')
      user= JSON.parse(user)
      let stripe_id=user.stripe_id
      if(stripe_id==null){
        this.snackbarMsg('Stripe Customer Not Found')
        return
      }
      let data={
        'card_token':token,
        'customer_id':stripe_id,
      }
      try {
        await axiosClient.post('/createCard',data);
        this.getCustomerPaymentMethods();
      } catch (error) {
        console.log(error)
      }
    },

    //-----------REMOVE CARD BY ID------------
    async removePaymentMethod(id){
      let data={
        "user_id":this.user.id,
        "payment_method":id
      }
      try {
        await axiosClient.post('/removePaymentMethod',data);
        this.removeFromList(id)
      } catch (error) {
        console.log(error)
      }
    },

    //-----------REMOVE CARD FROM LIST----------
    removeFromList(id){
      const indexToRemove = this.userCards.findIndex(card => card.id === id);
      this.userCards.splice(indexToRemove,1)
      this.snackbarMsg('Card Removed Successfully')
    },

    getUser(){
      const userData = localStorage.getItem('user');
      if (userData) {
        this.user = JSON.parse(userData);
      }
    },

    //--------------PAYMENT METHODS---------
    async getCustomerPaymentMethods(){
      let user;
      let user_id;
      if(this.$route.params.id){
        user_id=this.$route.params.id;
      }else{
        user=localStorage.getItem('user')
        user= JSON.parse(user)
        user_id=user.id;
      }
      if(user_id==null && user.role=='student'){
        this.snackbarMsg('Stripe Customer Not Found')
        return
      }
      let data={
      'user_id':user_id,
      }
      try {
        const response=await axiosClient.post('/getPaymentMethods',data)
        this.userCards=response.data.data
      } catch (error) {
        console.log(error)
      }
    },

    snackbarMsg(message) {
        this.$snackbar.add({
          type: 'error',
          text: message,
          background: 'white',
        })
    },

    }
  }
  
  </script>
  <style scoped>
    /* Add some basic styling to the card element container */
    #card-element {
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      max-width: 385px;
      margin: 0 auto;
    }
  
    /* Style the Stripe elements within the container */
    .StripeElement {
      margin-left:0px !important;
      display: block;
      padding: 10px 12px;
      font-size: 16px;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
      background-color: white;
    }
    .holder_name, .save_btn{
        margin-left: 11px;
    }
  
    /* Style the error message */
    .StripeElement--invalid {
      border-color: #fa755a;
    }
  
    /* Style the validation error message */
    .StripeElement--webkit-autofill {
      background-color: #fefde5 !important;
    }
    .name-row{
      height: 85px;
      border: 1px solid #ccc;
      border-radius: 6px;
      background-color: white;
      width: 385px !important;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
  </style>
  