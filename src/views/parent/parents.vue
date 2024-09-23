<template>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="d-flex justify-content-between  border-radius-lg pt-4 pb-3">
                <!-- <h6 class="text-dark text-capitalize ps-3">PARENTS</h6> -->
                <span>
                  <h6 class="ms-3 text-dark text-capitalize">PARENTS</h6>
                  <small class="ms-3 page-description">
                    In the Parents section, you can manage parent or carer accounts by adding, editing, or deleting them. Additionally, you can link each parent to <br>the students they are responsible for. This functionality helps keep parent information up to date.
                  </small>
                </span>
                <template v-if="userPermissions.create">
                  <router-link :to="{ name: 'add-parent' }">
                    <button style="font-size: 12px; background-color: #573078;" class="btn me-3 text-white fw-5 border-0 py-2 px-4 border-radius-lg"> Add Parent </button>
                  </router-link>
                </template>
              </div>
            <div class="card-body px-0 pb-2">
              <div class="table-responsive p-0">
                <table class="table align-items-center mb-0">
                  <thead class="thead">
                    <tr>
                      <th class="text-uppercase text-xxs font-weight-bolder">  ID </th>
                      <th class="text-uppercase text-xxs font-weight-bolder">  Name </th>
                      <th class="text-uppercase text-xxs font-weight-bolder"> Email </th>
                      <th class="text-uppercase text-xxs font-weight-bolder"> Status </th>
                      <th class="text-uppercase text-xxs font-weight-bolder"> Action </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="allParent.length === 0">
                      <td colspan="5" class="text-center">
                        No data available.
                      </td>
                    </tr>
                    <tr v-for="(item, index) in allParent" :key="index">
                     <td>
                        <p class="text-xs  text-center font-weight-bold mb-0"> {{ item.id}}</p>
                      </td>
                      <td>
                        <router-link :to="{ name: 'add-childrens', params: { id: item.id }}">
                        <div class="d-flex">
                          <p class="text-xs font-weight-bold mb-0"> {{item.first_name }} {{item.last_name }} </p>
                          <i class="material-icons-round opacity-10 fs-6 cursor-pointer">arrow_forward</i>
                        </div>
                        </router-link>
                      </td>
                      <td>
                        <p class="text-xs font-weight-bold mb-0"> {{item.email }} </p>
                        <!-- <p class="text-xs text-secondary mb-0">{{ item.user.phone }}</p> -->
                      </td>
                      <td class="align-middle text-center text-sm">
                        <span class="badge badge-sm bg-gradient-success">{{item.status}}</span>
                      </td>
                      <td class="align-middle text-center">
                        <span>
                          <template v-if="userPermissions.edit">
                          <router-link :to="{ name: 'edit-parent', params: { id: item.id } }">
                            <i class="material-icons-round opacity-10 fs-5 cursor-pointer">edit</i>
                          </router-link>
                          </template>
                          <!-- <i class="material-icons-round opacity-10 fs-5">info</i> -->
                          <template v-if="userPermissions.delete">
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
    </div>
  </template>
  
  <script>
  import axiosClient from '../../axios'
  import { mapGetters } from 'vuex'
  import Swal from 'sweetalert2';
  
  export default {
    name: 'tables',
    mounted(){
      this.setColor();
      this.getUser();
      this.getAllParents();
    },
    data() {
      return {
        perPageOptions: [10,20, 40, 60,100,200,300,400],
        itemsPerPage:20,

        allParent:'',
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
            this.deleteParent(id)
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
      //------------GET USER-----------------
      getUser(){
        let user=localStorage.getItem('user')
        user= JSON.parse(user)
        this.user=user
      },
      //-------------GET ALL STAFF----------
      async getAllParents(page){
        let data={
          'page':page,
          'entries_per_page': this.itemsPerPage
        }
        try {
          let url='/getAllParents'
          if(this.user.role=='organization_admin'){
            url='/getAllParents/'+this.user.id
          }
          const response= await axiosClient.post(url,data)
          this.allParent=response.data.data.data
          this.totalRows = response.data.pagination.total;
          this.currentPage = response.data.pagination.current_page;
          this.perPage = response.data.pagination.per_page;
          this.totalPages = response.data.pagination.last_page;
        } catch (error) {
          console.log(error)
        }
      },
      //-------------DELETE PARENT---------
      async deleteParent(id){
        try {
          await axiosClient.delete('/deleteParent/' + id)
          this.removeParentFromList(id)
          this.snackbarMsg('Parent Deleted')
        } catch (error) {
          console.log(error)
        }
      },
      //------------REMOVE PARENT FROM LIST-----------
      removeParentFromList(id) {
        const indexToRemove = this.allParent.findIndex((item) => item.id === id)
        this.allParent.splice(indexToRemove, 1)
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
  