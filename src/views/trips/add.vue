<template>
    <div class="container-fluid py-4">
      <div class="row ">
        <div class="col-12">
          <div class="card my-4">
            <div class="d-flex justify-content-between  border-radius-lg pt-4 ">
                <h6 class="text-dark text-capitalize ps-3">Add Trips</h6>
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
                              <label class="input-label" for="name">Trip Image</label>
                              <DropZone 
                              :maxFiles="Number(1)"
                              url="http://localhost:8080"
                              :uploadOnDrop="true"
                              :multipleUpload="false"
                              :parallelUpload="1"/>
                            </div>
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
                                    <label class="input-label" for="status">Organisation</label>
                                    <br />
                                    <select v-model="newTrip.organization_id" class="select-box" id="organization" type="select" placeholder="organization" name="organization">
                                      <option v-for="(item, index) in availableOrganizations" :key="index" :value="item.id">
                                        {{ item.name }}
                                      </option>
                                    </select>
                                    <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["organization_id"]!==""'>Organisation is required</small>
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
                                      <input  v-model="formattedPrice" class="input-box" id="name" type="number" step="0.01" min="0" placeholder="Trip Cost" name="name" />
                                      <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["total_funds"]!==""'>Trip Cost is required</small>
                                  </div>
                              </div>
                            </div>
                            <div class="row p-2">
                              <div class="col-xl-12 col-lg-12 col-md-12">
                                <h6 class="text-warning">Payment Plan</h6>
                              </div>
                              <div class="col-xl-4 col-lg-4 col-md-4">
                                <span class="d-flex justify-space-between align-items-center text-dark font-weight-bold text-xs">
                                  <small class="mb-2 me-3">Installments</small>
                                  <div class="checkbox-container mt-2 me-5">
                                      <input :checked="paymentPlan=='installments'" @change="changePaymentPlan('installments')" type="checkbox" class="checkbox-input" id="installmentsCheckbox">
                                      <label class="checkbox-label" for="installmentsCheckbox"></label>
                                  </div>
                                </span>
                              </div>
                              <div class="col-xl-4 col-lg-4 col-md-4">
                                <span class="d-flex justify-space-between align-items-center text-dark font-weight-bold text-xs">
                                  <small class="mb-2 me-3">Deposit</small>
                                  <div class="checkbox-container mt-2 me-5">
                                    <input :checked="paymentPlan=='deposit'" @change="changePaymentPlan('deposit')" type="checkbox" class="checkbox-input" id="installmentsCheckbox">
                                      <label class="checkbox-label" for="installmentsCheckbox"></label>
                                  </div>
                                </span>
                              </div>
                              <div class="col-xl-4 col-lg-4 col-md-4">
                                <span class="d-flex justify-space-between align-items-center text-dark font-weight-bold text-xs">
                                  <small class="mb-2 me-3">Manual Payment</small>
                                  <div class="checkbox-container mt-2 me-5">
                                    <input :checked="paymentPlan=='manual'" @change="changePaymentPlan('manual')" type="checkbox" class="checkbox-input" id="installmentsCheckbox">
                                      <label class="checkbox-label" for="installmentsCheckbox"></label>
                                  </div>
                                </span>
                              </div>
                            </div>
                            <div v-if="paymentPlan=='installments'" class="row p-2">
                              <div class="col-xl-4 col-lg-4 col-md-4">
                              <div class="mb-1">
                                  <label class="input-label" for="name">Total Installments</label>
                                  <input  v-model="installmentsPlan.total_installments" class="input-box" id="name"  type="number" step="0.01" min="0" placeholder="Total Installments" name="name" />
                                  <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["total_seats"]!==""'>Total Seats is required</small>
                              </div>
                              </div>
                              <div class="col-xl-4 col-lg-4 col-md-4">
                                  <div class="mb-1">
                                      <label class="input-label" for="name">Amount Per Installment</label>
                                      <input v-model="installmentsPlan.amount_per_installment" class="input-box" id="name"  type="number" step="0.01" min="0" placeholder="Amount Per Installment" name="name" />
                                      <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["accomodation_details"]!==""'>Accomodation Details is required</small>
                                  </div>
                              </div>
                              <div class="col-xl-4 col-lg-4 col-md-4">
                                  <div class="mb-1">
                                  <label class="input-label" for="enrollment_date">Initial Deposit</label>
                                  <input v-model="installmentsPlan.initial_deposit" class="input-box" id="name"  type="number" step="0.01" min="0" placeholder="Initial Deposit" name="name" />
                                  <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["start_date"]!==""'>Start Date is required</small>
                                  </div>
                              </div>
                              <div class="col-xl-4 col-lg-4 col-md-4">
                                  <div class="mb-1">
                                  <label class="input-label" for="enrollment_date">Due Date For Initial Deposit</label>
                                  <input v-model="installmentsPlan.initial_deposit_due_date" class="input-box" id="name"  type="date" placeholder="Deadline For Initial Deposit" name="name" />
                                  <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["start_date"]!==""'>Start Date is required</small>
                                  </div>
                              </div>
                              <template v-if="installmentsPlan.total_installments>0">
                                <div v-for="(item,index) in installmentsPlan.total_installments" :key="item" class="col-xl-4 col-lg-4 col-md-4">
                                    <div class="mb-1">
                                    <label class="input-label" for="enrollment_date">Due Date For Installment {{ index+1 }}</label>
                                    <input v-model="installmentsPlan.other_installments_due_date[index]" class="input-box" id="name"  type="date" placeholder="Deadline For Installment {{ index+1 }}" name="name" />
                                    <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["start_date"]!==""'>Start Date is required</small>
                                    </div>
                                </div>
                              </template>
                            </div>
                            <div v-if="paymentPlan=='deposit'" class="row p-2">
                              <div class="col-xl-4 col-lg-4 col-md-4">
                              <div class="mb-1">
                                  <label class="input-label" for="name">Total Deposit</label>
                                  <input  v-model="formattedPrice" class="input-box" id="name"  type="number" step="0.01" min="0" placeholder="Total Deposit" name="name" />
                                  <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["total_seats"]!==""'>Total Seats is required</small>
                              </div>
                              </div>
                              <div class="col-xl-4 col-lg-4 col-md-4">
                                  <div class="mb-1">
                                      <label class="input-label" for="name">Initial Deposit</label>
                                      <input   class="input-box" id="name"  type="number" step="0.01" min="0" placeholder="Initial Deposit" name="name" />
                                      <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["accomodation_details"]!==""'>Accomodation Details is required</small>
                                  </div>
                              </div>
                              <div class="col-xl-4 col-lg-4 col-md-4">
                                  <div class="mb-1">
                                  <label class="input-label" for="enrollment_date">Final Deposit</label>
                                  <input  class="input-box" id="name"  type="number" step="0.01" min="0" placeholder="Final Deposit" name="name" />
                                  <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["start_date"]!==""'>Start Date is required</small>
                                  </div>
                              </div>
                              <div class="col-xl-4 col-lg-4 col-md-4">
                                  <div class="mb-1">
                                  <label class="input-label" for="enrollment_date">Due Date For Initial Deposit</label>
                                  <input  class="input-box" id="name"  type="date" placeholder="Deadline For Initial Deposit" name="name" />
                                  <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["start_date"]!==""'>Start Date is required</small>
                                  </div>
                              </div>
                                <div class="col-xl-4 col-lg-4 col-md-4">
                                    <div class="mb-1">
                                    <label class="input-label" for="enrollment_date">Due Date For Final Deposit</label>
                                    <input class="input-box" id="name"  type="date" placeholder="Deadline For Final Deposit" name="name" />
                                    <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["start_date"]!==""'>Start Date is required</small>
                                    </div>
                                </div>
                            </div>
                            <div v-if="paymentPlan=='manual'" class="row p-2">
                              <div class="col-xl-4 col-lg-4 col-md-4">
                              <div class="mb-1">
                                  <label class="input-label" for="name">Total Amount</label>
                                  <input  v-model="formattedPrice" class="input-box" id="name"  type="number" step="0.01" min="0" placeholder="Total Amount" name="name" />
                                  <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["total_seats"]!==""'>Total Seats is required</small>
                              </div>
                              </div>
                              <div class="col-xl-4 col-lg-4 col-md-4">
                                  <div class="mb-1">
                                      <label class="input-label" for="name">Initial Amount</label>
                                      <input   class="input-box" id="name"  type="number" step="0.01" min="0" placeholder="Initial Amount" name="name" />
                                      <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["accomodation_details"]!==""'>Accomodation Details is required</small>
                                  </div>
                              </div>
                              <div class="col-xl-4 col-lg-4 col-md-4">
                                  <div class="mb-1">
                                  <label class="input-label" for="enrollment_date">Final Amount</label>
                                  <input  class="input-box" id="name"  type="number" step="0.01" min="0" placeholder="Final Amount" name="name" />
                                  <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["start_date"]!==""'>Start Date is required</small>
                                  </div>
                              </div>
                              <div class="col-xl-4 col-lg-4 col-md-4">
                                  <div class="mb-1">
                                  <label class="input-label" for="enrollment_date">Due Date For Initial Amount</label>
                                  <input  class="input-box" id="name"  type="date" placeholder="Deadline For Initial Deposit" name="name" />
                                  <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["start_date"]!==""'>Start Date is required</small>
                                  </div>
                              </div>
                              <div class="col-xl-4 col-lg-4 col-md-4">
                                  <div class="mb-1">
                                  <label class="input-label" for="enrollment_date">Due Date For Final Amount</label>
                                  <input class="input-box" id="name"  type="date" placeholder="Deadline For Final Deposit" name="name" />
                                  <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["start_date"]!==""'>Start Date is required</small>
                                  </div>
                              </div>
                              <div class="col-xl-4 col-lg-4 col-md-4">
                                  <div class="mb-1">
                                  <label class="input-label" for="enrollment_date">Comments</label>
                                  <input class="input-box" id="name"  type="text" placeholder="cash and card payments are accepted" name="name" />
                                  <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["start_date"]!==""'>Start Date is required</small>
                                  </div>
                              </div>
                            </div>
                            <div class="mb-1">
                              <label class="input-label" for="phone">Attribute</label>
                              <br />
                              <MultiSelect
                                label="Attributes"
                                :options="allAttributes"
                                @input="handleAttributes"
                                placeholder="Attributes"
                              />
                            </div>
                          </form>
                          <div class="mt-4">
                            <button @click.prevent="saveNewTrip" style="z-index:1; padding-left:3rem !important ;padding-right:3rem !important ; font-size: 12px; background-color: #573078;" class="btn text-white ms-2 fw-5 border-0  py-2 border-radius-lg"> 
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
  import { DropZone } from 'dropzone-vue';

  export default {
    name: '',
    components: {
      MultiSelect,
      DropZone
    },
    mounted() {
      this.getOrganizations();
      this.getAllAttributes();
    },
    updated(){
      this.$permissions.redirectIfNotAllowed('create_trip');
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
      paymentPlan:'',
      installmentsPlan:{
        total_installments:'',
        amount_per_installment:'',
        initial_deposit:'',
        initial_deposit_due_date:'',
        other_installments_due_date:[],
      },
      depositPlan:{
        total:'',
        final_deposit:'',
        initial_deposit:'',
      },
      manualPlan:{
        total:'',
        final_deposit:'',
        initial_deposit:'',
      },
      allAttributes:'',
      availableOrganizations:"",
      isError:false,
      formValidation:"",
      newTrip: {
        organization_id:'',
        attributes:[],
        title: '',
        description: '',
        total_seats: '',
        accomodation_details: '',
        start_date: '',
        end_date: '',
        total_funds:'',
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
      },
      //------------VALIDATE FORM-------------
      validateForm(){
        this.$permissions.redirectIfNotAllowed('create_trip');
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
        return status;
      },
      changePaymentPlan(plan){
        if(this.paymentPlan==plan){
          this.paymentPlan=''
        }else{
          this.paymentPlan=plan
        }
      },
      //--------------SAVE NEW TRIP--------------
      async saveNewTrip(){
        if(this.validateForm()){
          return;
        }
        await this.addPaymentPlan();
        try {
        await axiosClient.post('/createTrip', this.newTrip)
        this.$router.push({ name: 'list-trips' })
        this.snackbarMsg('Trip Saved Successfuly')
        } catch (error) {
          console.log(error)
        }
      },
      addPaymentPlan(){
        if(this.paymentPlan=='installments'){
          this.newTrip.payment_plan='installments';
          this.newTrip = { ...this.newTrip, ...this.installmentsPlan };
        }
        // else if(this.paymentPlan=='deposit'){

        // }else if(this.paymentPlan=='manual'){

        // }
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
  .checkbox-input{
    height: auto;
  }
  
  </style>
  