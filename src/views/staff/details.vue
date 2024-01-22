<template>
            <div class="card">
            <div class="card-body pt-4 p-3">
            <div class="list-group">
              <div style="background-color: #F0F2F5 !important;" class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
                <div class="info-width d-flex flex-column">
                  <div class="row">
                  <div class="col-md-8 col-sm-8">
                    <div>
                      <h6 class="mb-3 text-sm text-dark">
                        Muhammad Anees
                      </h6>
                      <span class="user-info d-flex justify-content-between align-items-center text-dark font-weight-bold text-xs">
                        <span class="text-sm fw-5">Phone:</span>
                        <span class="text-dark ms-2 font-weight-bold">
                          +92347193809
                        </span>
                      </span>
                      <span class="user-info d-flex justify-content-between align-items-center text-dark font-weight-bold text-xs">
                        <span class="text-sm fw-5">Email:</span>
                        <span class="text-dark ms-2 font-weight-bold">
                          anees@example.com
                        </span>
                      </span>
                      <span class="user-info d-flex justify-content-between align-items-center text-dark font-weight-bold text-xs">
                        <span class="text-sm fw-5">Staff ID:</span>
                        <span class="text-dark ms-2 font-weight-bold">
                          satff349328
                        </span>
                      </span>
                      <span class="user-info d-flex justify-content-between  align-items-center text-dark font-weight-bold text-xs">
                        <span class="text-sm fw-5">School:</span>
                        <span class="text-dark ms-2 font-weight-bold">
                          XEPAY School
                        </span>
                      </span>
                      <span class="user-info d-flex justify-content-between  align-items-center text-dark font-weight-bold text-xs">
                        <span class="text-sm fw-5">Country:</span>
                        <span class="text-dark ms-2 font-weight-bold">
                          United Kingdom (UK)
                        </span>
                      </span>
                      <span class="user-info d-flex justify-content-between align-items-center text-dark font-weight-bold text-xs">
                        <span class="text-sm fw-5">City:</span>
                        <span class="text-dark ms-2 font-weight-bold">
                          Birmingham
                        </span>
                      </span>
                      <span class="user-info d-flex justify-content-between align-items-center text-dark font-weight-bold text-xs">
                        <span class="text-sm fw-5">Post Code/Zip Code:</span>
                        <span class="text-dark ms-2 font-weight-bold">
                          3231223
                        </span>
                      </span>
                      <span class="user-info d-flex justify-content-between align-items-center text-dark font-weight-bold text-xs">
                        <span class="text-sm fw-5">Address:</span>
                        <span class="text-dark ms-2 font-weight-bold">
                            3673 Edington Drive
                        </span>
                      </span>
                    </div>
                  </div>
                  <div class="col-md-4 col-sm-4">
                    <h6 class="mt-3 text-sm text-dark">
                      PERMISSIONS
                    </h6>
                    <small class="text-xs">Muhammad Anees has following permissions</small>
                    <div class="permissions mt-3">
                      <span v-for="(item,index) in allPermissions" :key="index" class="permission-info d-flex justify-content-between align-items-center text-dark font-weight-bold text-xs">
                          <div class="switch-container mt-2 me-5">
                          <input type="checkbox" @change="updatePermission(item.id)" :checked="checkIfPermission(item.id)" :id="item.id" class="switch-input">
                          <label :for="item.id" class="switch-label"></label>
                          </div>
                          <span class="permission-name text-uppercase">{{item.name}}</span>
                      </span>
                    </div>
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

  export default {
    name: "billing-card",
    mounted(){
      this.getAllPermissions();
      this.getUserPermissions();
    },
    data() {
      return {
        allPermissions:'',
        userPermissions:[],
      };
    },
    methods:{
    //--------------GET ALL PERMISSIONS-------------
    async getAllPermissions(){
      try {
          const response= await axiosClient.get('getAllPermissions')
          this.allPermissions=response.data
        } catch (error) {
          console.log(error)
        }
    },
    //--------------GET USER PERMISSIONS-------------
    async getUserPermissions(){
      let id = this.$route.params.id
      try {
          const response= await axiosClient.get('getUserPermissions/'+id)
          this.userPermissions=response.data
        } catch (error) {
          console.log(error)
        }
    },
    //--------------CHECK USER PERMISSIONS-------------
    checkIfPermission(id){
      return this.userPermissions.some(item => item.permission_id === id);
    },
    //--------------UPDATE USER PERMISSIONS-------------
    async updatePermission(id){
      let data={
        user_id:this.$route.params.id,
        permission_id:id
      }
      try {
          await axiosClient.post('updateUserPermissions',data)
        } catch (error) {
          console.log(error)
        }
    }

    }
  };
</script>
<style>
.info-width{
  width: 100% !important;
}
.permission-info{
    background-color: rgba(253, 254, 254, 0.5);
    padding: 0.2rem;
    border-radius: 3px;
    width: 100% !important; 
    margin-bottom: 2px;
}
.user-info {
    background-color: rgba(253, 254, 254, 0.5);
    padding: 0.2rem;
    border-radius: 2px;
    width: 100% !important; 
    margin-bottom: 0px;
}
.permissions-text{
    font-size: 10px;
}
.permission-name{
    background-color:#4CAF50;
    border-radius: 10px;
    color: white !important;
    font-size: 12px !important;
    padding: 5px;
    padding-left: 10px;
    padding-right:10px ;
}
.amount-radio{
  width: 100px;
  font-size: 12px;
}
.amount-radio input{
  width: 15px;
  height: 15px;
  font-size: 12px;
  background-color: #F0F2F5;
}
.selected {
  background-color: #F0F2F5 !important; 
  border: 2px solid #F0F2F5;
  color: #010A21 !important;
}
.selected h6{
color: #010A21;
}
.card-height{
  height: 100vh;
}
.btn-color{
  background-color: #f513ca !important;
}
.top-up-row{
  padding: 17px;
  height: 50px;
  width: 300px;
  border-radius: 5px;
  border: 1px solid black;
  margin-bottom: 3px;
}
.amount-input{
  width: 25.3em !important; 
  height: 4em !important;
  border: 1px solid black;
  border-radius: 5px;
}
.amount-container{
  width: 25.3em !important; 
  height: 3.5em !important;
}
.top-up-btn{
  margin-top: 4px;
  width: 25.3em !important; 
  height: 4em !important;
}
.add-card-btn{
  height: 4em !important;
}


/* Switch Container Styles */
.switch-container {
  position: relative;
  display: inline-block;
}

/* Switch Input Styles - Hide default input */
.switch-input {
  display: none;
}

/* Switch Label Styles */
.switch-label {
  cursor: pointer;
  display: block;
  position: relative;
  width: 40px; /* Adjust the width according to your preference */
  height: 20px; /* Adjust the height according to your preference */
  background-color: #ccc; /* Default background color */
  border-radius: 10px; /* Half of the height for rounded corners */
  transition: background-color 0.3s ease;
}

/* Checked State Styles */
.switch-input:checked + .switch-label {
  background-color: #4CAF50; /* Background color when checked */
}

/* Toggle Animation - Optional */
.switch-label::before {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  background-color: #fff; /* Circle color */
  border-radius: 50%;
  transition: transform 0.3s ease;
}

.switch-input:checked + .switch-label::before {
  transform: translateX(20px); /* Move the circle to the right when checked */
}


</style>
  