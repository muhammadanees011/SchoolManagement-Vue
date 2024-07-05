<template>
    <div class="container-fluid py-4">
      <div class="row">
        <div class="col-12">
          <div class="card my-4">
            
            <div class="d-flex justify-content-between border-radius-lg pt-4">
                <h6 class="text-dark text-capitalize ps-3">Edit Student</h6>
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
                            <input class="input-box" id="name" v-model="newStudent.first_name" type="text" placeholder="First Name" name="first_name" />
                            <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["first_name"]!==""'>first name is required</small>
                          </div>
                          <div class="mb-1">
                            <label class="input-label" for="name">Last Name <span class="required">*</span></label>
                            <input class="input-box" id="name" v-model="newStudent.last_name" type="text" placeholder="Last Name" name="last_name" />
                            <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["last_name"]!==""'>last name is required</small>
                          </div>
                          <div class="mb-1">
                            <label class="input-label" for="mifare_id">MIFARE ID <span class="required">*</span></label>
                            <input class="input-box" id="mifare_id" v-model="newStudent.mifare_id" type="text" placeholder="ID" name="student_id" />
                            <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["mifare_id"]!==""'> MIFARE ID is required</small>
                          </div>  
                          <div class="mb-1">
                            <label class="input-label" for="student_id">Student ID <span class="required">*</span></label>
                            <input class="input-box" id="student_id" v-model="newStudent.student_id" type="text" placeholder="ID" name="student_id" />
                            <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["student_id"]!==""'> student ID is required</small>
                          </div>
                          <div class="mb-1">
                            <label class="input-label" for="email">Email <span class="required">*</span></label>
                            <input class="input-box" id="name" v-model="newStudent.email" type="email" placeholder="email" name="email" />
                            <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["email"]!==""'>email is required</small>
                          </div>
                          <div class="mb-1">
                            <label class="input-label" for="phone">School <span class="required">*</span></label>
                            <br />
                            <select class="select-box" v-model="newStudent.school_id" id="school" type="select" placeholder="school" name="school">
                              <option v-for="(item, index) in allSchools" :key="index" :value="item.id">
                                {{ item.title }}
                              </option>
                            </select>
                            <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["school_id"]!==""'>school is required</small>
                          </div>
                        <div class="mb-1">
                          <label class="input-label" for="phone">Free School Meal (FSM) <span class="required">*</span></label>
                          <br />
                          <select class="select-box" v-model="newStudent.fsm" id="fsm" type="select" placeholder="FSM" name="fsm">
                            <option v-for="(item, index) in fsm" :key="index" :value="item">
                              {{ item }}
                            </option>
                          </select>
                          <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["school_id"]!==""'>School ID is required</small>
                        </div>
                        <div class="mb-1">
                          <label class="input-label" for="phone">Attribute</label>
                          <br />
                          <MultiSelect
                            label="Attributes"
                            :value="selectedAttrs"
                            :options="allAttributes"
                            @input="handleAttributes"
                            placeholder="Attributes"
                          />
                        </div>
                        <div class="mb-1">
                            <label class="input-label" for="balance">Balance</label>
                            <input class="input-box" id="balance" v-model="formattedBalance" type="number" step="0.01" min="0" placeholder="balance" name="balance" />
                        </div>
                        <div class="mb-1">
                            <label class="input-label" for="balance">Add Amount</label>
                            <input class="input-box" id="balance" v-model="formattedAmount" type="number" step="0.01" min="0" placeholder="add amount" name="add_amount" />
                        </div>
                        <div class="mb-1">
                            <label class="input-label" for="date_of_birth">Date Of Birth</label>
                            <input class="input-box" id="date_of_birth" v-model="newStudent.date_of_birth" type="date" placeholder="date of birth" name="date_of_birth" />
                            <!-- <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["date_of_birth"]!==""'> date of birth is required</small> -->
                          </div>
                        </form>
                      </div>
                    </div>
                    </div>
                  </div>
                  <div class="mt-3 bg-white box-shadow-dark border-radius-lg col-xl-10 col-lg-10 col-md-10">
                    <div class="form-bg container p-4">
                    <p class="text-dark ms-4 font-weight-bold">Password</p>
                    <div class="card card-plain">
                      <div class="card-body">
                        <form role="form">
                          <div class="mb-1">
                            <label class="input-label" for="status">Status <span class="required">*</span></label>
                            <br />
                            <select v-model="newStudent.status" class="select-box" id="status" type="select" placeholder="status" name="status">
                              <option v-for="(item, index) in availableStatus" :key="index" :value="item">
                                {{ item }}
                              </option>
                            </select>
                            <!-- <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["status"]!==""'>status is required</small> -->
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
                            <input class="input-box" id="name" v-model="newStudent.password" type="password" placeholder="Password" name="zip" />
                          </div>
                          <div class="mb-1">
                            <label class="input-label" for="address">Confirm Password</label>
                            <input class="input-box" id="name" v-model="newStudent.password_confirmation" type="password" placeholder="Confirm Password" name="address" />
                          </div>
                        </form>
                      </div>
                    </div>
                    </div>
                  </div>
                  <div class="d-flex justify-content-center bg-white box-shadow-dark border-radius-lg col-xl-10 col-lg-10 col-md-10">
                      <div class="">
                        <button @click="updateStudent" style="font-size: 12px; background-color: #573078;" class="btn mt-3 ms-3 text-white fw-5 border-0 py-2 px-5  border-radius-lg"> Update Student </button>
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
  import MultiSelect from "../components/MultiSelect.vue"

  export default {
    name: '',
    components: {
      MultiSelect
      // MaterialButton,
    },
    mounted() {
      this.getUser();
      this.editStudent();
      this.getSchools();
      this.getAllAttributes();
    },
    updated(){
      this.$permissions.redirectIfNotAllowed('edit_student');
    },
    computed: {
      formattedAmount: {
        get() {
          return parseFloat(this.newStudent.add_amount).toFixed(2);
        },
        set(value) {
          const formattedValue = parseFloat(value).toFixed(2);
          this.newStudent.add_amount = formattedValue;
        },
      },
      formattedBalance: {
        get() {
          return this.newStudent.balance;
        },
        set(value) {
          const formattedValue = parseFloat(value).toFixed(2);
          this.newStudent.balance = formattedValue;
        },
      },
    },
    data() {
      return {
        allAttributes:'',
        availableCountries:['UK','USA','Canada'],
        user:'',
        formValidation:"",
        isError:false,
        validationErrors:'',
        fsm:[false,true],
        selectedAttrs:[],
        newStudent: {
          school_id:'',
          student_id:'',
          add_amount:'',
          mifare_id:'',
          attribute_id:'',
          attributes:[],
          first_name: '',
          last_name:'',
          email: '',
          date_of_birth:'',
          status:'',
          password:'',
          password_confirmation:'',
          fsm:'',
          balance:'',
        },
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
        this.$permissions.redirectIfNotAllowed('edit_student');
        let status=false
        let validate=''
        validate=cloneDeep(this.newStudent)
        for(let item in this.newStudent){
          if ((this.newStudent[item] === '' || this.newStudent[item] === null) && 
          (item !== "attribute_id" && item !== "date_of_birth" && item !== "add_amount" 
          && item !== "password" &&  item !== "password_confirmation")) {
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
      //------------EDIT SCHOOL------------
      async editStudent() {
        let id = this.$route.params.id
        try {
          const response=await axiosClient.get('/editStudent/' + id)
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
        this.newStudent.school_id = data.school_id
        this.newStudent.student_id = data.student_id
        this.newStudent.mifare_id = data.mifare_id
        this.newStudent.first_name = data.user.first_name
        this.newStudent.last_name = data.user.last_name
        this.newStudent.email = data.user.email
        this.newStudent.date_of_birth= data.dob
        this.newStudent.status=data.user.status
        this.newStudent.fsm = data.fsm_activated==0 ? false:true
        this.newStudent.attribute_id = data.attribute_id
        this.newStudent.balance =this.formattedPrice(data.balance);
        this.newStudent.attributes =data.attributes;
      }
    },
    formattedPrice(value){
        const formattedValue = parseFloat(value).toFixed(2);
        return formattedValue;
      },
      //------------UPDATE STUDENT------------
      async updateStudent() {
        if(this.validateForm()){
          return;
        }
        let id = this.$route.params.id
        try {
          await axiosClient.put('/updateStudent/'+id, this.newStudent)
          this.$router.push({ name: 'list-students' })
          this.snackbarMsg('Student Saved Successfuly')
        } catch (error) {
          console.log(error)
          this.isError=true;
          this.validationErrors=error.response.data.errors
        }
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
    //-------------GET ALL Attributes----------
    async getAllAttributes(){
      try {
        const response= await axiosClient.get('/getAllAttributes')
        this.allAttributes=response.data
      } catch (error) {
        console.log(error)
      }
      this.allAttributes.map((item)=>{
        if(this.newStudent.attributes.includes(item.id)){
          this.selectedAttrs.push(item)
        }
      })
    },
    //-------------STORE ALL Attributes----------
    handleAttributes(data){
        this.newStudent.attributes=[]
        data.filter((item)=>{
          this.newStudent.attributes.push(item.id);
        })
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
  