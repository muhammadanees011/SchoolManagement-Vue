<template>
    <div class="card mt-4 card-height">
      <div class="card-header pb-3 p-3">
        <div class="row">
            <div class="col text-start">
                <button @click="$router.go(-1)" style="font-size: 12px; background-color: #573078;" class="btn me-3 text-white fw-5 border-0 py-2 px-2  border-radius-lg"> <i class="fas fa-arrow-left"></i> </button>
            </div>
        </div>

        <div class="row" style="width: 100%;">
          <div class="col-12">
            <div class="d-flex justify-content-between border-radius-lg pt-4">
              <h5 class="ms-3 text-sm">TOP-UP</h5>
              <router-link v-if="paymentMethodsLoaded && !checkIfHasCard()" :to="{name:'add_card'}">
                <button style="font-size: 12px; background-color: #573078;" class="btn add-card-btn mb-3 trips-btn w-100  text-white fw-5 border-radius-lg">  <i class="fas fa-plus me-2"></i>
                Add New Card </button>
              </router-link>
            </div>
          </div>
        </div>

        <div class="row" style="width: 100%;">  
          <div class="col-12 d-flex align-items-center">   
            <small class="ms-3 mb-3 page-description">
                  In this section, you can top-up the user's wallet by adding a specified amount to their balance. Additionally, you can add a new payment method, such as a credit or debit card, to the user's account for future transactions. This functionality ensures that users have convenient payment options and sufficient funds available for seamless purchases.
            </small>
          </div>
        </div>

      </div>
      <div class="card-body p-3">
        <div class="row d-flex justify-content-between">
          <div class="col-md-6 mb-md-0 mb-4">

            <template v-for="(item,index) in userCards" :key="index">
              <div :class="{ 'selected': isSelected === index }" @click="toggleSelection(index,$event)"
                class="mb-1 card card-body border card-plain border-radius-lg d-flex align-items-right flex-row" style="width:300px;">
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

            <div class="amount-radio">
              <div class="top-up-row">
                <span class="mb-1" style="display: flex;">
                  <input id="amount25" class="me-1" type="radio" v-model="selected_amount" name="amount" value="25">
                  <label  style="margin-top:-3px;" for="amount25">£25.00</label>
                </span>
              </div>
              <div class="top-up-row">
              <span class="mb-1" style="display: flex;">
                  <input id="amount50" class="me-1" type="radio" v-model="selected_amount" name="amount" value="50">
                  <label  style="margin-top:-3px;"  for="amount50">£50.00</label>
              </span>
              </div>
              <div class="top-up-row">
              <span class="mb-1" style="display: flex;">
                  <input id="amount100" class="me-1" type="radio" v-model="selected_amount" name="amount" value="100">
                  <label class="" style="margin-top:-3px;" for="amount100">£100.00</label>
              </span>
              </div>
              <!-- other<br> -->
              <span class="mb-1 amount-container" style="display: flex; ">
                <input @keyup="selected_amount=null" v-model="formattedBalance" class="me-1 amount-input" type="text" name="gender" placeholder="1.00"> 
              </span>  
            </div>
          </div>
          <div class="col-md-5">
          </div>
          <div class="conteiner">
        <button  @click="addBalance" style="font-size: 12px; background-color: #573078;" class="btn top-up-btn p-3 mb-3 trips-btn  text-white fw-5 border-radius-lg"> Add Balance </button>
      </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  // import MaterialButton from "@/components/MaterialButton.vue";
  import img1 from "@/assets/img/logos/mastercard.png";
  import img2 from "@/assets/img/logos/visa.png";
  import axiosClient from '../../axios'
  import Swal from 'sweetalert2';  
  import { mapGetters } from 'vuex'

  export default {
    name: "payment-card",
    components: {
      // MaterialButton,
    },
    mounted(){
      this.$globalHelper.buttonColor();
      let user=localStorage.getItem('user')
      this.user= JSON.parse(user)
      this.getCustomerPaymentMethods();
    },
    updated(){
      this.$globalHelper.buttonColor();
    },
    computed: {
      ...mapGetters(['getBrandingSetting']),
      formattedBalance: {
        get() {
          return this.addedBalance;
        },
        set(value) {
          const formattedValue = parseFloat(value).toFixed(2);
          this.addedBalance = formattedValue;
        },
      },
    },
    data() {
      return {
        paymentMethodsLoaded:false,
        user:'',
        selected_amount:'',
        externalAccounts:'',
        addedBalance:'',
        userCards:'',
        isSelected:0,
        img1,
        img2,
        showModal:false,
      };
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

    snackbarMsg(message,type='success') {
      this.$snackbar.add({
        type: type,
        text: message,
        background: 'white',
      })
    },

    checkIfHasCard(){
      if(this.userCards && this.userCards.length>0){
        return true
      }else if(this.userCards.length==undefined){
        return false
      }
    },
    //------------ADD BALANCE TO THE WALLET--------------
    async addBalance(){
      let user_id;
      let url=''
      if(this.$route.params.id){
        user_id=this.$route.params.id;
      }else{
        user_id=this.user.id;
      }
      let amount=this.selected_amount==null ? this.addedBalance : this.selected_amount
      let payment_method=this.userCards[this.isSelected] ? this.userCards[this.isSelected].id :''
      if(amount==""){
        this.snackbarMsg('Please select the amount','error');
        return
      }
      if((this.user.role=='super_admin' || this.user.role=='organization_admin' || this.user.role=='staff'))
      {
          if(this.user.role=='staff' && this.user.id==user_id)
          {
            url='/payment/initiate'
            if(!payment_method){
              this.snackbarMsg('Payment Method Not Found','error');
              return
            }
          }
          else
          {
            url='/adminTopUp';
            payment_method=null
          }
      }else{
        url='/payment/initiate'
        if(!payment_method){
            this.snackbarMsg('Payment Method Not Found','error');
            return
          }
      }
      let data={
        "user_id":user_id,
        "amount":amount,
        "payment_method":payment_method,
        "type":'top_up',
      }
      try {
        await axiosClient.post(url,data)
        this.snackbarMsg('Balance Added Successfully');
      } catch (error) {
        console.log(error)
      }
    },
    //---------------TOGGLE CARDS-----------
    toggleSelection(id,event) {
      if (event.target.tagName.toLowerCase() === 'i') {
        return;
      }
      this.isSelected = id;
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
        this.paymentMethodsLoaded=true
      } catch (error) {
        console.log(error)
      }
    },
    //-----------REMOVE CARD BY ID------------
    async removePaymentMethod(id){
      let user=localStorage.getItem('user')
      user= JSON.parse(user)
      let data={
        "user_id":user.id,
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
    }
  },
  };
  </script>
<style>
.amount-radio{
  width: 100px;
  font-size: 12px;
}
.amount-radio input{
  width: 15px;
  height: 15px;
  font-size: 12px;
  background-color: #F0F2F5;
}
.selected {
  background-color: #F0F2F5 !important; 
  border: 2px solid #F0F2F5;
  color: #010A21 !important;
}
.selected h6{
color: #010A21;
}
.card-height{
  height: 100vh;
}
.btn-color{
  background-color: #f513ca !important;
}
.top-up-row{
  padding: 17px;
  height: 50px;
  width: 300px;
  border-radius: 5px;
  border: 1px solid black;
  margin-bottom: 3px;
}
.amount-input{
  width: 25.3em !important; 
  height: 4em !important;
  border: 1px solid black;
  border-radius: 5px;
}
.amount-container{
  width: 25.3em !important; 
  height: 3.5em !important;
}
.top-up-btn{
  margin-top: 4px;
  width: 25.3em !important; 
  height: 4em !important;
}
.add-card-btn{
  height: 4em !important;
}
</style>
  