<template>
     <div class="card">
      <div class="card-body pt-4 p-3">

        <div class="row">
            <div class="col text-start">
                <button @click="$router.go(-1)" style="font-size: 12px; background-color: #573078;" class="btn me-3 text-white fw-5 border-0 py-2 px-2  border-radius-lg"> <i class="fas fa-arrow-left"></i> </button>
            </div>
        </div>

        <div class="row">
          <div class="col-md-12 col-sm-12">
            <ul class="list-group">
              <li class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
                <div class="d-flex flex-column">
                  <h6 class="mb-3 text-sm text-white">
                    {{ `${walletData.user?.first_name || '-'} ${walletData.user?.last_name || '-'}` }}
                  </h6>
                  <span class="wallet-info text-white mb-1 text-xs font-weight-bold">
                    Current Balance:
                    <span class="wallet-info text-white font-weight-bold ms-sm-2">
                      £{{ formattedPrice(walletData?.ballance || '0') }}
                    </span>
                  </span>
                  <span class="wallet-info text-white mb-1 font-weight-bold text-xs">
                    FSM Balance:
                    <span class="wallet-info text-white font-weight-bold ms-sm-2">
                      £{{ formattedPrice(fsmAmount?.fsm_amount || '0') }}
                    </span>
                  </span>
                  <span class="wallet-info text-white mb-1 font-weight-bold text-xs">
                    Phone:
                    <span class="wallet-info text-white ms-sm-2 font-weight-bold">
                      {{ walletData.user?.phone || '-' }}
                    </span>
                  </span>
                  <span class="wallet-info text-white mb-1 font-weight-bold text-xs">
                    Email Address:
                    <span class="wallet-info text-white ms-sm-2 font-weight-bold">
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
                    <span class="text-dark ms-sm-2 font-weight-bold">{{transactionType(item.type) }}
                    <br>
                    <small>{{ formatDate(item.created_at) }}</small>
                    </span>
                    <div>
                      <span class="font-weight-bold me-3" :class="{'text-success': item.type === 'top_up' || item.type === 'pos_refund' || item.type === 'school_shop_refund', 'text-danger': !(item.type === 'top_up' || item.type === 'pos_refund' || item.type === 'school_shop_refund')}">
                        {{ (item.type === 'top_up' || item.type === 'pos_refund' || item.type === 'school_shop_refund') ? "+" : "-" }} £{{ formattedPrice(item.amount) }}
                      </span>
                      <br>
                      <small class="text-dark font-weight-bold me-3">{{ (item.type === 'top_up' || item.type === 'pos_refund' || item.type === 'school_shop_refund') ? "Received" : "Spent" }}</small>
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

        <div class="row">
          <div class="col-md-12 col-lg-12">
            <div class="pagination-container">
                <div class="entries-dropdown">
                  <label for="entries">Entries</label>
                  <select v-model="itemsPerPage" @change="getTransactionHistory(currentPage)" id="entries">
                    <option v-for="option in perPageOptions" :key="option" :value="option">{{ option }}</option>
                  </select>
                  <!-- <span>entries/page</span> -->
                </div>

                <!-- Pagination controls -->
                <nav class="pagination-wrapper">
                  <ul class="pagination">
                    <li :class="{ disabled: currentPage === 1 }">
                      <a @click="getTransactionHistory(1)" href="#">«</a>
                    </li>
                    <li :class="{ disabled: currentPage === 1 }">
                      <a @click="getTransactionHistory(currentPage - 1)" href="#">‹</a> <!-- Previous Page -->
                    </li>
                    <li v-for="page in limitedPages" :key="page" :class="{ active: currentPage === page }">
                      <a @click="getTransactionHistory(page)" href="#">{{ page }}</a>
                    </li>
                    <li :class="{ disabled: currentPage === totalPages }">
                      <a @click="getTransactionHistory(currentPage + 1)" href="#">›</a> <!-- Next Page -->
                    </li>
                    <li :class="{ disabled: currentPage === totalPages }">
                      <a @click="getTransactionHistory(totalPages)" href="#">»</a>
                    </li>
                  </ul>
                </nav>
            </div>
          </div>
        </div>

      </div>
    </div>
  </template>
  
  <script>
  import axiosClient from '../../axios'
  import moment from 'moment';
  import { mapGetters, mapActions } from 'vuex'


  export default {
    name: "billing-card",
    mounted(){
      this.getUserId();
      this.getWallet();
      this.getFSMamount();
      this.getTransactionHistory();
      this.$globalHelper.buttonColor();
    },

    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.fromRoute=from.name
      });
    },

    beforeRouteLeave(to, from, next) {
      if((to.name === 'list-students' && this.fromRoute === 'list-students') ||
      (to.name === 'list-staff' && this.fromRoute === 'list-staff')){
        next(); 
      }else{
        let filterString = {
            filterBy: '',
            searchString: ''
          };
          this.updateFilterString(filterString);
        next(); 
      }
    },

    data() {
      return {
        fromRoute:'',
        fsmAmount:'',
        isTransactions:false,
        transactions:'',
        user_id:'',
        user:'',
        wallet:'',
        perPageOptions: [10,20, 40, 60,100,200,300,400],
        itemsPerPage:20,
        totalRows:'',
        currentPage:'',
        perPage:'',
        totalPages:'',
      };
    },
    computed:{
      ...mapGetters(['getBrandingSetting']),
      walletData(){
       return this.wallet;
      },

      limitedPages() {
        let pages = [];
        
        // If total pages <= 5, show all pages
        if (this.totalPages <= 5) {
          for (let i = 1; i <= this.totalPages; i++) {
            pages.push(i);
          }
        } else {
          let startPage, endPage;
          
          // Determine the middle page to be currentPage
          if (this.currentPage <= 3) {
            startPage = 1;
            endPage = Math.min(5, this.totalPages);
          } else if (this.currentPage >= this.totalPages - 2) {
            startPage = Math.max(this.totalPages - 4, 1);
            endPage = this.totalPages;
          } else {
            startPage = this.currentPage - 2;
            endPage = this.currentPage + 2;
          }

          // Ensure the start and end pages are within bounds
          for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
          }

          // Always include the first page if not in range
          if (startPage > 1) {
            pages.unshift(1);
            if (startPage > 2) pages.splice(1, 0, '...');
          }

          // Always include the last page if not in range
          if (endPage < this.totalPages) {
            if (endPage < this.totalPages - 1) pages.push('...');
            pages.push(this.totalPages);
          }
        }

        return pages;
      },
    },
    methods:{
      ...mapActions(['updateFilterString']),

      transactionType(type){
        let newType='';
        if(type=='top_up'){
          newType="Top Up";
        }else if(type=='pos_transaction'){
          newType="Cafeteria Purchase";
        }else if(type=='pos_refund'){
          newType="Cafeteria Refund";
        }else if(type=='school_shop_refund'){
          newType="Portal Shop Refund";
        }else if(type=='trip_funds'){
          newType="Trip Charges";
        }else if(type=='school_shop_funds'){
          newType="Shop Purchase";
        }
        return newType;
      },
      formattedPrice(value){
        const formattedValue = parseFloat(value).toFixed(2);
        return formattedValue;
      },
      getUserId(){
        let bgColor=this.getBrandingSetting.primary_color !='null' ? this.getBrandingSetting.primary_color : '#010A21';
        document.querySelector('.list-group .list-group-item').style.setProperty('--nav-bg-color', bgColor);

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
      async getTransactionHistory(page=null){
        let data={
          'user_id':this.user_id,
          'admin_id':null,
          'page':page,
          'entries_per_page': this.itemsPerPage
        }
        try {
        const response= await axiosClient.post('/getTransactionHistory',data);
        this.transactions=response.data.data.data
        this.isTransactions=true
        this.totalRows = response.data.pagination.total;
        this.currentPage = response.data.pagination.current_page;
        this.perPage = response.data.pagination.per_page;
        this.totalPages = response.data.pagination.last_page;
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
.wallet-info{
  font-size: 0.85rem !important;
}
.list-group .list-group-item{
  background-color: var(--nav-bg-color) !important; 
}
</style>
  