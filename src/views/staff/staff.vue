<template>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card px-3">
            <div class="d-flex justify-content-between  border-radius-lg pt-4 pb-3">
                <h6 class="text-dark text-capitalize">STAFF</h6>
                <template v-if="userPermissions.create_staff">
                  <router-link :to="{ name: 'add-staff' }">
                    <!-- <button style="font-size: 12px; background-color: #573078;" class="btn me-3 text-white fw-5 border-0 py-2 px-4 border-radius-lg"> Add Staff </button> -->
                    <button style="font-size: 12px;background-color: #573078;" class="btn me-2 justify-content-between text-white fw-1 border-0 py-2 px-3 border-radius-lg"> 
                      <i class="fas fa-plus plus-icon"></i>
                      New
                    </button>
                  </router-link>
                </template>
              </div>
              <span class="ps-0">
                  <small class="ms-3 me-4 page-description">
                    Here, you can oversee staff accounts, add funds to their wallets, and track their transaction history. This functionality ensures effective management <br>of financial interactions and balances for each staff.
                  </small>
              </span>
              <div class="filter-container ms-2">

                <div class="row" style="width: 100%;">
                  
                  <div class="col-4">
                    <span style="display: flex;">
                    <input class="input-box filter-box" @keyup="debouncedSearch" v-model="searchString" id="name" type="text" placeholder="Type to Search..." name="address" />
                    <select @change="debouncedSearch" class="select-box filter-type-btn" v-model="filterBy" id="filter" type="select" placeholder="Filter" name="filter" style="width: 98px !important;">
                      <option v-for="(item, index) in allFields" :key="index" :value="item">
                        {{ item }}
                      </option>
                    </select>
                    </span>
                  </div>

                  <div class="col-12 col-md-6 col-sm-6" style="padding-top: 10px;">
                    <span class="label-text bulk_topup" @click="exportTableToXLS()">
                      <i class="fas fa-download download-icon me-1"></i>
                      Export To XLS
                    </span>
                  </div>

                </div>

              </div>   
            <div class="card-body px-0 pb-2">
              <div class="table-responsive p-0">
                <table  ref="table" class="table align-items-center mb-0">
                  <thead>
                    <tr>
                      <th class="text-uppercase text-center text-xxs font-weight-bolder">  MIFARE ID </th>
                      <th class="text-uppercase text-xxs font-weight-bolder">  Name </th>
                      <th class="text-uppercase text-xxs font-weight-bolder"> Email </th>
                      <th class="text-uppercase text-xxs font-weight-bolder"> Site </th>
                      <th class="text-uppercase text-center text-xxs font-weight-bolder"> Balance </th>
                      <th v-if="userPermissions.wallet" class="text-center text-uppercase text-xxs font-weight-bolder"> Wallet </th>
                      <th v-if="userPermissions.topup" class="text-uppercase text-xxs font-weight-bolder"> TopUp </th>
                      <th class="text-center text-uppercase text-xxs font-weight-bolder"> Status </th>
                      <th class="text-center text-uppercase text-xxs font-weight-bolder"> Action </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="allStaff.length === 0">
                      <td colspan="9" class="text-center">
                        No data available.
                      </td>
                    </tr>
                    <tr v-for="(item, index) in allStaff" :key="index">
                     <td>
                        <p class="text-xs  text-center font-weight-bold mb-0"> {{ item.mifare_id ? item.mifare_id :'-' }}</p>
                      </td>
                      <td>
                        <p class="text-xs font-weight-bold mb-0"> {{ item.user.first_name }} {{ item.user.last_name }}</p>
                      </td>
                      <td>
                        <p class="text-xs font-weight-bold mb-0"> {{ item.user.email }} </p>
                      </td>
                      <td>
                        <p class="text-xs text-center font-weight-bold mb-0"> {{item.school.name}} </p>
                      </td>
                      <td>
                        <span class="ms-4 text-secondary text-xs font-weight-bold">£{{ formattedPrice(item.balance ? item.balance:0 )}}</span>
                      </td>
                      <td v-if="userPermissions.wallet" class="align-middle text-center">
                          <i @click="gotoBallance(item.user.id)" class="hover-pointer fas fa-donate fs-5 me-2"></i>
                      </td>
                      <td v-if="userPermissions.topup" class="align-middle text-center">
                          <i @click="topUps(item.user.id)" class="hover-pointer material-icons-round opacity-10 fs-5">credit_card</i>
                      </td>
                      <td class="align-middle text-center text-sm">
                        <span class="badge badge-sm bg-gradient-success">{{item.user.status}}</span>
                      </td>
                      <td class="align-middle text-center">
                        <span>
                          <template v-if="userPermissions.edit_staff">
                            <router-link :to="{ name: 'edit-staff', params: { id: item.id } }">
                              <i class="material-icons-round opacity-10 fs-5 cursor-pointer">edit</i>
                            </router-link>
                          </template>
                          <template v-if="userPermissions.delete_staff">
                            <i @click="confirmDelete(item.user.id)" class="material-icons-round opacity-10 fs-5 cursor-pointer">delete</i>
                          </template>
                        </span>
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
                        <select v-model="itemsPerPage" @change="getAllStaff(currentPage)" id="entries">
                          <option v-for="option in perPageOptions" :key="option" :value="option">{{ option }}</option>
                        </select>
                        <!-- <span>entries/page</span> -->
                      </div>

                      <!-- Pagination controls -->
                      <nav class="pagination-wrapper">
                        <ul class="pagination">
                          <li :class="{ disabled: currentPage === 1 }">
                            <a @click="getAllStaff(1)" href="#">«</a>
                          </li>
                          <li :class="{ disabled: currentPage === 1 }">
                            <a @click="getAllStaff(currentPage - 1)" href="#">‹</a> <!-- Previous Page -->
                          </li>
                          <li v-for="page in limitedPages" :key="page" :class="{ active: currentPage === page }">
                            <a @click="getAllStaff(page)" href="#">{{ page }}</a>
                          </li>
                          <li :class="{ disabled: currentPage === totalPages }">
                            <a @click="getAllStaff(currentPage + 1)" href="#">›</a> <!-- Next Page -->
                          </li>
                          <li :class="{ disabled: currentPage === totalPages }">
                            <a @click="getAllStaff(totalPages)" href="#">»</a>
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
  import Swal from 'sweetalert2';
  import { mapGetters, mapActions } from 'vuex'
  import * as XLSX from 'xlsx';
  import { debounce } from 'lodash';
  
  export default {
    name: 'tables',
    mounted(){
      this.setColor();
      this.getUser();

      if(this.getFilterString.filterBy){
        this.filterBy=this.getFilterString.filterBy
        this.searchString=this.getFilterString.searchString
        this.debouncedSearch()
      }else{
        this.getAllStaff();
      }
      this.$globalHelper.buttonColor();
    },
    updated(){
      this.$permissions.redirectIfNotAllowed('view_staff');
      this.$globalHelper.buttonColor();
    },
    created() {
      this.debouncedSearch = debounce(this.filterStaff, 500);
    },
    computed: {
      ...mapGetters(['getBrandingSetting','getFilterString']),
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

    beforeRouteLeave(to, from, next) {
      if (to.name !== 'payment_account' && to.name !== 'balance') {
        let filterString = {
          filterBy: '',
          searchString: ''
        };
        this.updateFilterString(filterString);
        next();
      } else {
        next();
      }
    },

    data() {
      return {
        perPageOptions: [10,20, 40, 60,100,200,300,400],
        itemsPerPage:20,

        filterBy:'Name',
        allFields:['MIFare Id','Name','Email'],
        searchString:'',
        allStaff:'',
        schools: 6,
        user:'',
        totalRows:'',
        currentPage:'',
        perPage:'',
        totalPages:'',
      }
    },
    methods:{

      ...mapActions(['updateFilterString']),

      exportTableToXLS() {
      const table = this.$refs.table;
      const ws = XLSX.utils.table_to_sheet(table);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, 'staff_table.xlsx');
      },
      setColor() {
        let bgColor=this.getBrandingSetting.primary_color ?
        this.getBrandingSetting.primary_color : '#573078';
        document.querySelector('thead').style.setProperty('--navheader-bg-color', bgColor);
      },
      confirmDelete(id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "Item will be archived and you will be able to revert this!",
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
          this.deleteStaff(id)
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
      topUps(id){
        let filterString={
          filterBy:this.filterBy,
          searchString:this.searchString
        }
        this.updateFilterString(filterString);
        this.$router.push('/payment_account/'+id)
      },

      gotoBallance(id){
        let filterString={
          filterBy:this.filterBy,
          searchString:this.searchString
        }
        this.updateFilterString(filterString);
        this.$router.push('/balance/'+id)
      },

      transactionHistoryNav(id){
        this.$router.push('/student-billing/'+id)
      },
      formattedPrice(value){
        const formattedValue = parseFloat(value).toFixed(2);
        return formattedValue;
    } ,
      //------------GET USER-----------------
      getUser(){
        let user=localStorage.getItem('user')
        user= JSON.parse(user)
        this.user=user
      },
      //-------------GET ALL STAFF----------
      async getAllStaff(page){
        let data={
          'user_id':null,
          'page':page,
          'entries_per_page': this.itemsPerPage
        }
        try {
          if(this.user.role=='organization_admin'){
            data.user_id=this.user.id
          }
          const response= await axiosClient.post('/getAllStaff',data)
          this.allStaff=response.data.data
          this.totalRows = response.data.pagination.total;
          this.currentPage = response.data.pagination.current_page;
          this.perPage = response.data.pagination.per_page;
          this.totalPages = response.data.pagination.last_page;
        } catch (error) {
          console.log(error)
        }
      },
      //-------------DELETE STAFF---------
      async deleteStaff(id){
        try {
          await axiosClient.delete('/deleteStaff/' + id)
          this.removeStaffFromList(id)
          this.snackbarMsg('Staff Deleted')
        } catch (error) {
          console.log(error)
        }
      },
      //------------REMOVE STAFF FROM LIST-----------
      removeStaffFromList(id) {
        const indexToRemove = this.allStaff.findIndex((item) => item.user.id === id)
        this.allStaff.splice(indexToRemove, 1)
      },
    //-----------FILTER STAFF------------
    async filterStaff(){
      if(this.searchString==''){
        this.getAllStaff();
        return;
      }
      let data={
        "type":this.filterBy,
        "value":this.searchString,
        "status":'active'
      }
      try {
          const response=await axiosClient.post('/searchStaff',data);
          this.allStaff=response.data;
          this.totalRows = response.data.total;
          this.currentPage = response.data.current_page;
          this.perPage = response.per_page;
          this.totalPages = response.data.last_page;
        } catch (error) {
          console.log(error)
      }
    },
    }
  }
  </script>
  
  <style>
  .hover-pointer:hover {
    cursor: pointer;
    color: red;
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
  