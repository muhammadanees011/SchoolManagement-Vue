<template>
    <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12">
            <div class="card">
                <div class="card-header pb-0 px-3 d-flex justify-content-between">
                    <h6 class="mb-0">Pay Instalment</h6>
                    <button @click="$router.go(-1)" style="font-size: 12px; background-color: #573078;" class="btn me-3 text-white fw-5 border-0 py-2 px-2  border-radius-lg"> <i class="fas fa-arrow-left"></i> </button>
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
                                            Instalments And Deposit
                                            <br> ({{ item.shop_item.payment.total_installments }} Installments)
                                        </span>
                                    </h6>
                                    <span class="mb-1 text-success text-xs">
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
                                        <i @click="removeItemFromCart(item.id)" class="fas fa-minus-circle text-danger me-2" aria-hidden="true"></i>
                                        <br>
                                        <span v-if="item.shop_item.payment_plan=='installments'" class="text-success me-3">
                                            £{{formattedPrice(item.shop_item.payment.amount_per_installment) }} Each
                                        </span>
                                        <span v-if="item.shop_item.payment_plan=='installments_and_deposit'" class="text-success me-3">
                                            £{{formattedPrice(item.shop_item.payment.initial_deposit_installments) }} Deposit
                                            <br>
                                            £{{formattedPrice(item.shop_item.payment.amount_per_installment) }} Each
                                        </span>
                                    </span>
                                    </div>
                                    </div>
                                </li>
                                <li v-if="item.trip!==null" class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
                                    <div class="d-flex flex-column">
                                    <h6 class="mb-3 text-sm">{{ item.trip.title }} (Trip)</h6>
                                    <span class="mb-1 text-xs">
                                        <!-- {{item.trip.description}} -->
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
                                            £{{formattedPrice(item.trip.budget)}}
                                        </span> 
                                        <i @click="removeItemFromCart(item.id)" class="fas fa-minus-circle text-danger me-2" aria-hidden="true"></i>
                                    </span>
                                    </div>
                                    </div>
                                </li>
                            </template>
                        </ul>
                        <div class="col-md-5 ms-auto">
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
                            <!-- <li v-if="cartItems.length>0" class="d-flex align-items-center list-group-item border-0 d-flex p-2 bg-gray-100 border-radius-lg">
                                <div class="d-flex flex-column">
                                <h6 class="d-flex align-items-center text-sm ">Total Amount</h6>
                                </div>
                                <div class="ms-auto text-end">
                                <div class="d-flex me-3 align-items-center" style="justify-content: flex-end;">
                                    <h6 class="d-flex align-items-center text-success fw-bold text-sm ">£{{totalAmount()}}</h6>
                                </div>
                                </div>
                            </li> -->
                            <button @click="checkout('card')" style="font-size: 12px; background-color: #573078;" class="btn mt-3 me-3 trips-btn w-45 bg-gradient-grey shadow-grey text-white fw-5 p-2 border-radius-lg"> Card Payment </button>
                            <button @click="checkout('wallet_and_card')" style="font-size: 12px; background-color: #573078;" class="btn mt-3 me-3 trips-btn w-45 bg-gradient-grey shadow-grey text-white fw-5 p-2 border-radius-lg"> Wallet Payment </button>
                            <div id="express-checkout-element" style="min-height: 50px;"> </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

  </template>
  
  <script>
import axiosClient from '../../axios'
import { loadStripe } from '@stripe/stripe-js';

  export default {
    name: "billing-card",
    data(){
        return{
            installmentDetail:'',
            userCards:'',
            dataLoaded:false,
            user:'',
            isSelected:0,
        }
    },
    async mounted(){
        this.getUser();
        this.getCustomerPaymentMethods();
        this.$globalHelper.buttonColor();
        await this.getInstallment();
        this.expressPaymentCheckout();
    },
    updated(){
        this.$globalHelper.buttonColor();
    },
    methods:{
        //--------------TOAST MESSAGE--------------
        snackbarMsg(message) {
            this.$snackbar.add({
            type: 'success',
            text: message,
            background: 'white',
            })
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
                            sum += item.shop_item.payment.initial_deposit_installments;
                        }
                        else if(item.shop_item.payment_plan=='full_payment'){
                            sum += item.shop_item.price;
                        }
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
        //----------------CHECKOUT------------------
        async checkout(type){
            let payment_method=this.userCards[this.isSelected] ? this.userCards[this.isSelected].id :''
            let installment_id=this.$route.params.id;
            let data={
                "payment_method":payment_method,
                "type":type,
                "installment_id":installment_id,
            };
            try {
            await axiosClient.post('/payInstallment',data)
            this.snackbarMsg('Payment Successful')
            this.$router.push({ name: 'installments'});
            } catch (error) {
            console.log(error)
            }
        },

        async getInstallment(){
            let installment_id=this.$route.params.id;
            let data={
                "installment_id":installment_id,
            }
            try {
            let response=await axiosClient.post('/getInstallmentDetail',data)
            this.installmentDetail=response.data
            } catch (error) {
            console.log(error)
            }
        },

        async expressPaymentCheckout(){
            let installment_amount=this.installmentDetail ? this.installmentDetail.installment_amount: 0
            // Load Stripe
            this.stripe = await loadStripe('pk_test_51NL39OA54mv9Tt3cBvUM2bicn8hMv5NhdEuvJcjgezES5zhVCGMOf5IUoqjglR8UfAWjVFStR2iPn3yLvMF3XcpM00Q0oowpaJ'); // Replace with your publishable key
            // Fetch Payment Intent client secret from your backend
            let data={
                amount:installment_amount*100,
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

        async handlePayment(event) {

            if (!this.stripe || !this.expressCheckoutElement) {
                console.error('Stripe or expressCheckoutElement is not initialized');
                return;
            }

            // Add a listener to handle the "confirm" event
            // this.expressCheckoutElement.on('confirm', async (event) => {
                console.log('Confirm event triggered:', event);

                const { error,paymentIntent } = await this.stripe.confirmPayment({
                    elements: this.elements,
                    confirmParams: {
                        return_url: '', // Replace with your success URL
                    },
                });

                if (error) {
                    console.error('Payment failed:', error.message);
                    // Inform the user of the error
                    event.complete('fail'); // Let the Express Checkout Element know the confirmation failed
                } else {
                    // Inform the Express Checkout Element the confirmation succeeded
                    event.complete('success');

                    console.log('paymentIntent',paymentIntent)
                    // Extract details from paymentIntent
                    const latestCharge = paymentIntent.charges.data[0]; // Get the first charge object
                    const cardDetails = latestCharge.payment_method_details.card;

                    console.log('latestCharge',latestCharge)
                    console.log('cardDetails',cardDetails)

                    let installment_id=this.$route.params.id;
      
                    let data={
                        "payment_method":null,
                        "type":'google_apple_pay',
                        "installment_id":installment_id,
                        "amount": this.installmentDetail ? this.installmentDetail.installment_amount : 0,
                        latest_charge: latestCharge.id,
                        last_4: cardDetails.last4,
                        brand: cardDetails.brand,
                        cardholder_name: latestCharge.billing_details.name
                    };
                    console.log('before saving payment information')
                    const response=await axiosClient.post('/payInstallment',data)
                    console.log('payment information saved',response)
                    console.log(response)
                    // this.$router.go(-1);
                    event.complete('success');
                }
            // });
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
  