<template>
    <div class="row">
    <div class="col-12 col-md-6 col-xl-6 position-relative">
    <div class="card card-plain h-100">
        <div class="p-3 pb-0 card-header">
        <h6 class="mb-0">Barnding Settings</h6>
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
                <button @click="updateBranding()" style="font-size: 12px; background-color: #573078;" class="save-pass-btn p-2 mb-3 trips-btn  text-white fw-5 border-radius-lg">Update Settings </button>
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
                <button @click="updateFinanceCoordiantorEmail()" style="font-size: 12px; background-color: #573078;" class="save-pass-btn p-2 mb-3 trips-btn  text-white fw-5 border-radius-lg">Save </button>
            </div>
            </li>
        </ul>
        </div>
    </div>
    <hr class="vertical dark" />
    </div>
    </div>
</template>

<script>
import axiosClient from '../../axios'
import cloneDeep from 'lodash/cloneDeep';
import { mapGetters } from 'vuex'

export default{
    mounted(){
        this.getSettings()
    },
    computed: {
        ...mapGetters(['getBrandingSetting']),
    },
    data(){
        return{
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