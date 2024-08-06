

<template>
    <div class=" py-4">
      <div class="row">
        <div class="col-12">
          <div class="card my-4">
            <div class="card-body px-0 pb-2">
              <div class="table-responsive p-0">
                <div>
                  <div class="filter-container">
                    <h5 class="ms-3">Pending Installments</h5>
                    <!-- <input class="input-box filter-box mb-3 ms-4" id="name" type="text" placeholder="Type to Search..." name="address" /> -->
                  </div>              
                </div>
    
                    <div class="card-body pt-1 p-3">
                        <div class="container-fluid mt-1">

                        <template v-for="(data,index) in shopItems" :key="index">

                          <div class="listNavigation">
                              <div class="listNavigation__lists">
                                  <!-- <div class="listNavigation__header">
                                      Very simple List navigation
                                  </div> -->
                                  <ul class="listNavigation__list">
                                      <li class="list__item">
                                          <a href="#" class="item__link">
                                              <div class="item__icon">
                                                <img :src="$env_vars.BASE_URL + data.image" alt="image" class="shadow-sm border-radius-lg product-img" />
                                              </div>
                                              <div class="item__content">
                                                  <h4 class="label text-sm">Installment No.{{ data.installment_no }}</h4>
                                                  <p class="label text-success">Installment Amount - £{{ formattedAmount(data.installment_amount) }}
                                                  </p>
                                                  <div class="description">{{ data.name }} ({{ data.product_type }})</div>
                                              </div>
                                              <div class="item__metaInfo">
                                                  <span class="iconUxt arrowSingleRight" aria-hidden="true"></span>
                                              </div>
                                          </a>
                                          <template v-if="user.role=='student' || user.role=='staff'">
                                            <button @click="payNow(data.id)" style="font-size: 12px; background-color: #573078;" class="me-3 trips-btn w-15  text-white fw-5 p-2 border-radius-lg"> Pay now</button>                                            
                                          </template>
                                          <div v-if="user.role=='super_admin' || user.role=='organization_admin'" class="">
                                              <h4 class="label text-sm text-warning">Buyer</h4>
                                              <h4 class="label text-sm"> {{ data.buyer_name }}</h4>
                                              <p class="label text-success">{{ data.buyer_email }}
                                              </p>
                                          </div>
                                        </li>
                                      <!-- Repeat for other list items -->
                                  </ul>
                              </div>
                          </div>
                                         
                        </template>
                        <div v-if="shopItems.length==0" class="row list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
                            <small class="d-flex justify-content-center">No products found!</small>
                        </div>
                        </div>
                    </div>

                    <div class="row">
                      <div class="col-md-12 col-lg-12">
                        <nav class="page-nav" aria-label="Page navigation">
                          <ul class="pagination mt-4 mb-4">
                              <!-- Previous Page -->
                              <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
                                  <i class="page-link material-icons-round opacity-10 fs-5" :disabled="currentPage === 1"
                                      @click="getShopItems(currentPage - 1)" tabindex="-1"
                                      aria-disabled="true">arrow_back</i>
                              </li>
                              <!-- Page Numbers -->
                              <li class="page-item" v-for="pageNumber in totalPages" :key="pageNumber"
                                  :class="{ 'active': currentPage === pageNumber }">
                                  <a class="page-link" href="#" @click="getShopItems(pageNumber)">{{ pageNumber }}</a>
                              </li>
                              <!-- Next Page -->
                              <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
                                  <i class="page-link material-icons-round opacity-10 fs-5"
                                      :disabled="currentPage === totalPages" @click="getShopItems(currentPage + 1)"
                                      tabindex="-1" aria-disabled="true">arrow_forward</i>
                              </li>
                          </ul>
                        </nav>
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
  import { mapGetters } from 'vuex'
  import Swal from 'sweetalert2';
  import moment from 'moment';

  export default {
    name: "tables",
    mounted(){
      this.getUser();
      this.getShopItems();
    },
    updated(){
      if(this.user.role=='student'){
        return
      }else{
        this.$permissions.redirectIfNotAllowed('view_shop');
      }
    },
    computed: {
      ...mapGetters(['getBrandingSetting']),
      userPermissions() {
        return this.$permissions.userPermissions.value;
      },
    },
    data(){
    return{
      shopItems:'',
      user:'',
      filterBy:'',
      allFields:['Clear','Account','Type','Amount','Date','Status'],
      totalRows:'',
      currentPage:'',
      perPage:'',
      totalPages:'',
    }
    },
    methods:{
      confirmDelete(id) {
        Swal.fire({
          title: 'Are you sure?',
          text: "Item will be deleted permanently and you will not be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
          customClass: {
            popup: 'custom-swal'
          }
        }).then((result) => {
          if (result.isConfirmed) {
            this.deleteShopItem(id)
          }
        });
      },

      snackbarMsg(message) {
      this.$snackbar.add({
        type: 'success',
        text: message,
        background: 'white',
      })
      },

    getUser(){
        const userData = localStorage.getItem('user');
        if (userData) {
          this.user = JSON.parse(userData);
        }
      },

    formattedPrice(value){
      const formattedValue = parseFloat(value).toFixed(2);
      return formattedValue;
    },

      async getShopItems(page){
        let data={
          'page':page
        }
        try {
          const response=await axiosClient.post('/getMyInstallments',data)
          this.shopItems=response.data.data;
          this.totalRows = response.data.pagination.total;
          this.currentPage = response.data.pagination.current_page;
          this.perPage = response.data.pagination.per_page;
          this.totalPages = response.data.pagination.last_page;
        } catch (error) {
          console.log(error)
        }
      },

      async deleteShopItem(id){
        try {
          await axiosClient.delete('/deleteShopItem/'+id)
          this.getShopItems();
          this.snackbarMsg('Item Removed Successfuly')
        } catch (error) {
          console.log(error)
        }
      },

      payNow(id){
        this.$router.push({ name: 'pay-installment', params: { id: id }});
      },

      //------------Add Item To Cart-----------
      async addToCart(itemId){
        let user=localStorage.getItem('user')
        user= JSON.parse(user)
        let data={
          'user_id':user.id,
          'shop_item_id':itemId
        }
        try {
          await axiosClient.post('/addItemToCart',data)
          this.snackbarMsg('Item Added to Cart')
        } catch (error) {
          console.log(error)
        }
      },
      
      //------------REMOVE Item FROM LIST-----------
      removeShopItem(id) {
        const indexToRemove = this.shopItems.findIndex((item) => item.id === id)
        this.shopItems.splice(indexToRemove, 1)
      },

      editShopItem(id){
        this.$router.push({ name: 'edit-shop-items', params: { id } });
      },

    //------------FORMAT DATE--------------
    formatDateString(dateString) {
        const parsedDate = moment(dateString);
        const formattedDate = parsedDate.format('DD MMMM YYYY, HH:mm');
        return formattedDate;
    },

    //--------------FORMAT AMOUNT---------------
    formattedAmount(value){
    const formattedValue = parseFloat(value).toFixed(2);
    return formattedValue;
    },

    },
  };
  </script>
  <style>
  .filter-box{
    margin-left: 1%;
    width: 25%;
    font-size: 12px;
  }
  .filter-type-btn{
    margin-right:1%;
    width:10% !important;
  }
  .filter-container {
    position: relative;
    display: flex;
    justify-content: space-between;
  }
  .filter-icon {
    position: absolute;
    top: 50%;
    right: 10px; /* Adjust the right distance as needed */
    transform: translateY(-50%);
    color: #555; /* Adjust the color as needed */
    cursor: pointer;
  }
  thead{
  background-color: var(--navheader-bg-color) !important;
  }
  tbody > tr:hover{
    background-color: #F0F2F5 !important;
  }
  thead tr:hover{
    background-color: var(--navheader-bg-color) !important;
  }
  .product-img{
    height: 50px;
    width: 50px;
  }

