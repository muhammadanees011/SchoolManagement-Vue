<template>
    <div class="container-fluid py-4">
      <div class="row">
        <div class="col-12">
          <div class="card my-4">
            
            <div class="d-flex justify-content-between border-radius-lg pt-4">
                <h6 class="text-dark text-capitalize ps-3">Edit Staff</h6>
                <router-link :to="{ name: 'list-staff' }">
                  <button style="font-size: 12px;background-color: #573078;" class="btn me-3 text-white fw-5 border-0 py-2 px-4 border-radius-lg"> Back </button>
                </router-link>
              </div>
            <div class="card-body px-0 pb-2">
              <div class="table-responsive p-0">
                <div class="row d-flex justify-content-center bg-white form-data border-radius-lg">
                <div v-if="isError" class="mb-3 change-pass-alert">
                  <small v-for="(item,index) in validationErrors" :key="index" class="pass-text">{{ item }}<br></small>
                </div>
                  <div class="mt-3 bg-white box-shadow-dark border-radius-lg col-xl-10 col-lg-10 col-md-10">
                    <div class="form-bg container p-4">
                    <p class="text-dark ms-4 font-weight-bold">Personal Information</p>
                    <div class="card card-plain">
                      <div class="card-body">
                        <form role="form">
                          <div class="mb-1">
                            <label class="input-label" for="name">First Name <span class="required">*</span></label>
                            <input class="input-box" id="name" v-model="newStaff.first_name" type="text" placeholder="First Name" name="first_name" />
                            <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["first_name"]!==""'>First Name is required</small>
                          </div>
                          <div class="mb-1">
                            <label class="input-label" for="name">Last Name <span class="required">*</span></label>
                            <input class="input-box" id="name" v-model="newStaff.last_name" type="text" placeholder="Last Name" name="last_name" />
                            <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["last_name"]!==""'>Last Name is required</small>
                          </div>
                          <div class="mb-1">
                            <label class="input-label" for="student_id">Staff ID <span class="required">*</span></label>
                            <input class="input-box" id="student_id" v-model="newStaff.staff_id" type="text" placeholder="ID" name="student_id" />
                            <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["staff_id"]!==""'>Staff ID is required</small>
                          </div>
                          <div class="mb-1">
                            <label class="input-label" for="mifare_id">MIFARE ID <span class="required">*</span></label>
                            <input class="input-box" id="mifare_id" v-model="newStaff.mifare_id" type="text" placeholder="MIFARE ID" name="mifare_id" />
                            <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["mifare_id"]!==""'>MIFARE ID is required</small>
                          </div>
                          <div class="mb-1">
                            <label class="input-label" for="email">Email <span class="required">*</span></label>
                            <input class="input-box" id="name" v-model="newStaff.email" type="email" placeholder="email" name="email" />
                            <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["email"]!==""'>Email is required</small>
                          </div>
                          <div class="mb-1">
                            <label class="input-label" for="phone">Site <span class="required">*</span></label>
                            <br />
                            <select class="select-box" v-model="newStaff.school_id" id="school" type="select" placeholder="school" name="school">
                              <option v-for="(item, index) in allSchools" :key="index" :value="item.id">
                                {{ item.title }}
                              </option>
                            </select>
                            <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["school_id"]!==""'>Site is required</small>
                          </div>
                          <div class="mb-1">
                            <label class="input-label" for="balance">Balance </label>
                            <input class="input-box" id="balance" v-model="formattedBalance" type="number" step="0.01" min="0" placeholder="balance" name="balance" />
                        </div>
                        <div class="mb-1">
                            <label class="input-label" for="balance">Add Amount</label>
                            <input class="input-box" id="balance" v-model="formattedAmount" type="number" step="0.01" min="0" placeholder="add amount" name="add_amount" />
                        </div>

                        <div class="mb-1">
                          <label class="input-label" for="phone">Role <span class="required">*</span></label>
                          <br />
                          <select class="select-box" v-model="newStaff.role" id="role" type="select" placeholder="role" name="role">
                            <template v-for="(item, index) in allRoles" :key="index" >
                              <option :value="item.name">
                                {{ item.name }}
                              </option>
                            </template>
                          </select>
                          <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["role"]!==""'>Staff Role is required</small>
                        </div>
                        
                        <div class="mb-1">
                            <label class="input-label" for="status">Status</label>
                            <br />
                            <select v-model="newStaff.status" class="select-box" id="status" type="select" placeholder="status" name="status">
                              <option v-for="(item, index) in availableStatus" :key="index" :value="item">
                                {{ item }}
                              </option>
                            </select>
                            <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["status"]!==""'>Status is required</small>
                          </div>
                        </form>
                      </div>
                    </div>
                    </div>
                  </div>
                  <div class="mt-3 bg-white box-shadow-dark border-radius-lg  col-xl-10 col-lg-10 col-md-10">
                    <div class="form-bg container p-4">
                    <p class="text-dark ms-4 font-weight-bold">Password</p>
                    <small class="ms-4 text-xs">password fields are optional if you wan't to change the password you can fill the following data</small>
                    <div class="card card-plain">
                      <div class="card-body">
                        <form role="form"> 
                          <div class="mb-1">
                            <label class="input-label" for="phone">Password</label>
                            <input class="input-box" id="name" v-model="newStaff.password" type="password" placeholder="Password" name="zip" />
                          </div>
                          <div class="mb-1">
                            <label class="input-label" for="address">Confirm Password</label>
                            <input class="input-box" id="name" v-model="newStaff.password_confirmation" type="password" placeholder="Confirm Password" name="address" />
                          </div>
                        </form>
                      </div>
                    </div>
                    </div>
                  </div>
                  <div class="d-flex justify-content-center bg-white box-shadow-dark border-radius-lg col-xl-10 col-lg-10 col-md-10">
                    <div class="">
                        <button @click="updateStaff" style="font-size: 12px; background-color: #573078;" class="btn mt-3 ms-3 text-white fw-5 border-0 py-2 px-5  border-radius-lg"> Update Staff </button>
                    </div>
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
  // import MaterialButton from '@/components/MaterialButton.vue'
  import axiosClient from '../../axios'
  import cloneDeep from 'lodash/cloneDeep';

  export default {
    name: '',
    components: {
      // MaterialButton,
    },
    mounted() {
    this.getUser();
    this.editStaff();
    this.getSchools();
    this.getAllRoles();
    this.$globalHelper.buttonColor();
  },
  updated(){
    this.$permissions.redirectIfNotAllowed('edit_staff');
  },
  computed: {
      formattedAmount: {
        get() {
          return parseFloat(this.newStaff.add_amount).toFixed(2);
        },
        set(value) {
          const formattedValue = parseFloat(value).toFixed(2);
          this.newStaff.add_amount = formattedValue;
        },
      },
      formattedBalance: {
        get() {
          return this.newStaff.balance;
        },
        set(value) {
          const formattedValue = parseFloat(value).toFixed(2);
          this.newStaff.balance = formattedValue;
        },
      },
    },
    data() {
      return {
        allRoles:'',
        user:'',
        availableCountries:['UK','USA','Canada'],
        newStaff: {
          school_id:'',
          mifare_id:'',
          staff_id:'',
          first_name: '',
          balance:'',
          add_amount:'',
          last_name:'',
          email: '',
          phone: '',
          country: '',
          city: '',
          zip: '',
          address: '',
          status:'',
          password:'',
          password_confirmation:'',
          role:'',
        },
        validationErrors:"",
        isError:false,
        formValidation:"",
        availableStatus:['active','pending','blocked'],
        allSchools:'',
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
    //------------VALIDATE FORM-------------
    validateForm(){
        this.$permissions.redirectIfNotAllowed('edit_staff');
        let status=false
        let validate=''
        validate=cloneDeep(this.newStaff)
        for(let item in this.newStaff){
          if((this.newStaff[item] === '' || this.newStaff[item] === null) &&
           (item !== "phone" && item !== "country" && item !== "city" && item !== "address" &&
            item !== "zip" && item !== "balance" &&  item !== "add_amount" && item !== "password" && item !== "password_confirmation")){
            validate[item]="is required"
            status=true
          }else{
            validate[item]=''
          }
        }
        this.formValidation=validate
        console.log(this.formValidation)
        return status;
      },
      //------------GET ALL ROLES------------
      async getAllRoles() {
        try {
        const response= await axiosClient.get('getAllRoles')
        this.allRoles=response.data
        } catch (error) {
        console.log(error)
        }
      },
      //------------GET USER--------------
      getUser(){
        let user=localStorage.getItem('user')
        user= JSON.parse(user)
        this.user=user
      },
      //------------EDIT STAFF------------
      async editStaff() {
        let id = this.$route.params.id
        try {
          const response=await axiosClient.get('/editStaff/' + id)
          this.setData(response)
        } catch (error) {
          console.log(error)
        }
      },
      //------------SET EDIT DATA-------------
      setData(response) {
      let data
      if (response) {
        data = response.data
        this.newStaff.school_id = data.school_id
        this.newStaff.staff_id = data.staff_id
        this.newStaff.mifare_id = data.mifare_id
        this.newStaff.first_name = data.user.first_name
        this.newStaff.last_name = data.user.last_name
        this.newStaff.email = data.user.email
        this.newStaff.phone = data.user.phone
        this.newStaff.country = data.user.country
        this.newStaff.city = data.user.city
        this.newStaff.zip = data.user.zip
        this.newStaff.address = data.user.address
        this.newStaff.status=data.user.status
        this.newStaff.role=data.user.user_role.role.name
        this.newStaff.balance=this.formattedPrice(data.balance.ballance)
      }
    },
      //------------UPDATE STAFF------------
      async updateStaff() {
        if(this.validateForm()){
          return;
        }
        let id = this.$route.params.id
        try {
          await axiosClient.put('/updateStaff/'+id, this.newStaff)
          this.$router.push({ name: 'list-staff' })
          this.snackbarMsg('Staff Updated Successfuly')
          this.isError=false;
        } catch (error) {
          console.log(error)
          this.isError=true;
          this.validationErrors=error.response.data.errors
        }
      },
      formattedPrice(value){
        const formattedValue = parseFloat(value).toFixed(2);
        return formattedValue;
      },
      //------------GET SCHOOLS------------
      async getSchools() {
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
    }
  }
  </script>
  
  <style scoped>
  .form-data {
    width: 100%;
  }
  .text-area-box {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
    font-size: 12px;
    width: 237px;
    height: 35px;
  }
  /* Hover effect */
  
  .text-area-box:hover {
    border-color: #6c757d; /* Change to your preferred hover color */
  }
  
  .select-box {
    border: 1px solid #ccc;
    border-radius: 24px;
    box-sizing: border-box;
    width: 100%;
    font-size: 12px;
    height: 40px;
  }
  .select-box:hover {
    border-color: #6c757d; /* Change to your preferred hover color */
  }
  .select-box:focus {
    outline: none;
    border-color: #4caf50; /* Change to your preferred focus color */
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.5); /* Change to your preferred shadow color */
  }
  /* Focus effect */
  
  .text-area-box:focus {
    outline: none;
    border-color: #4caf50; /* Change to your preferred focus color */
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.5); /* Change to your preferred shadow color */
  }
  .input-label {
    font-size: 12px;
  }
  /* Basic input styles */
  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 24px;
    box-sizing: border-box;
    width: 100%;
    height: 40px;
    font-size: 12px;
  }
  
  /* Hover effect */
  input:hover {
    border-color: #6c757d; /* Change to your preferred hover color */
  }
  
  /* Focus effect */
  input:focus {
    outline: none;
    border-color: #4caf50; /* Change to your preferred focus color */
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.5); /* Change to your preferred shadow color */
  }
  
  /* Placeholder text style */
  ::placeholder {
    color: #999;
  }
  
  /* Styling for disabled state */
  input:disabled {
    background-color: #f0f0f0;
    color: #999;
  }
  .form-bg{
  background-color: #F8F9FA;
  border-radius: 15px;
}
.required{
    color:red;
  }
  </style>
  