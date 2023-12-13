<template>
    <div class="card mt-4 card-height">
      <div class="card-header pb-3 p-3">
        <div class="row">
          <div class="col-6 d-flex align-items-center">
            <h6 class="mb-0">Set up Payment Account {{ user.role }}</h6>
          </div>
          <div class="col-6 text-end">
            <router-link  :to="{name:'add_card'}">
              <button style="font-size: 12px; background-color: #f513ca;" class=" mb-3 trips-btn w-35  text-white fw-5 p-2 border-radius-lg">  <i class="fas fa-plus me-2"></i>
              Add New Card </button>
            <!-- <button @click="openModal" class="btn-color" variant="gradient">
              <i class="fas fa-plus me-2"></i>
              Add New Card
            </button> -->
            </router-link>
          </div>
        </div>
      </div>
      <div class="card-body p-3">
        <div class="row">
          <div class="col-md-6 mb-md-0 mb-4">
            <div class="amount-radio">
              <span class="mb-1" style="display: flex;">
                  <input id="amount25" class="me-1" type="radio" v-model="selected_amount" name="amount" value="25">
                  <label  style="margin-top:-3px;" for="amount25">£25.00</label>
              </span>
              
              <span class="mb-1" style="display: flex;">
                  <input id="amount50" class="me-1" type="radio" v-model="selected_amount" name="amount" value="50">
                  <label  style="margin-top:-3px;"  for="amount50">£50.00</label>
              </span>

              <span class="mb-1" style="display: flex;">
                  <input id="amount100" class="me-1" type="radio" v-model="selected_amount" name="amount" value="100">
                  <label class="" style="margin-top:-3px;" for="amount100">£100.00</label>
              </span>
              other<br>
              <span class="mb-1" style="display: flex; ">
                <input @keyup="selected_amount=null" v-model="addedBalance" style="width: 190px !important; height: 35px !important;" class="me-1" type="text" name="gender" placeholder="1.00"> 
              </span>  
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
                  <!-- {{ item.card_number }} -->
                </h6>
                <!-- <i @click="removeCardById(item.id)"
                  class="fas fa-trash-alt ms-auto text-dark cursor-pointer"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title
                  aria-hidden="true"
                  data-bs-original-title="Edit Card"
                  aria-label="Edit Card"
                ></i> -->
                <span class="sr-only">Edit Card</span>
              </div>
            </template>
          </div>
          <div class="conteiner">
        <button  @click="addBalance" style="font-size: 12px; background-color: #f513ca;" class=" mb-3 trips-btn w-15 text-white fw-5 p-2 border-radius-lg"> Add Balance </button>
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

  export default {
    name: "payment-card",
    components: {
      // MaterialButton,
    },
    mounted(){
      let user=localStorage.getItem('user')
      this.user= JSON.parse(user)
      this.getCustomerPaymentMethods();
    },
    data() {
      return {
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
      snackbarMsg(message) {
      this.$snackbar.add({
        type: 'success',
        text: message,
        background: 'white',
      })
    },
    //------------ADD BALANCE TO THE WALLET--------------
    async addBalance(){
      let user_id;
      if(this.$route.params.id){
        user_id=this.$route.params.id;
      }else{
        user_id=this.user.id;
      }
      // let user=localStorage.getItem('user')
      // user= JSON.parse(user)
      // this.user=user
      // let stripe_id=user.stripe_id
      let amount=this.selected_amount==null ? this.addedBalance : this.selected_amount
      let payment_method=this.userCards[this.isSelected] ? this.userCards[this.isSelected].id :''
      let data={
        "user_id":user_id,
        "amount":amount,
        // "customer":stripe_id,
        "payment_method":payment_method,
        "type":'top_up',
      }
      try {
        await axiosClient.post('/payment/initiate',data)
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
      // let stripe_id=user.stripe_id
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
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    },
    //-----------REMOVE CARD BY ID------------
    async removeCardById(id){
      try {
        await axiosClient.delete('/removeCardById/' + id);
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
</style>
  