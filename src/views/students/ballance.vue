<template>
    <div class="card">
      <div class="card-body pt-4 p-3">
        <div class="row">
          <div class="col-md-12 col-sm-12">
            <ul class="list-group">
              <li style="background-color: #573078 !important;" class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
                <div class="d-flex flex-column">
                  <h6 class="mb-3 text-sm text-white">
                    {{ `${walletData.user?.first_name || '-'} ${walletData.user?.last_name || '-'}` }}
                  </h6>
                  <span class="text-white mb-1 text-xs font-weight-bold">
                    Current Balance:
                    <span class="text-white font-weight-bold ms-sm-2">
                      £{{ formattedPrice(walletData?.ballance || '0') }}
                    </span>
                  </span>
                  <span class="text-white mb-1 font-weight-bold text-xs">
                    FSM Balance:
                    <span class="text-white font-weight-bold ms-sm-2">
                      £{{ formattedPrice(fsmAmount?.fsm_amount || '0') }}
                    </span>
                  </span>
                  <span class="text-white mb-1 font-weight-bold text-xs">
                    Phone:
                    <span class="text-white ms-sm-2 font-weight-bold">
                      {{ walletData.user?.phone || '-' }}
                    </span>
                  </span>
                  <span class="text-white mb-1 font-weight-bold text-xs">
                    Email Address:
                    <span class="text-white ms-sm-2 font-weight-bold">
                      {{ walletData.user?.email || '-' }}
                    </span>
                  </span>
                </div>
              </li>
            </ul>
          </div>
          <div class="col-md-12 col-sm-12">
            <ul class="list-group">
              <li class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
                <div class="d-flex flex-column">
                  <h6 class="mb-3 text-sm">Recent Transaction</h6>
                  <span v-for="(item,index) in transactions" :key="index" class="recent-transactions mb-1 text-xs">
                    <span class="text-dark ms-sm-2 font-weight-bold">{{item.type=='top_up' ? "Top Up":(item.type=='pos_transaction' ? "Cafeteria Purchase":item.type) }}
                    <br>
                    <small>{{ formatDate(item.created_at) }}</small>
                    </span>
                    <div>
                      <span class="font-weight-bold me-3" :class="{ 'text-danger': item.type !== 'top_up','text-success': item.type === 'top_up', }">{{item.type=='top_up' ? "+":"-" }} £{{ formattedPrice(item.amount) }}</span>
                      <br>
                      <small class="text-dark font-weight-bold me-3">{{item.type=='top_up' ? "Received":"Spent" }}</small>
                    </div>
                  </span>
                  <span v-if="transactions.length==0 && isTransactions" class="recent-transactions mb-1 text-xs">
                    <span class="text-warning ms-sm-2 font-weight-bold">No recent transactions.</span>
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
  import moment from 'moment';

  export default {
    name: "billing-card",
    mounted(){
      this.getUserId();
      this.getWallet();
      this.getFSMamount();
      this.getRecentTransactions();
    },
    data() {
      return {
        fsmAmount:'',
        isTransactions:false,
        transactions:'',
        user_id:'',
        user:'',
        wallet:'',
      };
    },
    computed:{
      walletData(){
       return this.wallet;
      }
    },
    methods:{
      formattedPrice(value){
        const formattedValue = parseFloat(value).toFixed(2);
        return formattedValue;
      },
      getUserId(){
        let user=localStorage.getItem('user')
        user= JSON.parse(user)
        if(this.$route.params.id){
          this.user_id=this.$route.params.id;
        }else{
          this.user_id=user.id
        }
      },
      //----------------USER'S WALLET-----------------
      async getWallet(){
        try {
        const response= await axiosClient.get('/getWallet/'+this.user_id);
        this.wallet=response.data
        } catch (error) {
          console.log(error)
        }
      },
      //----------------USER'S FSM AMOUNT-----------------
      async getFSMamount(){
        try {
        const response= await axiosClient.get('/getAmountFSM/'+this.user_id);
        this.fsmAmount=response.data
        } catch (error) {
          console.log(error)
        }
      },
      //------------USER'S RECENT TRANSACTIONS-----------------
      async getRecentTransactions(){
        let data={
          'user_id':this.user_id,
          'admin_id':null
        }
        try {
        const response= await axiosClient.post('/getTransactionHistory',data);
        this.transactions=response.data
        this.isTransactions=true
        } catch (error) {
          console.log(error)
        }
      },
      //------------FORMAT DATE--------------
      formatDate(data) {
        const date = moment(data);
        return date.format('MMM D, YYYY,   HH:mm:ss');
      },
    },
  };
  </script>
<style>
.payment-records{
  background-color: #FFFFFF;
  border-radius: 3px;
  padding: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
}
.recent-transactions {
  background-color: #FFFFFF;
  border-radius: 6px;
  padding: 5px;
  height: 3.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
  width: 70vw !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
  