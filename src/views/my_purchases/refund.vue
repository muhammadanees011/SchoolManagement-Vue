

<template>
    <div class=" py-4">
      <div class="row">
        <div class="col-12">
          <div class="card my-4">
            <div class="card-body px-0 pb-2">
              <div class="table-responsive p-0">
                <div>
                  <div class="filter-container">
                    <h5 class="ms-3">Refund Requests</h5>
                    <!-- <input class="input-box filter-box mb-3 ms-4" id="name" type="text" placeholder="Type to Search..." name="address" /> -->
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
                                <div class="d-flex  align-items-start text-danger text-gradient text-sm font-weight-bold" style="justify-content: flex-start;">
                                Price - £{{ formattedAmount(data.price) }}
                                </div>
                                <br>
                                <div style="font-size: 12px; background-color: #F3F4F6; color: #573078 !important;" class="text-white fw-5 p-2">
                                    <span v-if="data.payment_status=='fully_paid'" class="text-success">Fully Paid: £{{ formattedAmount(data.amount_paid) }}</span>
                                    <span v-if="data.payment_status=='partially_paid'" class="text-success">Partially Paid: £{{ formattedAmount(data.amount_paid) }}</span>
                                </div>
                                <br>
                                <div v-if="data.refund_status=='refund_requested'" class="mt-0 d-flex">
                                <button @click="refundActions(data.id,'refunded')" style="font-size: 12px; background-color: #573078;" class="me-3 trips-btn w-45  bg-success text-white fw-5 p-2 border-radius-lg"> Approve Refund </button>
                                <button @click="refundActions(data.id,'refund_rejected')" style="font-size: 12px; background-color: #573078;" class="me-3 trips-btn w-45 bg-warning text-white fw-5 p-2 border-radius-lg"> Decline Refund </button>
                                </div>
                                <div v-else style="font-size: 12px; background-color: #F3F4F6; color: #573078 !important;" class="text-white fw-5 p-2">
                                    <span class="text-success">{{ data.refund_status }}</span>
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
                        <nav class="page-nav" aria-label="Page navigation">
                          <ul class="pagination mt-4 mb-4">
                              <!-- Previous Page -->
                              <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
                                  <i class="page-link material-icons-round opacity-10 fs-5" :disabled="currentPage === 1"
                                      @click="getShopItems(currentPage - 1)" tabindex="-1"
                                      aria-disabled="true">arrow_back</i>
                              </li>
                              <!-- Page Numbers -->
                              <li class="page-item" v-for="pageNumber in totalPages" :key="pageNumber"
                                  :class="{ 'active': currentPage === pageNumber }">
                                  <a class="page-link" href="#" @click="getShopItems(pageNumber)">{{ pageNumber }}</a>
                              </li>
                              <!-- Next Page -->
                              <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
                                  <i class="page-link material-icons-round opacity-10 fs-5"
                                      :disabled="currentPage === totalPages" @click="getShopItems(currentPage + 1)"
                                      tabindex="-1" aria-disabled="true">arrow_forward</i>
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
  import moment from 'moment';

  export default {
    name: "tables",
    mounted(){
      this.getUser();
      this.getShopItems();
    },
    updated(){
      if(this.user.role=='student'){
        return
      }else{
        this.$permissions.redirectIfNotAllowed('view_shop');
      }
    },
    computed: {
      ...mapGetters(['getBrandingSetting']),
      userPermissions() {
        return this.$permissions.userPermissions.value;
      },
    },
    data(){
    return{
      shopItems:'',
      user:'',
      filterBy:'',
      allFields:['Clear','Account','Type','Amount','Date','Status'],
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

    async getShopItems(page){
        let data={
          'page':page
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

    async refundActions(id,type){
        let data={
            refund_status:type,
            refund_id:id
        }
        try {
        await axiosClient.post('/refundStatus',data)
        this.getShopItems()
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
  
    