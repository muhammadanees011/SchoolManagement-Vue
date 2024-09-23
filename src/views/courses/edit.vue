<template>
    <div class="container-fluid py-4">
      <div class="row">
        <div class="col-12">
          <div class="card my-4">
            <div class="d-flex justify-content-between  border-radius-lg pt-4 pb-1">
              <h6 class="text-dark text-capitalize ps-3">Edit Course</h6>
              <router-link :to="{ name: 'list-courses' }">
                <button style="font-size: 12px; background-color: #573078;" class="btn me-3 text-white fw-5 border-0 py-2 px-4  border-radius-lg"> Back </button>
              </router-link>
            </div>
            <div class="card-body px-0 pb-2">
              <div class="table-responsive p-0">
                <div class="row py-1 d-flex justify-content-center bg-white form-data border-radius-lg">
                  <div class="bg-white box-shadow-dark border-radius-lg col-xl-10 col-lg-10 col-md-10">
                    <div class="form-bg container p-4">
                    <p class="text-dark ms-4 font-weight-bold">Course Information</p>
                    <div class="card card-plain">
                      <div class="card-body">
                        <form role="form">
                          <div class="mb-1">
                            <label class="input-label" for="name">Course Code</label>
                            <input class="input-box" id="name" v-model="newCourse.CourseCode" type="text" placeholder="Course Code" name="CourseCode" />
                            <!-- <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["first_name"]!==""'>First Name is required</small> -->
                          </div>
                          <div class="mb-1">
                            <label class="input-label" for="name">Course Level</label>
                            <input class="input-box" id="name" v-model="newCourse.CourseLevel" type="text" placeholder="Course Level" name="CourseLevel" />
                            <!-- <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["last_name"]!==""'>Last Name is required</small> -->
                          </div>
                          <div class="mb-1">
                            <label class="input-label" for="email">Course Description</label>
                            <input class="input-box" id="name" v-model="newCourse.CourseDescription" type="email" placeholder="Course Description" name="CourseDescription" />
                            <!-- <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["email"]!==""'>Email is required</small> -->
                          </div>

                          <div class="mb-1">
                            <label class="input-label" for="status">Status</label>
                            <br />
                            <select v-model="newCourse.status" class="select-box" id="status" type="select" placeholder="status" name="status">
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
                        <button @click="updateCourse" style="font-size: 12px; background-color: #573078;" class="btn mt-3 ms-5 text-white fw-5 border-0 py-2 px-5  border-radius-lg"> Update Course </button>
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
    this.editCourse();
  },
  updated(){
    this.$permissions.redirectIfNotAllowed('edit_course');
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
        newCourse: {
          CourseCode:'',
          CourseLevel: '',
          CourseDescription:'',
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
      //------------GET USER--------------
      getUser(){
        let user=localStorage.getItem('user')
        user= JSON.parse(user)
        this.user=user
      },
      //------------EDIT PARENT------------
      async editCourse() {
        let id = this.$route.params.id
        try {
          const response=await axiosClient.get('/editCourse/' + id)
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
        this.newCourse.CourseCode = data.CourseCode
        this.newCourse.CourseLevel = data.CourseLevel
        this.newCourse.CourseDescription = data.CourseDescription
        this.newCourse.status=data.status
      }
    },
      //------------UPDATE PARENT------------
      async updateCourse() {
        // if(this.validateForm()){
        //   return;
        // }
        let id = this.$route.params.id
        try {
          await axiosClient.put('/updateCourse/'+id, this.newCourse)
          this.$router.push({ name: 'list-courses' })
          this.snackbarMsg('Course Updated Successfuly')
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
  