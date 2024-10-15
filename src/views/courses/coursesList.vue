<template>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">

              <div class="d-flex justify-content-between  border-radius-lg pt-4">
                  <h6 class="ms-3 text-dark text-capitalize">COURSES</h6>
                  <template v-if="userPermissions.create">
                    <router-link :to="{ name: 'add-course' }">
                      <!-- <button style="font-size: 12px; background-color: #573078;" class="btn me-3 text-white fw-5 border-0 py-2 px-4 border-radius-lg"> Add Course </button> -->
                      <button style="font-size: 12px;background-color: #573078;" class="btn me-4 justify-content-between text-white fw-1 border-0 py-2 px-3 border-radius-lg"> 
                      <i class="fas fa-plus plus-icon"></i>
                        New
                      </button>
                    </router-link>
                  </template>
              </div>

              <span class="ps-0">
                <small class="ms-3 me-4 page-description">
                  In the Courses section, you can manage course information by adding, editing, or deleting courses. Additionally, you can view and update the <br> list of students enrolled in each course. This functionality helps management of courses and enrolled students.
                </small>
              </span>

              <div class="filter-container ms-2">
                <div class="row" style="width: 100%;">
                  <div class="col-4">
                    <span style="display: flex;">
                      <input class="input-box filter-box" @keyup="filterCourses" v-model="seachString" id="name" type="text" placeholder="Type to Search..." name="address" />
                      <select @change="filterCourses" class="select-box filter-type-btn" v-model="filterBy" id="filter" type="select" placeholder="Filter" name="filter" style="width: 98px !important;">
                        <option v-for="(item, index) in allFields" :key="index" :value="item">
                          {{ item }}
                        </option>
                      </select>
                    </span>
                  </div>

                  <div class="col-12 col-md-6 col-sm-6" style="padding-top: 15px;">
                    <span class="label-text bulk_topup" @click="exportTableToXLS()">
                      <i class="fas fa-download download-icon me-1"></i>
                      Export To XLS
                    </span>
                  </div>
                </div>
              </div>  

            <div class="card-body px-0 pb-2">
              <div class="table-responsive p-0 student-table">
                <table ref="table" class="table align-items-center mb-0">
                  <thead class="thead">
                    <tr>
                      <th class="text-uppercase text-xxs font-weight-bolder">  ID </th>
                      <th class="text-uppercase text-xxs font-weight-bolder">  Course Code </th>
                      <th class="text-uppercase text-xxs font-weight-bolder"> Course Name </th>
                      <th class="text-uppercase text-xxs font-weight-bolder"> Course Level </th>
                      <th class="text-uppercase  text-xxs font-weight-bolder"> Status </th>
                      <th class="text-uppercase  text-xxs font-weight-bolder"> Action </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="allCourse.length === 0">
                      <td colspan="6" class="text-center">
                        No data available.
                      </td>
                    </tr>
                    <tr v-for="(item, index) in allCourse" :key="index">
                     <td>
                        <p class="text-xs  text-center font-weight-bold mb-0"> {{ item.id}}</p>
                      </td>
                      <td>
                        <router-link :to="{ name: 'enrolled-students', params: { id: item.CourseCode }}">
                        <div class="d-flex">
                          <p class="text-xs font-weight-bold mb-0"> {{item.CourseCode }}</p>
                          <i class="material-icons-round opacity-10 fs-6 cursor-pointer">arrow_forward</i>
                        </div>
                        </router-link>
                      </td>
                      <td>
                        <p class="text-xs font-weight-bold mb-0"> {{item.CourseDescription }} </p>
                      </td>
                      <td>
                        <p class="text-xs font-weight-bold mb-0"> {{item.CourseLevel }} </p>
                      </td>
                      <td class="align-middle text-center text-sm">
                        <span class="badge badge-sm bg-gradient-success">{{item.status}}</span>
                      </td>
                      <td class="align-middle text-center">
                        <span>
                          <template v-if="userPermissions.edit_course">
                          <router-link :to="{ name: 'edit-course', params: { id: item.id } }">
                            <i class="material-icons-round opacity-10 fs-5 cursor-pointer">edit</i>
                          </router-link>
                          </template>
                          <!-- <i class="material-icons-round opacity-10 fs-5">info</i> -->
                          <template v-if="userPermissions.delete_course">
                          <i @click="confirmDelete(item.id)" class="material-icons-round opacity-10 fs-5 cursor-pointer">delete</i>
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
                        <select v-model="itemsPerPage" @change="getAllCourses(currentPage)" id="entries">
                          <option v-for="option in perPageOptions" :key="option" :value="option">{{ option }}</option>
                        </select>
                        <!-- <span>entries/page</span> -->
                      </div>

                      <!-- Pagination controls -->
                      <nav class="pagination-wrapper">
                        <ul class="pagination">
                          <li :class="{ disabled: currentPage === 1 }">
                            <a @click="getAllCourses(1)" href="#">«</a>
                          </li>
                          <li :class="{ disabled: currentPage === 1 }">
                            <a @click="getAllCourses(currentPage - 1)" href="#">‹</a> <!-- Previous Page -->
                          </li>
                          <li v-for="page in limitedPages" :key="page" :class="{ active: currentPage === page }">
                            <a @click="getAllCourses(page)" href="#">{{ page }}</a>
                          </li>
                          <li :class="{ disabled: currentPage === totalPages }">
                            <a @click="getAllCourses(currentPage + 1)" href="#">›</a> <!-- Next Page -->
                          </li>
                          <li :class="{ disabled: currentPage === totalPages }">
                            <a @click="getAllCourses(totalPages)" href="#">»</a>
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
  import { mapGetters } from 'vuex'
  import axiosClient from '../../axios'
  import Swal from 'sweetalert2';
  import * as XLSX from 'xlsx';

  export default {
    name: 'tables',
    mounted(){
      this.setColor();
      this.getUser();
      this.getAllCourses();
      this.$globalHelper.buttonColor();
    },
    updated(){
      this.$permissions.redirectIfNotAllowed('view_course');
      this.$globalHelper.buttonColor();
    },
    data() {
      return {
        perPageOptions: [10,20, 40, 60,100,200,300,400],
        itemsPerPage:20,

        seachString:'',
        filterBy:'Course Code',
        allFields:['Course Name','Course Code','Course Level'],
        allCourse:'',
        schools: 6,
        user:'',
        totalRows:'',
        currentPage:'',
        perPage:'',
        totalPages:'',
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

      snackbarMsg(message) {
        this.$snackbar.add({
          type: 'success',
          text: message,
          background: 'white',
        })
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
            this.deleteCourse(id)
          }
        });
      },

      exportTableToXLS() {
        const table = this.$refs.table;
        const ws = XLSX.utils.table_to_sheet(table);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, 'courses.xlsx');
      },

      //-----------FILTER COURSES------------
      async filterCourses(){
        if(this.filterBy=='' && this.seachString==''){
          this.getAllCourses();
          return;
        }else if(this.filterBy!='' && this.seachString==''){
          this.getAllCourses();
          return;
        }
        let data={
          "type":this.filterBy,
          "value":this.seachString,
          "status":'Active'
        }
        try {
            const response=await axiosClient.post('/filterCourses',data);
            this.allCourse=response.data;
            this.totalRows = response.data.total;
            this.currentPage = response.data.current_page;
            this.perPage = response.per_page;
            this.totalPages = response.data.last_page;
          } catch (error) {
            console.log(error)
        }
      },


      //------------GET USER-----------------
      getUser(){
        let user=localStorage.getItem('user')
        user= JSON.parse(user)
        this.user=user
      },

      //-------------GET ALL COURSE----------
      async getAllCourses(page=null){
        try {
          let data={
          'page':'',
          'entries_per_page': this.itemsPerPage
        }
        data.page = page;
          let url='/getAllCourses'
          const response= await axiosClient.post(url,data)
          this.allCourse=response.data.data.data
          this.totalRows = response.data.pagination.total;
          this.currentPage = response.data.pagination.current_page;
          this.perPage = response.data.pagination.per_page;
          this.totalPages = response.data.pagination.last_page;
        } catch (error) {
          console.log(error)
        }
      },

      //-------------DELETE COURSE---------
      async deleteCourse(id){
        try {
          await axiosClient.delete('/deleteCourse/' + id)
          this.removeCourseFromList(id)
          this.snackbarMsg('Course Successfully Deleted')
        } catch (error) {
          console.log(error)
        }
      },

      //------------REMOVE COURSE FROM LIST-----------
      removeCourseFromList(id) {
        const indexToRemove = this.allCourse.findIndex((item) => item.id === id)
        this.allCourse.splice(indexToRemove, 1)
      },

      setColor() {
        let bgColor=this.getBrandingSetting.primary_color ?
        this.getBrandingSetting.primary_color : '#573078';
        document.querySelector('thead').style.setProperty('--navheader-bg-color', bgColor);
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
  