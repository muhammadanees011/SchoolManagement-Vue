<template>
    <div class="container-fluid py-4">
      <div class="row">
        <div class="col-12">
          <div class="card my-4">
                <div class="d-flex justify-content-between  border-radius-lg pt-4 pb-3">
                  <h6 class="text-dark text-capitalize ps-3">Enrolled Students</h6>
                  <template v-if="userPermissions.create_student">
                    <button @click="showModal=true" style="font-size: 12px; background-color: #573078;" class="btn me-3 text-white fw-5 border-0 py-2 px-4 border-radius-lg"> Enroll Student </button>
                  </template>
                </div>
              <div>
              </div>
            <div class="card-body px-0 pb-2">
  
              <div class="table-responsive p-0 student-table">
                <table  ref="table" class="table align-items-center mb-0">
                  <thead class="thead">
                    <tr>
                      <th class="text-uppercase text-xxs font-weight-bolder"> Student ID </th>
                      <th class="text-uppercase text-xxs font-weight-bolder">  Name </th>
                      <th class="text-center text-uppercase text-xxs font-weight-bolder"> School </th>
                      <th class="text-center text-uppercase text-xxs font-weight-bolder"> Action </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in allStudents" :key="index">
                      <td class="align-middle text-center text-sm">
                        <p class="text-xs font-weight-bold mb-0"> {{ item.student_id }}</p>
                      </td>
                      <td>
                        <p class="text-xs font-weight-bold mb-0"> {{ item.first_name }} {{ item.last_name }}</p>
                        <p class="text-xs mb-0" style="font-size: 8px;"> {{ item.email }} </p>
                      </td>
                      <td class="align-middle text-center">
                        <span class="text-secondary text-xs font-weight-bold">{{item.schoolName }}</span>
                      </td>
                      <td class="align-middle text-center">
                        <span>
                          <i v-if="userPermissions.delete_student" @click="confirmDelete(item.student_id)" class="material-icons-round opacity-10 fs-5 cursor-pointer">delete</i>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="row">
                  <div class="col-md-12 col-lg-12">
                    <nav class="page-nav" aria-label="Page navigation">
                      <ul class="pagination mt-4 mb-4">
                          <!-- Previous Page -->
                          <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
                              <i class="page-link material-icons-round opacity-10 fs-5" :disabled="currentPage === 1"
                                  @click="getAllStudents(currentPage - 1)" tabindex="-1"
                                  aria-disabled="true">arrow_back</i>
                          </li>
                          <!-- Page Numbers -->
                          <li class="page-item" v-for="pageNumber in totalPages" :key="pageNumber"
                              :class="{ 'active': currentPage === pageNumber }">
                              <a class="page-link" href="#" @click="getAllStudents(pageNumber)">{{ pageNumber }}</a>
                          </li>
                          <!-- Next Page -->
                          <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
                              <i class="page-link material-icons-round opacity-10 fs-5"
                                  :disabled="currentPage === totalPages" @click="getAllStudents(currentPage + 1)"
                                  tabindex="-1" aria-disabled="true">arrow_forward</i>
                          </li>
                      </ul>
                    </nav>
                  </div>
            </div>
          </div>
        </div>
      </div>
      <Enroll :show="showModal" :task="task" @close="showModal = false" @update-students="getAllStudents"/>

    </div>
  </template>
  
  <script>
  import axiosClient from '../../axios'
  import Swal from 'sweetalert2';
  import { mapGetters } from 'vuex'
  import * as XLSX from 'xlsx';
  import Enroll from './enroll_student.vue'
  
  export default {
    name: 'tables',
    mounted(){
      this.setColor();
      this.getUser();
      this.getAllStudents();
    },
    updated(){
      this.$permissions.redirectIfNotAllowed('view_student');
    },
    components:{
        Enroll
    },
    data() {
      return {
        topUpAmount:null,
        showModal: false,
        selectall:false,
        selectedRecords:[],
        filterBy:'Name',
        seachString:'',
        allFields:['Student Id','Name','Email'],
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
    },
    methods:{
      exportTableToXLS() {
        const table = this.$refs.table;
        const ws = XLSX.utils.table_to_sheet(table);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, 'students_table.xlsx');
      },
      confirmDelete(id) {
        Swal.fire({
          title: 'Are you sure?',
          text: "Student will be dropped from course and you won't be able to revert this!",
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
            this.deleteStudent(id)
          }
        });
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
          "value":this.seachString
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
            'CourseCode':this.$route.params.id,
            'page':''
          }
          data.page = page;
          const response= await axiosClient.post('/getCourseStudents',data);
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
        let data={
          'StudentID':id,
          'CourseCode':this.$route.params.id
        }
        try {
          await axiosClient.post('/removeEnrolledStudent',data)
          this.getAllStudents();
          this.snackbarMsg('Student Removed Successfully')
        } catch (error) {
          let errors=error.response.data.errors
          for(let i=0; i<errors.length; i++){
          this.snackbarMsg(errors[i])
          }
        }
      },
      //------------REMOVE STUDENT FROM LIST-----------
      removeStudentFromList(id) {
        const indexToRemove = this.allStudents.findIndex((item) => item.user.id === id)
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
    /* background-color: var(--navheader-bg-color) !important; */
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
  .bulk_topup{
    cursor: pointer;
  }
  </style>
  