<template>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">

            <div class="d-flex justify-content-between border-radius-lg pt-4">
                <h6 class="ms-3 text-dark text-capitalize">ARCHIVED SITES</h6>
            </div>

            <span class="ps-3">
              <small class=" me-4 page-description">
                  In the Archived Sites section, you can view and restore archived school locations. The details displayed include the student count and teacher count <br> for each archived site. This allows you to manage and review historical site data effectively.
              </small>
            </span>

            <div class="card-body px-0 pb-2">

              <span class="label-text bulk_topup" @click="confirmAction('restore')">
                <i class="fas fa-undo restore-icon me-1"></i>
                Bulk Restore
              </span>
              
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
                      <th class="text-uppercase text-xxs font-weight-bolder"> ID </th>
                      <th class="text-uppercase text-xxs font-weight-bolder"> Site Name </th>
                      <th class="text-uppercase text-xxs font-weight-bolder"> Email </th>
                      <th class="text-uppercase text-xxs font-weight-bolder ps-2"> Country </th>
                      <th class="text-center text-uppercase text-xxs font-weight-bolder"> Organisation </th>
                      <th class="text-center text-uppercase text-xxs font-weight-bolder"> Teachers </th>
                      <th class="text-center text-uppercase text-xxs font-weight-bolder"> Students </th>
                      <th class="text-center text-uppercase text-xxs font-weight-bolder"> Status </th>
                      <!-- <th class="text-center text-uppercase text-xxs font-weight-bolder"> Action </th> -->
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="allSchools.length === 0">
                      <td colspan="9" class="text-center">
                        No data available.
                      </td>
                    </tr>
                    <tr v-for="(item, index) in allSchools" :key="index">
                     <td class="align-middle text-center text-sm">
                        <div class="form-check">
                            <input :checked="checkIfSelected(item.id)" @change="selectRecord(item.id)" id="" class="form-check-input" type="checkbox" name="">
                            <label for="" class="custom-control-label"></label>
                        </div>
                      </td>
                      <td class="align-middle text-center text-sm">
                        <p class="text-xs font-weight-bold mb-0"> {{ item.id }}</p>
                      </td>
                      <td>
                        <router-link :to="{ name: 'settings-school', params: { id: item.id }}">
                        <div class="d-flex">
                        <p class="text-xs font-weight-bold mb-0"> {{ item.title }} </p>
                        <i class="material-icons-round opacity-10 fs-6 cursor-pointer">arrow_forward</i>
                        </div>
                        </router-link>
                      </td>
                      <td>
                        <p class="text-xs font-weight-bold mb-0"> {{ item.email }} </p>
                        <!-- <p class="text-xs text-secondary mb-0">{{ item.user.phone }}</p> -->
                      </td>
                      <td>
                        <p class="text-xs font-weight-bold mb-0"> {{ item.country }} </p>
                        <!-- <p class="text-xs text-secondary mb-0">{{ item.city }}</p> -->
                      </td>
                      <td class="align-middle text-center">
                        <span class="text-secondary text-xs font-weight-bold">{{ item.organization.name }}</span>
                      </td>
                      <td class="align-middle text-center">
                        <span class="text-secondary text-xs font-weight-bold">{{ item.teachers_count }}</span>
                      </td>
                      <td class="align-middle text-center">
                        <span class="text-secondary text-xs font-weight-bold">{{ item.students_count }}</span>
                      </td>
                      <td class="align-middle text-center text-sm">
                        <span class="badge badge-sm bg-gradient-success">{{item.status}}</span>
                      </td>
                      <!-- <td class="align-middle text-center">
                        <span>
                          <template v-if="userPermissions.edit_site">
                          <router-link :to="{ name: 'edit-school', params: { id: item.id } }">
                            <i class="material-icons-round opacity-10 fs-5 cursor-pointer">edit</i>
                          </router-link>
                          </template>
                          <template v-if="userPermissions.delete_site">
                          <i @click="confirmDelete(item.id)" class="material-icons-round opacity-10 fs-5 cursor-pointer">delete</i>
                          </template>
                        </span>
                      </td> -->
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
  import Swal from 'sweetalert2';
  import { mapGetters } from 'vuex'
  
  export default {
    name: 'tables',
    async mounted(){
      await this.setColor()
      await this.getUser();
      await this.getAllSchools();
      await this.selectAll();
    },
    updated(){
      this.$permissions.redirectIfNotAllowed('view_site');
    },
    data() {
      return {
        selectall:false,
        selectedRecords:[],
        allSchools:'',
        schools: 6,
        user:''
      }
    },
    computed: {
      ...mapGetters(['getBrandingSetting']),
      userPermissions() {
        return this.$permissions.userPermissions.value;
      },
    },
    methods:{
    //-----------DELETE CONFIRMATION--------------
    confirmAction(type) {
        Swal.fire({
            title: 'Are you sure?',
            text: type=='delete'? "Items will be deleted permanently and you will not be able to revert this!" :"Items Will be restored to the students",
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
            if(type=='restore'){
                this.bulkRestore();
            }
            }
        });
    },
    //-----------BULK RESTORE SCHOOLS-------------
    async bulkRestore(){
      let records=[]
      this.selectedRecords.filter((item)=>{
        if(item.value){
          records.push(item.id)
        }
      })
      if(records.length){
        const response=await axiosClient.post('/bulkRestoreSchools',records);
        this.snackbarMsg(response.data.message)
        this.getAllSchools();
      }else{
        this.snackbarMsg("Error: data not selected")
      }
    },
        
    //------------SELECT ALL RECORD-----------
    selectAll(){
    this.selectedRecords=[]
    this.allSchools.filter((item)=>{
        if(this.selectall){
            this.selectedRecords.push({ id: item.id, value: true });
        }else{
            this.selectedRecords.push({ id: item.id, value: false });
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
        this.deleteSchool(id)
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
    //-------------GET USER----------
    getUser(){
    let user=localStorage.getItem('user')
    user= JSON.parse(user)
    this.user=user
    },
    //-------------GET ALL SCHOOLS----------
    async getAllSchools(){
    try {
        let url='/archivedSchools'
        if(this.user.role=='organization_admin'){
        url='/archivedSchools/'+this.user.id
        }
        const response= await axiosClient.get(url)
        this.allSchools=response.data
    } catch (error) {
        console.log(error)
    }
    },
    //-------------DELETE SCHOOL---------
    async deleteSchool(id){
    try {
        await axiosClient.delete('/deleteSchool/' + id)
        this.removeSchoolFromList(id)
        this.snackbarMsg('School Deleted')
    } catch (error) {
        console.log(error)
    }
    },
    //------------REMOVE ORGANIZATION FROM LIST-----------
    removeSchoolFromList(id) {
    const indexToRemove = this.allSchools.findIndex((item) => item.id === id)
    this.allSchools.splice(indexToRemove, 1)
    },
    }
  }
  </script>
  <style>
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
  