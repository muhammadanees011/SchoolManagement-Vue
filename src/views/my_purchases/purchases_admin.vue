

<template>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card px-3">

            <div class="d-flex justify-content-between border-radius-lg pt-4 pb-3">
              <span>
                <h6 class="text-dark text-capitalize">PURCHASE HISTORY</h6>
                <small class="page-description">The Purchase History section provides detailed records of each purchase, including the Item Name, Buyer Name, Price, Amount Paid,<br> Payment Status, and Date of Purchase. This feature helps track all transactions, offering a clear and organized overview of past purchases.</small>
              </span>
            </div>
            <div class="card-body px-0 pb-2">
              <div class="table-responsive p-0">
                <div>
                  
                  <div class="filter-container ms-2 mb-2">
                    <span style="display: flex;">
                      <input class="input-box filter-box" @keyup="filterPurchaseHistory" v-model="seachString" id="name" type="text" placeholder="Type to Search..." name="address" />
                      <select @change="filterPurchaseHistory" class="select-box filter-type-btn" v-model="filterBy" id="filter" type="select" placeholder="Filter" name="filter">
                        <option v-for="(item, index) in allFields" :key="index" :value="item">
                          {{ item }}
                        </option>
                      </select>

                      <span class="label-text bulk_topup" @click="exportTableToXLS()">
                        <i class="fas fa-download download-icon me-1"></i>
                        Export To XLS
                      </span>
                    </span>
                  </div> 

                </div>
                <table  ref="table" class="table align-items-center mb-0">
                  <thead>
                    <tr>
                      <th class="text-uppercase align-middle text-center text-xxs font-weight-bolder">
                        ID
                      </th>
                      <th class="text-center align-middle text-center text-uppercase text-xxs font-weight-bolder">
                        Buyer
                      </th>
                      <th class="text-uppercase align-middle text-center text-xxs font-weight-bolder">
                        Item
                      </th>
                      <!-- <th class="text-uppercase align-middle text-center text-xxs font-weight-bolder ps-2">
                        Quantity
                      </th> -->
                      <th class="text-uppercase align-middle text-center text-xxs font-weight-bolder">
                        Price
                      </th>
                      <th class="text-uppercase align-middle text-center text-xxs font-weight-bolder">
                        Amount Paid
                      </th>
                      <th class="text-uppercase align-middle text-center text-xxs font-weight-bolder">
                        Payment Method
                      </th>
                      <th class="text-center align-middle text-center text-uppercase text-xxs font-weight-bolder">
                        Payment Status
                      </th>
                      <th class="text-center align-middle text-center text-uppercase text-xxs font-weight-bolder">
                        Date
                      </th>                  
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="shopItems.length === 0">
                      <td colspan="8" class="text-center">
                        No data available.
                      </td>
                    </tr>

                    <tr v-for="(item,index) in shopItems" :key="index">
                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs font-weight-bold">{{ item.id }}</span>
                    </td>
                    <td class="align-middle text-center d-flex flex-column">
                      <span class="text-secondary text-xs">{{ item.buyer_name }} ,</span>
                      <small class="text-secondary text-xs">{{ item.buyer_email }}</small>
                    </td>
                    <td class="align-middle text-center">
                      <img v-if="item.image" :src="$env_vars.BASE_URL + item.image" style="height: 20px; width: 20px; margin-right: 10px;">
                      <span class="text-secondary text-xs ">{{item.name  }}</span>
                    </td>
                    <!-- <td class="align-middle text-center">
                      <span class="text-secondary text-xs ">{{ item.quantity }}</span>
                    </td> -->
                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs">£{{ formattedPrice(item.price) }}</span>
                    </td>
                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs">£{{formattedPrice(item.amount_paid) }}</span>
                    </td>
                    <td class="align-middle text-center">
                      <span v-if="item.payment_card!=null" class="text-success text-xs">Card Payment</span>
                      <span v-if="item.payment_card==null" class="text-warning text-xs">Wallet Payment</span>
                    </td>
                    <td class="align-middle text-center text-sm">
                      <span v-if="item.payment_status == 'partially_paid'" class="badge badge-sm bg-gradient-danger">Partially Paid</span>
                      <span v-if="item.payment_status == 'fully_paid' " class="badge badge-sm bg-gradient-success">Fully Paid</span>
                    </td>
                    <td class="align-middle text-center text-sm">
                        {{ formatDateString(item.created_at) }}
                    </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="row">
                <div class="col-md-12 col-lg-12">
                  <div class="pagination-container">
                      <div class="entries-dropdown">
                        <label for="entries">Entries</label>
                        <select v-model="itemsPerPage" @change="getShopItems(currentPage)" id="entries">
                          <option v-for="option in perPageOptions" :key="option" :value="option">{{ option }}</option>
                        </select>
                        <!-- <span>entries/page</span> -->
                      </div>

                      <!-- Pagination controls -->
                      <nav class="pagination-wrapper">
                        <ul class="pagination">
                          <li :class="{ disabled: currentPage === 1 }">
                            <a @click="getShopItems(1)" href="#">«</a>
                          </li>
                          <li :class="{ disabled: currentPage === 1 }">
                            <a @click="getShopItems(currentPage - 1)" href="#">‹</a> <!-- Previous Page -->
                          </li>
                          <li v-for="page in limitedPages" :key="page" :class="{ active: currentPage === page }">
                            <a @click="getShopItems(page)" href="#">{{ page }}</a>
                          </li>
                          <li :class="{ disabled: currentPage === totalPages }">
                            <a @click="getShopItems(currentPage + 1)" href="#">›</a> <!-- Next Page -->
                          </li>
                          <li :class="{ disabled: currentPage === totalPages }">
                            <a @click="getShopItems(totalPages)" href="#">»</a>
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
  import { mapGetters } from 'vuex'
  import Swal from 'sweetalert2';
  import * as XLSX from 'xlsx';
  import moment from 'moment';

  export default {
    name: "tables",
    mounted(){
      this.setColor();
      this.getUser();
      this.getShopItems();
    },
    updated(){
      this.$permissions.redirectIfNotAllowed('purchase_history');
    },
    computed: {
      ...mapGetters(['getBrandingSetting']),
      userPermissions() {
        return this.$permissions.userPermissions.value;
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
      }
    },
    data(){
    return{
      perPageOptions: [10,20, 40, 60,100,200,300,400],
      itemsPerPage:20,
      shopItems:'',
      user:'',
      seachString:'',
      filterBy:'Item Name',
      allFields:['Buyer','Item Name','Price','Amount Paid','Payment Status'],
      totalRows:'',
      currentPage:'',
      perPage:'',
      totalPages:'',
    }
    },
    methods:{
      confirmDelete(id) {
        Swal.fire({
          title: 'Are you sure?',
          text: "Item will be deleted permanently and you will not be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
          customClass: {
            popup: 'custom-swal'
          }
        }).then((result) => {
          if (result.isConfirmed) {
            this.deleteShopItem(id)
          }
        });
      },

      exportTableToXLS() {
        const table = this.$refs.table;
        const ws = XLSX.utils.table_to_sheet(table);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, 'purchase_history.xlsx');
      },
      setColor() {
        let bgColor=this.getBrandingSetting.primary_color ?
        this.getBrandingSetting.primary_color : '#573078';
        document.querySelector('thead').style.setProperty('--navheader-bg-color', bgColor);
      },
      snackbarMsg(message) {
      this.$snackbar.add({
        type: 'success',
        text: message,
        background: 'white',
      })
    },
    getUser(){
        const userData = localStorage.getItem('user');
        if (userData) {
          this.user = JSON.parse(userData);
        }
      },
    formattedPrice(value){
      const formattedValue = parseFloat(value).toFixed(2);
      return formattedValue;
    },

      async getShopItems(page=null){
        let data={
          'page':page,
          'entries_per_page': this.itemsPerPage
        }
        try {
          const response=await axiosClient.post('/getMyPurchases',data)
          this.shopItems=response.data.data;
          this.totalRows = response.data.pagination.total;
          this.currentPage = response.data.pagination.current_page;
          this.perPage = response.data.pagination.per_page;
          this.totalPages = response.data.pagination.last_page;
        } catch (error) {
          console.log(error)
        }
      },

      //-----------FILTER PURCHASE HISTORY------------
      async filterPurchaseHistory(){
        if(this.filterBy=='' && this.seachString==''){
          this.getShopItems();
          return;
        }else if(this.filterBy!='' && this.seachString==''){
          this.getShopItems();
          return;
        }
        let data={
          "type":this.filterBy,
          "value":this.seachString,
        }
        try {
            const response=await axiosClient.post('/filterPurchaseHistory',data);
            this.shopItems=response.data;
            this.totalRows = response.data.total;
            this.currentPage = response.data.current_page;
            this.perPage = response.per_page;
            this.totalPages = response.data.last_page;
          } catch (error) {
            console.log(error)
        }
      },

      async deleteShopItem(id){
        try {
          await axiosClient.delete('/deleteShopItem/'+id)
          this.getShopItems();
          this.snackbarMsg('Item Removed Successfuly')
        } catch (error) {
          console.log(error)
        }
      },
      //------------REMOVE Item FROM LIST-----------
      removeShopItem(id) {
        const indexToRemove = this.shopItems.findIndex((item) => item.id === id)
        this.shopItems.splice(indexToRemove, 1)
      },
      editShopItem(id){
        this.$router.push({ name: 'edit-shop-items', params: { id } });
      },
        //------------FORMAT DATE--------------
        formatDateString(dateString) {
        const parsedDate = moment(dateString);
        const formattedDate = parsedDate.format('DD MMMM YYYY, HH:mm');
        return formattedDate;
        },
      async addToCart(itemId){
        let user=localStorage.getItem('user')
        user= JSON.parse(user)
        let data={
          'user_id':user.id,
          'shop_item_id':itemId
        }
        try {
          await axiosClient.post('/addItemToCart',data)
          this.snackbarMsg('Item Added to Cart')
        } catch (error) {
          console.log(error)
        }
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
  
    