.listNavigation {
    font-family: 'Siemens Sans', sans-serif;
}

.listNavigation__header {
    font-weight: bold;
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 10px;
}

.listNavigation__list {
    list-style: none;
    padding: 0;
}

.list__item {
    display: flex;
    align-items: center;
    justify-content: space-between; /* Ensure content spreads across the item */
    padding: 10px;
    border-bottom: 1px solid #e0e0e0;
}

.item__link {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
    flex-grow: 1; /* Allow link to take available space */
}

.item__icon {
    margin-right: 10px;
}

.item__image {
    width: 40px; /* Adjust as needed */
    height: 40px; /* Adjust as needed */
}

.item__content {
    flex-grow: 1;
}

.label {
    font-size: 14px;
    line-height: 20px;
    margin: 0;
}

.description {
    font-size: 12px;
    line-height: 16px;
    color: #666;
}

.item__metaInfo {
    display: flex;
    align-items: center;
}

.iconUxt {
    font-size: 16px;
}

.actionButton {
    padding: 10px 20px;
    background-color: #007ac8;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 10px;
}

/* Additional styles for item states */
.list__item:hover {
    background-color: #f0f0f0;
}

.list__item:focus {
    outline: 2px solid #007ac8;
}

.list__item.current {
    background-color: #e0f7fa;
}

.list__item:active {
    background-color: #c0c0c0;
}

 </style>
  
    