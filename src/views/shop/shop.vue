

<template>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card ps-3">

            <div class="d-flex justify-content-between border-radius-lg pt-4">
              <!-- <h6 class="text-dark text-capitalize ps-3">SHOP ITEMS</h6> -->
              <h6 class="text-dark text-capitalize">SHOP ITEMS</h6>
              <template v-if="userPermissions.create_staff">
                <router-link :to="{ name: 'add-items' }">
                  <button style="font-size: 12px;background-color: #573078;" class="btn me-3 justify-content-between text-white fw-1 border-0 py-2 px-3 border-radius-lg"> 
                    <i class="fas fa-plus plus-icon"></i>
                    New
                  </button>  
                </router-link>
              </template>
            </div>

            <span class="ps-0">
              <small class="ms-3 me-4 page-description">
                Here, you can oversee Shop Items. You can add new items, delete or edit existing items, and update their quantity, status, <br> and price. This functionality ensures effective management of the shop items.
              </small>
            </span>

            <div class="card-body px-0 pb-2">
              <div class="table-responsive p-0">
                  <div class="filter-container ms-2 mb-2">

                    <div class="row" style="width: 100%;">
                      
                      <div class="col-4">
                        <span style="display: flex;">
                          <input class="input-box filter-box" @keyup="debouncedSearch" v-model="seachString" id="name" type="text" placeholder="Type to Search..." name="address" />
                          <select @change="debouncedSearch" class="select-box filter-type-btn" v-model="filterBy" id="filter" type="select" placeholder="Filter" name="filter" style="width: 98px !important;">
                            <option v-for="(item, index) in allFields" :key="index" :value="item">
                              {{ item }}
                            </option>
                          </select>
                        </span>
                      </div>

                      <div class="col-12 col-md-2 col-sm-5" style="padding-top: 15px;">
                        <span class="label-text bulk_topup" @click="exportTableToXLS()">
                          <i class="fas fa-download download-icon me-1"></i>
                          Export To XLS
                        </span>
                      </div>

                    </div>
                    
                  </div>  
                  <div class="table-responsive p-0">
                    <table  ref="table" class="table align-items-center mb-0">
                      <thead>
                        <tr>
                          <th class="text-uppercase align-middle text-center text-xxs font-weight-bolder">
                            ID
                          </th>
                          <th class="text-uppercase align-middle text-center text-xxs font-weight-bolder">
                            Item
                          </th>
                          <th class="text-uppercase align-middle text-center text-xxs font-weight-bolder ps-2">
                            Quantity
                          </th>
                          <th class="text-uppercase align-middle text-center text-xxs font-weight-bolder ps-2">
                            Sold Quantity
                          </th>
                          <th class="text-uppercase align-middle text-center text-xxs font-weight-bolder ps-2">
                            Expiration Date
                          </th>
                          <th class="text-uppercase align-middle text-center text-xxs font-weight-bolder">
                            Price
                          </th>
                          <th v-if="user && user.role=='super_admin' || user && user.role=='organization_admin'" class="text-uppercase align-middle text-center text-xxs font-weight-bolder">
                            Shop
                          </th>
                          <th class="text-center align-middle text-center text-uppercase text-xxs font-weight-bolder">
                            Status
                          </th>
                          <th class="text-center align-middle text-center text-uppercase text-xxs font-weight-bolder">
                            Action
                          </th>                  
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-if="shopItems.length === 0">
                          <td colspan="9" class="text-center">
                            No data available.
                          </td>
                        </tr>
                        <template v-for="(data,index) in shopItems" :key="index">

                        <tr v-for="(item,index) in data.shop_items" :key="index">
                        <td class="align-middle text-center">
                          <span class="text-secondary text-xs font-weight-bold">{{ item.id }}</span>
                        </td>
                        <td class="align-middle text-center">
                          <img v-if="item.image" :src=" $env_vars.BASE_URL + item.image" style="height: 20px; width: 20px; margin-right: 10px;">
                          <span class="text-secondary text-xs ">{{item.name  }}</span>
                        </td>
                        <td class="align-middle text-center">
                          <span class="text-secondary text-xs ">{{ item.quantity ?? 'Unlimited' }}</span>
                        </td>
                        <td class="align-middle text-center">
                          <span class="text-secondary text-xs ">{{ item.quantity_sold }}</span>
                        </td>
                        <td class="align-middle text-center">
                          <span class="text-secondary text-xs ">{{ formatDate(item.valid_to) }}</span>
                        </td>
                        <td class="align-middle text-center">
                          <span class="text-secondary text-xs ">£{{ formattedPrice(item.price) }}</span>
                        </td>
                        <td v-if="user && user.role=='super_admin' || user.role=='organization_admin'" class="align-middle text-center">
                          <span class="text-secondary text-xs ">{{data.shop_name  ? data.shop_name:'-' }}</span>
                        </td>
                        <td class="align-middle text-center text-sm">
                          <span v-if="item.status == 'expired' " class="badge badge-sm bg-gradient-danger">Expired</span>
                          <span v-else-if="item.quantity == null " class="badge badge-sm bg-gradient-success">Available</span>
                          <span v-else-if="item.quantity > 0 " class="badge badge-sm bg-gradient-success">Available</span>
                          <span v-else-if="item.quantity == 0 " class="badge badge-sm bg-gradient-danger">Not Available</span>
                        </td>
                        <td class="align-middle text-center text-sm">
                          <!-- <i v-if="user && user.role=='student'" @click="addToCart(item.id)" class="fas fa-plus-circle text-success me-2" aria-hidden="true"></i> -->
                          <!-- <router-link :to="{ name: 'shop-checkout', params: { id: item.id }  }">
                            <i v-if="user && user.role=='student'" class="fas fa-shopping-cart text-success me-2" aria-hidden="true"></i>
                          </router-link> -->
                            <span  v-if="user && user.role!='student' && user.role!='parent' && user.role!='staff'">
                              <i v-if="userPermissions.edit_shop" @click="editShopItem(item.id)" class="material-icons-round opacity-10 fs-5 cursor-pointer">edit</i>
                              <i v-if="userPermissions.delete_shop" @click="confirmDelete(item.id)" class="material-icons-round opacity-10 fs-5 cursor-pointer">delete</i>
                          </span>
                        </td>
                        </tr>
                      </template>
                      </tbody>
                    </table>
                  </div>
              </div>

              <ProductOwner :show="showModal" :ownerData="ownerData" @close="showModal = false" @update-task="updateAmount">
              
              </ProductOwner>
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
  import ProductOwner from '../shop/product_owner.vue'
  import moment from 'moment';
  import { debounce } from 'lodash';

  export default {
    components:{
      ProductOwner
    },
    name: "tables",
    mounted(){
      this.setColor();
      this.getUser();
      this.getShopItems();
      this.$globalHelper.buttonColor();
    },
    updated(){
      this.$permissions.redirectIfNotAllowed('view_shop');
      this.$globalHelper.buttonColor();
    },
    created() {
      this.debouncedSearch = debounce(this.filterShopItems, 500);
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
      ownerData:'',
      showModal:false,
      perPageOptions: [10,20, 40, 60,100,200,300,400],
      itemsPerPage:20,
      seachString:'',
      shopItems:'',
      user:'',
      filterBy:'Name',
      allFields:['Name','Quantity','Price'],
      totalRows:'',
      currentPage:'',
      perPage:'',
      totalPages:'',
    }
    },
    methods:{

    formatDate(date){
      const dateString = date;
      const formattedDate = moment(dateString).format("DD/MM/YYYY");
      return formattedDate;
    },

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
      XLSX.writeFile(wb, 'shop_items.xlsx');
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
        const response=await axiosClient.post('/getShopItems',data)
        this.shopItems=response.data.data.data;
        console.log(this.shopItems)
        let shop=this.shopItems[0]
        this.ownerData={
          product_owner_name:shop.product_owner_name,
          product_owner_email:shop.product_owner_email
        }
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

    //------------REMOVE Item FROM LIST-----------
    removeShopItem(id) {
      const indexToRemove = this.shopItems.findIndex((item) => item.id === id)
      this.shopItems.splice(indexToRemove, 1)
    },

    editShopItem(id){
      this.$router.push({ name: 'edit-shop-items', params: { id } });
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
  
    