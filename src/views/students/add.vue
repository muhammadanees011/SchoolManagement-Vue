<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="card my-4">
          <!-- <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="d-flex justify-content-between bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
              <h6 class="text-white text-capitalize ps-3">Add Student</h6>
              <router-link :to="{ name: 'list-students' }">
                <button style="font-size: 12px" class="me-3 bg-gradient-white shadow-white text-dark fw-5 border-0 p-2 border-radius-lg"> Back </button>
              </router-link>
            </div>
          </div> -->
          <div class="d-flex justify-content-between  border-radius-lg pt-4 pb-1">
            <h6 class="text-dark text-capitalize ps-3">Add Student</h6>
            <router-link :to="{ name: 'list-students' }">
              <button style="font-size: 12px; background-color: #573078;" class="btn me-3 text-white fw-5 border-0 py-2 px-4  border-radius-lg"> Back </button>
            </router-link>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0">
              <div class="row py-1 d-flex justify-content-center bg-white form-data border-radius-lg">
                <!-- <div v-if="isError" class="mb-3 change-pass-alert">
                  <small v-for="(item,index) in validationErrors" :key="index" class="pass-text">{{ item }}<br></small>
                </div> -->
                <div class="bg-white box-shadow-dark border-radius-lg col-xl-10 col-lg-10 col-md-10">
                  <div class="form-bg container p-4">
                  <p class="text-dark ms-4 font-weight-bold">Personal Information</p>
                  <div class="card card-plain">
                    <div class="card-body">
                      <form role="form">
                        <div class="mb-1">
                          <label class="input-label" for="name">First Name</label>
                          <input class="input-box" id="name" v-model="newStudent.first_name" type="text" placeholder="First Name" name="first_name" />
                          <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["first_name"]!==""'>First Name is required</small>
                        </div>
                        <div class="mb-1">
                          <label class="input-label" for="name">Last Name</label>
                          <input class="input-box" id="name" v-model="newStudent.last_name" type="text" placeholder="Last Name" name="last_name" />
                          <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["last_name"]!==""'>Last Name is required</small>
                        </div>
                        <div class="mb-1">
                          <label class="input-label" for="student_id">Student ID</label>
                          <input class="input-box" id="student_id" v-model="newStudent.student_id" type="text" placeholder="ID" name="student_id" />
                          <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["student_id"]!==""'>Student ID is required</small>
                        </div>
                        <div class="mb-1">
                          <label class="input-label" for="email">Email</label>
                          <input class="input-box" id="name" v-model="newStudent.email" type="email" placeholder="email" name="email" />
                          <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["email"]!==""'>Email is required</small>
                        </div>
                        <div class="mb-1">
                          <label class="input-label" for="phone">Phone</label>
                          <input class="input-box" id="name" v-model="newStudent.phone" type="tel" placeholder="Phone" name="phone" />
                        </div>
                        <div class="mb-1">
                          <label class="input-label" for="date_of_birth">Date Of Birth</label>
                          <input class="input-box" id="date_of_birth" v-model="newStudent.date_of_birth" type="date" placeholder="date of birth" name="date_of_birth" />
                          <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["date_of_birth"]!==""'>date of birth is required</small>
                        </div>
                        <div class="mb-1">
                          <label class="input-label" for="phone">School</label>
                          <br />
                          <select class="select-box" v-model="newStudent.school_id" id="school" type="select" placeholder="school" name="school">
                            <option v-for="(item, index) in allSchools" :key="index" :value="item.id">
                              {{ item.title }}
                            </option>
                          </select>
                          <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["school_id"]!==""'>School ID is required</small>
                        </div>
                        <div class="mb-1">
                          <label class="input-label" for="phone">Free School Meal (FSM)</label>
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
                          <select class="select-box" v-model="newStudent.attribute_id" id="attribute" type="select" placeholder="Attribute" name="attribute">
                            <option v-for="(item, index) in allAttributes" :key="index" :value="item.id">
                              {{ item.name }}
                            </option>
                          </select>
                        </div>
                        <MultiSelect
                          label="Attributes"
                          :options="allAttributes"
                          @input="handleAttributes"
                          placeholder="Attributes"
                        />
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
                            <select v-model="newStudent.country" class="select-box" id="country" type="select" placeholder="country" name="country">
                              <option v-for="(item, index) in availableCountries" :key="index" :value="item">
                                {{ item }}
                              </option>
                            </select>
                            <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["country"]!==""'>Country is required</small>
                          </div>
                        <div class="mb-1">
                          <label class="input-label" for="city">City</label>
                          <input class="input-box" id="name" v-model="newStudent.city" type="text" placeholder="City" name="city" />
                          <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["city"]!==""'>City is required</small>
                        </div>
                        <div class="mb-1">
                          <label class="input-label" for="phone">Postcode/Zip</label>
                          <input class="input-box" id="name" v-model="newStudent.zip" type="text" placeholder="Zip Code" name="zip" />
                          <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["zip"]!==""'>zip is required</small>
                        </div>
                        <div class="mb-1">
                          <label class="input-label" for="address">Address</label>
                          <input class="input-box" id="name" v-model="newStudent.address" type="text" placeholder="Address" name="address" />
                          <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["address"]!==""'>address is required</small>
                        </div>
                        <div class="mb-1">
                          <label class="input-label" for="stage">Stage</label>
                          <input class="input-box" id="stage" v-model="newStudent.stage" type="text" placeholder="Stage" name="stage" />
                          <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["stage"]!==""'>stage is required</small>
                        </div>
                        <div class="mb-1">
                          <label class="input-label" for="status">Status</label>
                          <br />
                          <select v-model="newStudent.status" class="select-box" id="status" type="select" placeholder="status" name="status">
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
                <div class="mt-3 bg-white box-shadow-dark border-radius-lg col-xl-10 col-lg-10 col-md-10">
                  <div class="form-bg container p-4">
                  <p class="text-dark ms-4 font-weight-bold">Contact Information</p>
                  <div class="card card-plain">
                    <div class="card-body">
                      <form role="form">
                        <div class="mb-1">
                          <label class="input-label" for="emergency_contact_name">Emergency Contact Name</label>
                          <input class="input-box" id="emergency_contact_name" v-model="newStudent.emergency_contact_name" type="text" placeholder="emergency contact name" name="emergency_contact_name" />
                          <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["emergency_contact_name"]!==""'>emergency contact name is required</small>
                        </div>
                        <div class="mb-1">
                          <label class="input-label" for="emergency_contact_phone">Emergency Contact Number</label>
                          <input class="input-box" id="emergency_contact_phone" v-model="newStudent.emergency_contact_phone" type="text" placeholder="emergency contact number" name="emergency_contact_phone" />
                          <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["emergency_contact_phone"]!==""'>emergency contact phone is required</small>
                        </div>
                        <div class="mb-1">
                        <label class="input-label" for="phone">Password</label>
                        <input class="input-box" id="name" v-model="newStudent.password" type="password" placeholder="Password" name="password" />
                        <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["password"]!==""'>password is required</small>
                      </div>
                      <div class="mb-1">
                        <label class="input-label" for="phone">Confirm Password</label>
                        <input class="input-box" id="name" v-model="newStudent.password_confirmation" type="password" placeholder="Confirm Password" name="password_confirmation" />
                        <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["password_confirmation"]!==""'>confirm password is required</small>
                      </div>
                        <div class="mb-1">
                          <label class="input-label" for="allergies">Allergies</label>
                          <input class="input-box" id="allergies" v-model="newStudent.allergies" type="text" placeholder="Allergies" name="allergies" />
                          <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["allergies"]!==""'>allergies is required</small>
                        </div>
                        <div class="mb-1">
                          <label class="input-label" for="medical_conditions">Medical Conditions</label>
                          <input class="input-box" id="medical_conditions" v-model="newStudent.medical_conditions" type="text" placeholder="Medical Conditions" name="medical_conditions" />
                          <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["medical_conditions"]!==""'>medical conditions is required</small>
                        </div>
                        <div class="mb-1">
                          <label class="input-label" for="enrollment_date">Enrollment Date</label>
                          <input class="input-box" id="enrollment_date" v-model="newStudent.enrollment_date" type="date" placeholder="Enrollment Date" name="enrollment_date" />
                          <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["enrollment_date"]!==""'>enrollment date is required</small>
                        </div>
                      </form>
                    </div>
                  </div>
                  </div>
                </div>
                <div class="d-flex justify-content-center bg-white box-shadow-dark border-radius-lg col-xl-10 col-lg-10 col-md-10">
                    <div class="">
                      <button @click="saveNewStudent" style="font-size: 12px; background-color: #573078;" class="btn mt-3 ms-5 text-white fw-5 border-0 py-2 px-5  border-radius-lg"> Save Student </button>
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
  this.getSchools();
  this.getAllAttributes();
},
  data() {
    return {
      selected: null,
      fsm:[false,true],
      allAttributes:'',
      availableCountries:['UK','USA','Canada'],
      user:'',
      isError:false,
      formValidation:"",
      validationErrors:'',
      multiValue:'',
        newStudent: {
        school_id:'',
        student_id:'',
        attribute_id:'',
        attributes:[],
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
        date_of_birth:'',
        stage:'',
        emergency_contact_name:'',
        emergency_contact_phone:'',
        medical_conditions:'',
        enrollment_date:'',
        allergies:'',
        status:'',
        fsm:'',
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
      let status=false
      let validate=''
      validate=cloneDeep(this.newStudent)
      for(let item in this.newStudent){
        if ((this.newStudent[item] === '' || this.newStudent[item] === undefined) && (item !== "phone" && item !== "attribute_id")) {
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
        let response=await axiosClient.post('/createStudent', this.newStudent)
        this.isError=false;
        response=response.data;
        this.createCustomer(response.user.id);
        this.$router.push({ name: 'list-students' })
        this.snackbarMsg('Student Saved Successfuly')
      } catch (error) {
        this.isError=true;
        this.validationErrors=error.response.data.errors
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
    },
    //-----------CREATE STRIPE CUSTOMER----------
    async createCustomer(id){
      let name=this.newStudent.first_name+' '+this.newStudent.last_name;
      let data={
        'user_id':id,
        'name':name,
        'email':this.newStudent.email
      }
      try {
        await axiosClient.post('/createCustomer',data)
      } catch (error) {
        console.log(error)
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
