

<template>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card px-3">

            <div class="d-flex justify-content-between border-radius-lg pt-4 pb-3">
              <span>
                <h6 class="text-dark text-capitalize">TRANSACTION HISTORY</h6>
                <small class="page-description">The Transaction History section displays key details of each transaction, including the User, Type, Amount, and Date. This allows you to <br> track all financial activities efficiently, providing a clear overview of each user's transactions over time.</small>
              </span>
            </div>
            <div class="card-body px-0 pb-2">
              <div class="table-responsive p-0">
                <div>

                  <div class="filter-container ms-2 mb-2">
                    <div class="row" style="width: 100%;">
                  
                      <div class="col-md-4 col-sm-12" style="padding-top: 15px;">
                        <span style="display: flex;">
                          <input class="input-box filter-box" @keyup="filterTransactionHistory('string_search')" v-model="seachString" id="name" type="text" :placeholder="computedPlaceholder" name="address" />
                          <select @change="filterTransactionHistory('string_search')" class="select-box filter-type-btn" v-model="filterBy" id="filter" type="select" placeholder="Filter" name="filter" style="width: 98px !important;">
                            <option v-for="(item, index) in allFields" :key="index" :value="item">
                              {{ item }}
                            </option>
                          </select>
                        </span>
                      </div>

                      <div class="col-md-4 col-sm-12" style="padding-top: 15px;">
                      </div>

                      <div class="col-md-4 col-sm-12 d-flex" style="padding-top: 15px;">
                        <div class="label-text bulk_topup me-3 d-flex" @click="exportTableToXLS()"  style="padding-top: 1px; width: fit-content;">
                          <i class="fas fa-download download-icon" title="Export to excel"></i>
                          <!-- Export -->
                        </div>
                        <date-picker @change="filterTransactionHistory('daterange_search')"
                          @clear="getTransactionHistory" 
                          v-model:value="time3" 
                          format="DD/MM/YYYY" value-type="format" range>
                        </date-picker>
                      </div>

                    </div>
                  </div> 


                </div>
                <div class="table-responsive p-0">
                  <table  ref="table" class="table align-items-center mb-0">
                    <thead>
                      <tr>
                        <!-- <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          Account
                        </th> -->
                        <th v-if="user.role!=='student'" class="text-uppercase text-xxs font-weight-bolder">
                          User
                        </th>
                        <th class="align-middle text-center text-uppercase text-xxs font-weight-bolder">
                          Charge Details
                        </th>
                        <th class="align-middle text-center text-uppercase text-xxs font-weight-bolder">
                          Type
                        </th>
                        <th class=" align-middle text-center text-uppercase text-xxs font-weight-bolder ps-2">
                          Amount
                        </th>
                        <th class="align-middle text-center text-uppercase text-xxs font-weight-bolder">
                          Date
                        </th>
                        <!-- <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          Status
                        </th> -->
                        <!-- <th class="align-middle text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          Action
                        </th>                   -->
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-if="transactionHistoryList.length === 0">
                        <td colspan="8" class="text-center">
                          No data available.
                        </td>
                      </tr>
                      <tr v-for="(item,index) in transactionHistoryList" :key="index">
                        <!-- <td>
                          <div class="d-flex px-2 py-1">
                            <div>
                            </div>
                            <div class="d-flex flex-column justify-content-center">
                              <p class="text-xs text-secondary mb-0">
                                {{ item.acct_id }}
                              </p>
                            </div>
                          </div>
                        </td> -->
                        <td v-if="user.role!=='student'" >
                          <div class="d-flex px-2 py-1">
                            <div>
                            </div>
                            <div class="d-flex flex-column justify-content-center">
                              <p class="text-xs text-secondary mb-0">
                                {{ item.user.first_name }} {{ item.user.last_name }},
                                <br>
                                {{ item.user.email }}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td class="align-middle text-center">
                          <p v-if="item.card_brand" class="text-xs text-secondary mb-0">
                            <span class="text-bold text-success">Charge ID:</span> {{ item.charge_id ? item.charge_id:'__' }}<br>
                            <span class="text-bold text-success">Card Brand:</span> {{ item.card_brand ? item.card_brand:'__' }}<br>
                            <span class="text-bold text-success">Last 4 Digit:</span> {{ item.last_4 ? item.last_4:'__'}}<br>
                            <span class="text-bold text-success">Card Name:</span> {{ item.card_holder_name ? item.card_holder_name:'__' }}
                          </p>
                          <p v-else class="text-xs text-secondary mb-0">Wallet Transaction</p>
                        </td>
                        <td class="align-middle text-center">
                          <p class="text-xs text-secondary mb-0">{{ transactionType(item.type) }}</p>
                        </td>
                        <td class="align-middle text-center">  
                          <span class="d-flex justify-content-center">
                            <p class="text-xs text-secondary mb-0">
                              <span v-if="item.type=='top_up'|| item.type=='admin_top_up'|| item.type=='pos_refund' || item.type=='school_shop_refund'" class="text-success me-1" style="font-size:15px; font-weight: 600;">+ </span>
                              <span v-else class="text-danger me-1" style="font-size:15px; font-weight: 600;">- </span>
                              £{{formattedPrice(item.amount) }}
                            </p>
                          </span>
                        </td>
                        <td class="align-middle text-center">
                          <span class="text-secondary text-xs "
                            >{{ formatDate(item.created_at) }}</span
                          >
                        </td>
                        <!-- <td class="align-middle text-center text-sm">
                          <i @click="deleteTransactionHistory(item.id)" class="material-icons-round opacity-10 fs-5 cursor-pointer">delete</i>
                        </td> -->
                      </tr>           
                    </tbody>
                  </table>
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
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axiosClient from '../../axios'
  import moment from 'moment';
  import { mapGetters } from 'vuex'
  import * as XLSX from 'xlsx';
  import DatePicker from 'vue-datepicker-next';
  import 'vue-datepicker-next/index.css';

  export default {
    components: {
      DatePicker
    },
    name: "tables",
    mounted(){
      this.setColor();
      this.getUser();
      this.getTransactionHistory();
      this.$globalHelper.buttonColor();
    },
    updated(){
      if(this.user.role!=='student' && this.user.role!=='satff'){
        this.$permissions.redirectIfNotAllowed('transaction_history');
      }
      this.$globalHelper.buttonColor();
    },
    computed:{
      ...mapGetters(['getBrandingSetting']),

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

      computedPlaceholder() {
        if (this.filterBy === 'Date') {
          return 'Sep 18, 2024';
        }
        return 'Type to Search...';  // Default placeholder
      },
    },
    data(){
      return{
        time3: null,
        perPageOptions: [10,20, 40, 60,100,200,300,400],
        itemsPerPage:20,
        user:'',
        transactionHistoryList:'',
        seachString:'',
        filterBy:'User',
        allFields:['User','Amount'],
        totalRows:'',
        currentPage:'',
        perPage:'',
        totalPages:'',
      }
    },
    methods:{

      setColor() {
        let bgColor=this.getBrandingSetting.primary_color ?
        this.getBrandingSetting.primary_color : '#573078';
        document.querySelector('thead').style.setProperty('--navheader-bg-color', bgColor);
      },

      exportTableToXLS() {
        const table = this.$refs.table;
        const clonedTable = table.cloneNode(true);

        // Find the "Buyer" column index
        const buyerColumnIndex = Array.from(clonedTable.querySelectorAll('th')).findIndex(
          th => th.textContent.trim() === 'User'
        );

        if (buyerColumnIndex !== -1) {
          // Modify the header row to create separate columns for "Buyer Name" and "Buyer Email"
          const headerRow = clonedTable.querySelector('tr');
          const buyerHeader = headerRow.children[buyerColumnIndex];
          buyerHeader.textContent = 'User Name';

          const buyerEmailHeader = document.createElement('th');
          buyerEmailHeader.textContent = 'User Email';
          headerRow.insertBefore(buyerEmailHeader, buyerHeader.nextSibling);

          // Process each row to split the "Buyer" data
          clonedTable.querySelectorAll('tr').forEach((row, index) => {
            if (index > 0) { // Skip the header row
              const buyerCell = row.children[buyerColumnIndex];
              const buyerData = buyerCell.textContent.split(',').map(item => item.trim());

              const buyerName = buyerData[0]; // Assume the name comes before the comma
              const buyerEmail = buyerData.length > 1 ? buyerData[1] : ''; // Email is after the comma

              // Update the cells
              buyerCell.textContent = buyerName;

              const buyerEmailCell = document.createElement('td');
              buyerEmailCell.textContent = buyerEmail;
              row.insertBefore(buyerEmailCell, buyerCell.nextSibling);
            }
          });
        }

        // Export the table
        const ws = XLSX.utils.table_to_sheet(clonedTable);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, 'transaction_history.xlsx');
      },

      // exportTableToXLS() {
      //   const table = this.$refs.table;
      //   const ws = XLSX.utils.table_to_sheet(table);
      //   const wb = XLSX.utils.book_new();
      //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      //   XLSX.writeFile(wb, 'transaction_history.xlsx');
      // },

      transactionType(type){
        let newType='';
        if(type=='top_up'){
          newType="Top Up";
        }else if(type=='topup_refund'){
          newType="Top Up Refund";
        }else if(type=='admin_top_up'){
          newType="Top Up (Admin)";
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

      getUser(){
        let user=localStorage.getItem('user')
        this.user= JSON.parse(user)
      },

      snackbarMsg(message,type='success') {
        this.$snackbar.add({
          type: type,
          text: message,
          background: 'white',
        })
      },

      //-----------GET ALL HISTORY-------------
      async getTransactionHistory(page=null){
        let user=localStorage.getItem('user')
        user= JSON.parse(user)
        let user_id=null;
        if(user.role=='student'){
          user_id=user.id
        }
        let data={
          'user_id':null,
          'admin_id':null,
          'role':null,
          'page':page,
          'entries_per_page': this.itemsPerPage
        }
        data.user_id=user_id
        if(this.user.role=='organization_admin' || this.user.role=='staff' || this.user.role=='parent'){
         data.admin_id=this.user.id
         data.role=this.user.role
        }
        try {
         const response= await axiosClient.post('getTransactionHistory',data);
         this.transactionHistoryList=response.data.data.data;
         this.totalRows = response.data.pagination.total;
         this.currentPage = response.data.pagination.current_page;
         this.perPage = response.data.pagination.per_page;
         this.totalPages = response.data.pagination.last_page;
        } catch (error) {
          console.log(error)
        }
      },

      //-----------FILTER TRANSACTION HISTORY------------
      async filterTransactionHistory(event){
        let dateRange
        if(event=="daterange_search"){
          dateRange={ 
            fromDate:this.time3[0],
            toDate:this.time3[1]
          }
        }

        if (this.seachString === '' && event =="string_search") {
          this.getTransactionHistory();
          return;
        }

        const data = event === "daterange_search"
        ? { type: "Date Range", value: dateRange }
        : { type: this.filterBy, value: this.seachString };

        try {
           const response=await axiosClient.post('/filterTransactionHistory',data);
           this.transactionHistoryList=response.data;
          } catch (error) {
            console.log(error)
          }
      },

      //-----------DELETE RECORD--------------
      async deleteTransactionHistory(id){
          try {
           await axiosClient.delete('/deleteTransactionHistory/'+id);
           this.removeTransactionFromList(id);
           this.snackbarMsg('Deleted Successfully');
          } catch (error) {
            console.log(error)
          }
      },

      //------------REMOVE STUDENT FROM LIST-----------
      removeTransactionFromList(id) {
        const indexToRemove = this.transactionHistoryList.findIndex((item) => item.id === id)
        this.transactionHistoryList.splice(indexToRemove, 1)
      },

      //------------FORMAT DATE--------------
      formatDate(data) {
        const date = moment(data);
        return date.format("DD/MM/YYYY");
      },

    },
  };
  </script>
  <style>
  .filter-box{
    margin-left: 1%;
    width: 25%;
    font-size: 12px;
  }
  .filter-type-btn{
    margin-right:1%;
    width:10% !important;
  }
  .filter-container {
    position: relative;
    display: flex;
    justify-content: space-between;
  }
  .filter-icon {
    position: absolute;
    top: 50%;
    right: 10px; /* Adjust the right distance as needed */
    transform: translateY(-50%);
    color: #555; /* Adjust the color as needed */
    cursor: pointer;
  }
  thead{
  background-color: var(--navheader-bg-color) !important;
  }
  tbody > tr:hover{
    background-color: #F0F2F5 !important;
  }
  thead tr:hover{
    background-color: var(--navheader-bg-color) !important;
  }
  </style>
  
    