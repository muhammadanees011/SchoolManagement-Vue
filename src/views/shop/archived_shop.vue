

<template>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card px-3">

            <div class="d-flex justify-content-between border-radius-lg pt-4 pb-3">
              <!-- <h6 class="text-dark text-capitalize ps-3">ARCHIVED ITEMS</h6> -->
                <span>
                  <h6 class="text-dark text-capitalize">SHOP ITEMS</h6>
                  <small class="page-description">
                    Every archived Item can be found in this table. Here, you can manage archived Shop Items. You can permanently delete them in bulk,
                    restore them, or export the data to an Excel sheet
                  </small>
                </span>
            </div>
            <div class="card-body px-0 pb-2">
              <div class="table-responsive p-0">
                <div>
                
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

                      <div class="col-12 col-md-2 col-sm-5" style="padding-top: 15px;">
                        <span class="label-text bulk_topup" @click="confirmAction('restore')">
                          <i class="fas fa-undo restore-icon me-1"></i>
                          Bulk Restore
                        </span>
                      </div>

                      <div class="col-12 col-md-2 col-sm-5" style="padding-top: 15px;">
                        <span class="label-text bulk_topup" v-if="userPermissions.delete_student" @click="confirmAction('delete')">
                          <i class="fas fa-trash delete-icon me-1"></i>
                          Bulk Delete
                        </span>
                      </div>

                    </div>
                  </div> 

                </div>
                <div class="table-responsive p-0">
                  <table  ref="table" class="table align-items-center mb-0">
                      
                    <thead>
                      <tr>
                      <th class="">
                      <div class="form-check" style="margin-left:-20px;">
                          <input @change="selectAll" v-model="selectall" id="" class="form-check-input" type="checkbox" name="">
                          <label for="" class="custom-control-label"></label>
                      </div>
                      </th>
                        <th class="text-uppercase align-middle text-center text-xxs font-weight-bolder">
                          ID
                        </th>
                        <th class="text-uppercase align-middle text-center text-xxs font-weight-bolder">
                          Item
                        </th>
                        <th class="text-uppercase align-middle text-center text-xxs font-weight-bolder ps-2">
                          Quantity
                        </th>
                        <th class="text-uppercase align-middle text-center text-xxs font-weight-bolder">
                          Price
                        </th>
                        <!-- <th v-if="user && user.role=='super_admin' || user.role=='organization_admin' || user.role=='staff'" class="text-uppercase align-middle text-center text-secondary text-xxs font-weight-bolder opacity-7">
                          Attribute
                        </th> -->
                        <th v-if="user && user.role=='super_admin' || user && user.role=='organization_admin'" class="text-uppercase align-middle text-center text-xxs font-weight-bolder">
                          Shop
                        </th>
                        <th class="text-center align-middle text-center text-uppercase text-xxs font-weight-bolder">
                          Status
                        </th>                 
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-if="shopItems.length === 0">
                        <td colspan="7" class="text-center">
                          No data available.
                        </td>
                      </tr>
                      <template v-for="(data,index) in shopItems" :key="index">

                      <tr v-for="(item,index) in data.shop_items" :key="index">
                      <td class="align-middle text-center text-sm">
                      <div class="form-check">
                          <input :checked="checkIfSelected(item.id)" @change="selectRecord(item.id)" id="" class="form-check-input" type="checkbox" name="">
                          <label for="" class="custom-control-label"></label>
                      </div>
                      </td>
                      <td class="align-middle text-center">
                        <span class="text-secondary text-xs font-weight-bold">{{ item.id }}</span>
                      </td>
                      <td class="align-middle text-center">
                        <span class="text-secondary text-xs ">{{item.name  }}</span>
                      </td>
                      <td class="align-middle text-center">
                        <span class="text-secondary text-xs ">{{ item.quantity ? item.quantity :'Unlimited' }}</span>
                      </td>
                      <td class="align-middle text-center">
                        <span class="text-secondary text-xs ">£{{ formattedPrice(item.price) }}</span>
                      </td>
                      <!-- <td v-if="user && user.role=='super_admin' || user.role=='organization_admin' || user.role=='staff' "  class="align-middle text-center">
                        <span class="text-secondary text-xs ">{{item.attribute ? item.attribute.name:'-' }}</span>
                      </td> -->
                      <td v-if="user && user.role=='super_admin' || user.role=='organization_admin'" class="align-middle text-center">
                        <span class="text-secondary text-xs ">{{data.shop_name  ? data.shop_name:'-' }}</span>
                      </td>
                      <td class="align-middle text-center text-sm">
                        <span class="badge badge-sm bg-gradient-success">{{ item.status }}</span>
                      </td>
                      </tr>
                    </template>
                    </tbody>
                  </table>
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
  </template>
  
  <script>
  import axiosClient from '../../axios'
  import { mapGetters } from 'vuex'
  import Swal from 'sweetalert2';
  import * as XLSX from 'xlsx';
  import { debounce } from 'lodash';

  export default {
    name: "tables",
    async mounted(){
      await this.setColor();
      await this.getUser();
      await this.getShopItems();
      await this.selectAll();
    },
    updated(){
      if(this.user.role=='student'){
        return
      }else{
        this.$permissions.redirectIfNotAllowed('view_shop');
      }
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
    perPageOptions: [10,20, 40, 60,100,200,300,400],
    itemsPerPage:20,

    filterBy:'Name',
    allFields:['Name','Quantity','Price'],

    seachString:'',
    selectall:false,
    selectedRecords:[],
    shopItems:'',
    user:'',
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
      XLSX.writeFile(wb, 'archived_items.xlsx');
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
        const response=await axiosClient.post('/getArchivedItems',data)
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
        "status":'deleted'
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

    //------------SELECT ALL RECORD-----------
    selectAll(){
    this.selectedRecords=[]
        this.shopItems[0].shop_items.filter((item)=>{
            if(this.selectall){
                this.selectedRecords.push({ id: item.id, value: true });
            }else{
                this.selectedRecords.push({ id: item.id, value: false });
            }
        })
    },

    //---------CHECK IF RECORD IS SELECTED---------
    checkIfSelected(id){
    const record = this.selectedRecords.find(record => record.id === id);
    return record ? record.value : false;
    },

    //---------SELECT ONE SINGLE RECORD------------
    selectRecord(id) {
        const record = this.selectedRecords.find(record => record.id === id);
        if (record.value) {
            record.value = false;
        }else{
            record.value = true; 
        }
    },

    //-----------BULK RESTORE ITEMS-------------
    async bulkRestore(){
      let records=[]
      this.selectedRecords.filter((item)=>{
        if(item.value){
          records.push(item.id)
        }
      })
      if(records.length){
        await axiosClient.post('/bulkRestoreItems',records);
        this.snackbarMsg("Successfully restored")
        this.getShopItems();
      }else{
        this.snackbarMsg("Error: data not selected")
      }
    },

    //-----------BULK DELETE ITEMS-------------
    async bulkDelete(){
      let records=[]
      this.selectedRecords.filter((item)=>{
        if(item.value){
          records.push(item.id)
        }
      })
      if(records.length){
        await axiosClient.post('/bulkDeleteItems',records);
        this.snackbarMsg("Successfully deleted")
        this.getShopItems();
      }else{
        this.snackbarMsg("Error: data not selected")
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
    //-----------DELETE CONFIRMATION--------------
    confirmAction(type) {
        Swal.fire({
            title: 'Are you sure?',
            text: type=='delete'? "Items will be deleted permanently and you will not be able to revert this!" :"Items Will be restored to the students",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: type=='delete'? 'Yes, delete it!':'Yes, restore it!',
            customClass: {
            popup: 'custom-swal'
            }
        }).then((result) => {
            if (result.isConfirmed) {
            if(type=='delete'){
                this.bulkDelete();
            }else if(type=='restore'){
                this.bulkRestore();
            }
            }
        });
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
  
    