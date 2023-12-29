<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="card my-4">
          <!-- <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="d-flex justify-content-between bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
              <h6 class="text-white text-capitalize ps-3">Add School</h6>
              <router-link :to="{ name: 'list-schools' }">
                <button style="font-size: 12px" class="me-3 bg-gradient-white shadow-white text-dark fw-5 border-0 p-2 border-radius-lg"> Back </button>
              </router-link>
            </div>
          </div> -->
          <div class="d-flex justify-content-between  border-radius-lg pt-4 ">
              <h6 class="text-dark text-capitalize ps-3">Add School</h6>
              <router-link :to="{ name: 'list-schools' }">
                <button style="font-size: 12px; background-color: #573078;" class="btn me-3 text-white fw-5 border-0 px-4 py-2 border-radius-lg"> Back </button>
              </router-link>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0">
              <div class="row py-2 bg-white form-data border-radius-lg">
                <div class="bg-white box-shadow-dark border-radius-lg col-xl-4 col-lg-4 col-md-4">
                  <div class="card card-plain">
                    <div class="card-body">
                      <form role="form">
                        <div class="mb-1">
                          <label class="input-label" for="name">Name</label>
                          <input class="input-box" id="name" v-model="newSchool.title" type="text" placeholder="School Name" name="name" />
                        </div>
                        <div class="mb-1">
                          <label class="input-label" for="email">Email</label>
                          <input class="input-box" id="name" v-model="newSchool.email" type="email" placeholder="Last Name" name="email" />
                        </div>
                        <div class="mb-1">
                          <label class="input-label" for="phone">Phone</label>
                          <input class="input-box" id="name" v-model="newSchool.phone" type="tel" placeholder="Phone" name="phone" />
                        </div>
                        <div class="mb-1">
                          <label class="input-label" for="website">Website</label>
                          <input class="input-box" id="name" v-model="newSchool.website" type="url" placeholder="Website" name="website" />
                        </div>
                        <div class="mb-1">
                          <label class="input-label" for="address">Address</label>
                          <input class="input-box" id="name" v-model="newSchool.address" type="text" placeholder="Address" name="address" />
                        </div>
                        <div v-if="user.role=='super_admin'" class="mb-1">
                          <label class="input-label" for="phone">Organization</label>
                          <br />
                          <select class="select-box" v-model="newSchool.organization_id" id="name" type="select" placeholder="Zip" name="zip">
                            <option v-for="(item, index) in availableOrganizations" :key="index" :value="item.id">
                              {{ item.name }}
                            </option>
                          </select>
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
                          <input class="input-box" id="name" type="text" v-model="newSchool.country" placeholder="Country" name="country" />
                        </div>
                        <div class="mb-1">
                          <label class="input-label" for="state">State</label>
                          <input class="input-box" id="name" type="text" v-model="newSchool.state" placeholder="State" name="state" />
                        </div>
                        <div class="mb-1">
                          <label class="input-label" for="city">City</label>
                          <input class="input-box" id="name" v-model="newSchool.city" type="text" placeholder="City" name="city" />
                        </div>
                        <div class="mb-1">
                          <label class="input-label" for="phone">Zip Code</label>
                          <input class="input-box" id="name" v-model="newSchool.zip" type="text" placeholder="Zip Code" name="zip" />
                        </div>
                        <div class="mb-1">
                          <label class="input-label" for="teachers_count">Teachers Count</label>
                          <input class="input-box" id="teachers_count" v-model="newSchool.teachers_count" type="number" placeholder="Teachers Count" name="teachers_count" />
                        </div>
                        <div class="mb-1">
                          <label class="input-label" for="stages">Stages</label>
                          <input class="input-box" id="stages" v-model="newSchool.stages" type="text" placeholder="Stages" name="stages" />
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
                          <label class="input-label" for="students_count">Students Count</label>
                          <input class="input-box" id="students_count" v-model="newSchool.students_count" type="number" placeholder="Teachers Count" name="students_count" />
                        </div>
                        <div class="mb-1">
                          <label class="input-label" for="tagLine">Tag Line</label>
                          <input class="input-box" id="name" v-model="newSchool.tagline" type="text" placeholder="Tag Line" name="tagLine" />
                        </div>
                        <div class="mb-1">
                          <label class="input-label" for="phone">Status</label>
                          <br />
                          <select v-model="newSchool.status" class="select-box" id="name" type="select" placeholder="Zip" name="zip">
                            <option v-for="(item, index) in availableSchools" :key="index" :value="item">
                              {{ item }}
                            </option>
                          </select>
                        </div>
                        <div class="mb-1">
                          <label class="input-label" for="description">Description</label>
                          <br />
                          <textarea class="text-area-box" v-model="newSchool.description" id="name" type="text" placeholder="Description" name="description" />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div class="d-flex align-items-left bg-white box-shadow-dark border-radius-lg col-xl-4 col-lg-4 col-md-4">
                    <div class="">
                      <button @click="saveNewSchool" style="font-size: 12px; background-color: #573078;" class="btn ms-3 text-white fw-5 border-0 px-5 py-2 border-radius-lg"> Save </button>
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
  this.getUser();
  this.getOrganizations()
},
  data() {
    return {
      user:'',
      newSchool: {
        organization_id:'',
        title: '',
        website: '',
        email: '',
        phone: '',
        country: '',
        city: '',
        state: '',
        zip: '',
        address: '',
        founded_date: '',
        password: '',
        password_confirmation: '',
        tagline: '',
        description: '',
        teachers_count:'',
        students_count:'',
        stages:'',
        status:'',
      },
      availableSchools:['active','pending','blocked'],
      availableOrganizations:'',
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
    //------------GET USER----------------
    getUser(){
      let user=localStorage.getItem('user')
      user= JSON.parse(user)
      this.user=user
    },
    //------------SAVE SCHOOL------------
    async saveNewSchool() {
      try {
        let url='/createSchool'
        if(this.user.role=='organization_admin'){
          url='/createSchool/'+this.user.id
        }
        const response=await axiosClient.post(url, this.newSchool)
        this.createCustomer(response.data.id);
        this.$router.push({ name: 'list-schools' })
        this.snackbarMsg('School Saved Successfuly')
      } catch (error) {
        console.log(error)
      }
    },
    //-----------CREATE STRIPE CUSTOMER----------
    async createCustomer(id){
      let name=this.newSchool.title;
      let data={
        'user_id':id,
        'name':name,
        'email':this.newSchool.email
      }
      try {
        await axiosClient.post('/createCustomer',data)
      } catch (error) {
        console.log(error)
      }
    },
    //------------GET ORGANIZATIONS------------
    async getOrganizations() {
      try {
        const response= await axiosClient.get('/getAllOrganizations')
        this.availableOrganizations=response.data
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
