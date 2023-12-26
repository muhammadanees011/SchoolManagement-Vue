
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
      <button @click="submitPaymentMethod" style="font-size: 12px" class="me-3 w-20 mt-3 trips-btn bg-gradient-grey shadow-grey text-dark fw-5 p-2 border-radius-lg"> Save Payment Method </button>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosClient from '../../axios'


export default {
  mounted(){
    this.includeStripe('js.stripe.com/v3/', function(){
        this.configureStripe();
    }.bind(this) );
    this.getUser();
  },
  data(){
      return {
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
      this.$router.push({ name: 'payment_account' })
    } catch (error) {
      console.log(error)
    }
  },
  getUser(){
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
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
  
</style>
