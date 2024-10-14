<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="card my-4">
        
          <div class="d-flex justify-content-between border-radius-lg pt-4">
              <h6 class="text-dark text-capitalize ps-3">Add Organisation</h6>
              <router-link :to="{ name: 'list-organizations' }">
                <button style="font-size: 12px;" class="btn me-3 text-white fw-5 border-0 py-2 px-4 border-radius-lg"> Back </button>
              </router-link>
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
                        <input class="input-box" id="city" v-model="newOrganization.city" type="city" placeholder="City" name="city" />
                        <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["city"]!==""'>City is required</small>
                      </div>
                      <div class="mb-1">
                        <label class="input-label" for="phone">Postcode/Zip</label>
                        <input class="input-box" id="name" v-model="newOrganization.zip" type="text" placeholder="Zip" name="zip" />
                        <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["zip"]!==""'>Postocode/Zip is required</small>
                      </div>
                      <div class="mb-1">
                        <label class="input-label" for="address">Address</label>
                        <input class="input-box" id="address" v-model="newOrganization.address" type="text" placeholder="Address" name="address" />
                        <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["address"]!==""'>Address is required</small>
                      </div>
                        <div class="d-flex justify-content-center">
                          <button @click="saveNewOrganization" style="font-size: 12px;background-color: #573078;" class="btn me-3 mt-4 text-white fw-5 border-0 py-2 px-5 border-radius-lg"> Save </button>
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
import { mapGetters } from 'vuex'
import axiosClient from '../../axios'
import cloneDeep from 'lodash/cloneDeep';

export default {
  name: '',
  components: {
    // MaterialButton,
  },
  mounted() {
    this.$globalHelper.buttonColor();
  },
  computed: {
    ...mapGetters(['getOrganizationList']),
  },
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
    //------------SAVE ORGANIZATIONs------------
    async saveNewOrganization() {
      if(this.validateForm()){
          return;
      }
      try {
        await axiosClient.post('/createOrganization', this.newOrganization)
        this.$router.push({ name: 'list-organizations' })
        this.snackbarMsg('Organization Saved')
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
  width: 280px;
  height: 105px;
}
.text-area-box:hover {
  border-color: #6c757d;
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
</style>
