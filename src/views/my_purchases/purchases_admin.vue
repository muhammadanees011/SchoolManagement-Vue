

<template>
    <div class="container-fluid py-4">
      <div class="row">
        <div class="col-12">
          <div class="card my-4">
            <div class="card-body px-0 pb-2">
              <div class="table-responsive p-0">
                <div>
                  <div class="filter-container">
                    <input class="input-box filter-box mb-3 ms-3" id="name" type="text" placeholder="Type to Search..." name="address" />
                    <div class="d-flex me-2">
                    
                      <div class="icon-label me-3" @click="exportTableToXLS()" style="height: 35px;">
                        <span class="label-text bulk_topup">Export To XLS</span>
                      </div>
                    </div>
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
                      <th class="text-center align-middle text-center text-uppercase text-xxs font-weight-bolder">
                        Payment Status
                      </th>
                      <th class="text-center align-middle text-center text-uppercase text-xxs font-weight-bolder">
                        Date
                      </th>                  
                    </tr>
                  </thead>
                  <tbody>

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
      async getShopItems(page){
        let data={
          'page':page
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
  
    