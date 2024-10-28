<template>
    <div>
        <div class="row">
            <div class="col text-end">
                <button @click="$router.go(-1)" style="font-size: 12px; background-color: #573078;" class="btn me-3 text-white fw-5 border-0 py-2 px-4  border-radius-lg"> Back </button>
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-md-6 col-xl-6 position-relative">
            <div class="card card-plain h-100">
                <div class="p-3 pb-0 card-header">
                <h6 class="mb-0">Branding Settings</h6>
                </div>
                <div class="p-3 card-body">
                <ul class="list-group">
                    <li class="px-0 mb-2 border-0 list-group-item d-flex align-items-center">
                    <div class="col-md-5 mx-auto bg-white new-pass p-2">
                        <label>Primary Color</label>
                        <input v-model="branding.primaryColor" id="card-holder-name" type="text" class="bg-white w-100  mb-2">
                        <br>
                        <label>Secondary Color</label>
                        <input v-model="branding.SecondaryColor" id="card-holder-name" type="text" class="bg-white w-100  mb-2">
                        <br>
                        <label>Logo</label>
                        <input @change="onFileChange" id="card-holder-name" type="file" class="bg-white w-100  mb-2">
                        <img v-if="imageUrl" :src="imageUrl" height="60" width="60" alt="Selected Image">
                        <br>
                        <button @click="updateBranding()" style="font-size: 12px; background-color: #573078;" class="btn p-2 mb-3 mt-2 trips-btn  text-white fw-5 border-radius-lg">Update Settings </button>
                    </div>
                    </li>
                </ul>
                </div>
            </div>
            <hr class="vertical dark" />
            </div>
            <div class="col-12 col-md-5 col-xl-6 position-relative">
                <div class="card card-plain h-100">
                    <div class="p-3 pb-0 card-header">
                    <h6 class="mb-0">Finance Coordinator Email</h6>
                    </div>
                    <div class="p-3 card-body">
                    <ul class="list-group">
                        <li class="px-0 mb-2 border-0 list-group-item d-flex align-items-center">
                            <div class="col-md-5 mx-auto bg-white new-pass p-2">
                                <label>Email</label>
                                <input v-model="finance_coordinator_email" id="card-holder-name" type="text" class="bg-white w-100  mb-2">
                                <br>
                                <button @click="updateFinanceCoordiantorEmail()" style="font-size: 12px; background-color: #573078;" class="btn save-pass-btn p-2 mb-3 trips-btn  text-white fw-5 border-radius-lg">Save </button>
                            </div>
                        </li>
                        <!-- <li class="px-0 mb-2 border-0 list-group-item d-flex align-items-center">
                            <div class="col-md-5 mx-auto bg-white new-pass p-2">
                                <h6>Payment Method</h6>
                                
                                <div class="col-md-12 ms-auto">
                                    <template v-for="(item,index) in userCards" :key="index">
                                    <div :class="{ 'selected': isSelected === index }" @click="toggleSelection(index,$event)"
                                        class=" mb-1 card card-body border card-plain border-radius-lg d-flex align-items-center flex-row">
                                        <img v-if="item.card.brand=='visa'" class="w-10 me-3 mb-0" src="@/assets/img/logos/visa.png" alt="logo"/>
                                        <img v-if="item.card.brand=='mastercard'" class="w-10 me-3 mb-0" src="@/assets/img/logos/mastercard.png" alt="logo"/>
                                        <h6 class="mb-0">
                                        **** **** **** {{ item.card.last4 }}
                                        </h6>
                                        <i @click="confirmDelete(item.id)"
                                        class="fas fa-trash-alt ms-auto text-dark cursor-pointer"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        title
                                        aria-hidden="true"
                                        data-bs-original-title="Edit Card"
                                        aria-label="Edit Card"
                                        ></i>
                                        <span class="sr-only">Edit Card</span>
                                    </div>
                                    </template>
                                </div>

                                <small v-if="dataLoaded && userCards==''" @click="addCard()" class="add-payment-method">Add Payment Method &rarr;</small>
                                <br>
                            </div>
                        </li> -->
                    </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axiosClient from '../../axios'
