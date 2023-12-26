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
                <div class="row py-2 bg-white form-data border-radius-lg">
                  <div class="bg-white box-shadow-dark border-radius-lg col-xl-4 col-lg-4 col-md-4">
                    <div class="card card-plain">
                      <div class="card-body">
                        <form role="form">
                          <div class="mb-1">
                            <label class="input-label" for="name">First Name</label>
                            <input class="input-box" id="name" v-model="newStudent.first_name" type="text" placeholder="First Name" name="first_name" />
                          </div>
                          <div class="mb-1">
                            <label class="input-label" for="name">Last Name</label>
                            <input class="input-box" id="name" v-model="newStudent.last_name" type="text" placeholder="Last Name" name="last_name" />
                          </div>
                          <div class="mb-1">
                            <label class="input-label" for="student_id">Student ID</label>
                            <input class="input-box" id="student_id" v-model="newStudent.student_id" type="number" placeholder="ID" name="student_id" />
                          </div>
                          <div class="mb-1">
                            <label class="input-label" for="email">Email</label>
                            <input class="input-box" id="name" v-model="newStudent.email" type="email" placeholder="email" name="email" />
                          </div>
                          <div class="mb-1">
                            <label class="input-label" for="phone">Phone</label>
                            <input class="input-box" id="name" v-model="newStudent.phone" type="tel" placeholder="Phone" name="phone" />
                          </div>
                          <div class="mb-1">
                            <label class="input-label" for="address">Address</label>
                            <input class="input-box" id="name" v-model="newStudent.address" type="text" placeholder="Address" name="address" />
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div class="bg-white box-shadow-dark border-radius-lg col-xl-4 col-lg-4 col-md-4">
                    <div class="card card-plain">
                      <div class="card-body">
                        <form role="form"> 
                          <div class="mb-1">
                            <label class="input-label" for="last_name">Country</label>
                            <input class="input-box" id="name" type="text" v-model="newStudent.country" placeholder="Country" name="country" />
                          </div>
                          <div class="mb-1">
                            <label class="input-label" for="state">State</label>
                            <input class="input-box" id="name" type="text" v-model="newStudent.state" placeholder="State" name="state" />
                          </div>
                          <div class="mb-1">
                            <label class="input-label" for="city">City</label>
                            <input class="input-box" id="name" v-model="newStudent.city" type="text" placeholder="City" name="city" />
                          </div>
                          <div class="mb-1">
                            <label class="input-label" for="phone">Zip Code</label>
                            <input class="input-box" id="name" v-model="newStudent.zip" type="text" placeholder="Zip Code" name="zip" />
                          </div>
                          <div class="mb-1">
                            <label class="input-label" for="date_of_birth">Date Of Birth</label>
                            <input class="input-box" id="date_of_birth" v-model="newStudent.date_of_birth" type="date" placeholder="date of birth" name="date_of_birth" />
                          </div>
                          <div class="mb-1">
                            <label class="input-label" for="stage">Stage</label>
                            <input class="input-box" id="stage" v-model="newStudent.stage" type="text" placeholder="Stage" name="stage" />
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div class="bg-white box-shadow-dark border-radius-lg col-xl-4 col-lg-4 col-md-4">
                    <div class="card card-plain">
                      <div class="card-body">
                        <form role="form">
                          <div class="mb-1">
                            <label class="input-label" for="status">Status</label>
                            <br />
                            <select v-model="newStudent.status" class="select-box" id="status" type="select" placeholder="status" name="status">
                              <option v-for="(item, index) in availableStatus" :key="index" :value="item">
                                {{ item }}
                              </option>
                            </select>
                          </div>
                          <div class="mb-1">
                            <label class="input-label" for="emergency_contact_name">Emergency Contact Name</label>
                            <input class="input-box" id="emergency_contact_name" v-model="newStudent.emergency_contact_name" type="text" placeholder="emergency contact name" name="emergency_contact_name" />
                          </div>
                          <div class="mb-1">
                            <label class="input-label" for="emergency_contact_phone">Emergency Contact Number</label>
                            <input class="input-box" id="emergency_contact_phone" v-model="newStudent.emergency_contact_phone" type="text" placeholder="emergency contact number" name="emergency_contact_phone" />
                          </div>
                          <div class="mb-1">
                            <label class="input-label" for="allergies">Allergies</label>
                            <input class="input-box" id="allergies" v-model="newStudent.allergies" type="text" placeholder="Allergies" name="allergies" />
                          </div>
                          <div class="mb-1">
                            <label class="input-label" for="medical_conditions">Medical Conditions</label>
                            <input class="input-box" id="medical_conditions" v-model="newStudent.medical_conditions" type="text" placeholder="Medical Conditions" name="medical_conditions" />
                          </div>
                          <div class="mb-1">
                            <label class="input-label" for="enrollment_date">Enrollment Date</label>
                            <input class="input-box" id="enrollment_date" v-model="newStudent.enrollment_date" type="date" placeholder="Enrollment Date" name="enrollment_date" />
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex align-items-left bg-white box-shadow-dark border-radius-lg col-xl-4 col-lg-4 col-md-4">
                      <div class="">
                        <button @click="updateStudent" style="font-size: 12px; background-color: #573078;" class="btn ms-3 text-white fw-5 border-0 py-2 px-5  border-radius-lg"> Save </button>
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
  
  export default {
    name: '',
    components: {
      // MaterialButton,
    },
    mounted() {
    this.editStudent();
    this.getSchools();
  },
    data() {
      return {
        newStudent: {
          student_id:'',
          first_name: '',
          last_name:'',
          email: '',
          phone: '',
          country: '',
          city: '',
          state: '',
          zip: '',
          address: '',
          date_of_birth:'',
          stage:'',
          emergency_contact_name:'',
          emergency_contact_phone:'',
          medical_conditions:'',
          enrollment_date:'',
          allergies:'',
          status:'',
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
        this.newStudent.student_id = data.student_id
        this.newStudent.first_name = data.user.first_name
        this.newStudent.last_name = data.user.last_name
        this.newStudent.email = data.user.email
        this.newStudent.phone = data.user.phone
        this.newStudent.country = data.user.country
        this.newStudent.city = data.user.city
        this.newStudent.state = data.user.state
        this.newStudent.zip = data.user.zip
        this.newStudent.address = data.user.address
        this.newStudent.date_of_birth= data.dob
        this.newStudent.emergency_contact_name=data.emergency_contact_name
        this.newStudent.emergency_contact_phone=data.emergency_contact_phone
        this.newStudent.stage=data.stage
        this.newStudent.status=data.user.status
        this.newStudent.medical_conditions = data.medical_conditions
        this.newStudent.enrollment_date=data.enrollment_date
        this.newStudent.allergies = data.allergies
      }
    },
      //------------UPDATE STUDENT------------
      async updateStudent() {
        let id = this.$route.params.id
        try {
          await axiosClient.put('/updateStudent/'+id, this.newStudent)
          this.$router.push({ name: 'list-students' })
          this.snackbarMsg('Student Saved Successfuly')
        } catch (error) {
          console.log(error)
        }
      },
      //------------GET SCHOOLS------------
      async getSchools() {
        try {
          const response= await axiosClient.get('/getAllSchools')
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
    border-radius: 4px;
    box-sizing: border-box;
    width: 100%;
    font-size: 12px;
    height: 35px;
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
    border-radius: 4px;
    box-sizing: border-box;
    width: 100%;
    height: 35px;
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
  </style>
  