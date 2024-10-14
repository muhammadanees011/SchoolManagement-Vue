<template>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card px-3">
                <div class="d-flex justify-content-between  border-radius-lg pt-4 pb-2">
                  <span>
                  <h6 class="text-dark text-capitalize">ARCHIVED-STUDENTS</h6>
                  <small class="page-description">Every archived student can be found in this table. Here, you can manage archived student accounts. You can permanently delete them in bulk,<br> restore them, or export the data to an Excel sheet</small>
                  <!-- <hr  class="description-line"> -->
                  </span>
                </div>  
            <div class="card-body px-0 pb-2">

                <div class="filter-container mb-1" style="margin-top: -11px;">
                  <span style="display: flex;">
                    <input class="input-box filter-box" @keyup="filterStudents" v-model="seachString" id="name" type="text" placeholder="Type to Search..." name="address" />
                    <select @change="filterStudents" class="select-box filter-type-btn" v-model="filterBy" id="filter" type="select" placeholder="Filter" name="filter" style="width: 98px !important;">
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

              <div class="table-responsive p-0 student-table">
                <table  ref="table" class="table align-items-center mb-0" style="margin-left:0px !important;">
                  <thead>
                    <tr>
                      <th class="">
                        <div class="form-check" style="margin-left:-20px;">
                            <input @change="selectAll" v-model="selectall" id="" class="form-check-input" type="checkbox" name="">
                            <label for="" class="custom-control-label"></label>
                        </div>
                      </th>
                      <th class="text-uppercase text-xxs font-weight-bolder"> MIFARE ID </th>
                      <th class="text-uppercase text-xxs font-weight-bolder"> Student ID </th>
                      <th class="text-uppercase text-xxs font-weight-bolder">  Name </th>
                      <th class="text-center text-uppercase text-xxs font-weight-bolder"> Site </th>
                      <!-- <th class="text-center text-uppercase text-xxs font-weight-bolder"> FSM </th>
                      <th class="text-center text-uppercase text-xxs font-weight-bolder"> Balance </th>
                      <th v-if="userPermissions.wallet" class="text-center text-uppercase text-xxs font-weight-bolder"> Wallet </th>
                      <th v-if="userPermissions.topup" class="text-center text-uppercase text-xxs font-weight-bolder"> Topup </th> -->
                      <th class="text-center text-uppercase text-xxs font-weight-bolder"> Status </th>
                      <!-- <th class="text-center text-uppercase text-xxs font-weight-bolder"> Action </th> -->
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="allStudents.length === 0">
                      <td colspan="6" class="text-center">
                        No data available.
                      </td>
                    </tr>
                    <tr v-for="(item, index) in allStudents" :key="index">
                    <td class="align-middle text-center text-sm">
                        <div class="form-check">
                            <input :checked="checkIfSelected(item.user.id)" @change="selectRecord(item.user.id)" id="" class="form-check-input" type="checkbox" name="">
                            <label for="" class="custom-control-label"></label>
                        </div>
                    </td>
                      <td class="align-middle text-center text-sm">
                        <p class="text-xs font-weight-bold mb-0"> {{ item.mifare_id }}</p>
                      </td>
                      <td>
                        <p class="text-xs font-weight-bold mb-0">{{ item.student_id }} </p>
                      </td>
                      <td>
                        <p class="text-xs font-weight-bold mb-0"> {{ item.user.first_name }} {{ item.user.last_name }}</p>
                        <p class="text-xs mb-0" style="font-size: 8px;"> {{ item.user.email }} </p>
                      </td>
                      <td class="align-middle text-center">
                        <span class="text-secondary text-xs font-weight-bold">{{item.school ? item.school.title :'-' }}</span>
                      </td>
                      <!-- <td class="align-middle text-center">
                        <span class="text-secondary text-xs font-weight-bold" :class="item.fsm_amount === null ? 'text-danger' : 'text-success'">{{ item.fsm_amount!==null ? ('£'+formattedPrice(item.fsm_amount)) :'No FSM'  }}</span>
                      </td>
                      <td class="align-middle text-center">
                        <span class="text-secondary text-xs font-weight-bold">£{{ formattedPrice(item.user.balance ? item.user.balance.ballance:0 )}}</span>
                      </td>
                      <td v-if="userPermissions.wallet" class="align-middle text-center">
                          <router-link :to="{name:'balance',params: { id: item.user.id }}" title="Wallet">
                            <i class="fas fa-donate fs-5 me-2"></i>
                          </router-link>
                      </td>
                      <td v-if="userPermissions.topup" class="align-middle text-center">
                          <i @click="topUps(item.user.id)" class="hover-pointer material-icons-round opacity-10 fs-5">credit_card</i>
                      </td> -->
                      <td class="align-middle text-center text-sm">
                        <span class="badge badge-sm bg-gradient-success">{{item.user.status}}</span>
                      </td>
                      <!-- <td class="align-middle text-center">
                        <span>
                          <router-link v-if="userPermissions.edit_student" :to="{ name: 'edit-student', params: { id: item.id } }">
                            <i class="material-icons-round opacity-10 fs-5 cursor-pointer">edit</i>
                          </router-link>
                          <i v-if="userPermissions.delete_student" @click="confirmDelete(item.id)" class="material-icons-round opacity-10 fs-5 cursor-pointer">delete</i>
                        </span>
                      </td> -->
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12 col-lg-12">
                <div class="pagination-container">
                    <div class="entries-dropdown">
                      <label for="entries">Entries</label>
                      <select v-model="itemsPerPage" @change="getAllStudents(currentPage)" id="entries">
                        <option v-for="option in perPageOptions" :key="option" :value="option">{{ option }}</option>
                      </select>
                      <!-- <span>entries/page</span> -->
                    </div>

                    <!-- Pagination controls -->
                    <nav class="pagination-wrapper">
                      <ul class="pagination">
                        <li :class="{ disabled: currentPage === 1 }">
                          <a @click="getAllStudents(1)" href="#">«</a>
                        </li>
                        <li :class="{ disabled: currentPage === 1 }">
                          <a @click="getAllStudents(currentPage - 1)" href="#">‹</a> <!-- Previous Page -->
                        </li>
                        <li v-for="page in limitedPages" :key="page" :class="{ active: currentPage === page }">
                          <a @click="getAllStudents(page)" href="#">{{ page }}</a>
                        </li>
                        <li :class="{ disabled: currentPage === totalPages }">
                          <a @click="getAllStudents(currentPage + 1)" href="#">›</a> <!-- Next Page -->
                        </li>
                        <li :class="{ disabled: currentPage === totalPages }">
                          <a @click="getAllStudents(totalPages)" href="#">»</a>
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
  import Swal from 'sweetalert2';
  import { mapGetters } from 'vuex'
  import * as XLSX from 'xlsx';

  
  export default {
    name: 'tables',
    async mounted(){
      this.setColor()
      await this.getUser();
      await this.getAllStudents();
      await this.selectAll();
    },
    updated(){
      this.$permissions.redirectIfNotAllowed('view_student');
    },
    data() {
      return {
        perPageOptions: [10,20, 40, 60,100,200,300,400],
        itemsPerPage:20,

        selectall:false,
        selectedRecords:[],
        filterBy:'Name',
        seachString:'',
        allFields:['Student Id','MIFare Id','Name','Email'],
        allStudents:'',
        schools: 6,
        user:'',
        totalRows:'',
        currentPage:'',
        perPage:'',
        totalPages:'',
        allPages:''
      }
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
    methods:{

    exportTableToXLS() {
      const table = this.$refs.table;
      const ws = XLSX.utils.table_to_sheet(table);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, 'archived_students.xlsx');
    },
    setColor() {
      let bgColor=this.getBrandingSetting.primary_color ?
      this.getBrandingSetting.primary_color : '#573078';
      document.querySelector('thead').style.setProperty('--navheader-bg-color', bgColor);
    },

    //------------SELECT ALL RECORD-----------
    selectAll(){
    this.selectedRecords=[]
    this.allStudents.filter((item)=>{
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
        const response=await axiosClient.post('/bulkDeleteStudents',records);
        this.snackbarMsg(response.data.message)
        this.getAllStudents();
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
        const response=await axiosClient.post('/bulkRestoreStudents',records);
        this.snackbarMsg(response.data.message)
        this.getAllStudents();
      }else{
        this.snackbarMsg("Error: data not selected")
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

    formattedPrice(value){
        const formattedValue = parseFloat(value).toFixed(2);
        return formattedValue;
    },
    topUps(id){
    this.$router.push('/payment_account/'+id)
    },
    transactionHistoryNav(id){
    this.$router.push('/student-billing/'+id)
    },
    //------------GET USER-----------------
    getUser(){
    let user=localStorage.getItem('user')
    user= JSON.parse(user)
    this.user=user
    },
    //-----------FILTER STUDENTS------------
    async filterStudents(){
    if(this.filterBy=='' && this.seachString==''){
        this.getAllStudents();
        return;
    }else if(this.filterBy!='' && this.seachString==''){
        this.getAllStudents();
        return;
    }
    let data={
        "type":this.filterBy,
        "value":this.seachString,
        "status":'deleted'
    }
    try {
        const response=await axiosClient.post('/filterStudent',data);
        this.allStudents=response.data.data;
        this.totalRows = response.data.total;
        this.currentPage = response.data.current_page;
        this.perPage = response.per_page;
        this.totalPages = response.data.last_page;
        } catch (error) {
        console.log(error)
    }
    },
    //-------------GET ALL STUDENTS----------
    async getAllStudents(page=null){
    try {
        let data={
        'user_id':this.user.id,
        'role':this.user.role,
        'page':'',
        'entries_per_page': this.itemsPerPage
      }
        data.page = page;
        const response= await axiosClient.post('archivedStudents',data);
        this.allStudents=response.data.data
        this.totalRows = response.data.total;
        this.currentPage = response.data.current_page;
        this.perPage = response.per_page;
        this.totalPages = response.data.last_page;
    } catch (error) {
        console.log(error)
    }
    },
    //-------------DELETE STUDENT---------
    async deleteStudent(id){
    try {
        await axiosClient.delete('/deleteStudent/' + id)
        this.removeStudentFromList(id)
        this.snackbarMsg('Student Deleted')
    } catch (error) {
        console.log(error)
    }
    },
    //------------REMOVE STUDENT FROM LIST-----------
    removeStudentFromList(id) {
    const indexToRemove = this.allStudents.findIndex((item) => item.id === id)
    this.allStudents.splice(indexToRemove, 1)
    },
    }
  }
  </script>
  
  <style>
  .hover-pointer:hover {
    cursor: pointer;
    color: red;
  }
  td, th{
    border:1px solid black !important;
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
  td > p{
    font-size: 5px !important;
  }
  th{
    background-color: #573078 !important;
    color: white !important;
  }
  .page-nav{
    margin-left: 230px !important;
  }
  table{
    margin:15px;
    margin-top:0px;
  }
  .filter-type-btn, .filter-box{
    border-radius: 0px !important;
  }
  
  .custom-swal {
    width: 350px !important; /* Adjust the width as needed */
    padding: 1rem !important; /* Adjust the padding as needed */
  }
  
  .custom-swal .swal2-title {
    font-size: 0.9rem !important; /* Adjust the title font size */
  }
  
  .custom-swal .swal2-content {
    font-size: 0rem !important; /* Adjust the content font size */
  }
  .custom-swal .swal2-actions {
    margin-top: 0.2rem !important; /* Adjust the margin between content and buttons */
  }
  .swal2-confirm{
    font-size: 10px !important;
  }
  .swal2-cancel{
    font-size: 10px !important;
  }
  .swal2-icon{
    font-size: 10px !important;
  }
  .form-check{
    height: 20px !important;
    width: 20px !important;
  }
.form-check-input{
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
}

.icon-container {
    margin-left: 17px;
    margin-bottom:4px;
    display: flex;
    gap: 20px; /* Adjust the space between the icon-label pairs */
    align-items: center;
}

.icon-label {
    display: flex;
    align-items: center;
}

.label-text {
    color: #573078;
    margin-top: 5px; /* Adjust the space between the icon and the label */
    font-size: 12px; /* Adjust the font size as needed */
}
.table{
    width: 96% !important;
}
.icon-label{
  border: 1px solid black;
  padding: 3px;
  border-radius: 4px;
  cursor: pointer;
}
.icon-label:hover{
  background-color: lightgray ;
}
.input-box , .select-box{
  /* height: 32px !important;
  border: 1px solid black;
  border-radius: 4px !important; */
}
  </style>
  