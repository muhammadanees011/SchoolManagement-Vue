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
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"> Student </th>
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
                        <p class="text-xs font-weight-bold mb-0"> {{ item.user ? item.user.first_name:'-' }} {{ item.user ? item.user.last_name:'-' }}</p>
                      </td>
                      <td>
                        <p class="text-xs font-weight-bold mb-0"> {{item.user ? item.user.email :'-' }} </p>
                        <!-- <p class="text-xs text-secondary mb-0">{{ item.user.phone }}</p> -->
                      </td>
                      <td>
                        <p class="text-xs font-weight-bold mb-0"> Student1,Student2,Student3</p>
                      </td>
                      <td class="align-middle text-center text-sm">
                        <span class="badge badge-sm bg-gradient-success">{{item.user ? item.user.status :'-'}}</span>
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
                          <i @click="deleteParent(item.user.id)" class="material-icons-round opacity-10 fs-5 cursor-pointer">delete</i>
                          </template>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
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
      async getAllParents(){
        try {
          let url='/getAllParents'
          if(this.user.role=='organization_admin'){
            url='/getAllParents/'+this.user.id
          }
          const response= await axiosClient.get(url)
          this.allParent=response.data
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
  