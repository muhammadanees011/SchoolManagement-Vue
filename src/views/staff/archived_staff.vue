<template>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card px-3">
            <div class="d-flex justify-content-between  border-radius-lg pt-4 pb-3">
                <!-- <h6 class="text-dark text-capitalize ps-3">ARCHIVED STAFF</h6> -->
                <span>
                  <h6 class="text-dark text-capitalize">ARCHIVED STAFF</h6>
                  <small class="page-description">Every archived staff can be found in this table. Here, you can manage archived staff accounts. You can permanently delete them in bulk,<br> restore them, or export the data to an Excel sheet</small>
                </span>
              </div>
            <div class="card-body px-0 pb-2">

              <div class="filter-container mb-1 ms-2" style="margin-top: -11px;">
                <span style="display: flex;">
                  <input class="input-box filter-box" @keyup="filterStaff" v-model="seachString" id="name" type="text" placeholder="Type to Search..." name="address" />
                  <select @change="filterStaff" class="select-box filter-type-btn" v-model="filterBy" id="filter" type="select" placeholder="Filter" name="filter">
                    <option v-for="(item, index) in allFields" :key="index" :value="item">
                      {{ item }}
                    </option>
                  </select>

                  <span class="label-text bulk_topup" @click="exportTableToXLS()">
                    <i class="fas fa-download download-icon me-1"></i>
                    Export To XLS
                  </span>
                  <span class="label-text bulk_topup" @click="confirmAction('restore')">
                    <i class="fas fa-undo restore-icon me-1"></i>
                    Bulk Restore
                  </span>
                  <span class="label-text bulk_topup" v-if="userPermissions.delete_student" @click="confirmAction('delete')">
                    <i class="fas fa-trash delete-icon me-1"></i>
                    Bulk Delete
                  </span>
                </span>
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
                      <th class="text-uppercase text-center text-xxs font-weight-bolder">  MIFARE ID </th>
                      <th class="text-uppercase text-xxs font-weight-bolder">  Name </th>
                      <th class="text-uppercase text-xxs font-weight-bolder"> Email </th>
                      <th class="text-uppercase text-xxs font-weight-bolder"> Site </th>
                      <th class="text-center text-uppercase text-xxs font-weight-bolder"> Status </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="allStaff.length === 0">
                      <td colspan="6" class="text-center">
                        No data available.
                      </td>
                    </tr>
                    <tr v-for="(item, index) in allStaff" :key="index">
                    <td class="align-middle text-center text-sm">
                        <div class="form-check">
                            <input :checked="checkIfSelected(item.user.id)" @change="selectRecord(item.user.id)" id="" class="form-check-input" type="checkbox" name="">
                            <label for="" class="custom-control-label"></label>
                        </div>
                    </td>
                     <td>
                        <p class="text-xs  text-center font-weight-bold mb-0"> {{ item.mifare_id ? item.mifare_id :'-' }}</p>
                      </td>
                      <td>
                        <p class="text-xs font-weight-bold mb-0"> {{ item.user.first_name }} {{ item.user.last_name }}</p>
                      </td>
                      <td>
                        <p class="text-xs font-weight-bold mb-0"> {{ item.user.email }} </p>
                        <!-- <p class="text-xs text-secondary mb-0">{{ item.user.phone }}</p> -->
                      </td>
                      <td>
                        <p class="text-xs text-center font-weight-bold mb-0"> {{item.school.name}} </p>
                      </td>
                      <td class="align-middle text-center text-sm">
                        <span class="badge badge-sm bg-gradient-success">{{item.user.status}}</span>
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
  import { mapGetters } from 'vuex'
  import * as XLSX from 'xlsx';


  
  export default {
    name: 'tables',
    async mounted(){
      this.setColor()
      await this.getUser();
      await this.getAllStaff();
      await this.selectAll();
    },
    updated(){
      this.$permissions.redirectIfNotAllowed('view_staff');
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
    data() {
      return {
        perPageOptions: [10,20, 40, 60,100,200,300,400],
        itemsPerPage:20,

        filterBy:'Name',
        allFields:['MIFare Id','Name','Email'],
        selectall:false,
        selectedRecords:[],
        seachString:'',
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
      exportTableToXLS() {
      const table = this.$refs.table;
      const ws = XLSX.utils.table_to_sheet(table);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, 'archived_staff.xlsx');
    },
      setColor() {
      let bgColor=this.getBrandingSetting.primary_color ?
      this.getBrandingSetting.primary_color : '#573078';
      document.querySelector('thead').style.setProperty('--navheader-bg-color', bgColor);
    },
    //------------SELECT ALL RECORD-----------
    selectAll(){
    this.selectedRecords=[]
    this.allStaff.filter((item)=>{
        if(this.selectall){
            this.selectedRecords.push({ id: item.user.id, value: true });
        }else{
            this.selectedRecords.push({ id: item.user.id, value: false });
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

    //-----------BULK DELETE STUDENTS-------------
    async bulkDelete(){
      let records=[]
      this.selectedRecords.filter((item)=>{
        if(item.value){
          records.push(item.id)
        }
      })
      if(records.length){
        const response=await axiosClient.post('/bulkDeleteStaff',records);
        this.snackbarMsg(response.data.message)
        this.getAllStaff();
      }
    },

    //-----------BULK RESTORE STUDENTS-------------
    async bulkRestore(){
      let records=[]
      this.selectedRecords.filter((item)=>{
        if(item.value){
          records.push(item.id)
        }
      })
      if(records.length){
        const response=await axiosClient.post('/bulkRestoreStaff',records);
        this.snackbarMsg(response.data.message)
        this.getAllStaff();
      }else{
        this.snackbarMsg("Error: data not selected")
      }
    },

    //-----------DELETE CONFIRMATION--------------
    confirmAction(type) {
    Swal.fire({
        title: 'Are you sure?',
        text: type=='delete'? "Items will be deleted permanently and you will not be able to revert this!" :"Items Will be restored to the staff",
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
            this.bulkDelete()
          }else if(type=='restore'){
            this.bulkRestore();
          }
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
        this.$router.push('/payment_account/'+id)
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
          const response= await axiosClient.post('/archivedStaff',data)
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
        const indexToRemove = this.allStaff.findIndex((item) => item.id === id)
        this.allStaff.splice(indexToRemove, 1)
      },

    //-----------FILTER STAFF------------
    async filterStaff(){
      if(this.seachString==''){
        this.getAllStaff();
        return;
      }
      let data={
        "type":this.filterBy,
        "value":this.seachString,
        "status":'deleted'
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
  