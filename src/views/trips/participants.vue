

<template>
    <div class="container-fluid py-4">
      <div class="row">
        <div class="col-12">
          <div class="card my-4">
            <div class="card-body px-0 pb-2">
              <div class="table-responsive p-0">
                <div>
                  <div class="filter-container">
                    <input class="input-box filter-box" id="name" type="text" placeholder="Type to Search..." name="address" />
                    <small style="font-size: 12px; font-weight: bold;" class=" me-3 text-dark fw-5 border-0 py-2 px-4 border-radius-lg"> Trip Participants </small>
                  </div>              
                </div>
                <table class="table align-items-center mb-0">
                  <thead>
                    <tr>
                      <th class="text-uppercase align-middle text-center text-secondary text-xxs font-weight-bolder opacity-7">
                        Student ID
                      </th>
                      <th class="text-uppercase align-middle text-center text-secondary text-xxs font-weight-bolder opacity-7">
                        Name
                      </th>
                      <th class="text-uppercase align-middle text-center text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                        Stage
                      </th>
                      <th class="text-uppercase align-middle text-center text-secondary text-xxs font-weight-bolder opacity-7">
                        Site
                      </th>
                      <th class="text-center align-middle text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Payment Status
                      </th>
                      <th class="text-center align-middle text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                       Participation Status
                      </th>                 
                    </tr>
                  </thead>
                  <tbody>

                    <tr v-for="(item,index) in allParticipants" :key="index">
                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs font-weight-bold">{{ item.student_id }}</span>
                    </td>
                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs ">{{item.first_name  }} {{item.last_name  }}</span>
                    </td>
                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs ">{{ item.stage }}</span>
                    </td>
                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs ">{{ item.school }}</span>
                    </td>
                    <td class="align-middle text-center text-sm">
                      <span class="badge badge-sm bg-gradient-success">{{ item.payment_status }}</span>
                    </td>
                    <td class="align-middle text-center text-sm">
                      <span class="badge badge-sm bg-gradient-success">{{ item.participation_status }}</span>
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
    name: "tables",
    mounted(){
    this.getUser();
    this.getTripParticipants();
    },
    data(){
    return{
      allParticipants:'',
      user:'',
      filterBy:'',
      allFields:['Clear','Account','Type','Amount','Date','Status'],
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
    getUser(){
      const userData = localStorage.getItem('user');
      if (userData) {
        this.user = JSON.parse(userData);
      }
    },
    formattedPrice(value){
      const formattedValue = parseFloat(value).toFixed(2);
      return formattedValue;
    },
    async getTripParticipants(){
        let id = this.$route.params.id
        try {
          const response=await axiosClient.get('/getTripParticipants/'+id)
          this.allParticipants=response.data;
        } catch (error) {
          console.log(error)
        }
    },
    },
  };
  </script>
  <style>
  .filter-box{
    margin-left: 1%;
    width: 25%;
    font-size: 12px;
  }
  .filter-type-btn{
    margin-right:1%;
    width:10% !important;
  }
  .filter-container {
    position: relative;
    display: flex;
    justify-content: space-between;
  }
  .filter-icon {
    position: absolute;
    top: 50%;
    right: 10px; /* Adjust the right distance as needed */
    transform: translateY(-50%);
    color: #555; /* Adjust the color as needed */
    cursor: pointer;
  }
  
  </style>
  
    