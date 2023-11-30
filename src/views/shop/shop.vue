

<template>
    <div class="container-fluid py-4">
      <div class="row">
        <div class="col-12">
          <div class="card my-4">
            <div class="card-body px-0 pb-2">
              <div class="table-responsive p-0">
                <div>
                  <div class="filter-container">
                    <input class="input-box filter-box" id="name" type="text" placeholder="Type to Search..." name="address" />
                    <select class="select-box filter-type-btn" v-model="filterBy" id="filter" type="select" placeholder="Filter" name="filter">
                      <option value="" disabled selected>Filter</option>
                      <option v-for="(item, index) in allFields" :key="index" :value="item">
                        {{ item }}
                      </option>
                    </select>
                    <i class="fas fa-filter filter-icon me-1"></i>
                  </div>              
                </div>
                <table class="table align-items-center mb-0">
                  <thead>
                    <tr>
                      <th class="text-uppercase align-middle text-center text-secondary text-xxs font-weight-bolder opacity-7">
                        ID
                      </th>
                      <th class="text-uppercase align-middle text-center text-secondary text-xxs font-weight-bolder opacity-7">
                        Item
                      </th>
                      <th class="text-uppercase align-middle text-center text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                        Type
                      </th>
                      <th class="text-uppercase align-middle text-center text-secondary text-xxs font-weight-bolder opacity-7">
                        Price
                      </th>
                      <th class="text-center align-middle text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Status
                      </th>
                      <th class="text-center align-middle text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Action
                      </th>                  
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs font-weight-bold">1</span>
                    </td>
                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs ">Snacks</span>
                    </td>
                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs ">Snacks</span>
                    </td>
                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs ">£4</span>
                    </td>
                      <td class="align-middle text-center text-sm">
                        <span class="badge badge-sm bg-gradient-success"
                          >available</span
                        >
                      </td>
                      
                      <td class="align-middle text-center text-sm">
                        <span  v-if="user && user.role=='student'" class="badge badge-sm bg-gradient-primary me-1">Checkout</span >
                         <span  v-if="user && user.role=='super_admin' || user.role=='school_user'">
                            <i class="material-icons-round opacity-10 fs-5 cursor-pointer">edit</i>
                            <i  class="material-icons-round opacity-10 fs-5 cursor-pointer">delete</i>
                        </span>
                      </td>
                    </tr>
                    <tr>
                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs font-weight-bold">2</span>
                    </td>
                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs ">Highlighters</span>
                    </td>
                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs ">Stationary</span>
                    </td>
                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs ">£8</span>
                    </td>
                      <td class="align-middle text-center text-sm">
                        <span class="badge badge-sm bg-gradient-warning"
                          >outofstock</span
                        >
                      </td>
                      
                      <td class="align-middle text-center text-sm">
                        <span  v-if="user && user.role=='student'" class="badge badge-sm bg-gradient-primary me-1">Checkout</span >
                         <span  v-if="user && user.role=='super_admin' || user.role=='school_user'">
                            <i class="material-icons-round opacity-10 fs-5 cursor-pointer">edit</i>
                            <i  class="material-icons-round opacity-10 fs-5 cursor-pointer">delete</i>
                        </span>
                      </td>
                    </tr>
                    <tr>
                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs font-weight-bold">3</span>
                    </td>
                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs ">Calculator</span>
                    </td>
                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs ">School Supplies</span>
                    </td>
                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs ">£11</span>
                    </td>
                      <td class="align-middle text-center text-sm">
                        <span class="badge badge-sm bg-gradient-warning"
                          >outofstock</span
                        >
                      </td>
                      
                      <td class="align-middle text-center text-sm">
                        <span  v-if="user && user.role=='student'" class="badge badge-sm bg-gradient-primary me-1">Checkout</span >
                         <span  v-if="user && user.role=='super_admin' || user.role=='school_user'">
                            <i class="material-icons-round opacity-10 fs-5 cursor-pointer">edit</i>
                            <i  class="material-icons-round opacity-10 fs-5 cursor-pointer">delete</i>
                        </span>
                      </td>
                    </tr>
                    <tr>
                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs font-weight-bold">4</span>
                    </td>
                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs ">WorkBook</span>
                    </td>
                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs ">Book</span>
                    </td>
                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs ">£10</span>
                    </td>
                      <td class="align-middle text-center text-sm">
                        <span class="badge badge-sm bg-gradient-success"
                          >available</span
                        >
                      </td>
                      
                      <td class="align-middle text-center text-sm">
                        <span  v-if="user && user.role=='student'" class="badge badge-sm bg-gradient-primary me-1">Checkout</span >
                         <span  v-if="user && user.role=='super_admin' || user.role=='school_user'">
                            <i class="material-icons-round opacity-10 fs-5 cursor-pointer">edit</i>
                            <i  class="material-icons-round opacity-10 fs-5 cursor-pointer">delete</i>
                        </span>
                      </td>
                    </tr>
                    <tr>
                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs font-weight-bold">5</span>
                    </td>
                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs ">Pens</span>
                    </td>
                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs ">Stationary</span>
                    </td>
                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs ">£10</span>
                    </td>
                      <td class="align-middle text-center text-sm">
                        <span class="badge badge-sm bg-gradient-success"
                          >available</span
                        >
                      </td>
                      
                      <td class="align-middle text-center text-sm">
                        <span  v-if="user && user.role=='student'" class="badge badge-sm bg-gradient-primary me-1">Checkout</span >
                         <span  v-if="user && user.role=='super_admin' || user.role=='school_user'">
                            <i class="material-icons-round opacity-10 fs-5 cursor-pointer">edit</i>
                            <i  class="material-icons-round opacity-10 fs-5 cursor-pointer">delete</i>
                        </span>
                      </td>
                    </tr>
                    <tr>
                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs font-weight-bold">6</span>
                    </td>
                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs ">Highlighters</span>
                    </td>
                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs ">Stationary</span>
                    </td>
                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs ">£8</span>
                    </td>
                      <td class="align-middle text-center text-sm">
                        <span class="badge badge-sm bg-gradient-warning"
                          >outofstock</span
                        >
                      </td>
                      
                      <td class="align-middle text-center text-sm">
                        <span  v-if="user && user.role=='student'" class="badge badge-sm bg-gradient-primary me-1">Checkout</span >
                         <span  v-if="user && user.role=='super_admin' || user.role=='school_user'">
                            <i class="material-icons-round opacity-10 fs-5 cursor-pointer">edit</i>
                            <i  class="material-icons-round opacity-10 fs-5 cursor-pointer">delete</i>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "tables",
    mounted(){
        const userData = localStorage.getItem('user');
        if (userData) {
        this.user = JSON.parse(userData);
        }
    },
    data(){
    return{
        user:'',
        filterBy:'',
        allFields:['Clear','Account','Type','Amount','Date','Status'],
    }
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
  
  </style>
  
    