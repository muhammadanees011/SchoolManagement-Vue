<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="card my-4">
          <!-- <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="d-flex justify-content-between bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
              <h6 class="text-white text-capitalize ps-3">Schools</h6>
              <router-link :to="{ name: 'add-school' }">
                <button style="font-size: 12px" class="me-3 bg-gradient-white shadow-white text-dark fw-5 border-0 p-2 border-radius-lg"> Add School </button>
              </router-link>
            </div>
          </div> -->
          <div class="d-flex justify-content-between border-radius-lg pt-4 pb-3">
            <h6 class="text-dark text-capitalize ps-3">Schools</h6>
          <template v-if="userPermissions.create_school">
          <router-link :to="{ name: 'add-school' }">
            <button style="font-size: 12px; background-color: #573078;" class="btn me-3 text-white fw-5 border-0 py-2 px-4 border-radius-lg"> Add School </button>
          </router-link>
          </template>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th class="text-uppercase text-xxs font-weight-bolder"> ID </th>
                    <th class="text-uppercase text-xxs font-weight-bolder"> School Name </th>
                    <th class="text-uppercase text-xxs font-weight-bolder"> Email </th>
                    <th class="text-uppercase text-xxs font-weight-bolder ps-2"> Country </th>
                    <th class="text-center text-uppercase text-xxs font-weight-bolder"> Organization </th>
                    <th class="text-center text-uppercase text-xxs font-weight-bolder"> Teachers </th>
                    <th class="text-center text-uppercase text-xxs font-weight-bolder"> Students </th>
                    <th class="text-center text-uppercase text-xxs font-weight-bolder"> Status </th>
                    <th class="text-center text-uppercase text-xxs font-weight-bolder"> Action </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in allSchools" :key="index">
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
                    <td class="align-middle text-center">
                      <span>
                        <template v-if="userPermissions.edit_school">
                        <router-link :to="{ name: 'edit-school', params: { id: item.id } }">
                          <i class="material-icons-round opacity-10 fs-5 cursor-pointer">edit</i>
                        </router-link>
                        </template>
                        <!-- <i class="material-icons-round opacity-10 fs-5">info</i> -->
                        <template v-if="userPermissions.delete_school">
                        <i @click="confirmDelete(item.id)" class="material-icons-round opacity-10 fs-5 cursor-pointer">delete</i>
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
import Swal from 'sweetalert2';
import { mapGetters } from 'vuex'

export default {
  name: 'tables',
  mounted(){
    this.setColor()
    this.getUser();
    this.getAllSchools();
  },
  updated(){
    this.$permissions.redirectIfNotAllowed('view_school');
  },
  data() {
    return {
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
        let url='/getAllSchools'
        if(this.user.role=='organization_admin'){
          url='/getAllSchools/'+this.user.id
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
