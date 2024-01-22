<template>
    <div class="container-fluid py-4">
      <div class="row ">
        <div class="col-12">
          <div class="card my-4">
            <div class="d-flex justify-content-between  border-radius-lg pt-4 ">
                <h6 class="text-dark text-capitalize ps-3">Edit Trip</h6>
                <router-link :to="{ name: 'list-trips' }">
                  <button style="font-size: 12px; background-color: #573078;" class="me-3 text-white fw-5 w-90 border-0 p-2 border-radius-lg"> Back </button>
                </router-link>
            </div>
            <div class="card-body px-0 pb-2">
              <div class="table-responsive p-0">
                <div class="row py-2 bg-white form-data border-radius-lg">
                  <div class="bg-white box-shadow-dark border-radius-lg col-xl-12 col-lg-12 col-md-12">
                    <div class="form-bg container p-4 ms-2">
                      <div class="card card-plain">
                        <div class="card-body">
                          <form role="form">
                            <div class="row mb-1">
                            <div class="mb-1">
                              <label class="input-label" for="name">Trip Title</label>
                              <input v-model="newTrip.title" class="input-box title-input" id="name" type="text" placeholder="Trip to Brazil" name="name" />
                              <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["title"]!==""'>Title is required</small>
                            </div>
                            <div class="mb-1">
                              <label class="input-label" for="description">Description</label>
                              <br />
                              <textarea  v-model="newTrip.description" class="text-area-box text-area-trips"  id="name" type="text" placeholder="Description" name="description" />
                              <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["description"]!==""'>Description is required</small>
                            </div>
                            </div>
                            <div class="row p-2">
                              <div class="col-xl-4 col-lg-4 col-md-4">
                              <div class="mb-1">
                                  <label class="input-label" for="name">Total Seats</label>
                                  <input  v-model="newTrip.total_seats" class="input-box" id="name" type="number" placeholder="Total Seats" name="name" />
                                  <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["total_seats"]!==""'>Total Seats is required</small>
                              </div>
                              </div>
                              <div class="col-xl-4 col-lg-4 col-md-4">
                                <div class="mb-1">
                                    <label class="input-label" for="status">Organization</label>
                                    <br />
                                    <select v-model="newTrip.organization_id" class="select-box" id="organization" type="select" placeholder="organization" name="organization">
                                      <option v-for="(item, index) in availableOrganizations" :key="index" :value="item.id">
                                        {{ item.name }}
                                      </option>
                                    </select>
                                    <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["organization_id"]!==""'>Organization is required</small>
                                </div>
                                  
                              </div>
                              <div class="col-xl-4 col-lg-4 col-md-4">
                                  <div class="mb-1">
                                      <label class="input-label" for="name">Accomodation and Meals</label>
                                      <input  v-model="newTrip.accomodation_details" class="input-box" id="name" type="text" placeholder="Accomodation and Meals included" name="name" />
                                      <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["accomodation_details"]!==""'>Accomodation Details is required</small>
                                  </div>
                              </div>
                              <div class="col-xl-4 col-lg-4 col-md-4">
                                  <div class="mb-1">
                                  <label class="input-label" for="enrollment_date">Start Date</label>
                                  <input  v-model="newTrip.start_date" class="input-box" id="enrollment_date"  type="date" placeholder="Enrollment Date" name="enrollment_date" />
                                  <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["start_date"]!==""'>Start Date is required</small>
                                  </div>
                              </div>
                              <div class="col-xl-4 col-lg-4 col-md-4">
                                  <div class="mb-1">
                                  <label class="input-label" for="enrollment_date">End Date</label>
                                  <input  v-model="newTrip.end_date" class="input-box" id="enrollment_date"  type="date" placeholder="Enrollment Date" name="enrollment_date" />
                                  <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["end_date"]!==""'>End Date is required</small>
                                  </div>
                              </div>
                              <div class="col-xl-4 col-lg-4 col-md-4">
                                  <div class="mb-1">
                                      <label class="input-label" for="name">Trip Cost</label>
                                      <input  v-model="formattedPrice" class="input-box" id="name"  type="number" step="0.01" min="0" placeholder="Trip Cost" name="name" />
                                      <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["total_funds"]!==""'>Trip Cost is required</small>
                                  </div>
                              </div>
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
                          </form>
                          <div class="mt-4">
                            <button @click.prevent="updateTrip" style="z-index:1; padding-left:3rem !important ;padding-right:3rem !important ; font-size: 12px; background-color: #573078;" class="btn text-white ms-2 fw-5 border-0  py-2 border-radius-lg"> 
                              Save 
                            </button>
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
  import axiosClient from '../../axios'
  import cloneDeep from 'lodash/cloneDeep';
  import MultiSelect from "../components/MultiSelect.vue"
  import moment from 'moment';

  export default {
    name: '',
    components: {
      MultiSelect
    },
    mounted() {
      this.editTrip();
      this.getOrganizations();
      this.getAllAttributes();
    },
    computed: {
      formattedPrice: {
        get() {
          return this.newTrip.total_funds;
        },
        set(value) {
          const formattedValue = parseFloat(value).toFixed(2);
          this.newTrip.total_funds = formattedValue;
        },
      },
    },
    data() {
      return {
      allAttributes:'',
      availableOrganizations:"",
      isError:false,
      formValidation:"",
      selectedAttrs:[],
      newTrip: {
        organization_id:'',
        attributes:[],
        title: '',
        description: '',
        total_seats: '',
        accomodation_details: '',
        start_date: '',
        end_date: '',
        total_funds: '',
      },
      }
    },
    methods:{
      //--------------TOAST MESSAGE--------------
      snackbarMsg(message) {
        this.$snackbar.add({
          type: 'success',
          text: message,
          background: 'white',
        })
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
            if(this.newTrip.attributes.includes(item.id)){
            this.selectedAttrs.push(item)
            }
            })
      },
      //------------VALIDATE FORM-------------
      validateForm(){
        let status=false
        let validate=''
        validate=cloneDeep(this.newTrip)
        for(let item in this.newTrip){
          if ((this.newTrip[item] === '' || this.newTrip[item] === undefined)) {
                validate[item]="is required"
                status=true
            }else{
              validate[item]=''
            }
        }
        this.formValidation=validate
        console.log(this.formValidation)
        return status;
      },
      //--------------SAVE NEW TRIP--------------
      async updateTrip(){
        if(this.validateForm()){
          return;
        }
        let id = this.$route.params.id
        try {
        await axiosClient.put('/updateTrip/'+id, this.newTrip)
        this.$router.push({ name: 'list-trips' })
        this.snackbarMsg('Trip Updated Successfuly')
        } catch (error) {
          console.log(error)
        }
      },
      //------------HANDLE ATTRIBUTES------------
      handleAttributes(data){
        this.newTrip.attributes=[]
        data.filter((item)=>{
          this.newTrip.attributes.push(item.id);
        })
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
     //------------EDIT SHOP ITEM------------
    async editTrip() {
    let id = this.$route.params.id
    try {
        let response= await axiosClient.get('/findTrip/'+id)
        response=response.data
        this.setTrip(response)
    } catch (error) {
        console.log(error)
    }
    },
    //-------------SET TRIP---------------
    setTrip(data){
        this.newTrip.title=data.title
        this.newTrip.description=data.description
        this.newTrip.total_seats=data.total_booking
        this.newTrip.accomodation_details=data.accomodation_details
        this.newTrip.start_date=this.formatDateString(data.start_date)
        this.newTrip.end_date=this.formatDateString(data.end_date)
        this.newTrip.total_funds=data.budget
        this.newTrip.organization_id=data.organization_id
        this.newTrip.attributes=data.attributes
    },
    //------------FORMAT DATE--------------
    formatDateString(dateString) {
    const parsedDate = moment(dateString);
    const formattedDate = parsedDate.format('YYYY-MM-DD');
    return formattedDate;
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
  /* Focus effect */
  
  .text-area-box:focus {
    outline: none;
    border-color: #4caf50; 
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.5); 
  }
  .input-label {
    font-size: 12px;
  }
  .title-input{
    height: 55px;
  }
  .text-area-trips{
    width: 100%;
    height: 110px;
  }
  /* Hover effect */
  input:hover {
    border-color: #6c757d; 
  }
  
  /* Focus effect */
  input:focus {
    outline: none;
    border-color: #4caf50; 
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
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
  