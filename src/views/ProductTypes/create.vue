<template>
    <div class="container-fluid py-4">
      <div class="row">
        <div class="col-12">
          <div class="card my-4">
            <div class="d-flex justify-content-between  border-radius-lg pt-4 pb-1">
              <h6 class="text-dark text-capitalize ps-3">Add Product Type</h6>
              <router-link :to="{ name: 'product-types' }">
                <button style="font-size: 12px; background-color: #573078;" class="btn me-3 text-white fw-5 border-0 py-2 px-4  border-radius-lg"> Back </button>
              </router-link>
            </div>
            <div class="card-body px-0 pb-2">
                <div v-if="isError" class="mb-3 change-pass-alert">
                  <small v-for="(item,index) in validationErrors" :key="index" class="pass-text">{{ item }}<br></small>
                </div>
              <div class="table-responsive p-0">
                <div class="row py-1 d-flex justify-content-center bg-white form-data border-radius-lg">
                  <div class="bg-white box-shadow-dark border-radius-lg col-xl-10 col-lg-10 col-md-10">
                    <div class="form-bg container p-4">
                    <div class="card card-plain">
                      <div class="card-body">
                        <form role="form">
                          <div class="mb-1">
                            <label class="input-label" for="email">Name</label>
                            <input v-model="newProductType.name" class="input-box" id="name" type="text" required placeholder="Name" name="CourseDescription" />
                          </div>
                        </form>
                      </div>
                    </div>
                    </div>
                  </div>
                  <div class="d-flex justify-content-center bg-white box-shadow-dark border-radius-lg col-xl-10 col-lg-10 col-md-10">
                      <div class="">
                        <button @click="saveNewProductType" style="font-size: 12px; background-color: #573078;" class="btn mt-3 ms-5 text-white fw-5 border-0 py-2 px-5  border-radius-lg"> Save Product Type </button>
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
  import axiosClient from '../../axios'
  import cloneDeep from 'lodash/cloneDeep';
  
  export default {
  name: '',
  components: {
    // MaterialButton,
  },
  mounted() {
    this.getUser();
    this.$globalHelper.buttonColor();
  },
  updated(){
    // this.$permissions.redirectIfNotAllowed('create_course');
  },
  computed: {
      userPermissions() {
        return this.$permissions.userPermissions.value;
      },
    },
    data() {
      return {
        user:'',
        isError:false,
        formValidation:"",
        validationErrors:'',
        newProductType: {
            name:'',
        },
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
        validate=cloneDeep(this.newParent)
        for(let item in this.newParent){
          if((this.newParent[item] === '' || this.newParent[item] === undefined)){
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
      //------------SAVE STUDENT------------
      async saveNewProductType() {
        this.isError=false;
        try {
          await axiosClient.post('/createProductType', this.newProductType)
          this.$router.push({ name: 'product-types' })
          this.snackbarMsg('Product Type Saved Successfuly')
          this.isError=false;
        } catch (error) {
          this.isError=true;
          this.validationErrors=error.response.data.errors
        }
      },

    },
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
  
  .text-area-box:hover {
    border-color: #6c757d; 
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
    border-color: #6c757d;
  }
  .select-box:focus {
    outline: none;
    border-color: #4caf50;
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.5); 
  }
  
  .text-area-box:focus {
    outline: none;
    border-color: #4caf50; 
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.5); 
  }
  .input-label {
    font-size: 12px;
  }
  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 24px;
    box-sizing: border-box;
    width: 100%;
    height: 40px;
    font-size: 12px;
  }
  

  input:hover {
    border-color: #6c757d;
  }
  
  input:focus {
    outline: none;
    border-color: #4caf50;
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.5); 
  }
  
  ::placeholder {
    color: #999;
  }
  
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
  