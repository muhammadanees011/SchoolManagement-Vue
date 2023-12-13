<template>
    <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12">
            <div class="card">
                <div class="card-header pb-0 px-3 d-flex justify-content-between">
                    <h6 class="mb-0">Courses</h6>
                    <!-- <router-link to="/add-menu">
                        <button style="font-size: 12px; background-color: #f513ca;" class="me-3 text-white fw-5 border-0 p-2 border-radius-lg"> Add Course </button>
                    </router-link> -->
                </div>
                <div class="card-body pt-4 p-3">
                    <ul class="list-group">
                    <li class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
                        <div class="d-flex flex-column">
                        <h6 class="mb-3 text-sm">Isa - Maths 9-1 GCSE Revision Guide</h6>
                        <span class="mb-1 text-xs">
                            Isa - Maths 9-1 GCSE Revision Guide - £3.
                        </span>
                        </div>
                        <div class="ms-auto text-end">
                            <span>
                            <template v-if="user.role=='super_admin'||user.role=='school_user'">
                                <i class="far fa-trash-alt me-2" aria-hidden="true"></i>
                                <i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>
                            </template>
                            <i class="fas fa-plus-circle text-success me-2" aria-hidden="true"></i>
                            </span>
                        <br>
                        <div class="d-flex me-3 mt-2 align-items-center text-warning text-gradient text-sm font-weight-bold" style="justify-content: flex-end;">
                            - £5
                        </div>
                        </div>
                    </li>
                    <li class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
                        <div class="d-flex flex-column">
                        <h6 class="mb-3 text-sm">Nisam - Maths Algebra and Shape Grade 7</h6>
                        <span class="mb-1 text-xs">
                            Maths Algebra and Shape Grade 7
                        </span>
                        </div>
                        <div class="ms-auto text-end">
                            <span>
                            <template v-if="user.role=='super_admin'||user.role=='school_user'">
                                <i class="far fa-trash-alt me-2" aria-hidden="true"></i>
                                <i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>
                            </template>
                            <i class="fas fa-plus-circle text-success me-2" aria-hidden="true"></i>
                            </span>
                        <br>
                        <div class="d-flex me-3 mt-2 align-items-center text-warning text-gradient text-sm font-weight-bold" style="justify-content: flex-end;">
                            - £5
                        </div>
                        </div>
                    </li>
                    <li class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
                        <div class="d-flex flex-column">
                        <h6 class="mb-3 text-sm">Isa - Maths 9-1 GCSE Revision Guide</h6>
                        <span class="mb-1 text-xs">
                            Isa - Maths 9-1 GCSE Revision Guide - £3.
                        </span>
                        </div>
                        <div class="ms-auto text-end">
                            <span>
                            <template v-if="user.role=='super_admin'||user.role=='school_user'">
                                <i class="far fa-trash-alt me-2" aria-hidden="true"></i>
                                <i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>
                            </template>
                            <i class="fas fa-plus-circle text-success me-2" aria-hidden="true"></i>
                            </span>
                        <br>
                        <div class="d-flex me-3 mt-2 align-items-center text-warning text-gradient text-sm font-weight-bold" style="justify-content: flex-end;">
                            - £5
                        </div>
                        </div>
                    </li>
                    <li class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
                        <div class="d-flex flex-column">
                        <h6 class="mb-3 text-sm">Nisam - Maths Algebra and Shape Grade 7</h6>
                        <span class="mb-1 text-xs">
                            Maths Algebra and Shape Grade 7
                        </span>
                        </div>
                        <div class="ms-auto text-end">
                            <span>
                            <template v-if="user.role=='super_admin'||user.role=='school_user'">
                                <i class="far fa-trash-alt me-2" aria-hidden="true"></i>
                                <i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>
                            </template>
                            <i class="fas fa-plus-circle text-success me-2" aria-hidden="true"></i>
                            </span>
                        <br>
                        <div class="d-flex me-3 mt-2 align-items-center text-warning text-gradient text-sm font-weight-bold" style="justify-content: flex-end;">
                            - £5
                        </div>
                        </div>
                    </li>
   
                    </ul>
                </div>
            </div>
        </div>
        <!-- <div class="col-xl-4 col-lg-4 col-md-4">
            <div class="card">
                <div class="card-header pb-0 px-3">
                    <h6 class="mb-0">Favourite</h6>
                </div>
                <div class="card-body pt-4 p-3">
                    <ul class="list-group">
                    <li class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
                        <div class="d-flex flex-column">
                        <h6 class="mb-3 text-sm">Puff-Puff</h6>
                        <span class="mb-1 text-xs">
                            Boiled Egg and wrapped in a ground meat mixture coated in breadcrumbs, and deep-fried.
                        </span>
                        </div>
                        <div class="ms-auto text-end">
                            <span>
                                <i class="fas fa-minus-circle text-danger me-2" aria-hidden="true"></i>
                            </span>
                        <br>
                        <div class="d-flex ms-3 me-2 mt-2 align-items-center text-warning text-gradient text-sm font-weight-bold" style="justify-content: flex-end;">
                            £5
                        </div>
                        </div>
                    </li>
                    <li class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
                        <div class="d-flex flex-column">
                        <h6 class="mb-3 text-sm">Scotch Egg</h6>
                        <span class="mb-1 text-xs">
                            Boiled Egg and wrapped in a ground meat mixture coated in breadcrumbs, and deep-fried.
                        </span>
                        </div>
                        <div class="ms-auto text-end">
                            <span>
                                <i class="fas fa-minus-circle text-danger me-2" aria-hidden="true"></i>
                            </span>
                        <br>
                        <div class="d-flex ms-3 me-2 mt-2 align-items-center text-warning text-gradient text-sm font-weight-bold" style="justify-content: flex-end;">
                            £5
                        </div>
                        </div>
                    </li>
                    <li class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
                        <div class="d-flex flex-column">
                        <h6 class="mb-3 text-sm">Rice and DODO</h6>
                        <span class="mb-1 text-xs">
                            Boiled Egg and wrapped in a ground meat mixture coated in breadcrumbs, and deep-fried.
                        </span>
                        </div>
                        <div class="ms-auto text-end">
                            <span>
                                <i class="fas fa-minus-circle text-danger me-2" aria-hidden="true"></i>
                            </span>
                        <br>
                        <div class="d-flex ms-3 me-2 mt-2 align-items-center text-warning text-gradient text-sm font-weight-bold" style="justify-content: flex-end;">
                            £5
                        </div>
                        </div>
                    </li>
                    </ul>
                </div>
            </div>
        </div> -->
    </div>

  </template>
  
  <script>
  export default {
    name: "billing-card",
    data(){
        return{
            user:'',
        }
    },
    mounted(){
        this.getUser();
    },
    methods:{
        getUser(){
            let user=localStorage.getItem('user')
            user= JSON.parse(user)
            this.user=user;
        }
    }
  };
  </script>
  