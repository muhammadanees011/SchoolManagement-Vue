<template>
    <div class="container-fluid py-4">
      <div class="row">
        <div class="col-12">
          <div class="card my-4">
            <div class="d-flex justify-content-between border-radius-lg pt-4">
                <h6 class="text-dark text-capitalize ps-3">Edit Parent</h6>
              </div>
            <div class="card-body px-0 pb-2">
              <div class="table-responsive p-0">
                <div class="row d-flex justify-content-center bg-white form-data border-radius-lg">
                  <div class="mt-3 bg-white box-shadow-dark border-radius-lg col-xl-10 col-lg-10 col-md-10">
                    <div class="form-bg container p-4">
                    <p class="text-dark ms-4 font-weight-bold">Personal Information</p>
                    <div class="card card-plain">
                      <div class="card-body">
                        <form role="form">
                          <div class="mb-1">
                            <label class="input-label" for="name">First Name</label>
                            <input class="input-box" id="name" v-model="newParent.first_name" type="text" placeholder="First Name" name="first_name" />
                            <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["first_name"]!==""'>First Name is required</small>
                          </div>
                          <div class="mb-1">
                            <label class="input-label" for="name">Last Name</label>
                            <input class="input-box" id="name" v-model="newParent.last_name" type="text" placeholder="Last Name" name="last_name" />
                            <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["last_name"]!==""'>Last Name is required</small>
                          </div>
                          <div class="mb-1">
                            <label class="input-label" for="email">Email</label>
                            <input class="input-box" id="name" v-model="newParent.email" type="email" placeholder="email" name="email" />
                            <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["email"]!==""'>Email is required</small>
                          </div>
                          <div class="mb-1">
                            <label class="input-label" for="phone">Phone</label>
                            <input class="input-box" id="name" v-model="newParent.phone" type="tel" placeholder="Phone" name="phone" />
                          </div>
                          <div class="mb-1">
                            <label class="input-label" for="address">Address</label>
                            <input class="input-box" id="name" v-model="newParent.address" type="text" placeholder="Address" name="address" />
                            <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["address"]!==""'>Address is required</small>
                          </div>
                          <div class="mb-1">
                            <label class="input-label" for="phone">Student</label>
                            <br />
                            <select class="select-box" v-model="newParent.student_id" id="student" type="select" placeholder="student" name="student">
                              <option v-for="(item, index) in allStudents" :key="index" :value="item.id">
                                {{ item.user.first_name }} {{ item.user.last_name }}
                              </option>
                            </select>
                            <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["student_id"]!==""'>Student is required</small>
                          </div>
                        </form>
                      </div>
                    </div>
                    </div>
                  </div>
                  <div class="mt-3 bg-white box-shadow-dark border-radius-lg col-xl-10 col-lg-10 col-md-10">
                    <div class="form-bg container p-4">
                    <p class="text-dark ms-4 font-weight-bold">Account Information</p>
                    <div class="card card-plain">
                      <div class="card-body">
                        <form role="form"> 
                          <div class="mb-1">
                            <label class="input-label" for="status">Country</label>
                            <br />
                            <select v-model="newParent.country" class="select-box" id="country" type="select" placeholder="country" name="country">
                              <option v-for="(item, index) in availableCountries" :key="index" :value="item">
                                {{ item }}
                              </option>
                            </select>
                            <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["country"]!==""'>Country is required</small>
                          </div>
                          <div class="mb-1">
                            <label class="input-label" for="city">City</label>
                            <input class="input-box" id="name" v-model="newParent.city" type="text" placeholder="City" name="city" />
                            <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["city"]!==""'>City is required</small>
                          </div>
                          <div class="mb-1">
                            <label class="input-label" for="phone">Postcode/Zip</label>
                            <input class="input-box" id="name" v-model="newParent.zip" type="text" placeholder="Zip Code" name="zip" />
                            <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["zip"]!==""'>Zip is required</small>
                          </div>
                          <div class="mb-1">
                            <label class="input-label" for="status">Status</label>
                            <br />
                            <select v-model="newParent.status" class="select-box" id="status" type="select" placeholder="status" name="status">
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
                            <input class="input-box" id="name" v-model="newParent.password" type="password" placeholder="Password" name="zip" />
                          </div>
                          <div class="mb-1">
                            <label class="input-label" for="address">Confirm Password</label>
                            <input class="input-box" id="name" v-model="newParent.password_confirmation" type="password" placeholder="Confirm Password" name="address" />
                          </div>
                        </form>
                      </div>
                    </div>
                    </div>
                  </div>
                  <div class="d-flex justify-content-center bg-white box-shadow-dark border-radius-lg col-xl-10 col-lg-10 col-md-10">
                    <div class="">
                        <button @click="updateParent" style="font-size: 12px; background-color: #573078;" class="btn mt-3 ms-3 text-white fw-5 border-0 py-2 px-5  border-radius-lg"> Update Student </button>
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
    this.editParent();
    this.getStudents();
  },
  updated(){
    if(!this.userPermissions.edit){
      this.$router.go(-1);
      return;
    }
  },
  computed: {
      userPermissions() {
        return this.$permissions.userPermissions.value;
      },
    },
    data() {
      return {
        user:'',
        availableCountries:['UK','USA','Canada'],
        newParent: {
          student_id:'',
          first_name: '',
          last_name:'',
          email: '',
          phone: '',
          country: '',
          city: '',
          zip: '',
          address: '',
          password: '',
          password_confirmation: '',
          status:'',
        },
        validationErrors:"",
        formValidation:"",
        availableStatus:['active','pending','blocked'],
        allStudents:'',
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
        if(!this.userPermissions.edit){
          this.$router.go(-1);
          return;
        }
        let status=false
        let validate=''
        validate=cloneDeep(this.newParent)
        for(let item in this.newParent){
          if((this.newParent[item] === '' || this.newParent[item] === undefined) && (item !== "phone" &&  item !== "password" && item !== "password_confirmation")){
            validate[item]="is required"
            status=true
          }else{
            validate[item]=''
          }
        }
        this.formValidation=validate
        return status;
      },
      //------------GET USER--------------
      getUser(){
        let user=localStorage.getItem('user')
        user= JSON.parse(user)
        this.user=user
      },
      //------------EDIT PARENT------------
      async editParent() {
        let id = this.$route.params.id
        try {
          const response=await axiosClient.get('/editParent/' + id)
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
        this.newParent.student_id = data.student_id
        this.newParent.first_name = data.user.first_name
        this.newParent.last_name = data.user.last_name
        this.newParent.email = data.user.email
        this.newParent.phone = data.user.phone
        this.newParent.country = data.user.country
        this.newParent.city = data.user.city
        this.newParent.state = data.user.state
        this.newParent.zip = data.user.zip
        this.newParent.address = data.user.address
        this.newParent.status=data.user.status
      }
    },
      //------------UPDATE PARENT------------
      async updateParent() {
        if(this.validateForm()){
          return;
        }
        let id = this.$route.params.id
        try {
          await axiosClient.put('/updateParent/'+id, this.newParent)
          this.$router.push({ name: 'list-parent' })
          this.snackbarMsg('Parent Updated Successfuly')
        } catch (error) {
          console.log(error)
        }
      },
    //------------GET STUDENTS------------
    async getStudents() {
        try {
            let url='/getAllStudents'
            if(this.user.role=='organization_admin'){
            url='/getAllStudents/'+this.user.id
            }
            const response= await axiosClient.get(url)
            this.allStudents=response.data
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
  </style>
  