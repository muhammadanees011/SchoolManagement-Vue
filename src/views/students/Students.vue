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

            <BulkTopup :show="showModal" :task="task" @close="showModal = false" @update-task="updateAmount">
            <h2>Modal Content</h2>
            <p>This is the content of the modal.</p>
            </BulkTopup>
            
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

            <div class="icon-container">
              <div class="icon-label" @click="showModal = true">
                <span class="label-text bulk_topup">Bulk Topup</span>
              </div>
              <div class="icon-label" @click="exportTableToXLS()">
                <span class="label-text bulk_topup">Export To XLS</span>
              </div>
            </div>

            <div class="table-responsive p-0 student-table">
              <table  ref="table" class="table align-items-center mb-0">
                <thead class="thead">
                  <tr>
                    <th class="pe-5">
                      <div class="form-check" style="margin-left:0px !important;">
                          <input @change="selectAll" v-model="selectall" id="" class="form-check-input" type="checkbox" name="">
                          <label for="" class="custom-control-label"></label>
                      </div>
                    </th>
                    <th class="text-uppercase text-xxs font-weight-bolder"> MIFARE ID </th>
                    <th class="text-uppercase text-xxs font-weight-bolder">  Name </th>
                    <th class="text-uppercase text-xxs font-weight-bolder"> Email </th>
                    <th class="text-center text-uppercase text-xxs font-weight-bolder"> School </th>
                    <!-- <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"> Stage </th> -->
                    <th class="text-center text-uppercase text-xxs font-weight-bolder"> FSM </th>
                    <th class="text-center text-uppercase text-xxs font-weight-bolder"> Balance </th>
                    <!-- <th v-if="userPermissions.transaction_history" class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"> Transactions </th> -->
                    <th v-if="userPermissions.wallet" class="text-center text-uppercase text-xxs font-weight-bolder"> Wallet </th>
                    <th v-if="userPermissions.topup" class="text-center text-uppercase text-xxs font-weight-bolder"> Topup </th>
                    <th class="text-center text-uppercase text-xxs font-weight-bolder"> Status </th>
                    <th class="text-center text-uppercase text-xxs font-weight-bolder"> Action </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in allStudents" :key="index">
                    <td class="text-sm">
                        <div class="form-check"  style="margin-left:17px !important;">
                            <input :checked="checkIfSelected(item.user.id)" @change="selectRecord(item.user.id)" id="" class="form-check-input" type="checkbox" name="">
                            <label for="" class="custom-control-label"></label>
                        </div>
                    </td>
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
                    <!-- <td v-if="userPermissions.transaction_history" class="align-middle text-center">
                        <i @click="transactionHistoryNav(item.user.id)" class="hover-pointer material-icons-round opacity-10 fs-5">swap_horizontal_circle</i>
                    </td> -->
                    <td v-if="userPermissions.wallet" class="align-middle text-center">
                        <router-link :to="{name:'balance',params: { id: item.user.id }}" title="Wallet">
                          <i class="fas fa-donate fs-5 me-2"></i>
                        </router-link>
                    </td>
                    <td v-if="userPermissions.topup" class="align-middle text-center">
                        <i @click="topUps(item.user.id)" class="hover-pointer material-icons-round opacity-10 fs-5">credit_card</i>
                    </td>
                    <td class="align-middle text-center text-sm">
                      <span class="badge badge-sm bg-gradient-success">{{item.user.status}}</span>
                    </td>
                    <td class="align-middle text-center">
                      <span>
                        <!-- <template v-if="userPermissions.wallet">
                          <router-link :to="{name:'student-balance',params: { id: item.user.id }}" title="Wallet">
                            <i class="fas fa-donate fs-5 me-2"></i>
                          </router-link>
                        </template> -->
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
                        <i v-if="userPermissions.delete_student" @click="confirmDelete(item.user.id)" class="material-icons-round opacity-10 fs-5 cursor-pointer">delete</i>
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
import Swal from 'sweetalert2';
import { mapGetters } from 'vuex'
import BulkTopup from '../students/bulk_topup';
import * as XLSX from 'xlsx';

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
    BulkTopup
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
    async updateAmount(amount) {
      this.topUpAmount = amount;
      let records=[]
      this.selectedRecords.filter((item)=>{
        if(item.value){
          records.push(item.id)
        }
      })
      let data={
        'topup_amount':this.topUpAmount,
        'students':records
      }
      if(records.length && this.topUpAmount!=null){
        try{
        const response=await axiosClient.post('/bulkTopUp',data);
        this.snackbarMsg(response.data.message)
        this.getAllStudents();
        }catch(error){
          console.log(error)
        }
      }else{
        this.snackbarMsg("Please select the students and enter amount!")
      }
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
          this.deleteStudent(id)
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
