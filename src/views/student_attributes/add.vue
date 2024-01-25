<template>
    <div class="container-fluid py-4">
      <div class="row">
        <div class="col-12">
          <div class="card my-4">
            <div class="d-flex justify-content-between  border-radius-lg pt-4 pb-1">
              <h6 class="text-dark text-capitalize ps-3">Add Attribute</h6>
              <router-link :to="{ name: 'list-attributes' }">
                <button style="font-size: 12px; background-color: #573078;" class="btn me-3 text-white fw-5 border-0 py-2 px-4  border-radius-lg"> Back </button>
              </router-link>
            </div>
            <div class="card-body px-0 pb-2">
              <div class="table-responsive p-0">
                <div class="row py-1 d-flex justify-content-center bg-white form-data border-radius-lg">
                  <div class="bg-white box-shadow-dark border-radius-lg col-xl-10 col-lg-10 col-md-10">
                    <div class="form-bg container p-4">
                    <div class="card card-plain">
                      <div class="card-body">
                        <form role="form">
                          <div class="mb-1">
                            <label class="input-label" for="name">Name</label>
                            <input class="input-box" id="name" v-model="newAttribute.name" type="text" placeholder="Name" name="name" />
                            <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["name"]!==""'>Name is required</small>
                          </div>
                          <!-- <div class="mb-1">
                            <label class="input-label" for="phone">Organization</label>
                            <br />
                            <select class="select-box" v-model="newAttribute.organization_id" id="organization" type="select" placeholder="organization" name="organization">
                              <option v-for="(item, index) in allOrganizations" :key="index" :value="item.id">
                                {{ item.name }}
                              </option>
                            </select>
                            <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["organization_id"]!==""'>Organization is required</small>
                          </div> -->
                        </form>
                      </div>
                    </div>
                    </div>
                  </div>
                  <div class="d-flex justify-content-center bg-white box-shadow-dark border-radius-lg col-xl-10 col-lg-10 col-md-10">
                      <div class="">
                        <button @click="saveNewAttribute" style="font-size: 12px; background-color: #573078;" class="btn mt-3 ms-5 text-white fw-5 border-0 py-2 px-5  border-radius-lg"> Save Attribute </button>
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
    this.getAllOrganizations();
    },
    updated(){
      if(!this.userPermissions.create){
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
        availableCountries:['UK','USA','Canada'],
        user:'',
        isError:false,
        formValidation:"",
        validationErrors:'',
        allOrganizations:'',
        newAttribute: {
          // organization_id:'',
          name: '',
          user_role:'',
        },
        availableStatus:['active','pending','blocked'],
      }
    },
    methods:{
    //----------TOASTS--------------
    snackbarMsg(message) {
    this.$snackbar.add({
        type: 'success',
        text: message,
        background: 'white',
    })
    },
    //------------VALIDATE FORM-------------
    validateForm(){
    if(!this.userPermissions.create){
      this.$router.go(-1);
      return;
    }
    let status=false
    let validate=''
    validate=cloneDeep(this.newAttribute)
    for(let item in this.newAttribute){
        if((this.newAttribute[item] === '' || this.newAttribute[item] === undefined) && (item!=='user_role')){
        validate[item]="is required"
        status=true
        }else{
        validate[item]=''
        }
    }
    this.formValidation=validate
    return status;
    },
    //------------GET USER----------------
    getUser(){
        let user=localStorage.getItem('user')
        user= JSON.parse(user)
        this.user=user
    },
    //------------SAVE Attribute------------
    async saveNewAttribute() {
    if(this.validateForm()){
        return;
    }
    this.newAttribute.user_role=this.user.role
    try {
        await axiosClient.post('/createAttribute', this.newAttribute)
        this.isError=false;
        this.$router.push({ name: 'list-attributes' })
        this.snackbarMsg('Attribute Saved Successfuly')
    } catch (error) {
        this.isError=true;
        this.validationErrors=error.response.data.errors
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
    }

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
  