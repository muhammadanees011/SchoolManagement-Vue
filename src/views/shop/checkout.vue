<template>
    <div>
        <button @click="$router.go(-1)" style="font-size: 12px; background-color: #573078;" class="btn me-3 text-white fw-5 border-0 py-2 px-2 border-radius-lg">
            <i class="fas fa-arrow-left me-2"></i>
        </button>
        <div class="row">
            <div class="col-xl-12 col-lg-12 col-md-12">
                <div class="card">
                    <div class="card-header pb-0 px-3 d-flex justify-content-between">
                        <h6 class="mb-0">Checkout</h6>
                        <router-link v-if="paymentMethodsLoaded && !checkIfHasCard()"  :to="{name:'add_card'}">
                            <button style="font-size: 12px; background-color: #573078;" class="btn add-card-btn mb-3 trips-btn w-100  text-white fw-5 border-radius-lg">
                                <i class="fas fa-plus me-2"></i>
                                Add New Card 
                            </button>
                        </router-link>
                    </div>
                    <div class="card-body pt-4 p-3">
                        <div class="row">
                            <ul class="list-group col-xl-6 col-lg-6 col-md-6">
                                <template v-for="(item,index) in cartItems" :key="index">
                                    <li v-if="item.shop_item!==null" class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
                                        <div class="d-flex flex-column">
                                        <h6 class="mb-3 text-sm">
                                            {{ item.shop_item.name }}
                                            <span v-if="item.shop_item.product_type">({{ item.shop_item.product_type }})</span>
                                            <br>
                                            <span v-if="item.shop_item.payment_plan=='installments'" class="text-success">
                                                Instalments ({{ item.shop_item.payment.total_installments }})
                                            </span>
                                            <span v-if="item.shop_item.payment_plan=='installments_and_deposit'" class="text-success">
                                                Initial Deposit
                                                <br> ({{ item.shop_item.payment.total_installments }} Instalments)
                                            </span>
                                        </h6>
                                        <span class="mb-1 text-success text-xs">
                                            <span class="mb-1 text-sm bg-success text-white px-2" style="border-radius: 5px;">Shop Item</span>  
                                        </span>
                                        </div>
                                        <div class="ms-auto text-end">
                                            <span>
                                            <template v-if="user.role=='super_admin'||user.role=='organization_admin'">
                                                <i class="far fa-trash-alt me-2" aria-hidden="true"></i>
                                                <i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>
                                            </template>
                                            </span>
                                        <div class="ms-auto text-end">
                                        <span>
                                            <span class="me-2 text-warning text-gradient text-sm font-weight-bold">
                                                £{{formattedPrice(item.shop_item.price)}}
                                            </span> 
                                            <i @click="removeItemFromCart(item.id)" class="fas fa-minus-circle text-danger me-2 remove-icon" aria-hidden="true"></i>
                                            <br>
                                            <span v-if="item.shop_item.payment_plan=='installments'" class="text-success me-3">
                                                £{{formattedPrice(item.shop_item.payment.amount_per_installment) }} Each
                                            </span>
                                            <span v-if="item.shop_item.payment_plan=='installments_and_deposit'" class="text-success me-3">
                                                £{{formattedPrice(item.shop_item.payment.initial_deposit) }} Deposit
                                                <br>
                                                £{{formattedPrice(item.shop_item.payment.amount_per_installment) }} Each
                                            </span>
                                        </span>
                                        </div>
                                        </div>
                                    </li>
                                    <li v-if="item.installment!==null" class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
                                        <div class="d-flex flex-column">
                                        <h6 class="mb-3 text-sm">{{item.installment.shop_items ? item.installment.shop_items.name:''}}</h6>
                                        <span class="mb-1 text-xs">
                                            <small class="mb-3 text-sm text-dark">Installment No.{{item.installment.installment_no}}</small>
                                            <br>
                                            <small class="mb-3 text-sm text-dark">Purchase ID: {{item.installment.purchases_id}}</small>
                                            <br>
                                            <span class="mb-1 text-sm bg-success text-white px-2" style="border-radius: 5px;">Installment</span>  
                                        </span>
                                        </div>
                                        <div class="ms-auto text-end">
                                            <span>
                                            <template v-if="user.role=='super_admin'||user.role=='school_user'">
                                                <i class="far fa-trash-alt me-2" aria-hidden="true"></i>
                                                <i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>
                                            </template>
                                            </span>
                                        <div class="ms-auto text-end">
                                        <span>
                                            <span class="me-2 text-warning text-gradient text-sm font-weight-bold">
                                                £{{formattedPrice(item.installment.installment_amount)}}
                                            </span> 
                                            <i @click="removeItemFromCart(item.id)" class="fas fa-minus-circle text-danger me-2 remove-icon" aria-hidden="true"></i>
                                        </span>
                                        </div>
                                        </div>
                                    </li>
                                </template>
                            </ul>
                            <div class="col-md-5 ms-auto">
                                <small v-if="!isPaymentMethod" class="text-danger text-sm">Payment Method Not Found! please add the payment method first.</small>
                                <template v-for="(item,index) in userCards" :key="index">
                                <div :class="{ 'selected': isSelected === index }" @click="toggleSelection(index,$event)"
                                    class=" mb-1 card card-body border card-plain border-radius-lg d-flex align-items-center flex-row">
                                    <img v-if="item.card.brand=='visa'" class="w-10 me-3 mb-0" src="@/assets/img/logos/visa.png" alt="logo"/>
                                    <img v-if="item.card.brand=='mastercard'" class="w-10 me-3 mb-0" src="@/assets/img/logos/mastercard.png" alt="logo"/>
                                    <h6 class="mb-0">
                                    **** **** **** {{ item.card.last4 }}
                                    </h6>
                                </div>
                                </template>
                                <li v-if="cartItems.length>0" class="d-flex align-items-center list-group-item border-0 d-flex p-2 bg-gray-100 border-radius-lg">
                                    <div class="d-flex flex-column">
                                    <h6 class="d-flex align-items-center text-sm ">Total Amount</h6>
                                    </div>
                                    <div class="ms-auto text-end">
                                    <div class="d-flex me-3 align-items-center" style="justify-content: flex-end;">
                                        <h6 class="d-flex align-items-center text-success fw-bold text-sm ">£{{totalAmount()}}</h6>
                                    </div>
                                    </div>
                                </li>
                                <li v-else-if="dataLoaded" class="d-flex justify-content-center align-items-center list-group-item border-0 d-flex p-4 bg-gray-100 border-radius-lg">
                                    <h6 class="text-sm text-warning">You can't checkout while Cart is empty!</h6>
                                </li>
                                <template v-if="isLoading==true">
                                    <p style="color: #59B15D !important;">Checking out, please wait...</p>
                                </template>
                                <template v-else>
                                <button v-if="cartItems.length>0" @click="checkout('card')" style="font-size: 12px; background-color: #573078;" class="btn mt-3 me-3 trips-btn w-45 bg-gradient-grey shadow-grey text-white fw-5 p-2 border-radius-lg"> Card Payment </button>
                                <button v-if="cartItems.length>0" @click="checkout('wallet')" style="font-size: 12px; background-color: #573078;" class="btn mt-3 me-3 trips-btn w-45 bg-gradient-grey shadow-grey text-white fw-5 p-2 border-radius-lg"> Wallet</button>
                                <button v-if="cartItems.length>0" @click="expressPaymentCheckout()" style="font-size: 12px; background-color: #573078;" class="btn mt-3 me-3 trips-btn w-100 bg-gradient-grey shadow-grey text-white fw-5 p-2 border-radius-lg"> Google/Apple Pay</button>
                                <div id="express-checkout-element"> </div>
                                <!-- <p v-if="dataLoaded" class="text-sm text-warning mt-1">In a Wallet & Card Payment, the wallet is charged first, and any remaining amount is charged to the card.</p> -->
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

  </template>
  
  <script>
