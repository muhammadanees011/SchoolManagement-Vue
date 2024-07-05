<template>
    <div class="container-fluid py-4">
      <div class="row">
        <div class="col-12">
          <div class="card my-4">
            <div class="d-flex justify-content-between  border-radius-lg pt-4 pb-3">
                <h6 class="text-dark text-capitalize ps-3">Admins</h6>
                <router-link :to="{ name: 'add-organization-admins' }">
                  <button style="font-size: 12px; background-color: #573078;" class="btn me-3 text-white fw-5 border-0 py-2 px-4 border-radius-lg"> Add Admin </button>
                </router-link>
              </div>
            <div class="card-body px-0 pb-2">
              <div class="table-responsive p-0">
                <table class="table align-items-center mb-0">
                  <thead>
                    <tr>
                      <th class="align-middle text-center text-uppercase text-xxs font-weight-bolder"> ID </th>
                      <th class="text-uppercase text-xxs font-weight-bolder">  Name </th>
                      <th class="text-uppercase text-xxs font-weight-bolder"> Email </th>
                      <th class="text-center text-uppercase text-xxs font-weight-bolder"> Role </th>
                      <th class="text-center text-uppercase text-xxs font-weight-bolder"> Organization </th>
                      <th class="text-center text-uppercase text-xxs font-weight-bolder"> Status </th>
                      <th class="text-center text-uppercase text-xxs font-weight-bolder"> Action </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in allAdmins" :key="index">
                      <td class="align-middle text-center text-sm">
                        <p class="text-xs font-weight-bold mb-0"> {{ item.id }}</p>
                      </td>
                      <td>
                        <p class="text-xs font-weight-bold mb-0"> {{ item.first_name }} {{ item.last_name }}</p>
                      </td>
                      <td>
                        <p class="text-xs font-weight-bold mb-0"> {{ item.email }} </p>
                        <!-- <p class="text-xs text-secondary mb-0">{{ item.user.phone }}</p> -->
                      </td>
                      <td class="align-middle text-center">
                        <p class="text-xs font-weight-bold mb-0"> {{ item.user_role.role.name }} </p>
                      </td>
                      <td class="align-middle text-center">
                        <span class="text-secondary text-xs font-weight-bold">{{ item.organization_admin ? (item.organization_admin.organization ? item.organization_admin.organization.name:'-'):'-' }}</span>
                      </td>
                      <td class="align-middle text-center text-sm">
                        <span class="badge badge-sm bg-gradient-success">{{item.status}}</span>
                      </td>
                      <td class="align-middle text-center">
                        <span>
                          <router-link :to="{ name: 'edit-organization-admin', params: { id: item.id } }">
                            <i class="material-icons-round opacity-10 fs-5 cursor-pointer">edit</i>
                          </router-link>
                          <!-- <i class="material-icons-round opacity-10 fs-5">info</i> -->
                          <i @click="confirmDelete(item.id)" class="material-icons-round opacity-10 fs-5 cursor-pointer">delete</i>
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
  import Swal from 'sweetalert2';
  import { mapGetters } from 'vuex'
  
  export default {
    name: 'tables',
    mounted(){
      this.setColor();
      this.getAllAdmins();
    },
    updated(){
      this.$permissions.redirectIfNotAllowed('view_admin');
    },
    data() {
      return {
        allAdmins:'',
        schools: 6,
      }
    },
    computed: {
      ...mapGetters(['getBrandingSetting']),
      userPermissions() {
        return this.$permissions.userPermissions.value;
      },
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
            this.confirmDelete(id)
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
      //-------------GET ALL STUDENTS----------
      async getAllAdmins(){
        try {
          const response= await axiosClient.get('/getAllOrganizationAdmins')
          this.allAdmins=response.data
        } catch (error) {
          console.log(error)
        }
      },
      //-------------DELETE ADMIN---------
      async deleteOrganizationAdmin(id){
        try {
          await axiosClient.delete('/deleteOrganizationAdmin/' + id)
          this.removeOrganizationAdminFromList(id)
          this.snackbarMsg('Successfully Deleted')
        } catch (error) {
          console.log(error)
        }
      },
      //------------REMOVE ADMIN FROM LIST-----------
      removeOrganizationAdminFromList(id) {
        const indexToRemove = this.allAdmins.findIndex((item) => item.id === id)
        this.allAdmins.splice(indexToRemove, 1)
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
  