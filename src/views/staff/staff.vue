<template>
    <div class="container-fluid py-4">
      <div class="row">
        <div class="col-12">
          <div class="card my-4">
            <div class="d-flex justify-content-between  border-radius-lg pt-4 pb-3">
                <h6 class="text-dark text-capitalize ps-3">Staff</h6>
                <router-link :to="{ name: 'add-staff' }">
                  <button style="font-size: 12px; background-color: #573078;" class="btn me-3 text-white fw-5 border-0 py-2 px-4 border-radius-lg"> Add Staff </button>
                </router-link>
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
                          <router-link :to="{ name: 'detail-staff', params: { id: item.user.id } }">
                          <i class="material-icons-round opacity-10 fs-5 me-1 cursor-pointer">info</i>
                          </router-link>
                          <router-link :to="{ name: 'edit-staff', params: { id: item.id } }">
                            <i class="material-icons-round opacity-10 fs-5 cursor-pointer">edit</i>
                          </router-link>
                          <!-- <i class="material-icons-round opacity-10 fs-5">info</i> -->
                          <i @click="deleteStaff(item.user.id)" class="material-icons-round opacity-10 fs-5 cursor-pointer">delete</i>
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
      this.getAllStaff();
    },
    data() {
      return {
        allStaff:'',
        schools: 6,
        user:'',
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
      async getAllStaff(){
        try {
          let url='/getAllStaff'
          if(this.user.role=='organization_admin'){
            url='/getAllStaff/'+this.user.id
          }
          const response= await axiosClient.get(url)
          this.allStaff=response.data
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
    }
  }
  </script>
  
  <style>
  .hover-pointer:hover {
    cursor: pointer;
    color: red;
  }
  </style>
  