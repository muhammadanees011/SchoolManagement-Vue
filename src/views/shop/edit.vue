<template>
    <div class="container-fluid py-4">
      <div class="row">
        <div class="col-12">
          <div class="card my-4">
            <div class="d-flex justify-content-between  border-radius-lg pt-4 pb-3">
                <h6 class="text-dark text-capitalize ps-3">Edit Shop Item</h6>
              </div>
            
              <div class="card-body px-0 pb-2">
              <div class="table-responsive p-0">
                <div class="row py-1 d-flex justify-content-center bg-white form-data border-radius-lg">
                  <div class="bg-white box-shadow-dark border-radius-lg col-xl-10 col-lg-10 col-md-10">
                    <div class="form-bg container p-4">
                    <div class="card card-plain">
                      <div class="card-body">
                        <form role="form">
                          <div class="mb-1">
                            <label class="input-label" for="name">Name</label>
                            <input class="input-box" id="name" v-model="newItem.name" type="text" placeholder="Name" name="name" />
                            <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["name"]!==""'>Name is required</small>
                          </div>
                          <div class="mb-1">
                            <label class="input-label" for="name">Price</label>
                            <input class="input-box" id="price" v-model="newItem.price" type="number" placeholder="price" name="price" />
                            <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["price"]!==""'>Price is required</small>
                          </div>
                          <div class="mb-1">
                            <label class="input-label" for="name">Quantity</label>
                            <input class="input-box" id="quantity" v-model="newItem.quantity" type="number" placeholder="Quantity" name="quantity" />
                            <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["quantity"]!==""'>Quantity is required</small>
                          </div>
                          <div class="mb-1">
                            <label class="input-label" for="name">Detail</label>
                            <input class="input-box" id="name" v-model="newItem.detail" type="text" placeholder="Detail" name="detail" />
                            <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["detail"]!==""'>Detail is required</small>
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
                            <!-- <select class="select-box" v-model="newItem.attribute_id" id="attribute" type="select" placeholder="Attribute" name="attribute">
                              <option v-for="(item, index) in allAttributes" :key="index" :value="item.id">
                                {{ item.name }}
                              </option>
                            </select> -->
                          </div>
                          <div v-if="user.role=='super_admin' || user.role=='organization_admin'" class="mb-1">
                            <label class="input-label" for="phone">Shop</label>
                            <br />
                            <select class="select-box" v-model="newItem.shop_id" id="shop" type="select" placeholder="shop" name="shop">
                              <option v-for="(item, index) in allShops" :key="index" :value="item.id">
                                {{ item.shop_name }}
                              </option>
                            </select>
                            <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["shop_id"]!==""'>Shop is required</small>
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


  export default {
    name: '',
    components: {
      MultiSelect
      // MaterialButton,
    },
    mounted() {
      this.getUser();
      this.editItem();
      this.getAllAttributes();
      this.getAllShops();
    },
    data() {
      return {
        formValidation:"",
        allAttributes:'',
        allShops:'',
        selectedAttrs:[],
        user:"",
        newItem: {
            name:'',
            attributes:[],
            price:'',
            quantity: '',
            detail:'',
            attribute_id:'',
            shop_id:'',
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
      //------------VALIDATE FORM-------------
      validateForm(){
        let status=false
        let validate=''
        validate=cloneDeep(this.newItem)
        for(let item in this.newItem){
          if ((this.newItem[item] === '' || this.newItem[item] === undefined)&& (item!=='attribute_id')) {
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
      //------------UPDATE ITEM------------
      async updateItem() {
        if(this.validateForm()){
          return;
        }
        let id = this.$route.params.id
        try {
          await axiosClient.put('/updateShopItem/'+id, this.newItem)
          this.$router.push({ name: 'shop-items' })
          this.snackbarMsg('Item Updated Successfuly')
        } catch (error) {
          console.log(error)
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
        this.newItem.shop_id=data.shop_id
        this.newItem.attribute_id=data.attribute_id
        this.newItem.detail=data.detail
        this.newItem.attributes=data.attributes
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
        if(this.newItem.attributes.includes(item.id)){
          this.selectedAttrs.push(item)
        }
      })
    },
    //-------------STORE ALL Attributes----------
    handleAttributes(data){
      console.log('attrs',data)
        this.newItem.attributes=[]
        data.filter((item)=>{
          this.newItem.attributes.push(item.id);
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
  </style>
  