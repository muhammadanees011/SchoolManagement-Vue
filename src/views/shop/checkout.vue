<template>
    <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12">
            <div class="card">
                <div class="card-header pb-0 px-3 d-flex justify-content-between">
                    <h6 class="mb-0">Checkout</h6>
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
                                            Installments ({{ item.shop_item.payment.total_installments }})
                                        </span>
                                        <span v-if="item.shop_item.payment_plan=='installments_and_deposit'" class="text-success">
                                            Installments And Deposit
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
                                        <i @click="removeItemFromCart(item.id)" class="fas fa-minus-circle text-danger me-2 remove-icon" aria-hidden="true"></i>
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
                            <button v-if="cartItems.length>0" @click="checkout('card')" style="font-size: 12px; background-color: #573078;" class="mt-3 me-3 trips-btn w-45 bg-gradient-grey shadow-grey text-white fw-5 p-2 border-radius-lg"> Card Payment </button>
                            <button v-if="cartItems.length>0" @click="checkout('wallet')" style="font-size: 12px; background-color: #573078;" class="mt-3 me-3 trips-btn w-45 bg-gradient-grey shadow-grey text-white fw-5 p-2 border-radius-lg"> Wallet</button>
                            <!-- <p v-if="dataLoaded" class="text-sm text-warning mt-1">In a Wallet & Card Payment, the wallet is charged first, and any remaining amount is charged to the card.</p> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

  </template>
  
  <script>
import axiosClient from '../../axios'
  export default {
    name: "billing-card",
    data(){
        return{
            isPaymentMethod:true,
            userCards:'',
            dataLoaded:false,
            user:'',
            cartItems:'',
            isSelected:0,
        }
    },
    mounted(){
        this.getUser();
        this.getCartItems();
        this.getCustomerPaymentMethods();
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
            await axiosClient.post('/checkout',data)
            this.snackbarMsg('Checkout Successful')
            this.$router.push({ name: 'Dashboard'});
            this.isPaymentMethod=true
            } catch (error) {
            console.log(error)
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
  