<template>
    <div class="container-fluid py-4">
      <div class="row">
        <div class="col-12">
          <div class="card my-4">
            <div class="d-flex justify-content-between  border-radius-lg pt-4 pb-3">
                <h6 class="text-dark text-capitalize ps-3">Edit Shop Item</h6>
                <router-link :to="{ name: 'shop-items' }">
                  <button style="font-size: 12px;background-color: #573078;" class="btn me-3 text-white fw-5 border-0 py-2 px-4 border-radius-lg"> Back </button>
                </router-link>
              </div>
            
              <div class="card-body px-0 pb-2">
              <div class="table-responsive p-0">
                <div class="row py-1 d-flex justify-content-center bg-white form-data border-radius-lg">
                  <div class="bg-white box-shadow-dark border-radius-lg col-xl-10 col-lg-10 col-md-10">
                    <div class="form-bg container p-4">
                    <div class="card card-plain">
                      <div class="card-body">
                        <form role="form">
                          <div v-if="isError" class="row mb-1 validation-errors">
                            <small v-for="(item,index) in validationError" :key="index" class="text-white">
                              {{ item }}
                            </small>
                          </div>
                          <div class="row mb-1">
                            <div class="col-xl-6 col-lg-6 col-md-6 mb-1">
                              <label class="input-label" for="name">Name</label>
                              <input class="input-box" id="name" v-model="newItem.name" type="text" placeholder="Name" name="name" />
                              <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["name"]!==""'>Name is required</small>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 mb-1">
                              <label class="input-label" for="name">Price</label>
                              <input class="input-box" id="price" v-model="newItem.price" type="number" placeholder="price" name="price" />
                              <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["price"]!==""'>Price is required</small>
                            </div>
                          </div>

                          <div class="mb-1">
                            <label class="input-label" for="name">Detail</label>
                            <input class="input-box" id="name" v-model="newItem.detail" type="text" placeholder="Detail" name="detail" />
                            <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["detail"]!==""'>Detail is required</small>
                          </div>


                          <div class="row mb-1">
                            <div class="col-xl-4 col-lg-4 col-md-4 mb-1">
                              <label class="input-label" for="valid_from">Valid From</label><br>
                              <date-picker v-model:value="newItem.valid_from" class="input-box"
                                format="DD/MM/YYYY" value-type="date" @change="validateExpiryDate()" append-to-body='true'
                                >
                              </date-picker>
                              <!-- <input class="input-box" id="valid_from" v-model="newItem.valid_from" type="date" placeholder="Valid From" name="valid_from" /> -->
                              <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["valid_from"]!==""'>Valid From is required</small>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 mb-1">
                              <label class="input-label" for="valid_to">Valid To</label><br>
                              <date-picker v-model:value="newItem.valid_to" class="input-box"
                                format="DD/MM/YYYY" value-type="date" @change="validateExpiryDate()" append-to-body='true'
                                >
                              </date-picker>
                              <!-- <input class="input-box" id="valid_to" v-model="newItem.valid_to" type="date" placeholder="Valid To" name="valid_to" /> -->
                              <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["valid_to"]!==""'>Valid To is required</small>
                            </div>
                            
                            <div class="col-xl-4 col-lg-4 col-md-4 mb-1">
                              <label class="input-label" for="phone">Product Type</label>
                              <br />
                              <select class="select-box" v-model="newItem.product_type" id="shop" type="select" placeholder="Product Type" name="product_type">
                                <option v-for="(item, index) in productTypesList" :key="index" :value="item">
                                  {{ item }}
                                </option>
                              </select>
                              <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["shop_id"]!==""'>Shop is required</small>
                            </div>

                          </div>
                        

                          <div class="row mb-1">
                            <div class="col-xl-6 col-lg-6 col-md-6 mb-1">
                              <label class="input-label" for="name">Product Owner Email</label>
                              <input class="input-box" id="name" v-model="newItem.product_owner_email" type="email" placeholder="email" name="detail" />
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 mb-1">
                              <label class="input-label" for="phone">Visibility Options</label>
                              <br />
                              <MultiSelect
                              label="Visibility Options"
                              :value="newItem.visibility_options"
                              :options="visibilityOptions"
                              @input="handleVisibility"
                              placeholder="Visibility Options"
                              />
                            </div>
                          </div>

                          <div class="row mb-1">
                            <div class="col-xl-6 col-lg-6 col-md-6 mb-1">
                              <label class="input-label" for="phone">Limit Colleges</label>
                              <br />
                              <MultiSelect
                              label="Payment Options"
                              :value="newItem.limitColleges"
                              :options="schoolsList"
                              @input="handleColleges"
                              placeholder="Limit Colleges"
                              />
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 mb-1">
                              <label class="input-label" for="phone">Limit Courses</label>
                              <br />
                              <MultiSelect
                              label="Visibility Options"
                              :value="newItem.limitCourses"
                              :options="coursesList"
                              @input="handleCourses"
                              placeholder="Limit Courses"
                              />
                            </div>
                          </div>

                          <div class="row mb-1">
                            <div class="col-xl-6 col-lg-6 col-md-6">
                              <span class="mt-2 d-flex justify-space-between align-items-center text-dark font-weight-bold text-xs">
                                <small class="ms-2 me-3">Enable Quantity Limit</small>
                                <div class="checkbox-container mt-3 me-5">
                                    <input :checked="isQuantityEnabled" @change="isQuantityEnabled=!isQuantityEnabled" type="checkbox" class="checkbox-input" id="installmentsCheckbox">
                                    <label class="checkbox-label" for="installmentsCheckbox"></label>
                                </div>
                              </span>
                            </div>
                          </div>

                          <div v-if="isQuantityEnabled" class="row mb-1">
                            <div class="col-xl-6 col-lg-6 col-md-6 mb-1">
                              <label class="input-label" for="name">Quantity</label>
                              <input class="input-box" id="quantity" v-model="newItem.quantity" min="0" type="number" placeholder="Quantity" name="quantity" />
                              <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["quantity"]!==""'>Quantity is required</small>
                            </div>
                          </div>
                          

                          <div class="row p-2">
                              <div class="col-xl-12 col-lg-12 col-md-12">
                                <h6 class="text-warning">Payment Plan</h6>
                              </div>
                              <div class="col-xl-4 col-lg-4 col-md-4">
                                <span class="d-flex justify-space-between align-items-center text-dark font-weight-bold text-xs">
                                  <small class="mb-2 me-3">Instalments</small>
                                  <div class="checkbox-container mt-2 me-5">
                                      <input :checked="newItem.payment_plan=='installments'" @change="changePaymentPlan('installments')" type="checkbox" class="checkbox-input" id="installmentsCheckbox">
                                      <label class="checkbox-label" for="installmentsCheckbox"></label>
                                  </div>
                                </span>
                              </div>
                              <div class="col-xl-4 col-lg-4 col-md-4">
                                <span class="d-flex justify-space-between align-items-center text-dark font-weight-bold text-xs">
                                  <small class="mb-2 me-3">Deposit & Instalments</small>
                                  <div class="checkbox-container mt-2 me-5">
                                    <input :checked="newItem.payment_plan=='installments_and_deposit'" @change="changePaymentPlan('installments_and_deposit')" type="checkbox" class="checkbox-input" id="installmentsCheckbox">
                                      <label class="checkbox-label" for="installmentsCheckbox"></label>
                                  </div>
                                </span>
                              </div>
                              <div class="col-xl-4 col-lg-4 col-md-4">
                                <span class="d-flex justify-space-between align-items-center text-dark font-weight-bold text-xs">
                                  <small class="mb-2 me-3">Full Payment</small>
                                  <div class="checkbox-container mt-2 me-5">
                                    <input :checked="newItem.payment_plan=='full_payment'" @change="changePaymentPlan('full_payment')" type="checkbox" class="checkbox-input" id="installmentsCheckbox">
                                      <label class="checkbox-label" for="installmentsCheckbox"></label>
                                  </div>
                                </span>
                              </div>
                          </div>
                          <div v-if="newItem.payment_plan=='installments'" class="row p-2">
                            <div class="col-xl-4 col-lg-4 col-md-4">
                              <div class="mb-1">
                                  <label class="input-label" for="name">Total Instalments</label>
                                  <input  v-model="installmentsAndDeposit.total_installments" @input="handleIntegerInput" class="input-box" id="name"  type="number" step="0.01" min="0" placeholder="Total Instalments" name="name" />
                                  <!-- <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["total_installments"]!==""'>Total Installments is required</small> -->
                              </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4">
                                <div class="mb-1">
                                    <label class="input-label" for="name">Amount Per Instalment</label>
                                    <input v-model="installmentsAndDeposit.amount_per_installment" class="input-box" id="name"  type="number" step="0.01" min="0" placeholder="Amount Per Instalment" name="name" />
                                    <!-- <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["amount_per_installment"]!==""'>Amount Per Installment is required</small> -->
                                </div>
                            </div>
                            <template v-if="installmentsAndDeposit.total_installments>0">
                              <div v-for="(item,index) in installmentsAndDeposit.total_installments" :key="item" class="col-xl-4 col-lg-4 col-md-4">
                                  <div class="mb-1">
                                  <label class="input-label" for="enrollment_date">Due Date For Instalment {{ index+1 }}</label>
                                  <date-picker v-model:value="installmentsAndDeposit.other_installments_due_date[index]" @change="validateInstallmentDate(index)" class="input-box"
                                    format="DD/MM/YYYY" value-type="date" append-to-body='true'
                                    >
                                  </date-picker>
                                  <!-- <input v-model="installmentsAndDeposit.other_installments_due_date[index]" @input="validateInstallmentDate(index)" class="input-box" id="name"  type="date" placeholder="Deadline For Instalment {{ index+1 }}" name="name" /> -->
                                  <!-- <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["due_date"]!==""'>Due Date is required</small> -->
                                  </div>
                              </div>
                            </template>
                          </div>
                          <div v-if="newItem.payment_plan=='installments_and_deposit'" class="row p-2">
                            <div class="col-xl-4 col-lg-4 col-md-4">
                              <div class="mb-1">
                                  <label class="input-label" for="name">Total Instalments</label>
                                  <input  v-model="installmentsAndDeposit.total_installments" class="input-box" id="name"  type="number" step="0.01" min="0" placeholder="Total Instalments" name="name" />
                                  <!-- <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["total_seats"]!==""'>Total Seats is required</small> -->
                              </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4">
                                <div class="mb-1">
                                    <label class="input-label" for="name">Amount Per Instalment</label>
                                    <input v-model="installmentsAndDeposit.amount_per_installment" class="input-box" id="name"  type="number" step="0.01" min="0" placeholder="Amount Per Instalment" name="name" />
                                    <!-- <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["accomodation_details"]!==""'>Accomodation Details is required</small> -->
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4">
                                <div class="mb-1">
                                <label class="input-label" for="enrollment_date">Initial Deposit</label>
                                <input v-model="installmentsAndDeposit.initial_deposit" class="input-box" id="name"  type="number" step="0.01" min="0" placeholder="Initial Deposit" name="name" />
                                <!-- <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["start_date"]!==""'>Start Date is required</small> -->
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4">
                                <div class="mb-1">
                                <label class="input-label" for="enrollment_date">Due Date For Initial Deposit</label><br>
                                <date-picker v-model:value="installmentsAndDeposit.initial_deposit_due_date" class="input-box"
                                  format="DD/MM/YYYY" value-type="date" append-to-body='true'
                                  >
                                </date-picker>
                                <!-- <input v-model="installmentsAndDeposit.initial_deposit_due_date" class="input-box" id="name"  type="date" placeholder="Deadline For Initial Deposit" name="name" /> -->
                                <!-- <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["start_date"]!==""'>Start Date is required</small> -->
                                </div>
                            </div>
                            <template v-if="installmentsAndDeposit.total_installments>0">
                              <div v-for="(item,index) in installmentsAndDeposit.total_installments" :key="item" class="col-xl-4 col-lg-4 col-md-4">
                                  <div class="mb-1">
                                  <label class="input-label" for="enrollment_date">Due Date For Instalment {{ index+1 }}</label>
                                  <date-picker v-model:value="installmentsAndDeposit.other_installments_due_date[index]" @change="validateInstallmentDate(index)" class="input-box"
                                    format="DD/MM/YYYY" value-type="date" append-to-body='true'
                                    >
                                  </date-picker>
                                  <!-- <input v-model="installmentsAndDeposit.other_installments_due_date[index]" @input="validateInstallmentDate(index)"  class="input-box" id="name"  type="date" placeholder="Deadline For Instalment {{ index+1 }}" name="name" /> -->
                                  <!-- <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["start_date"]!==""'>Start Date is required</small> -->
                                  </div>
                              </div>
                            </template>
                          </div>

                          <div class="mb-1">
                            <div class="upload-container">
                                <div v-if="imageFileUrl" class="image-preview">
                                    <img :src="imageFileUrl" alt="Image Preview" />
                                </div>
                                <p class="form-label">Item Image</p>
                                <input type="file" id="file-input" @change="handleImageUpload" />
                                <label for="file-input" class="file-input-label">
                                <span v-if="!imageFileName">Choose a file</span>
                                <span v-else>{{ imageFileName }}</span>
                                </label>
                            </div>
                            <br>
                            <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["image"]!==""'>Image is required</small>
                          </div>

                        </form>
                      </div>
                    </div>
                    </div>
                  </div>
                  <div class="d-flex justify-content-center bg-white box-shadow-dark border-radius-lg col-xl-10 col-lg-10 col-md-10">
                      <div class="">
                        <button @click="updateItem" style="font-size: 12px; background-color: #573078;" class="btn mt-3 ms-5 text-white fw-5 border-0 py-2 px-5  border-radius-lg"> Save Item </button>
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
  import MultiSelect from "../components/MultiSelect.vue";
  import moment from 'moment';
  import DatePicker from 'vue-datepicker-next';
  import 'vue-datepicker-next/index.css';

  export default {
    name: '',
    components: {
      MultiSelect,
      DatePicker
    },
    mounted() {
      this.getUser();
      this.editItem();
      this.getAllShops();
      this.getAllCourses();
      this.getSchools();
      this.getProductTypes();
      this.$globalHelper.buttonColor();
    },
    updated(){
      this.$permissions.redirectIfNotAllowed('edit_shop');
    },
    watch: {
      'newItem.quantity'(value) {
        if (value < 0) {
          this.newItem.quantity = 0;
        } else if (!Number.isInteger(value)) {
          this.newItem.quantity = Math.floor(value);
        }
      },
      // 'newItem.price'(value) {
      //   this.newItem.price = parseFloat(value).toFixed(2);
      // }
    },
    data() {
      return {
        isQuantityEnabled:false,
        paymentPlan:'',
        installmentsAndDeposit:{
          total_installments:null,
          amount_per_installment:null,
          initial_deposit:null,
          initial_deposit_due_date:null,
          other_installments_due_date:[],
        },
        validationError:'',
        isError:false,
        productTypes:['Trip','Resources','Uniforms','Print Credit','Exams','Bus Passes','Additional'],
        schoolsList:null,
        coursesList:null,
        productTypesList:null,
        imageFileName:"",
        imageFileUrl:"",
        selectedImageFile:"",
        formValidation:"",
        allAttributes:'',
        allShops:'',
        selectedAttrs:[],
        user:"",
        visibilityOptions:[
          {"name": "Available to Staff",},
          {"name": "Available to Students",},
          {"name": "Available to Parents",}
        ],
        limitColleges:[
          {"name": "Available to Staff",},
          {"name": "Available to Students",},
          {"name": "Available to Parents",}
        ],
        limitCourses:'',
        newItem: {
            name:'',
            product_type:'',
            price:'',
            quantity: '',
            detail:'',
            image:'',
            shop_id:'',
            valid_from:'',
            valid_to:'',
            visibility_options:null,
            payment_plan:null,
            installmentsAndDeposit:null,
            limitCourses:null,
            limitColleges:null,
            product_owner_email:null,
        },
        availableStatus:['active','pending','blocked'],
        allSchools:'',
      }
    },
    methods:{

      validateExpiryDate() {
        const { valid_from, valid_to } = this.newItem;
        if (valid_from && valid_to) {
            const startDate = new Date(valid_from);
            const endDate = new Date(valid_to);

            if (startDate >= endDate) {
                this.newItem.valid_to = null;
            }
        }
      },
      
      validateInstallmentDate(index) {
        const dates = this.installmentsAndDeposit.other_installments_due_date;
        if (index > 0 && dates[index]) {
          const previousDate = new Date(dates[index - 1]);
          const currentDate = new Date(dates[index]);
          const isAfterPreviousDate = currentDate > previousDate;
          if (!isAfterPreviousDate) {
            dates.splice(index, 1);
          }
        }
      },

      handleIntegerInput(event) {
        const value = event.target.value;
        if (value && !Number.isInteger(Number(value))) {
          this.installmentsAndDeposit.total_installments = Math.floor(value); // removes decimals
        }
      },
      snackbarMsg(message) {
        this.$snackbar.add({
          type: 'success',
          text: message,
          background: 'white',
        })
      },
      //------------VALIDATE FORM-------------
      validateForm(){
        this.$permissions.redirectIfNotAllowed('edit_shop');
        let status=false
        let validate=''
        validate=cloneDeep(this.newItem)
        for(let item in this.newItem){
          if ((this.newItem[item] === '' || this.newItem[item] === undefined)) {
            if((item=='shop_id' && (this.user.role=='super_admin' || this.user.role=='organization_admin'))){
              validate[item]="is required"
              status=true
            }
            validate[item]="is required"
            status=true
          }else{
            validate[item]=''
          }
        }
        this.formValidation=validate
        return status;
      },
      //------------GET USER----------------
      getUser(){
        let user=localStorage.getItem('user')
        user= JSON.parse(user)
        this.user=user
      },
      //-------------GET Product Types----------
      async getProductTypes(){
        try {
          let url='/getProductTypesForDropdown'
          const response= await axiosClient.get(url)
          this.productTypesList=response.data
        } catch (error) {
          console.log(error)
        }
      },
      //------------UPDATE ITEM------------
      async updateItem() {
        // if(this.validateForm()){
        //   return;
        // }
        this.installmentsAndDeposit.initial_deposit_due_date= this.installmentsAndDeposit.initial_deposit_due_date ? this.installmentsAndDeposit.initial_deposit_due_date.toISOString().split('T')[0] :null;
        const formData = new FormData();
        formData.append('image', this.selectedImageFile);
        formData.append('installmentsAndDeposit',JSON.stringify(this.installmentsAndDeposit));
        formData.append('product_type',this.newItem.product_type);
        formData.append('payment_plan', this.newItem.payment_plan);
        formData.append('name', this.newItem.name);
        formData.append('price', this.newItem.price);
        if(!this.isQuantityEnabled){
        formData.append('quantity','');
        }else{
          formData.append('quantity', this.newItem.quantity);
        }
        formData.append('detail', this.newItem.detail);
        formData.append('shop_id', this.newItem.shop_id);
        formData.append('valid_from',this.newItem.valid_from.toISOString().split('T')[0]);
        formData.append('valid_to', this.newItem.valid_to.toISOString().split('T')[0]);
        formData.append('product_owner_email', this.newItem.product_owner_email);
        formData.append('visibility_options', JSON.stringify(this.newItem.visibility_options));
        formData.append('limitColleges', JSON.stringify(this.newItem.limitColleges));
        formData.append('limitCourses', JSON.stringify(this.newItem.limitCourses));

        let id = this.$route.params.id
        try {
          const apiUrl =`/updateShopItem/${id}?_method=PUT`;
          await axiosClient.post(apiUrl, formData)
          this.$router.push({ name: 'shop-items' })
          this.snackbarMsg('Item Updated Successfuly')
          this.isError=false
        } catch (error) {
          this.validationError=error.response.data.errors
          this.isError=true
        }
      },
    //------------EDIT SHOP ITEM------------
    async editItem() {
    let id = this.$route.params.id
    try {
        let response= await axiosClient.get('/editShopItem/'+id)
        response=response.data
        this.setShopItem(response)
    } catch (error) {
        console.log(error)
    }
    },
    setShopItem(data){
        this.newItem.name=data.name
        this.newItem.price=data.price
        this.newItem.quantity=data.quantity
        this.isQuantityEnabled = data.quantity !== null && data.quantity !== undefined;
        this.newItem.product_type=data.product_type;
        this.newItem.shop_id=data.shop_id
        this.newItem.attribute_id=data.attribute_id
        this.newItem.detail=data.detail
        this.newItem.attributes=data.attributes
        this.newItem.valid_from = data.valid_from ? moment(data.valid_from, 'YYYY-MM-DD').toDate() : null;
        this.newItem.valid_to = data.valid_to ? moment(data.valid_to, 'YYYY-MM-DD').toDate() : null;
        this.newItem.product_owner_email=data.product_owner_email
        this.newItem.visibility_options=data.visibility_options ? data.visibility_options : []
        this.newItem.limitColleges=data.limit_colleges ? data.limit_colleges : []
        this.newItem.limitCourses=data.limit_courses ? data.limit_courses : []
        this.newItem.payment_plan=data.payment_plan
        this.imageFileUrl=this.$env_vars.BASE_URL + data.image
        if(data.payment)
        {
          this.installmentsAndDeposit.total_installments=data.payment.total_installments
          this.installmentsAndDeposit.amount_per_installment=data.payment.amount_per_installment
          data.payment.other_installments_deadline_installments = data.payment.other_installments_deadline_installments.map(installment_date =>
              installment_date ? moment(installment_date, 'YYYY-MM-DD').toDate() : null
          );
          this.installmentsAndDeposit.other_installments_due_date=data.payment.other_installments_deadline_installments
          this.installmentsAndDeposit.initial_deposit_due_date=data.payment.initial_deposit_due_date ? moment(data.payment.initial_deposit_due_date, 'YYYY-MM-DD').toDate() : null
          this.installmentsAndDeposit.initial_deposit=data.payment.initial_deposit

        }
    },

    //-------------HANDLE IMAGE UPLOAD-----------
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
          this.imageFileName = file.name;
          const reader = new FileReader();
          reader.onload = (e) => {
          this.imageFileUrl = e.target.result;
          };
          reader.readAsDataURL(file);
          this.selectedImageFile=file;
      }
    },
    //-------------GET ALL COURSE----------
    async getAllCourses(){
      try {
        let url='/getCoursesForDropdown'
        const response= await axiosClient.get(url)
        this.coursesList=response.data
      } catch (error) {
        console.log(error)
      }
    },

    //------------PAYMENT PLAN-------------
    changePaymentPlan(plan){
      if(this.newItem.payment_plan==plan){
        this.newItem.payment_plan=''
      }else{
        this.newItem.payment_plan=plan
      }
    },

    //------------GET SCHOOLS AND COURSES-------------
    async getSchools(){
      try {
        let response=await axiosClient.get('/getAllSchoolsCourses')
        console.log(response)
        this.schoolsList=response.data.schools ? response.data.schools :null
      } catch (error) {
        console.log(error)
      }
    },
    //-------------STORE ALL Attributes----------
    handleAttributes(data){
      console.log('attrs',data)
        this.newItem.attributes=[]
        data.filter((item)=>{
          this.newItem.attributes.push(item.id);
        })
    },
    //-------------HANDLE THE COURSES------
    handleCourses(data){
      this.newItem.limitCourses=[]
      data.filter((item)=>{
        this.newItem.limitCourses.push({name: item.name});
      })
    },
    //-------------HANDLE THE COLLEGES------
    handleColleges(data){
      this.newItem.limitColleges=[]
      data.filter((item)=>{
        this.newItem.limitColleges.push({name: item.name});
      })
    },
    //-------------HANDLE THE Visibility------
    handleVisibility(data){
      this.newItem.visibility_options=[]
      data.filter((item)=>{
        this.newItem.visibility_options.push({ name: item.name });
      })
    },
    //-------------GET ALL SHOPs----------
    async getAllShops(){
      try {
        const response= await axiosClient.get('/getAllSchoolShop')
        this.allShops=response.data
      } catch (error) {
        console.log(error)
      }
    },

    }
  }
  </script>
  
  <style scoped>
    
#file-input {
  display: none;
}

.file-input-label {
  display: inline-block;
  padding: 5px 12px;
  color: #fff;
  background-color: #89BF40;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.file-input-label span{
    font-size: 12px !important;
}

.file-input-label:hover {
  background-color: #89BF40;
}

  .file-input-label span {
  display: inline-block;
  margin: 0;
  font-size: 16px;
}

.image-preview {
  margin-top: 20px;
}

.image-preview img {
  max-width: 100%;
  max-height: 80px;
  border-radius: 8px;
  border: 1px solid #ddd;
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

   
#file-input {
  display: none;
}

.file-input-label {
  display: inline-block;
  padding: 5px 12px;
  color: #fff;
  background-color: #89BF40;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.file-input-label span{
    font-size: 12px !important;
}

.file-input-label:hover {
  background-color: #89BF40;
}

  .file-input-label span {
  display: inline-block;
  margin: 0;
  font-size: 16px;
}

.image-preview {
  margin-top: 20px;
}

.image-preview img {
  max-width: 100%;
  max-height: 80px;
  border-radius: 8px;
  border: 1px solid #ddd;
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
  