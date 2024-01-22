<template>
    <div class="container-fluid py-4">
      <div class="row">
        <div class="col-12">
          <div class="card my-4">
            <div class="d-flex justify-content-between  border-radius-lg pt-4 pb-3">
                <h6 class="text-dark text-capitalize ps-3">Attributes</h6>
                <router-link v-if="userPermissions.create" :to="{ name: 'add-attribute' }">
                  <button style="font-size: 12px; background-color: #573078;" class="btn me-3 text-white fw-5 border-0 py-2 px-4 border-radius-lg"> Add Attribute </button>
                </router-link>
              </div>
            <div class="card-body px-0 pb-2">
              <div class="table-responsive p-0">
                <table class="table align-items-center mb-0">
                  <thead>
                    <tr>
                      <th class="text-uppercase  text-center text-secondary text-xxs font-weight-bolder opacity-7">  ID </th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">  Name </th>
                      <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"> Action </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in allAttributes" :key="index">
                     <td>
                        <p class="text-xs  text-center font-weight-bold mb-0"> {{ item.id}}</p>
                      </td>
                      <td>
                        <p class="text-xs font-weight-bold mb-0"> {{ item.name }}</p>
                      </td>
                      <td class="align-middle text-center">
                        <span>
                          <router-link v-if="userPermissions.edit" :to="{ name: 'edit-attribute', params: { id: item.id } }">
                            <i class="material-icons-round opacity-10 fs-5 cursor-pointer">edit</i>
                          </router-link>
                          <i v-if="userPermissions.delete" @click="deleteAttribute(item.id)" class="material-icons-round opacity-10 fs-5 cursor-pointer">delete</i>
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
      this.getAllAttributes();
    },
    computed: {
      userPermissions() {
        return this.$permissions.userPermissions.value;
      },
    },
    data() {
      return {
        allAttributes:'',
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
      //------------GET USER-----------------
      getUser(){
        let user=localStorage.getItem('user')
        user= JSON.parse(user)
        this.user=user
      },
      //-------------GET ALL Attributes----------
      async getAllAttributes(){
        try {
          const response= await axiosClient.get('/getAllAttributes')
          this.allAttributes=response.data
        } catch (error) {
          console.log(error)
        }
      },
      //-------------DELETE PARENT---------
      async deleteAttribute(id){
        try {
          await axiosClient.delete('/deleteAttribute/' + id)
          this.removeAttributeFromList(id)
          this.snackbarMsg('Attribute Deleted Successfully')
        } catch (error) {
          console.log(error)
        }
      },
      //------------REMOVE Attribute FROM LIST-----------
      removeAttributeFromList(id) {
        const indexToRemove = this.allAttributes.findIndex((item) => item.id === id)
        this.allAttributes.splice(indexToRemove, 1)
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
  