

<template>
    <div class=" py-4">
      <div class="row">
        <div class="col-12">
          <div class="card my-4">
            <div class="card-body px-0 pb-2">
              <div class="table-responsive p-0">
                <div>

                  <span class="">
                    <h6 class="ms-4 text-dark text-capitalize">SHOP ITEMS</h6>
                    <small class="ms-4 page-description">
                      In the Shop Item section, you can search and add items to your cart. Once you're ready, you can proceed to checkout and complete your purchase by <br>making a payment. This seamless process ensures a smooth shopping experience from selection to payment.
                    </small>
                  </span>
                  
                  <div class="filter-container ms-4 mb-2">
                    <span style="display: flex;">
                      <input class="input-box filter-box" @keyup="filterShopItems" v-model="seachString" id="name" type="text" placeholder="Type to Search..." name="address" />
                      <select @change="filterShopItems" class="select-box filter-type-btn" v-model="filterBy" id="filter" type="select" placeholder="Filter" name="filter">
                        <option v-for="(item, index) in allFields" :key="index" :value="item">
                          {{ item }}
                        </option>
                      </select>
                    </span>
                  </div> 
                  
                </div>
    
                    <div class="card-body pt-1 p-3">
                        <div class="container-fluid mt-1">
                        <template v-for="(data,index) in shopItems" :key="index">
                            <div v-for="(item,itemIndex) in data.shop_items" :key="itemIndex" class="row list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
                                <div class="col-md-8">
                                    <div class="d-flex flex-column">
                                    <span class="d-flex">
                                        <h6 class="mb-3 text-sm">{{ item.name }}</h6>
                                        <small v-if="item.product_type" style="font-size: 12px !important;" class=" text-sm ms-2">({{ item.product_type }})</small> 
                                    </span>
                                    <img :src="$env_vars.BASE_URL + item.image" alt="image" class="shadow-sm w-30 h-20 border-radius-lg" />
                                    <small class="trip-description mt-2">
                                        {{ item.detail }}
                                    </small>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="ms-auto text-start">
                                    <span><small class="me-3 trip-dates">From {{ formatDateString(item.valid_from) }} To {{formatDateString(item.valid_to)}}</small></span>
                                    <br>
                                    <!-- <span><small class="me-3 trip-dates">Total Seats - {{ item.total_booking ? item.total_booking :0 }}</small></span>
                                    <span><small class="me-3 trip-dates">Available Seats - {{  item.total_booking ? item.total_booking :0 }}</small></span>
                                    <br>
                                    <span><small class="me-3 trip-dates">Age Group - 16-20</small></span>
                                    <span><small class="me-3 trip-dates">Booking Open</small></span>
                                    <br>
                                    <span><small class="me-3 trip-dates">{{ item.accomodation_details ? item.accomodation_details:'-' }}</small></span>
                                    <br>
                                    <span v-if="user.role=='super_admin'"><small class="me-3 trip-dates">Organization: {{ item.organization ? item.organization.name:'-' }}</small></span> -->
                                    <div class="d-flex  align-items-start text-danger text-gradient text-sm font-weight-bold" style="justify-content: flex-start;">
                                    Price - £{{ formattedAmount(item.price) }}
                                    </div>
                                    <br>
                                    <div style="font-size: 12px; background-color: #F3F4F6; color: #573078 !important;" class="text-white fw-5 p-2">
                                      <span v-if="item.quantity > 0 " class="text-success">Available</span>
                                      <span v-if="item.quantity == 0 " class="text-danger">Not Available</span>
                                    </div>
                                    <div style="font-size: 12px; background-color: #F3F4F6; color: #573078 !important;" class="text-white fw-5 p-2">
                                      <span class="text-warning">Active Payment Plan</span>
                                      (
                                      <span v-if="item.payment_plan=='full_payment'">Full Payment</span>
                                      <span v-if="item.payment_plan=='installments'">Installments</span>
                                      <span v-if="item.payment_plan=='installments_and_deposit'">Installments And Deposit</span>
                                      )
                                      <br>
                                      <template v-if="item.payment_plan=='installments' || item.payment_plan=='installments_and_deposit'">
                                        <span>Total Installments: {{ item.payment.total_installments }}</span>
                                        <br>
                                        <span>Amount Per Installment: £{{ formattedAmount(item.payment.amount_per_installment) }}</span>
                                        <br>
                                        <span>Initial Deposit: £{{ formattedAmount(item.payment.initial_deposit_installments ?  item.payment.initial_deposit_installments : 0) }}</span>
                                      </template>
                                    </div>
                                    <br>
                                    <!-- <div class="mt-0" v-if="item.cart!==null && user.role=='student'">
                                    <div class="cart-status">Added To Cart</div>
                                    </div> -->
                                    <div class="mt-0" v-if="item.quantity > 0 ">
                                    <button @click="addToCart(item.id)" style="font-size: 12px; background-color: #573078;" class="btn me-3 trips-btn w-45  text-white fw-5 p-2 border-radius-lg"> Add To Cart </button>
                                    </div>
                                    <br>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <div v-if="shopItems.length==0" class="row list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
                            <small class="d-flex justify-content-center">No products found!</small>
                        </div>
                        </div>
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
    </div>
  </template>
  
  <script>
  import axiosClient from '../../axios'
  import { mapGetters } from 'vuex'
  import Swal from 'sweetalert2';
  import moment from 'moment';

  export default {
    name: "tables",
    mounted(){
      this.getUser();
      this.getShopItems();
      this.$globalHelper.buttonColor();
    },
    updated(){
      if(this.user.role!=='student' && this.user.role!=='staff'){
        this.$permissions.redirectIfNotAllowed('view_shop');
      }
      this.$globalHelper.buttonColor();
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
      filterBy:'Name',
      allFields:['Name'],
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
          const response=await axiosClient.post('/getShopItems',data)
          this.shopItems=response.data.data.data;
          this.totalRows = response.data.pagination.total;
          this.currentPage = response.data.pagination.current_page;
          this.perPage = response.data.pagination.per_page;
          this.totalPages = response.data.pagination.last_page;
        } catch (error) {
          console.log(error)
        }
      },


    //-----------FILTER SHOP ITEMS------------
    async filterShopItems(){
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
        "status":'available'
      }
      try {
          const response=await axiosClient.post('/filterShopItems',data);
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

      //------------Add Item To Cart-----------
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
        const formattedDate = parsedDate.format('DD MMMM YYYY');
        return formattedDate;
    },

    //--------------FORMAT AMOUNT---------------
    formattedAmount(value){
    const formattedValue = parseFloat(value).toFixed(2);
    return formattedValue;
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
  
    