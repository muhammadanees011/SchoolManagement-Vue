<template>
    <div class="card">
      <div class="card-header pb-0 px-3">
        <h6 class="mb-0">Balance Information</h6>
      </div>
      <div class="card-body pt-4 p-3">
        <div class="row">
          <div class="col-9">
            <ul class="list-group">
              <li class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
                <div class="d-flex flex-column">
                  <h6 class="mb-3 text-sm">Muhammad Anees</h6>
                  <span class="payment-records mb-1 text-xs">
                    Account Number:
                    <span class="text-dark ms-sm-2 font-weight-bold">FRB1235476</span>
                  </span>
                  <span class="payment-records mb-1 text-xs">
                    Account Name:
                    <span class="text-dark ms-sm-2 font-weight-bold">Stockton Funds</span>
                  </span>
                  <span class="payment-records mb-1 text-xs">
                    Current Balance:
                    <span class="text-dark font-weight-bold ms-sm-2">
                      £{{ wallet.ballance }}
                    </span>
                  </span>
                  <span class="payment-records mb-1 text-xs">
                    Phone:
                    <span class="text-dark ms-sm-2 font-weight-bold">
                      6836376231280
                    </span>
                  </span>
                  <span class="payment-records mb-1 text-xs">
                    Email Address:
                    <span class="text-dark ms-sm-2 font-weight-bold">
                      stockton.funds@gmail.com
                    </span>
                  </span>
                </div>
              </li>
            </ul>
          </div>
          <div class="col-3">
            <ul class="list-group">
              <li class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
                <div class="d-flex flex-column">
                  <h6 class="mb-3 text-sm">This Month Consumption Record</h6>
                  <span class="mb-4 payment-records text-xs d-flex justify-content-between">
                    <div>
                      <span class="text-dark ms-sm-2 text-xs font-weight-bold">Total Expense</span>
                    </div>
                    <span class="text-dark ms-sm-2 font-weight-bold">£225</span>
                  </span>
                  <span class="mb-1 payment-records text-xs d-flex justify-content-between">
                    <div>
                      <span class="text-dark ms-sm-2 text-xs">Meals</span>
                    </div>
                    <span class="text-dark ms-sm-2 font-weight-bold">£75</span>
                  </span>
                  <span class="mb-1 payment-records text-xs d-flex justify-content-between">
                    <div>
                      <span class="text-dark ms-sm-2 text-xs">Trips</span>
                    </div>
                    <span class="text-dark ms-sm-2 font-weight-bold">£75</span>
                  </span>
                  <span class="mb-1 payment-records text-xs d-flex justify-content-between">
                    <div>
                      <span class="text-dark ms-sm-2 text-xs">School Shop</span>
                    </div>
                    <span class="text-dark ms-sm-2 font-weight-bold">£75</span>
                  </span>
    
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axiosClient from '../../axios'

  export default {
    name: "billing-card",
    mounted(){
      this.getWallet();
    },
    data() {
      return {
        wallet:'',
      };
    },
    methods:{
      async getWallet(){
        let user=localStorage.getItem('user')
        user= JSON.parse(user)
        let id='';
        if(this.$route.params.id){
          id=this.$route.params.id;
        }else{
          id=user.id
        }
        try {
        const response= await axiosClient.get('/getWallet/'+id);
        this.wallet=response.data
        console.log(this.wallet)
        } catch (error) {
          console.log(error)
        }
      },
    },
  };
  </script>
<style>
.payment-records{
  background-color: #FFFFFF;
  border-radius: 3px;
  padding: 5px;
}
</style>
  