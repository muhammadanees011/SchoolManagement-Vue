<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="card my-4">
          <div class="d-flex justify-content-between  border-radius-lg pt-4 pb-1">
            <h6 class="text-dark text-capitalize ps-3">Add Student</h6>
            <router-link :to="{ name: 'list-students' }">
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
                          <label class="input-label" for="name">First Name <span class="required">*</span></label>
                          <input class="input-box" id="name" v-model="newStudent.first_name" type="text" placeholder="First Name" name="first_name" />
                          <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["first_name"]!==""'>First Name is required</small>
                        </div>
                        <div class="mb-1">
                          <label class="input-label" for="name">Last Name <span class="required">*</span></label>
                          <input class="input-box" id="name" v-model="newStudent.last_name" type="text" placeholder="Last Name" name="last_name" />
                          <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["last_name"]!==""'>Last Name is required</small>
                        </div>
                        <div class="mb-1">
                          <label class="input-label" for="student_id">Student ID <span class="required">*</span></label>
                          <input class="input-box" id="student_id" v-model="newStudent.student_id" type="text" placeholder="Student ID" name="student_id" />
                          <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["student_id"]!==""'>Student ID is required</small>
                        </div>
                        <div class="mb-1">
                          <label class="input-label" for="mifare_id">MIFARE ID <span class="required">*</span></label>
                          <input class="input-box" id="mifare_id" v-model="newStudent.mifare_id" type="text" placeholder="MIFARE ID" name="mifare_id" />
                          <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["mifare_id"]!==""'>MIFARE ID is required</small>
                        </div>
                        <div class="mb-1">
                          <label class="input-label" for="email">Email <span class="required">*</span></label>
                          <input class="input-box" id="name" v-model="newStudent.email" type="email" placeholder="email" name="email" />
                          <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["email"]!==""'>Email is required</small>
                        </div>
                        <!-- <div class="mb-1">
                          <label class="input-label" for="date_of_birth">Date Of Birth</label>
                          <input class="input-box" id="date_of_birth" v-model="newStudent.date_of_birth" type="date" placeholder="DD/MM/YYYY" name="date_of_birth" />
                        </div> -->
                        <div class="mb-1">
                          <label class="input-label" for="phone">Site <span class="required">*</span></label>
                          <br />
                          <select class="select-box" v-model="newStudent.school_id" id="school" type="select" placeholder="school" name="school">
                            <option v-for="(item, index) in allSchools" :key="index" :value="item.id">
                              {{ item.title }}
                            </option>
                          </select>
                          <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["school_id"]!==""'>School ID is required</small>
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
                        <!-- <div class="mb-1">
                            <label class="input-label" for="balance">Balance</label>
                            <input class="input-box" id="balance" v-model="formattedBalance" type="number" step="0.01" min="0" placeholder="balance" name="balance" />
                        </div> -->
                        <div class="mb-1">
                          <label class="input-label" for="status">Status <span class="required">*</span></label>
                          <br />
                          <select v-model="newStudent.status" class="select-box" id="status" type="select" placeholder="status" name="status">
                            <option v-for="(item, index) in availableStatus" :key="index" :value="item">
                              {{ item }}
                            </option>
                          </select>
                        </div>
                      </form>
                    </div>
                  </div>
                  </div>
                </div>
                <div class="d-flex justify-content-center bg-white box-shadow-dark border-radius-lg col-xl-10 col-lg-10 col-md-10">
                    <div class="">
                      <button @click="saveNewStudent" style="font-size: 12px; background-color: #573078;" class="btn mt-3 ms-5 text-white fw-5 border-0 py-2 px-5  border-radius-lg"> Save Student</button>
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
  },
  mounted() {
    this.getUser();
    this.getSchools();
    this.$globalHelper.buttonColor();
  },
  updated(){
    this.$permissions.redirectIfNotAllowed('create_student');
  },
  computed: {
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
      selected: null,
      fsm:[false,true],
      availableCountries:['UK','USA','Canada'],
      user:'',
      isError:false,
      formValidation:"",
      validationErrors:'',
      multiValue:'',
        newStudent: {
        mifare_id:'',
        school_id:'',
        student_id:'',
        attribute_id:'',
        attributes:[],
        first_name: '',
        last_name:'',
        email: '',
        // password: '',
        // password_confirmation: '',
        // date_of_birth:'',
        status:'',
        fsm:'',
        // balance:'',
      },
      availableStatus:['active','pending','blocked'],
      allSchools:'',
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
      this.$permissions.redirectIfNotAllowed('create_student');
      let status=false
      let validate=''
      validate=cloneDeep(this.newStudent)
      for(let item in this.newStudent){
        if ((this.newStudent[item] === '' || this.newStudent[item] === undefined)
         && (item !== "attribute_id" && item !== "date_of_birth" &&
          item !== "add_amount"
          //  && item !== "password" &&  item !== "password_confirmation"
          )) {
              validate[item]="is required"
              status=true
          }else{
            validate[item]=''
          }
      }
      this.formValidation=validate
      return status;
    },
    handleAttributes(data){
      this.newStudent.attributes=[]
      data.filter((item)=>{
        this.newStudent.attributes.push(item.id);
      })
    },
    //------------GET USER----------------
    getUser(){
      let user=localStorage.getItem('user')
      user= JSON.parse(user)
      this.user=user
    },
    //------------SAVE STUDENT------------
    async saveNewStudent() {
      if(this.validateForm()){
        return;
      }
      try {
        await axiosClient.post('/createStudent', this.newStudent)
        this.isError=false;
        this.$router.push({ name: 'list-students' })
        this.snackbarMsg('Student Saved Successfuly')
        this.isError=false;
      } catch (error) {
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
  }
}
</script>

<style scoped>
.mx-datepicker-popup{
  position: fixed !important;
  z-index: 1000;
}
::v-deep.mx-input{
  border-radius: 10px !important;
}
.mx-datepicker{
  width: 100% !important;
}
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
.required{
    color:red;
  }
</style>
