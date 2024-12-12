

<template>
    <div class="">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body px-0 pb-2">
              <div class="table-responsive p-0">
                <h6 class="ms-3 text-dark text-capitalize">REFUNDS</h6>
                                  
                  <span class="ps-0">
                    <small class="ms-3 me-4 page-description">
                      In the Refund section, you can view a list of processed refunds along with their details.
                    </small>
                  </span>

                  <div class="filter-container mb-3">



                    
                    <div class="row" style="width: 100%;">
                  
                      <div class="col-md-4 col-sm-12" style="padding-top: 15px;">  
                        <span style="display: flex; margin-left:20px;">
                          <input class="input-box filter-box" @keyup="filterRefunds('string_search')" v-model="seachString" id="name" type="text" placeholder="Type to Search..." name="address" />
                          <select @change="filterRefunds('string_search')" class="select-box filter-type-btn" v-model="filterBy" id="filter" type="select" placeholder="Filter" name="filter" style="width: 98px !important;">
                            <option v-for="(item, index) in allFields" :key="index" :value="item">
                              {{ item }}
                            </option>
                          </select>
                        </span>
                      </div>

                      <div class="col-md-4 col-sm-12" style="padding-top: 15px;">
                      </div>

                      <div class="col-md-4 col-sm-12" style="padding-top: 15px;">
                        <date-picker @change="filterRefunds('daterange_search')"
                         @clear="getShopItems" 
                         v-model:value="time3"
                         class="ms-3"
                         format="DD/MM/YYYY" value-type="format" range></date-picker>
                      </div>

                    </div>

                  </div> 

                    <div class="card-body pt-1 p-3">
                        <div class="container-fluid mt-1">
                        <template v-for="(data,index) in shopItems" :key="index">
                          <div class="row">
                            <div class="col-md-8">
                                <div class="d-flex flex-column">
                                  <span class="d-flex">
                
                                      <img :src="$env_vars.BASE_URL + data.image" alt="image" class="shadow-sm w-10 h-10 me-3 border-radius-lg" />

                                      <div class="d-flex flex-column ">
                                        <h6 class="text-sm" style="margin-bottom: 0px !important;">{{ data.name }}
                                          <small v-if="data.product_type" style="font-size: 10px !important; font-weight: 400;" class=" text-sm">
                                            ({{ data.product_type }})
                                          </small> 
                                        </h6>

                                        <span style="margin-bottom: 0px !important; margin-top: 0px !important; line-height: 10px;">
                                          <small class="me-3 trip-dates text-warning">Date {{ formatDateString(data.created_at) }}</small>
                                        </span>
                                        <span style="margin-bottom: 0px !important; margin-top: 0px !important; line-height: 10px;">
                                            <small class="me-3 trip-dates text-warning">
                                              <span class="me-2">Refunded to <span class="text-success">{{ data.buyer_name}},</span></span>
                                            <span v-if="data.buyer_role=='student'">Student-ID: <span class="text-success">{{ data.buyer_student_id }}</span></span>
                                            <span v-if="data.buyer_role=='staff'">Staff-ID: <span class="text-success">{{ data.buyer_staff_id }}</span></span>
                                            </small>
                                        </span> 
                                      </div>                              
                                  </span>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="ms-auto text-end me-3">

                                  <div class="d-flex flex-column ">
                                    <small class="text-danger text-gradient text-sm mt-1" style="font-size: 13px !important; font-weight: 600;line-height: 14px;">
                                    Price - £{{ formattedAmount(data.price) }}
                                    </small>

                                      <span style="margin-bottom: 0px !important; margin-top: 0px !important; line-height: 14px;">
                                        <small v-if='data.payment_card!=null' style=" font-size: 13px;" class="text-success">Card Payment</small>
                                      </span>
                                      <span style="margin-bottom: 0px !important; margin-top: 0px !important; line-height: 14px;">
                                      <small v-if='data.payment_card==null' style="font-size: 13px;" class="text-warning">Wallet Payment</small>
                                      </span>

                                    <div style="font-size: 13px;" class="text-white">
                                        <span v-if="data.payment_status=='fully_paid'" class="text-success">Fully Paid: £{{ formattedAmount(data.amount_paid) }}</span>
                                        <span v-if="data.payment_status=='partially_paid'" class="text-success">Partially Paid: £{{ formattedAmount(data.amount_paid) }}</span>
                                    </div>
                                  </div>
                                <!-- <template v-if="userPermissions.refunds">
                                  <div v-if="data.refund_status=='refund_requested'" class="mt-0 d-flex mt-2">
                                  <button @click="confirmAction(data.id,'refunded')" style="font-size: 12px; background-color: #573078;" class="me-3 trips-btn w-45  btn bg-success text-white fw-5 p-2 border-radius-lg"> Approve Refund </button>
                                  <button @click="confirmAction(data.id,'refund_rejected')" style="font-size: 12px; background-color: #573078;" class="me-3 trips-btn btn w-45 bg-warning text-white fw-5 p-2 border-radius-lg"> Decline Refund </button>
                                  </div>
                                </template> -->
                                <!-- <div v-else style="font-size: 12px; background-color: #F3F4F6; color: #573078 !important;" class="text-white fw-5 p-2">
                                    <span v-if="data.refund_status=='not_refunded'" class="text-success">Refund Rejected</span>
                                    <span v-else class="text-success">{{ data.refund_status }}</span>

                                </div> -->
                                </div>
                            </div>
                          </div>
                          <hr>
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
  import DatePicker from 'vue-datepicker-next';
  import 'vue-datepicker-next/index.css';

  export default {
    components: {
      DatePicker
    },
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
      time3: null,
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
    async filterRefunds(event){
        let dateRange
        if(event=="daterange_search"){
          dateRange={ 
            fromDate:this.time3[0],
            toDate:this.time3[1]
          }
        }

        if (this.seachString === '' && event =="string_search") {
          this.getShopItems();
          return;
        }

        const data = event === "daterange_search"
        ? { type: "Date Range", value: dateRange }
        : { type: this.filterBy, value: this.seachString };

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
        const formattedDate = parsedDate.format("DD/MM/YYYY");
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
  
    