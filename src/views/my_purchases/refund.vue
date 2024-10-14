

<template>
    <div class="">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body px-0 pb-2">
              <div class="table-responsive p-0">
                <div>
                  <div class="filter-container mb-3">
                    <span>
                      <h6 class="ms-3 text-dark text-capitalize">REFUND REQUESTS</h6>
                      <small class="ms-3 page-description">
                        In the Refund Requests section, you can manage and process requests for refunds submitted by students and approve or reject the request as needed. 
                      </small>
                    </span>

                    <div class="filter-container me-4 mb-2">
                      <span style="display: flex;">
                        <input class="input-box filter-box" @keyup="filterRefunds" v-model="seachString" id="name" type="text" placeholder="Type to Search..." name="address" />
                        <select @change="filterRefunds" class="select-box filter-type-btn" v-model="filterBy" id="filter" type="select" placeholder="Filter" name="filter" style="width: 98px !important;">
                          <option v-for="(item, index) in allFields" :key="index" :value="item">
                            {{ item }}
                          </option>
                        </select>
                      </span>
                    </div> 

                  </div>              
                </div>
    
                    <div class="card-body pt-1 p-3">
                        <div class="container-fluid mt-1">
                        <template v-for="(data,index) in shopItems" :key="index">
                            <div class="col-md-8">
                                <div class="d-flex flex-column">
                                <span class="d-flex">
                                    <h6 class="mb-3 text-sm">{{ data.name }}</h6>
                                    <small v-if="data.product_type" style="font-size: 12px !important;" class=" text-sm ms-2">
                                        ({{ data.product_type }})
                                    </small> 
                                </span>
                                <img :src="$env_vars.BASE_URL + data.image" alt="image" class="shadow-sm w-20 h-10 border-radius-lg" />
                                <!-- <small class="trip-description mt-2">
                                    {{ data.detail }}
                                </small> -->
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="ms-auto text-start">
                                <span><small class="me-3 trip-dates text-warning">Date {{ formatDateString(data.created_at) }}</small></span>
                                <br>
                                <div class="d-flex align-items-start text-danger text-gradient text-sm font-weight-bold" style="justify-content: flex-start;">
                                Price - £{{ formattedAmount(data.price) }}
                                </div>

                                <div style="font-size: 12px; background-color: #F3F4F6; color: #573078 !important;" class="text-white fw-5 p-2 mb-1">
                                  <span v-if='data.payment_card!=null' class="text-success text-sm rounded-pill p-1"><small>Card Payment</small></span>
                                  <span v-if='data.payment_card==null' class="text-warning text-sm rounded-pill p-1"><small>Wallet Payment</small></span>
                                </div>

                                <div style="font-size: 12px; background-color: #F3F4F6; color: #573078 !important;" class="text-white fw-5 p-2">
                                    <span v-if="data.payment_status=='fully_paid'" class="text-success">Fully Paid: £{{ formattedAmount(data.amount_paid) }}</span>
                                    <span v-if="data.payment_status=='partially_paid'" class="text-success">Partially Paid: £{{ formattedAmount(data.amount_paid) }}</span>
                                </div>
                                <template v-if="userPermissions.refunds">
                                <div v-if="data.refund_status=='refund_requested'" class="mt-0 d-flex mt-2">
                                <button @click="confirmAction(data.id,'refunded')" style="font-size: 12px; background-color: #573078;" class="me-3 trips-btn w-45  btn bg-success text-white fw-5 p-2 border-radius-lg"> Approve Refund </button>
                                <button @click="confirmAction(data.id,'refund_rejected')" style="font-size: 12px; background-color: #573078;" class="me-3 trips-btn btn w-45 bg-warning text-white fw-5 p-2 border-radius-lg"> Decline Refund </button>
                                </div>
                                </template>
                                <div v-else style="font-size: 12px; background-color: #F3F4F6; color: #573078 !important;" class="text-white fw-5 p-2">
                                    <span v-if="data.refund_status=='not_refunded'" class="text-success">Refund Rejected</span>
                                    <span v-else class="text-success">{{ data.refund_status }}</span>

                                </div>
                                <br>
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
      this.$permissions.redirectIfNotAllowed('refunds');
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
      filterBy:'Buyer',
      allFields:['Buyer'],
      seachString:'',
      totalRows:'',
      currentPage:'',
      perPage:'',
      totalPages:'',
    }
    },
    methods:{
      confirmAction(id,type) {
        Swal.fire({
          title: 'Are you sure?',
          text: "",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Proceed!',
          customClass: {
            popup: 'custom-swal'
          }
        }).then((result) => {
          if (result.isConfirmed) {
            this.refundActions(id,type)
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
            const response=await axiosClient.post('/getRefundRequest',data)
            this.shopItems=response.data.data;
            this.totalRows = response.data.pagination.total;
            this.currentPage = response.data.pagination.current_page;
            this.perPage = response.data.pagination.per_page;
            this.totalPages = response.data.pagination.last_page;
        } catch (error) {
            console.log(error)
        }
    },

    //-----------FILTER INSTALLMENTS------------
    async filterRefunds(){
      if(this.filterBy=='' && this.seachString==''){
        this.getShopItems()
      }else if(this.filterBy!='' && this.seachString==''){
        this.getShopItems()
      }
      let data={
        "type":this.filterBy,
        "value":this.seachString
      }
      try {
          const response=await axiosClient.post('/filterRefunds',data);
          this.shopItems=response.data;
        } catch (error) {
          console.log(error)
        }
    },

    async refundActions(id,type){
        let data={
            refund_status:type,
            refund_id:id
        }
        try {
        await axiosClient.post('/refundStatus',data)
        this.getShopItems()
        this.snackbarMsg('Successfuly Refunded!')
        } catch (error) {
          console.log(error)
          this.snackbarMsg('Something went wrong!')
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
        const formattedDate = parsedDate.format('DD MMMM YYYY, HH:mm');
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
  
    