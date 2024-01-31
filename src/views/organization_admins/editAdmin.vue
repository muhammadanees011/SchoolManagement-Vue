<template>
    <div class="container-fluid py-4">
      <div class="row">
        <div class="col-12">
          <div class="card my-4">
            <div class="d-flex justify-content-between  border-radius-lg pt-4 pb-1">
              <h6 class="text-dark text-capitalize ps-3">Edit Admin</h6>
              <router-link :to="{ name: 'list-organization-admins' }">
                <button style="font-size: 12px; background-color: #573078;" class="btn me-3 text-white fw-5 border-0 py-2 px-4  border-radius-lg"> Back </button>
              </router-link>
            </div>
            <div class="card-body px-0 pb-2">
              <div class="table-responsive p-0">
                <div class="row py-1 d-flex justify-content-center bg-white form-data border-radius-lg">
                  <div v-if="isError" class="mb-3 change-pass-alert">
                    <small v-for="(item,index) in validationErrors" :key="index" class="pass-text">{{ item }}<br></small>
                  </div>
                  <div class="bg-white box-shadow-dark border-radius-lg col-xl-10 col-lg-10 col-md-10">
                    <div class="form-bg container p-4">
                    <p class="text-dark ms-4 font-weight-bold">Personal Information</p>
                    <div class="card card-plain">
                      <div class="card-body">
                        <form role="form">
                          <div class="mb-1">
                            <label class="input-label" for="name">First Name</label>
                            <input class="input-box" id="name" v-model="newAdmin.first_name" type="text" placeholder="First Name" name="first_name" />
                            <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["first_name"]!==""'>First Name is required</small>
                          </div>
                          <div class="mb-1">
                            <label class="input-label" for="name">Last Name</label>
                            <input class="input-box" id="name" v-model="newAdmin.last_name" type="text" placeholder="Last Name" name="last_name" />
                            <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["last_name"]!==""'>Last Name is required</small>
                          </div>
                          <div class="mb-1">
                            <label class="input-label" for="email">Email</label>
                            <input class="input-box" id="name" v-model="newAdmin.email" type="email" placeholder="email" name="email" />
                            <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["email"]!==""'>Email is required</small>
                          </div>
                          <div class="mb-1">
                            <label class="input-label" for="phone">Phone</label>
                            <input class="input-box" id="name" v-model="newAdmin.phone" type="tel" placeholder="Phone" name="phone" />
                          </div>
                          <div class="mb-1">
                            <label class="input-label" for="phone">Organization</label>
                            <br />
                            <select class="select-box" v-model="newAdmin.organization_id" id="school" type="select" placeholder="school" name="school">
                              <option v-for="(item, index) in allOrganizations" :key="index" :value="item.id">
                                {{ item.name }}
                              </option>
                            </select>
                            <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["organization_id"]!==""'>Organization is required</small>
                          </div>
                          <div class="mb-1">
                            <label class="input-label" for="phone">Role</label>
                            <br />
                            <select class="select-box" v-model="newAdmin.role" id="role" type="select" placeholder="role" name="role">
                              <template v-for="(item, index) in allRoles" :key="index" >
                                <option v-if="item.name=='Admin' || item.name=='Associate Admin'" :value="item.name">
                                  {{ item.name }}
                                </option>
                              </template>
                            </select>
                            <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["role"]!==""'>Admin Role is required</small>
                          </div>
                        </form>
                      </div>
                    </div>
                    </div>
                  </div>
                  <div class="mt-3 bg-white box-shadow-dark border-radius-lg  col-xl-10 col-lg-10 col-md-10">
                    <div class="form-bg container p-4">
                    <p class="text-dark ms-4 font-weight-bold">Account Information</p>
                    <div class="card card-plain">
                      <div class="card-body">
                        <form role="form"> 
                          <div class="mb-1">
                            <label class="input-label" for="status">Country</label>
                            <br />
                            <select v-model="newAdmin.country" class="select-box" id="country" type="select" placeholder="country" name="country">
                              <option v-for="(item, index) in availableCountries" :key="index" :value="item">
                                {{ item }}
                              </option>
                            </select>
                            <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["country"]!==""'>Country is required</small>
                          </div>
                          <!-- <div class="mb-1">
                            <label class="input-label" for="last_name">Country</label>
                            <input class="input-box" id="name" type="text" v-model="newAdmin.country" placeholder="Country" name="country" />
                            <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["country"]!==""'>Country is required</small>
                          </div> -->
                          <div class="mb-1">
                            <label class="input-label" for="city">City</label>
                            <input class="input-box" id="name" v-model="newAdmin.city" type="text" placeholder="City" name="city" />
                            <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["city"]!==""'>City is required</small>
                          </div>
                          <div class="mb-1">
                            <label class="input-label" for="phone">Postcode/Zip</label>
                            <input class="input-box" id="name" v-model="newAdmin.zip" type="text" placeholder="Zip Code" name="zip" />
                            <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["zip"]!==""'>zip is required</small>
                          </div>
                          <div class="mb-1">
                            <label class="input-label" for="address">Address</label>
                            <input class="input-box" id="name" v-model="newAdmin.address" type="text" placeholder="Address" name="address" />
                            <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["address"]!==""'>address is required</small>
                          </div>
                          <div class="mb-1">
                            <label class="input-label" for="status">Status</label>
                            <br />
                            <select v-model="newAdmin.status" class="select-box" id="status" type="select" placeholder="status" name="status">
                              <option v-for="(item, index) in availableStatus" :key="index" :value="item">
                                {{ item }}
                              </option>
                            </select>
                            <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["status"]!==""'>status is required</small>
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
                            <input class="input-box" id="name" v-model="newAdmin.password" type="password" placeholder="Password" name="zip" />
                          </div>
                          <div class="mb-1">
                            <label class="input-label" for="address">Confirm Password</label>
                            <input class="input-box" id="name" v-model="newAdmin.password_confirmation" type="password" placeholder="Confirm Password" name="address" />
                          </div>
                        </form>
                      </div>
                    </div>
                    </div>
                  </div>
                  <div class="d-flex justify-content-center bg-white box-shadow-dark border-radius-lg col-xl-10 col-lg-10 col-md-10">
                      <div class="">
                        <button @click="updateAdmin" style="font-size: 12px; background-color: #573078;" class="btn mt-3 ms-5 text-white fw-5 border-0 py-2 px-5  border-radius-lg"> Save Admin </button>
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
      this.getAllRoles();
     this.getAllOrganizations();
     this.editOrganizationAdmin();
    },
    updated(){
      this.$permissions.redirectIfNotAllowed('edit_admin');
    },
    data() {
      return {
        allRoles:'',
        availableCountries:['UK','USA','Canada'],
        isError:false,
        formValidation:"",
        validationErrors:'',
        newAdmin: {
          organization_id:'',
          first_name: '',
          last_name:'',
          email: '',
          phone: '',
          country: '',
          city: '',
          zip: '',
          address: '',
          status:'',
          role:'',
          password:'',
          password_confirmation:'',
        },
        availableStatus:['active','pending','blocked'],
        allOrganizations:'',
      }
    },
    methods:{
      //----------TOASTS---------------------
      snackbarMsg(message) {
        this.$snackbar.add({
          type: 'success',
          text: message,
          background: 'white',
        })
      },
      //------------VALIDATE FORM-------------
      validateForm(){
        this.$permissions.redirectIfNotAllowed('edit_admin');
        let status=false
        let validate=''
        validate=cloneDeep(this.newAdmin)
        for(let item in this.newAdmin){
          if ((this.newAdmin[item] === '' || this.newAdmin[item] === undefined) && (item !== "phone" && item !== "password" && item !== "password_confirmation")) {
              validate[item]="is required"
              status=true
          }else{
            validate[item]=''
          }
        }
        this.formValidation=validate
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
      //------------EDIT ADMIN------------
      async editOrganizationAdmin() {
        let id = this.$route.params.id
        try {
          const response=await axiosClient.get('/editOrganizationAdmin/' + id)
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
        this.newAdmin.organization_id = data.organization_admin.organization_id
        this.newAdmin.first_name = data.first_name
        this.newAdmin.last_name = data.last_name
        this.newAdmin.email = data.email
        this.newAdmin.phone = data.phone
        this.newAdmin.country = data.country
        this.newAdmin.city = data.city
        this.newAdmin.state = data.state
        this.newAdmin.zip = data.zip
        this.newAdmin.address = data.address
        this.newAdmin.status=data.status
        this.newAdmin.role=data.user_role.role.name
      }
    },
      //------------SAVE ADMIN------------
      async updateAdmin() {
        if(this.validateForm()){
          console.log(this.formValidation)
          return;
        }
        try {
          let id = this.$route.params.id
          await axiosClient.put('/updateOrganizationAdmin/'+id, this.newAdmin)
          this.isError=false;
          this.$router.push({ name: 'list-organization-admins' })
          this.snackbarMsg('Admin Updated Successfuly')
        } catch (error) {
          this.isError=true;
          this.validationErrors=error.response.data.errors
        }
      },
      //-----------CREATE STRIPE CUSTOMER----------
      async createCustomer(id){
        let name=this.newAdmin.first_name+' '+this.newAdmin.last_name;
        let data={
          'user_id':id,
          'name':name,
          'email':this.newAdmin.email
        }
        try {
          await axiosClient.post('/createCustomer',data)
        } catch (error) {
          console.log(error)
        }
      },
      //------------GET ORGANIZATIONS------------
      async getAllOrganizations() {
        try {
          const response= await axiosClient.get('/getAllOrganizations')
          this.allOrganizations=response.data
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
  .change-pass-alert{
    width: 80%;
    height: auto;
    background: rgba(238, 220, 130, 0.5);
    border: 1px solid black;
    border-radius: 6px;
    padding-bottom: 5px;
  }
  .pass-text{
    color: black;
    margin-left: 10px;
    font-size: 10px;
  }
  .click-link{
    color: blueviolet;
    text-decoration-line: underline;
    cursor: pointer;
  }
  .error-txt{
    font-size: 11px;
  }
  </style>
  