import cloneDeep from 'lodash/cloneDeep';
import { mapGetters } from 'vuex'
import Swal from 'sweetalert2';  

export default{
    mounted(){
        this.getSettings()
        this.getCustomerPaymentMethods();
        this.$globalHelper.buttonColor();
    },
    computed: {
        ...mapGetters(['getBrandingSetting']),
    },
    data(){
        return{
            dataLoaded:false,
            userCards:'',
            imageUrl: null,
            selectedFile: null,
            finance_coordinator_email:null,
            branding:{
                primaryColor:'',
                SecondaryColor:'',
                logo:''
            }
        }
    },
    methods:{

        //----------------ADD PAYMENT CARD----------------
        addCard() {
            let schoolId=this.$route.params.id;
            this.$router.push({ name: 'card-school', params: { id: schoolId } });
        },

        //----------------IMAGE UPLOADING----------------
        onFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                this.imageUrl = URL.createObjectURL(file);
                this.selectedFile = file;
            }
        },

        //---------------GET BRANDING SETTINGS------------
        async getSettings(){
            let schoolId=this.$route.params.id;
            const formData = new FormData();
            formData.append('school_id', schoolId);
            try {
                let response=await axiosClient.post('/getSettings',formData)
                this.branding.primaryColor=cloneDeep(response.data.primary_color)
                this.branding.SecondaryColor=cloneDeep(response.data.secondary_color)
                this.imageUrl=this.$env_vars.BASE_URL+ response.data.logo
                this.finance_coordinator_email=response.data.finance_coordinator_email
            } catch (error) {
                console.log(error)
            }
        },

        //----------------UPDATE BRANDING----------------
        async updateBranding(){
            let schoolId=this.$route.params.id;
            const formData = new FormData();
            formData.append('logo', this.selectedFile);
            formData.append('primary_color', this.branding.primaryColor);
            formData.append('secondary_color', this.branding.SecondaryColor);
            formData.append('school_id', schoolId);
            try {
                await axiosClient.post('/storebranding',formData)
                this.snackbarMsg('Saved Successfuly')
            } catch (error) {
                console.log(error)
            }
        },

        //---------------UPDATE EMAIL----------------
        async updateFinanceCoordiantorEmail(){
            let schoolId=this.$route.params.id;
            const formData = new FormData();
            formData.append('school_id', schoolId);
            formData.append('finance_coordinator_email', this.finance_coordinator_email);
            try {
                await axiosClient.post('/updateFinanceCoordiantorEmail',formData)
                this.snackbarMsg('Saved Successfuly')
            } catch (error) {
                console.log(error)
            }
        },

        //--------------PAYMENT METHODS---------
        async getCustomerPaymentMethods(){
        let user;
        let user_id;
        if(this.$route.params.id){
            user_id=this.$route.params.id;
        }else{
            user=localStorage.getItem('user')
            user= JSON.parse(user)
            user_id=user.id;
        }
        if(user_id==null && user.role=='student'){
            this.snackbarMsg('Stripe Customer Not Found')
            return
        }
        let data={
        'user_id':user_id,
        'type':'school'
        }
        try {
            const response=await axiosClient.post('/getPaymentMethods',data)
            this.userCards=response.data.data
            this.dataLoaded=true
        } catch (error) {
            console.log(error)
        }
        },

        //-----------REMOVE CARD BY ID------------
        async removePaymentMethod(id){
        let user=localStorage.getItem('user')
        user= JSON.parse(user)
        let data={
            "user_id":user.id,
            "payment_method":id
        }
        try {
            await axiosClient.post('/removePaymentMethod',data);
            this.removeFromList(id)
        } catch (error) {
            console.log(error)
        }
        },

        //-----------REMOVE CARD FROM LIST----------
        removeFromList(id){
        const indexToRemove = this.userCards.findIndex(card => card.id === id);
        this.userCards.splice(indexToRemove,1)
        this.snackbarMsg('Card Removed Successfully')
        },

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
                this.removePaymentMethod(id)
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
    },
}

</script>

<style scoped>

.add-payment-method{
    text-decoration: underline;
}
.add-payment-method:hover{
    color: blue;
    cursor: pointer;
}
</style>