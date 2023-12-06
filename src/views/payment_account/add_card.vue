<!-- 
<template>
  <div>
    <div class="card">
      <div class="card-header">
      </div>
      <div class="card-body">
        <div class="row d-flex justify-content-center">
          <div class="col-md-5">
            <div style="background-color: #F5F5F5;" class=" mb-1 card card-body border bg-gray card-plain border-radius-lg d-flex align-items-center">
              <p class="text-dark">Your Payment Information</p>
            </div>
          </div>
        </div>
      <div id="card-element" class="StripeElement">
      </div>

      <div class="row d-flex justify-content-center mt-1">
        <div class="col-md-5 mx-auto bg-white name-row p-2">
          <label>Card Holder Name</label>
          <input id="card-holder-name" type="text" class="bg-white w-100  mb-2">
        </div>
      </div>
      <div class="row d-flex justify-content-center">
      <button style="font-size: 12px" class="me-3 w-20 mt-3 trips-btn bg-gradient-grey shadow-grey text-dark fw-5 p-2 border-radius-lg"> Save Payment Information </button>
      </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  mounted(){
    this.includeStripe('js.stripe.com/v3/', function(){
        this.configureStripe();
    }.bind(this) );
  },
  data(){
      return {
        name: '',
        addPaymentStatus: 0,
        addPaymentStatusError: '',
        stripe: '',
        elements: '',
        card: '',
        stripeAPIToken: 'pk_test_51OJgsAImkTfQfjIk2hnn4CQtJFOQ40kO4BzyNsJsrnBDw8h5KAdi5b3AeCMbhXVi00wpkw7XbOfjOGqWMJDjC4C100JysiJ9PT'
      }
  },
  methods: {
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
  submitPaymentMethod(){
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
        if (result.error) {
            this.addPaymentStatus = 3;
            this.addPaymentStatusError = result.error.message;
        } else {
            this.savePaymentMethod( result.setupIntent.payment_method );
            this.addPaymentStatus = 2;
            this.card.clear();
            this.name = '';
        }
    }.bind(this));
  },
  }
}

</script>
<style>
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
    display: block;
    padding: 10px 12px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
    background-color: white;
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
  
</style> -->