import axiosClient from '../../axios'
import { mapActions } from 'vuex'
import { loadStripe } from '@stripe/stripe-js';

  export default {
    name: "billing-card",
    data(){
        return{
            stripe: null,
            elements: null,
            clientSecret: null,
            expressCheckoutElement: null,
            paymentMethodsLoaded:false,
            isLoading:false,
            isPaymentMethod:true,
            userCards:'',
            dataLoaded:false,
            user:'',
            cartItems:'',
            isSelected:0,
        }
    },
    async mounted(){
        await this.getUser();
        await this.getCartItems();
        await this.getCustomerPaymentMethods();
        this.$globalHelper.buttonColor();
        // await this.expressPaymentCheckout();
    },
    updated(){
        this.$globalHelper.buttonColor();
    },
    created(){
    },
    methods:{
        ...mapActions(['updateCartItemCounter']),

        async expressPaymentCheckout(){
            // Load Stripe
            this.stripe = await loadStripe('pk_test_51NL39OA54mv9Tt3cBvUM2bicn8hMv5NhdEuvJcjgezES5zhVCGMOf5IUoqjglR8UfAWjVFStR2iPn3yLvMF3XcpM00Q0oowpaJ'); // Replace with your publishable key
            console.log('stripe created',this.stripe)
            // Fetch Payment Intent client secret from your backend
            let price=this.totalAmount();
            price=price * 100
            let data={
                amount:price,
                currency:'gbp'
            }
            const response=await axiosClient.post('/createexpressPaymentIntent',data)
            const clientSecret = response.data.clientSecret;
            console.log('clientSecret',clientSecret)
            this.clientSecret = clientSecret;

            // Initialize Elements and Express Checkout
            this.elements = this.stripe.elements({ clientSecret });
            this.expressCheckoutElement = this.elements.create('expressCheckout');
            this.expressCheckoutElement.mount('#express-checkout-element');
            this.expressCheckoutElement.on('confirm', this.handlePayment);
        },

        async handlePayment() {

            if (!this.stripe || !this.expressCheckoutElement) {
                console.error('Stripe or expressCheckoutElement is not initialized');
                return;
            }
                const { error,paymentIntent } = await this.stripe.confirmPayment({
                    elements: this.elements,
                    confirmParams: {
                        // return_url: '', // Replace with your success URL
                    },
                    // expand: ['charges', 'payment_method', 'latest_charge'], // Request charges, payment method and latest_charge data to be included
                    redirect: 'if_required',
                });

                if (error) {
                    console.error('Payment failed:', error.message);
                } else {
                    // console.log('paymentIntent',paymentIntent)

                    let cardDetails
                    let paymentMethodDetails
                    if (paymentIntent && paymentIntent.payment_method) {
                        // Retrieve Payment Method using Stripe's API
                        paymentMethodDetails=await this.fetchPaymentMethod(paymentIntent.payment_method, paymentIntent.id);
                    }
                    // console.log('cardDetails',paymentMethodDetails)
                    // console.log('paymetnMethod',paymentMethodDetails.payment_method)
                    cardDetails=paymentMethodDetails.payment_method.card
                    let latestCharge=paymentMethodDetails.charge_id

                    let data={
                        "payment_method":null,
                        "type":'google_apple_pay',
                        latest_charge: latestCharge,
                        last_4: cardDetails.last4,
                        brand: cardDetails.brand,
                        cardholder_name: paymentMethodDetails.payment_method.billing_details.name
                    };
                    this.isLoading=true;
                    await axiosClient.post('/checkout',data)
                    this.countUserCartItems();
                    this.$router.go(-1);
                    this.snackbarMsg('Checkout Successful')
                }
        },

        async fetchPaymentMethod(paymentMethodId, paymentIntentId) {
            let data={
                paymentMethodId:paymentMethodId,
                paymentIntentId:paymentIntentId   
            }
            try {
                const response = await axiosClient.post(`/payment-method`,data);
                // console.log('Payment Method Details:', response.data);
                return response.data;
            } catch (error) {
                console.error('Error fetching payment method:', error);
            }
        },

                
        //--------------TOAST MESSAGE--------------
        snackbarMsg(message) {
            this.$snackbar.add({
            type: 'success',
            text: message,
            background: 'white',
            })
        },
        //-----------CHECK IF USER ALREADY HAS A CARD----------------
        checkIfHasCard(){
            if(this.userCards && this.userCards.length>0){
                return true
            }else if(this.userCards.length==undefined){
                return false
            }
        },
        //---------------GET USER----------------------
        getUser(){
            let user=localStorage.getItem('user')
            user= JSON.parse(user)
            this.user=user;
        },
        //----------------FORMAT THE PRICE---------------
        formattedPrice(value){
            const formattedValue = parseFloat(value).toFixed(2);
            return formattedValue;
        },
        //----------------GET CART ITEMS-------------------
        async getCartItems(){
            try {
                let response= await axiosClient.get('/getUserCartItems')
                response=response.data
                this.cartItems=response
                this.dataLoaded=true;
            } catch (error) {
                console.log(error)
            }
        },
        //----------------TOTAL AMOUNT----------------
        totalAmount(){
            let sum = 0;
            if (Array.isArray(this.cartItems)) {
                this.cartItems.forEach((item) => {
                    if (item.trip) {
                        sum += item.trip.budget;
                    }
                    if (item.shop_item) {
                        if(item.shop_item.payment_plan=='installments'){
                            sum += item.shop_item.payment.amount_per_installment;
                        }else if(item.shop_item.payment_plan=='installments_and_deposit'){
                            sum += item.shop_item.payment.initial_deposit;
                        }
                        else if(item.shop_item.payment_plan=='full_payment'){
                            sum += item.shop_item.price;
                        }
                    }if (item.installment) {
                        sum += item.installment.installment_amount;
                    }
                });
            } else {
                console.error("this.cartItems is not an array");
            }
            return this.formattedPrice(sum);
        },
        //----------REMOVE ITEM FROM CART-----------
        async removeItemFromCart(id){
        let data={
            "item_id":id
        }
        try {
            await axiosClient.post('/removeItemFromCart',data)
            this.removeItemFromList(id)
            this.countUserCartItems();
            } catch (error) {
            console.log(error)
        }
        },
        //----------------REMOVE ITEM FROM CART---------------
        removeItemFromList(id){
        const indexToRemove = this.cartItems.findIndex(item => item.id === id);
        this.cartItems.splice(indexToRemove,1)
        this.snackbarMsg('Item Removed Successfully')
        },
        //------------Count Cart Items-----------
        async countUserCartItems(){
        try {
            let response=await axiosClient.get('/countUserCartItems')
            let counter=response.data ? response.data :null
            this.updateCartItemCounter(counter);
        } catch (error) {
            console.log(error)
        }
        },
        //----------------CHECKOUT------------------
        async checkout(type){
            let payment_method=this.userCards[this.isSelected] ? this.userCards[this.isSelected].id :''
            if(!payment_method && type=='card'){
                this.isPaymentMethod=true
                this.isPaymentMethod=false
                return
            }
            payment_method= type=='wallet' ? null:payment_method
            let data={
                "payment_method":payment_method,
                "type":type,
            };
            try {
            this.isLoading=true;
            await axiosClient.post('/checkout',data)
            this.isLoading=false;
            this.snackbarMsg('Checkout Successful')
            this.$router.push({ name: 'Dashboard'});
            this.isPaymentMethod=true
            this.countUserCartItems();
            } catch (error) {
            let message=error.response.data ? error.response.data : 'Something went wrong'
            this.isLoading=false;
            this.$snackbar.add({
            type: 'error',
            text: message,
            background: 'white',
            })
            }
        },
        //--------------PAYMENT METHODS---------
        async getCustomerPaymentMethods(){
        let user;
        let user_id;
        user=localStorage.getItem('user')
        user= JSON.parse(user)
        user_id=user.id;
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
        //---------------TOGGLE CARDS-----------
        toggleSelection(id,event) {
        if (event.target.tagName.toLowerCase() === 'i') {
            return;
        }
        this.isSelected = id;
        },
    }
  };
  </script>

<style scoped>

.remove-icon:hover{
    cursor: pointer;
}

</style>
  