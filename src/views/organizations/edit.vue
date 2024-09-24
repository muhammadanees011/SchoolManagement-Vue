<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="card my-4">
          <!-- <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="d-flex justify-content-between bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
              <h6 class="text-white text-capitalize ps-3">Edit Organization</h6>
              <router-link :to="{ name: 'list-organizations' }">
                <button style="font-size: 12px" class="me-3 bg-gradient-white shadow-white text-dark fw-5 border-0 p-2 border-radius-lg"> Back </button>
              </router-link>
            </div>
          </div> -->
          <div class="d-flex justify-content-between  border-radius-lg pt-4">
              <h6 class="text-dark text-capitalize ps-3">Edit Organisation</h6>
            </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0">
              <div class="row py-1 d-flex justify-content-center bg-white form-data border-radius-lg">
                <div v-if="isError" class="mb-3 change-pass-alert">
                  <small v-for="(item,index) in validationErrors" :key="index" class="pass-text">{{ item }}<br></small>
                </div>
                <div class="bg-white box-shadow-dark border-radius-lg col-xl-12 col-lg-12 col-md-12">
                  <div class="form-bg container p-4 ms-2">
                    <div class="card card-plain">
                      <div class="card-body">
                        <div class="mb-1">
                          <label class="input-label" for="name"> Name</label>
                          <input class="input-box" v-model="newOrganization.name" id="name" type="text" placeholder="Name" name="name" />
                          <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["name"]!==""'>Name is required</small>
                        </div>
                        <div class="mb-1">
                          <label class="input-label" for="email">Email</label>
                          <input class="input-box" id="name" v-model="newOrganization.email" type="email" placeholder="example@gmail.com" name="email" />
                          <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["email"]!==""'>Email is required</small>
                        </div>
                        <div class="mb-1">
                          <label class="input-label" for="phone">Phone</label>
                          <input class="input-box" id="name" v-model="newOrganization.phone" type="tel" placeholder="Phone" name="phone" />
                          <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["phone"]!==""'>Phone is required</small>
                        </div>
                        <div class="mb-1">
                          <label class="input-label" for="phone">Website</label>
                          <input class="input-box" id="name" v-model="newOrganization.website" type="url" placeholder="https://example.com" name="website" />
                          <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["website"]!==""'>Website is required</small>
                        </div>
                        <div  class="mb-1">
                        <label class="input-label" for="country">Country</label>
                        <br />
                        <select class="select-box" v-model="newOrganization.country" id="country" type="select" placeholder="Country" name="country">
                          <option v-for="(item, index) in availableCountries" :key="index" :value="item">
                            {{ item }}
                          </option>
                        </select>
                        <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["country"]!==""'>Country is required</small>
                      </div>
                      <div class="mb-1">
                        <label class="input-label" for="city">City</label>
                        <input class="input-box" id="name" v-model="newOrganization.city" type="city" placeholder="City" name="city" />
                        <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["city"]!==""'>City is required</small>
                      </div>
                      <div class="mb-1">
                        <label class="input-label" for="phone">Postcode/Zip</label>
                        <input class="input-box" id="name" v-model="newOrganization.zip" type="text" placeholder="Zip" name="zip" />
                        <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["zip"]!==""'>Zip is required</small>
                      </div>
                      <div class="mb-1">
                        <label class="input-label" for="address">Address</label>
                        <input class="input-box" id="address" v-model="newOrganization.address" type="text" placeholder="Address" name="address" />
                        <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["address"]!==""'>Address is required</small>
                      </div>
                        <div class="d-flex align-items-right">
                          <button @click="updateOrganization" style="font-size: 12px;background-color: #573078;" class="btn me-3 mt-4 text-white fw-5 border-0 py-2 px-5 border-radius-lg"> Save </button>
                        </div>
                      </div>
                    </div>
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
  props: ['data'],
  components: {
    // MaterialButton,
  },
  mounted() {
    this.editOrganization()
  },
  computed: {},
  data() {
    return {
      isError:false,
      validationErrors:'',
      formValidation:'',
      availableCountries:['UK','USA','Canada'],
      newOrganization: {
        name: '',
        website: '',
        email: '',
        phone: '',
        country: '',
        city: '',
        zip: '',
        address: '',
      },
      schools: ['Skills Academy', 'Stockton', 'Redcar', 'Bede', 'NETA'],
    }
  },
  methods: {
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
      validate=cloneDeep(this.newOrganization)
      for(let item in this.newOrganization){
        if ((this.newOrganization[item] === '' || this.newOrganization[item] === undefined)) {
              validate[item]="is required"
              status=true
          }else{
            validate[item]=''
          }
      }
      this.formValidation=validate
      return status;
    },
    //------------EDIT ORGANIZATIONs------------
    async editOrganization() {
      let id = this.$route.params.id
      try {
        const response = await axiosClient.get('/editOrganization/' + id)
        this.setData(response)
      } catch (error) {
        console.log(error)
      }
    },
    //------------SETTING DATA TO EDIT------------
    setData(response) {
      let data
      if (response) {
        data = response.data
        this.newOrganization.name = data.name
        this.newOrganization.website = data.website
        this.newOrganization.email = data.email
        this.newOrganization.phone = data.phone
        this.newOrganization.country = data.country
        this.newOrganization.city = data.city
        this.newOrganization.state = data.state
        this.newOrganization.zip = data.zip
        this.newOrganization.address = data.address
        this.newOrganization.founded_date = data.founded_date
        this.newOrganization.description = data.description
      }
    },
    //-------------UPDATE ORGANIZATION---------
    async updateOrganization() {
      if(this.validateForm()){
        return;
      }
      let id = this.$route.params.id
      try {
        await axiosClient.put('/updateOrganization/' + id, this.newOrganization)
        this.$router.push({ name: 'list-organizations' })
        this.snackbarMsg('Organization Updated')
        this.isError=false;
      } catch (error) {
        console.log(error)
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
  width: 280px;
  height: 105px;
}
/* Hover effect */

.text-area-box:hover {
  border-color: #6c757d; /* Change to your preferred hover color */
}
/* 
.select-box {
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  width: 100%;
  font-size: 12px;
  height: 35px;
} */
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
/* input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  width: 100%;
  height: 35px;
  font-size: 12px;
} */

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
