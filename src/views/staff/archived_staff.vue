<template>
    <div class="container-fluid py-4">
      <div class="row">
        <div class="col-12">
          <div class="card my-0">
            <div class="d-flex justify-content-between  border-radius-lg pt-4 pb-3">
                <h6 class="text-dark text-capitalize ps-3">Archived Staff</h6>
              </div>
              <!-- <div class="filter-container">
                <input class="input-box filter-box" @keyup.enter="filterStaff" v-model="seachString" id="name" type="text" placeholder="Type to Search..." name="address" />
              </div>    -->
            <div class="card-body px-0 pb-2">

              <div class="icon-container">
                <div class="icon-label" @click="confirmAction('restore')">
                    <span class="label-text">Bulk Restore</span>
                    <i class="material-icons-round opacity-10 fs-6 cursor-pointer">restore</i>
                </div>
                <div class="icon-label" v-if="userPermissions.delete_student" @click="confirmAction('delete')">
                    <span class="label-text">Bulk Delete</span>
                    <i class="material-icons-round opacity-10 fs-6 cursor-pointer">delete</i>
                </div>
                <input class="input-box filter-box" @keyup.enter="filterStaff" v-model="seachString" id="name" type="text" placeholder="Type to Search..." name="address" />
              </div>

              <div class="table-responsive p-0">
                <table class="table align-items-center mb-0">
                  <thead>
                    <tr>
                      <th class="">
                        <div class="form-check" style="margin-left:-20px;">
                            <input @change="selectAll" v-model="selectall" id="" class="form-check-input" type="checkbox" name="">
                            <label for="" class="custom-control-label"></label>
                        </div>
                      </th>
                      <th class="text-uppercase text-center text-xxs font-weight-bolder">  MIFARE ID </th>
                      <th class="text-uppercase text-xxs font-weight-bolder">  Name </th>
                      <th class="text-uppercase text-xxs font-weight-bolder"> Email </th>
                      <th class="text-uppercase text-xxs font-weight-bolder"> School </th>
                      <!-- <th class="text-uppercase text-center text-xxs font-weight-bolder"> Balance </th>
                      <th v-if="userPermissions.wallet" class="text-center text-uppercase text-xxs font-weight-bolder"> Wallet </th>
                      <th class="text-uppercase text-xxs font-weight-bolder"> TopUp </th> -->
                      <th class="text-center text-uppercase text-xxs font-weight-bolder"> Status </th>
                      <!-- <th class="text-center text-uppercase text-xxs font-weight-bolder"> Action </th> -->
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in allStaff" :key="index">
                    <td class="align-middle text-center text-sm">
                        <div class="form-check">
                            <input :checked="checkIfSelected(item.user.id)" @change="selectRecord(item.user.id)" id="" class="form-check-input" type="checkbox" name="">
                            <label for="" class="custom-control-label"></label>
                        </div>
                    </td>
                     <td>
                        <p class="text-xs  text-center font-weight-bold mb-0"> {{ item.mifare_id ? item.mifare_id :'-' }}</p>
                      </td>
                      <td>
                        <p class="text-xs font-weight-bold mb-0"> {{ item.user.first_name }} {{ item.user.last_name }}</p>
                      </td>
                      <td>
                        <p class="text-xs font-weight-bold mb-0"> {{ item.user.email }} </p>
                        <!-- <p class="text-xs text-secondary mb-0">{{ item.user.phone }}</p> -->
                      </td>
                      <td>
                        <p class="text-xs text-center font-weight-bold mb-0"> {{item.school.name}} </p>
                      </td>
                      <!-- <td>
                        <span class="ms-4 text-secondary text-xs font-weight-bold">£{{ formattedPrice(item.balance ? item.balance:0 )}}</span>
                      </td>
                      <td v-if="userPermissions.wallet" class="align-middle text-center">
                        <router-link :to="{name:'balance',params: { id: item.user.id }}" title="Wallet">
                          <i class="fas fa-donate fs-5 me-2"></i>
                        </router-link>
                      </td>
                      <td v-if="userPermissions.topup" class="align-middle text-center">
                          <i @click="topUps(item.user.id)" class="hover-pointer material-icons-round opacity-10 fs-5">credit_card</i>
                      </td> -->
                      <td class="align-middle text-center text-sm">
                        <span class="badge badge-sm bg-gradient-success">{{item.user.status}}</span>
                      </td>
                      <!-- <td class="align-middle text-center">
                        <span>
                          <template v-if="userPermissions.edit_staff">
                            <router-link :to="{ name: 'edit-staff', params: { id: item.id } }">
                              <i class="material-icons-round opacity-10 fs-5 cursor-pointer">edit</i>
                            </router-link>
                          </template>
                          <template v-if="userPermissions.delete_staff">
                            <i @click="deleteStaff(item.user.id)" class="material-icons-round opacity-10 fs-5 cursor-pointer">delete</i>
                          </template>
                        </span>
                      </td> -->
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
  import Swal from 'sweetalert2';
  import { mapGetters } from 'vuex'

  
  export default {
    name: 'tables',
    async mounted(){
      this.setColor()
      await this.getUser();
      await this.getAllStaff();
      await this.selectAll();
    },
    updated(){
      this.$permissions.redirectIfNotAllowed('view_staff');
    },
    computed: {
      ...mapGetters(['getBrandingSetting']),
      userPermissions() {
        return this.$permissions.userPermissions.value;
      },
    },
    data() {
      return {
        selectall:false,
        selectedRecords:[],
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
      setColor() {
      let bgColor=this.getBrandingSetting.primary_color ?
      this.getBrandingSetting.primary_color : '#573078';
      document.querySelector('thead').style.setProperty('--navheader-bg-color', bgColor);
    },
    //------------SELECT ALL RECORD-----------
    selectAll(){
    this.selectedRecords=[]
    this.allStaff.filter((item)=>{
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

    //-----------BULK DELETE STUDENTS-------------
    async bulkDelete(){
      let records=[]
      this.selectedRecords.filter((item)=>{
        if(item.value){
          records.push(item.id)
        }
      })
      if(records.length){
        const response=await axiosClient.post('/bulkDeleteStaff',records);
        this.snackbarMsg(response.data.message)
        this.getAllStaff();
      }
    },

    //-----------BULK RESTORE STUDENTS-------------
    async bulkRestore(){
      let records=[]
      this.selectedRecords.filter((item)=>{
        if(item.value){
          records.push(item.id)
        }
      })
      if(records.length){
        const response=await axiosClient.post('/bulkRestoreStaff',records);
        this.snackbarMsg(response.data.message)
        this.getAllStaff();
      }else{
        this.snackbarMsg("Error: data not selected")
      }
    },

        //-----------DELETE CONFIRMATION--------------
        confirmAction(type) {
    Swal.fire({
        title: 'Are you sure?',
        text: type=='delete'? "Items will be deleted permanently and you will not be able to revert this!" :"Items Will be restored to the staff",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: type=='delete'? 'Yes, delete it!':'Yes, restore it!',
        customClass: {
        popup: 'custom-swal'
        }
    }).then((result) => {
        if (result.isConfirmed) {
          if(type=='delete'){
            this.bulkDelete()
          }else if(type=='restore'){
            this.bulkRestore();
          }
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
      topUps(id){
        this.$router.push('/payment_account/'+id)
      },
      transactionHistoryNav(id){
        this.$router.push('/student-billing/'+id)
      },
      formattedPrice(value){
        const formattedValue = parseFloat(value).toFixed(2);
        return formattedValue;
    } ,
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
          const response= await axiosClient.post('/archivedStaff',data)
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
  thead{
  background-color: var(--navheader-bg-color) !important;
  }
  tbody > tr:hover{
    background-color: #F0F2F5 !important;
  }
  thead tr:hover{
    background-color: var(--navheader-bg-color) !important;
  }
  </style>
  