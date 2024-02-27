<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="card my-4">
          <div class="d-flex justify-content-between  border-radius-lg pt-4 pb-3">
              <h6 class="text-dark text-capitalize ps-3">Students</h6>
              <template v-if="userPermissions.create_student">
                <router-link :to="{ name: 'add-student' }">
                  <button style="font-size: 12px; background-color: #573078;" class="btn me-3 text-white fw-5 border-0 py-2 px-4 border-radius-lg"> Add Student </button>
                </router-link>
              </template>
            </div>
            <div>
              <div class="filter-container">
                <input class="input-box filter-box" @keyup="filterStudents" v-model="seachString" id="name" type="text" placeholder="Type to Search..." name="address" />
                <select @change="filterStudents" class="select-box filter-type-btn" v-model="filterBy" id="filter" type="select" placeholder="Filter" name="filter">
                  <option v-for="(item, index) in allFields" :key="index" :value="item">
                    {{ item }}
                  </option>
                </select>
                <i class="fas fa-filter filter-icon me-1"></i>
              </div>              
            </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0 student-table">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"> MIFARE ID </th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">  Name </th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"> Email </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"> School </th>
                    <!-- <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"> Stage </th> -->
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"> FSM </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"> Balance </th>
                    <th v-if="userPermissions.transaction_history" class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"> Transactions </th>
                    <th v-if="userPermissions.topup" class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"> Topup </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"> Status </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"> Action </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in allStudents" :key="index">
                    <td class="align-middle text-center text-sm">
                      <p class="text-xs font-weight-bold mb-0"> {{ item.mifare_id }}</p>
                    </td>
                    <td>
                      <p class="text-xs font-weight-bold mb-0"> {{ item.user.first_name }} {{ item.user.last_name }}</p>
                    </td>
                    <td>
                      <p class="text-xs font-weight-bold mb-0"> {{ item.user.email }} </p>
                      <!-- <p class="text-xs text-secondary mb-0">{{ item.user.phone }}</p> -->
                    </td>
                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs font-weight-bold">{{item.school ? item.school.title :'-' }}</span>
                    </td>
                    <!-- <td class="align-middle text-center">
                      <span class="text-secondary text-xs font-weight-bold">{{ item.stage }}</span>
                    </td> -->
                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs font-weight-bold" :class="item.fsm_amount === null ? 'text-danger' : 'text-success'">{{ item.fsm_amount!==null ? ('£'+formattedPrice(item.fsm_amount)) :'No FSM'  }}</span>
                    </td>
                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs font-weight-bold">£{{ formattedPrice(item.user.balance ? item.user.balance.ballance:0 )}}</span>
                    </td>
                    <td v-if="userPermissions.transaction_history" class="align-middle text-center">
                        <i @click="transactionHistoryNav(item.user.id)" class="hover-pointer material-icons-round opacity-10 fs-5">swap_horizontal_circle</i>
                    </td>
                    <td v-if="userPermissions.topup" class="align-middle text-center">
                        <i @click="topUps(item.user.id)" class="hover-pointer material-icons-round opacity-10 fs-5">credit_card</i>
                    </td>
                    <td class="align-middle text-center text-sm">
                      <span class="badge badge-sm bg-gradient-success">{{item.user.status}}</span>
                    </td>
                    <td class="align-middle text-center">
                      <span>
                        <template v-if="userPermissions.wallet">
                          <router-link :to="{name:'student-balance',params: { id: item.user.id }}" title="Wallet">
                            <i class="fas fa-donate fs-5 me-2"></i>
                          </router-link>
                        </template>
                        <!-- <router-link to="#" title="Topup">
                        <i @click="topUps(item.user.id)" class="hover-pointer material-icons-round opacity-10 fs-5 me-2">credit_card</i>
                        </router-link>
                        <router-link to="#" title="Transaction">
                        <i @click="transactionHistoryNav(item.user.id)" class="hover-pointer material-icons-round opacity-10 fs-5 me-2">swap_horizontal_circle</i>
                        </router-link> -->
                        <router-link v-if="userPermissions.edit_student" :to="{ name: 'edit-student', params: { id: item.id } }">
                          <i class="material-icons-round opacity-10 fs-5 cursor-pointer">edit</i>
                        </router-link>
                        <!-- <i class="material-icons-round opacity-10 fs-5">info</i> -->
                        <i v-if="userPermissions.delete_student" @click="deleteStudent(item.id)" class="material-icons-round opacity-10 fs-5 cursor-pointer">delete</i>
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
  updated(){
    this.$permissions.redirectIfNotAllowed('view_student');
  },
  data() {
    return {
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
          'user_id':this.user.id,
          'role':this.user.role,
          'page':''
        }
        data.page = page;
        const response= await axiosClient.post('getAllStudents',data);
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
</style>
