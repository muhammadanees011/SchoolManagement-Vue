<template>
    <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12">
            <div class="card">
                <div class="card-header pb-0 px-3 d-flex justify-content-between">
                    <h6 class="mb-0">Checkout</h6>
                </div>
                <div class="card-body pt-4 p-3">
                    <ul class="list-group">
                    <li class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
                        <div class="d-flex flex-column">
                        <h6 class="mb-3 text-sm">{{ itemData.name }}</h6>
                        <span class="mb-1 text-xs">
                            {{itemData.detail}}
                        </span>
                        </div>
                        <div class="ms-auto text-end">
                            <span>
                            <template v-if="user.role=='super_admin'||user.role=='school_user'">
                                <i class="far fa-trash-alt me-2" aria-hidden="true"></i>
                                <i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>
                            </template>
                            </span>
                        <br>
                        <div class="d-flex me-3 mt-2 align-items-center text-warning text-gradient text-sm font-weight-bold" style="justify-content: flex-end;">
                            - £{{ itemData.price }}
                        </div>
                        </div>
                    </li>
                    <button style="font-size: 12px; background-color: #573078;" class="me-3 trips-btn w-25 bg-gradient-grey shadow-grey text-white fw-5 p-2 border-radius-lg"> One-Click Payment </button>
                    </ul>
                </div>
            </div>
        </div>
    </div>

  </template>
  
  <script>
import axiosClient from '../../axios'
  export default {
    name: "billing-card",
    data(){
        return{
            user:'',
            itemData:'',
        }
    },
    mounted(){
        this.getUser();
        this.findShopItem();
    },
    methods:{
        getUser(){
            let user=localStorage.getItem('user')
            user= JSON.parse(user)
            this.user=user;
        },
        async findShopItem(){
            let id = this.$route.params.id
            try {
                let response= await axiosClient.get('/findShopItem/'+id)
                response=response.data
                this.itemData=response
            } catch (error) {
                console.log(error)
            }
        },
    }
  };
  </script>
  