<template>
    <div class="card mt-4">
      <div class="card-header pb-0 p-3">
        <div class="row">
        </div>
      </div>
      <div class="card-body p-3">
        <div class="row">
          <div class="col-md-5 mx-auto">
            <div style="background-color: #F5F5F5;" class=" mb-1 card card-body border bg-gray card-plain border-radius-lg d-flex align-items-center">
                <p class="text-dark">Your Payment Information</p>
            </div>
            <div class=" mb-1 card card-body border card-plain border-radius-lg d-flex align-items-start">
                <div class="mb-1 input-div">
                    <label class="input-label" for="number">Card Number</label>
                    <input class="input-box" v-model="newCard.accountNumber" id="number"  type="text"  name="number" />
                </div>
                <div class="mb-1 input-div">
                    <label class="input-label" for="website">Cardholder Name</label>
                    <input class="input-box" v-model="newCard.accountHolderName"  id="name" type="text" name="website" />
                </div>
                <div class="mb-1 input-div">
                    <label class="input-label" for="website">Routing Number</label>
                    <input class="input-box" v-model="newCard.sortCode"  id="name" type="text" name="website" />
                </div>
                <div class="mb-1">
                    <label class="input-label" for="account_type">Account Type</label>
                    <br />
                    <select class="select-box" style="width: 340px;" v-model="newCard.accountHolderType" id="account_type" type="select" placeholder="Type" name="account_type">
                      <option v-for="(item, index) in allTypes" :key="index" :value="item">
                        {{ item }}
                      </option>
                    </select>
                  </div>
                <!-- <div class="mb-1 input-div">
                    <span class="d-flex">
                    <label class="input-label" for="address">Expiry Date (Month-Year)</label>
                    </span>
                </div>
                <div class="mb-1 input-div">
                    <span class="d-flex">
                        <input class="input-box me-2" v-model="newCard.card_expiry_month"  id="name"  type="month" name="address" />
                    </span>
                </div>
                <div class="mb-1 input-div-small">
                    <label class="input-label" for="address">CCV</label>
                    <input class="input-box" id="name"  v-model="newCard.card_ccv"  type="number" name="address" />
                </div> -->
               <button @click="addExternalAccount" style="font-size: 12px; background-color:#f513ca;" class="mt-3 trips-btn w-100 text-white fw-5 p-2 px-3 border-radius-lg"> Add Card</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import img1 from "@/assets/img/logos/mastercard.png";
  import img2 from "@/assets/img/logos/visa.png";
  import axiosClient from '../../axios';
  // import cloneDeep from 'lodash/cloneDeep';


  export default {
    name: "payment-card",
    components: {
    },
    data() {
      return {
        img1,
        img2,
        showModal:false,
        allTypes:['individual','company'],
        newCard:{
          // user_id:'',
          accountNumber:'',
          accountHolderName:'',
          accountHolderType:'',
          sortCode:'',
          // card_expiry_month:'',
          // card_expiry_year:'',
          // card_ccv:''
        }
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
      async addExternalAccount(){
        try {
        await axiosClient.post('/addExternalAccount',this.newCard);
        this.$router.push({ name: 'payment_account' });
        this.snackbarMsg('Card Added Successfully')
        } catch (error) {
          console.log(error);
        }
      }
      // //----------ADD NEW PAYMENT CARD----------
      // async addNewCard(){
      //   let userId = JSON.parse(localStorage.getItem('user')).id;
      //   let data=cloneDeep(this.newCard);
      //   data.user_id=userId;
      //   data.card_expiry_month=this.newCard.card_expiry_month.substr(5,7);
      //   data.card_expiry_year=this.newCard.card_expiry_month.substr(0,4);
      //   try {
      //   await axiosClient.post('/addPaymentCard',data);
      //   this.$router.push({ name: 'payment_account' });
      //   this.snackbarMsg('Card Added Successfully')
      //   } catch (error) {
      //     console.log(error);
      //   }
      // }
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
.input-div{
    width: 100%;
}
.input-div-small{
    width: 25%;
}
</style>
  



<!-- 
   <template>
    <form id="payment-form">
      <div id="payment-element">
      </div>
      <button type="submit" @click="handleSubmit">Pay via Stripe</button>
    </form>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import axiosClient from '../../axios';
  
  const token = ref(null);
  const stripe = ref(null);
  const elements = ref(null);
  
  const initializeStripe = () => {
    axiosClient.post('payment/initiate', {
      amount: 150,
      currency: 'USD'
    }).then(response => {
      token.value = response.token;
      const options = {
        clientSecret: response.clientSecret,
      };
      elements.value = stripe.value.elements(options);
      const cardElement = elements.value.create('card');
      cardElement.mount('#payment-element');
        cardElement.on('elements', (event) => {
        if (event.error) {
          console.error(event.error);
        }
      });
    }).catch(error => {
      console.error(error);
    });
  };
  
  onMounted(() => {
    const stripeScript = document.createElement('script');
    stripeScript.src = 'https://js.stripe.com/v3/';
    document.head.appendChild(stripeScript);  
    setTimeout(initializeStripe, 1000);
    test()
  });
  
  const handleSubmit=async(e)=>{
    e.preventDefault();
  
    const { error } = await stripe.value.confirmCardPayment(
      token.value,
      elements.value
    );
  
    if (error === undefined) {
      axiosClient.post("payment/complete", {
        token: token.value,
      });
    } else {
      axiosClient.post("payment/failure", {
        token: token.value,
        code: error.code,
        description: error.message,
      });
    }
  };

  function test(){
    console.log(handleSubmit)
  }
  </script>
   -->