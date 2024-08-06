<template>
    <div class="container-fluid py-4">
      <div class="row">
        <div class="col-12">
          <div class="card my-4">
            <div class="d-flex justify-content-between  border-radius-lg pt-4 pb-3">
                <h6 class="text-dark text-capitalize ps-3">Parents</h6>
                <template v-if="userPermissions.create">
                  <router-link :to="{ name: 'add-parent' }">
                    <button style="font-size: 12px; background-color: #573078;" class="btn me-3 text-white fw-5 border-0 py-2 px-4 border-radius-lg"> Add Parent </button>
                  </router-link>
                </template>
              </div>
            <div class="card-body px-0 pb-2">
              <div class="table-responsive p-0">
                <table class="table align-items-center mb-0">
                  <thead>
                    <tr>
                      <th class="text-uppercase  text-center text-secondary text-xxs font-weight-bolder opacity-7">  ID </th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">  Name </th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"> Email </th>
                      <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"> Status </th>
                      <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"> Action </th>
                    </tr>
                  </thead>
                  <tbody>
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
                          <i @click="deleteParent(item.id)" class="material-icons-round opacity-10 fs-5 cursor-pointer">delete</i>
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
                                @click="getAllParents(currentPage - 1)" tabindex="-1"
                                aria-disabled="true">arrow_back</i>
                        </li>
                        <!-- Page Numbers -->
                        <li class="page-item" v-for="pageNumber in totalPages" :key="pageNumber"
                            :class="{ 'active': currentPage === pageNumber }">
                            <a class="page-link" href="#" @click="getAllParents(pageNumber)">{{ pageNumber }}</a>
                        </li>
                        <!-- Next Page -->
                        <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
                            <i class="page-link material-icons-round opacity-10 fs-5"
                                :disabled="currentPage === totalPages" @click="getAllParents(currentPage + 1)"
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
      this.getAllParents();
    },
    data() {
      return {
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
      userPermissions() {
        return this.$permissions.userPermissions.value;
      },
    },
    methods:{
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
          'page':page
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
  </style>
  