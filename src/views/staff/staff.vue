<template>
    <div class="container-fluid py-4">
      <div class="row">
        <div class="col-12">
          <div class="card my-4">
            <div class="d-flex justify-content-between  border-radius-lg pt-4 pb-3">
                <h6 class="text-dark text-capitalize ps-3">Staff</h6>
                <template v-if="userPermissions.create_staff">
                  <router-link :to="{ name: 'add-staff' }">
                    <button style="font-size: 12px; background-color: #573078;" class="btn me-3 text-white fw-5 border-0 py-2 px-4 border-radius-lg"> Add Staff </button>
                  </router-link>
                </template>
              </div>
              <div class="filter-container">
                <input class="input-box filter-box" @keyup.enter="filterStaff" v-model="seachString" id="name" type="text" placeholder="Type to Search..." name="address" />
              </div>   
            <div class="card-body px-0 pb-2">
              <div class="table-responsive p-0">
                <table class="table align-items-center mb-0">
                  <thead>
                    <tr>
                      <th class="text-uppercase  text-center text-secondary text-xxs font-weight-bolder opacity-7">  Staff ID </th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">  Name </th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"> Email </th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"> School </th>
                      <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"> Status </th>
                      <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"> Action </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in allStaff" :key="index">
                     <td>
                        <p class="text-xs  text-center font-weight-bold mb-0"> {{ item.staff_id ? item.staff_id :'-' }}</p>
                      </td>
                      <td>
                        <p class="text-xs font-weight-bold mb-0"> {{ item.user.first_name }} {{ item.user.last_name }}</p>
                      </td>
                      <td>
                        <p class="text-xs font-weight-bold mb-0"> {{ item.user.email }} </p>
                        <!-- <p class="text-xs text-secondary mb-0">{{ item.user.phone }}</p> -->
                      </td>
                      <td>
                        <p class="text-xs font-weight-bold mb-0"> {{item.school.name}} </p>
                      </td>
                      <td class="align-middle text-center text-sm">
                        <span class="badge badge-sm bg-gradient-success">{{item.user.status}}</span>
                      </td>
                      <td class="align-middle text-center">
                        <span>
                          <!-- <router-link :to="{ name: 'detail-staff', params: { id: item.user.id } }">
                          <i class="material-icons-round opacity-10 fs-5 me-1 cursor-pointer">info</i>
                          </router-link> -->
                          <template v-if="userPermissions.edit_staff">
                            <router-link :to="{ name: 'edit-staff', params: { id: item.id } }">
                              <i class="material-icons-round opacity-10 fs-5 cursor-pointer">edit</i>
                            </router-link>
                          </template>
                          <!-- <i class="material-icons-round opacity-10 fs-5">info</i> -->
                          <template v-if="userPermissions.delete_staff">
                            <i @click="deleteStaff(item.user.id)" class="material-icons-round opacity-10 fs-5 cursor-pointer">delete</i>
                          </template>
                        </span>
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
                                @click="getAllStaff(currentPage - 1)" tabindex="-1"
                                aria-disabled="true">arrow_back</i>
                        </li>
                        <!-- Page Numbers -->
                        <li class="page-item" v-for="pageNumber in totalPages" :key="pageNumber"
                            :class="{ 'active': currentPage === pageNumber }">
                            <a class="page-link" href="#" @click="getAllStaff(pageNumber)">{{ pageNumber }}</a>
                        </li>
                        <!-- Next Page -->
                        <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
                            <i class="page-link material-icons-round opacity-10 fs-5"
                                :disabled="currentPage === totalPages" @click="getAllStaff(currentPage + 1)"
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
  
  export default {
    name: 'tables',
    mounted(){
      this.getUser();
      this.getAllStaff();
    },
    updated(){
      this.$permissions.redirectIfNotAllowed('view_staff');
    },
    computed: {
      userPermissions() {
        return this.$permissions.userPermissions.value;
      },
    },
    data() {
      return {
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
          'page':page
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
        "searchString":this.seachString
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
  </style>
  