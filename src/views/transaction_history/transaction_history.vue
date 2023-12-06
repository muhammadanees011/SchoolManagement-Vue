

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
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Account
                      </th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        User
                      </th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Type
                      </th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                        Amount
                      </th>
                      <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Date
                      </th>
                      <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Payment Method
                      </th>
                      <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Status
                      </th>
                      <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Action
                      </th>                  
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div class="d-flex px-2 py-1">
                          <div>
                          </div>
                          <div class="d-flex flex-column justify-content-center">
                            <p class="text-xs text-secondary mb-0">
                              pm_1LaXpKGUcADgqoEMl0Cx0Ygg
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="d-flex px-2 py-1">
                          <div>
                          </div>
                          <div class="d-flex flex-column justify-content-center">
                            <p class="text-xs text-secondary mb-0">
                              Nhlaka
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p class="text-xs text-secondary mb-0">Health Care Funds</p>
                      </td>
                      <td>
                        <p class="text-xs text-secondary mb-0">£10</p>
                      </td>
                      <td class="align-middle text-center">
                        <span class="text-secondary text-xs "
                          >23/04/18</span
                        >
                      </td>
                      <td class="align-middle text-center">
                        <span class="text-secondary text-xs ">Stripe</span>
                      </td>
                      <td class="align-middle text-center text-sm">
                        <span class="badge badge-sm bg-gradient-success"
                          >success</span
                        >
                      </td>
                      
                      <td class="align-middle text-center text-sm">
                        <i class="material-icons-round opacity-10 fs-5 cursor-pointer">receipt</i>
                        <i class="material-icons-round opacity-10 fs-5 cursor-pointer">delete</i>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div class="d-flex px-2 py-1">
                          <div>
                          </div>
                          <div class="d-flex flex-column justify-content-center">
                            <p class="text-xs text-secondary mb-0">
                              pm_1LaXpKGUcADgqoEMl0Cx0Ygg
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="d-flex px-2 py-1">
                          <div>
                          </div>
                          <div class="d-flex flex-column justify-content-center">
                            <p class="text-xs text-secondary mb-0">
                              Peter
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p class="text-xs text-secondary mb-0">School Shop Funds</p>
                      </td>
                      <td>
                        <p class="text-xs text-secondary mb-0">£15</p>
                      </td>
                      <td class="align-middle text-center">
                        <span class="text-secondary text-xs "
                          >23/04/18</span
                        >
                      </td>
                      <td class="align-middle text-center">
                        <span class="text-secondary text-xs ">Stripe</span>
                      </td>
                      <td class="align-middle text-center text-sm">
                        <span class="badge badge-sm bg-gradient-success"
                          >success</span
                        >
                      </td>
                      
                      <td class="align-middle text-center text-sm">
                        <i class="material-icons-round opacity-10 fs-5 cursor-pointer">receipt</i>
                        <i class="material-icons-round opacity-10 fs-5 cursor-pointer">delete</i>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div class="d-flex px-2 py-1">
                          <div>
                          </div>
                          <div class="d-flex flex-column justify-content-center">
                            <p class="text-xs text-secondary mb-0">
                              pm_1LaXpKGUcADgqoEMl0Cx0Ygg
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="d-flex px-2 py-1">
                          <div>
                          </div>
                          <div class="d-flex flex-column justify-content-center">
                            <p class="text-xs text-secondary mb-0">
                              Saim
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p class="text-xs text-secondary mb-0">Meal Funds</p>
                      </td>
                      <td>
                        <p class="text-xs text-secondary mb-0">£25</p>
                      </td>
                      <td class="align-middle text-center">
                        <span class="text-secondary text-xs "
                          >23/04/18</span
                        >
                      </td>
                      <td class="align-middle text-center">
                        <span class="text-secondary text-xs "
                          >Stripe</span
                        >
                      </td>
                      <td class="align-middle text-center text-sm">
                        <span class="badge badge-sm bg-gradient-danger"
                          >declined</span
                        >
                      </td>
                      
                      <td class="align-middle text-center text-sm">
                        <i class="material-icons-round opacity-10 fs-5 cursor-pointer">receipt</i>
                        <i class="material-icons-round opacity-10 fs-5 cursor-pointer">delete</i>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div class="d-flex px-2 py-1">
                          <div>
                          </div>
                          <div class="d-flex flex-column justify-content-center">
                            <p class="text-xs text-secondary mb-0">
                              pm_1LaXpKGUcADgqoEMl0Cx0Ygg
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="d-flex px-2 py-1">
                          <div>
                          </div>
                          <div class="d-flex flex-column justify-content-center">
                            <p class="text-xs text-secondary mb-0">
                              John
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p class="text-xs text-secondary mb-0">Trip Funds</p>
                      </td>
                      <td>
                        <p class="text-xs text-secondary mb-0">£18</p>
                      </td>
                      <td class="align-middle text-center">
                        <span class="text-secondary text-xs "
                          >23/04/18</span
                        >
                      </td>
                      <td class="align-middle text-center">
                        <span class="text-secondary text-xs ">Stripe</span>
                      </td>
                      <td class="align-middle text-center text-sm">
                        <span class="badge badge-sm bg-gradient-success"
                          >success</span
                        >
                      </td>
                      
                      <td class="align-middle text-center text-sm">
                        <i class="material-icons-round opacity-10 fs-5 cursor-pointer">receipt</i>
                        <i class="material-icons-round opacity-10 fs-5 cursor-pointer">delete</i>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div class="d-flex px-2 py-1">
                          <div>
                          </div>
                          <div class="d-flex flex-column justify-content-center">
                            <p class="text-xs text-secondary mb-0">
                              pm_1LaXpKGUcADgqoEMl0Cx0Ygg
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="d-flex px-2 py-1">
                          <div>
                          </div>
                          <div class="d-flex flex-column justify-content-center">
                            <p class="text-xs text-secondary mb-0">
                              Rob
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p class="text-xs text-secondary mb-0">Trip Funds</p>
                      </td>
                      <td>
                        <p class="text-xs text-secondary mb-0">£18</p>
                      </td>
                      <td class="align-middle text-center">
                        <span class="text-secondary text-xs "
                          >23/04/18</span
                        >
                      </td>
                      <td class="align-middle text-center">
                        <span class="text-secondary text-xs ">Stripe</span>
                      </td>
                      <td class="align-middle text-center text-sm">
                        <span class="badge badge-sm bg-gradient-success"
                          >success</span
                        >
                      </td>
                      
                      <td class="align-middle text-center text-sm">
                        <i class="material-icons-round opacity-10 fs-5 cursor-pointer">receipt</i>
                        <i class="material-icons-round opacity-10 fs-5 cursor-pointer">delete</i>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div class="d-flex px-2 py-1">
                          <div>
                          </div>
                          <div class="d-flex flex-column justify-content-center">
                            <p class="text-xs text-secondary mb-0">
                              pm_1LaXpKGUcADgqoEMl0Cx0Ygg
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="d-flex px-2 py-1">
                          <div>
                          </div>
                          <div class="d-flex flex-column justify-content-center">
                            <p class="text-xs text-secondary mb-0">
                              Anees
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p class="text-xs text-secondary mb-0">Trip Funds</p>
                      </td>
                      <td>
                        <p class="text-xs text-secondary mb-0">£18</p>
                      </td>
                      <td class="align-middle text-center">
                        <span class="text-secondary text-xs "
                          >23/04/18</span
                        >
                      </td>
                      <td class="align-middle text-center">
                        <span class="text-secondary text-xs ">Stripe</span>
                      </td>
                      <td class="align-middle text-center text-sm">
                        <span class="badge badge-sm bg-gradient-success"
                          >success</span
                        >
                      </td>
                      
                      <td class="align-middle text-center text-sm">
                        <i class="material-icons-round opacity-10 fs-5 cursor-pointer">receipt</i>
                        <i class="material-icons-round opacity-10 fs-5 cursor-pointer">delete</i>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div class="d-flex px-2 py-1">
                          <div>
                          </div>
                          <div class="d-flex flex-column justify-content-center">
                            <p class="text-xs text-secondary mb-0">
                              pm_1LaXpKGUcADgqoEMl0Cx0Ygg
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="d-flex px-2 py-1">
                          <div>
                          </div>
                          <div class="d-flex flex-column justify-content-center">
                            <p class="text-xs text-secondary mb-0">
                              Mike
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p class="text-xs text-secondary mb-0">Trip Funds</p>
                      </td>
                      <td>
                        <p class="text-xs text-secondary mb-0">£18</p>
                      </td>
                      <td class="align-middle text-center">
                        <span class="text-secondary text-xs "
                          >23/04/18</span
                        >
                      </td>
                      <td class="align-middle text-center">
                        <span class="text-secondary text-xs ">Stripe</span>
                      </td>
                      <td class="align-middle text-center text-sm">
                        <span class="badge badge-sm bg-gradient-danger"
                          >declined</span
                        >
                      </td>
                      
                      <td class="align-middle text-center text-sm">
                        <i class="material-icons-round opacity-10 fs-5 cursor-pointer">receipt</i>
                        <i class="material-icons-round opacity-10 fs-5 cursor-pointer">delete</i>
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
      data(){
        return{
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
  
    