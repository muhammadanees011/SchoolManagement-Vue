<template>
    <div class="container-fluid py-4">
      <div class="row">
        <div class="col-12">
          <div class="card my-4">
            <div class="d-flex justify-content-between  border-radius-lg pt-4 pb-3">
                <h6 class="text-dark text-capitalize ps-3">Childrens</h6>
              </div>
            <div class="card-body px-0 pb-2">
              <div class="table-responsive p-0">
                <table class="table align-items-center mb-0">
                  <thead>
                    <tr>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"> Student ID </th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">  Name </th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"> Email </th>
                      <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"> Site </th>
                      <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"> Stage </th>
                      <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"> Transactions </th>
                      <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"> Ballance </th>
                      <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"> Status </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in allStudents" :key="index">
                      <td class="align-middle text-center text-sm">
                        <p class="text-xs font-weight-bold mb-0"> {{ item.student_id }}</p>
                      </td>
                      <td>
                        <p class="text-xs font-weight-bold mb-0"> {{ item.user.first_name }} {{ item.user.last_name }}</p>
                      </td>
                      <td>
                        <p class="text-xs font-weight-bold mb-0"> {{ item.user.email }} </p>
                      </td>
                      <td class="align-middle text-center">
                        <span class="text-secondary text-xs font-weight-bold">{{ item.school.title }}</span>
                      </td>
                      <td class="align-middle text-center">
                        <span class="text-secondary text-xs font-weight-bold">{{ item.stage }}</span>
                      </td>
                      <td class="align-middle text-center">
                          <i @click="transactionHistoryNav(item.user.id)" class="hover-pointer material-icons-round opacity-10 fs-5">swap_horizontal_circle</i>
                      </td>
                      <td class="align-middle text-center">
                        <span>
                          <router-link :to="{name:'student-balance',params: { id: item.user.id }}" title="Wallet">
                           <i class="fas fa-donate me-2"></i>
                          </router-link>
                        </span>
                      </td>
                      <td class="align-middle text-center text-sm">
                        <span class="badge badge-sm bg-gradient-success">{{item.user.status}}</span>
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
      this.getAllStudents();
    },
    data() {
      return {
        allStudents:'',
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
      //-------------GET ALL STUDENTS----------
      async getAllStudents(){
        try {
          let data={
            'user_id':this.user.id,
            'role':this.user.role
          }
          const response= await axiosClient.post('getAllStudents',data);
          this.allStudents=response.data
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
  </style>
  