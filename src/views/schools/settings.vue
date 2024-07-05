<template>
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
            branding:{
                primaryColor:'',
                SecondaryColor:'',
                logo:''
            }
        }
    },
    methods:{
        onFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                this.imageUrl = URL.createObjectURL(file);
                this.selectedFile = file;
            }
        },
        async getSettings(){
            let schoolId=this.$route.params.id;
            const formData = new FormData();
            formData.append('school_id', schoolId);
            try {
                let response=await axiosClient.post('/getSettings',formData)
                this.branding.primaryColor=cloneDeep(response.data.primary_color)
                this.branding.SecondaryColor=cloneDeep(response.data.secondary_color)
                this.imageUrl='https://stagingapi.student-pay.co.uk'+ response.data.logo
                console.log(this.selectedFile)
            } catch (error) {
                console.log(error)
            }
        },
        async updateBranding(){
            let schoolId=this.$route.params.id;
            const formData = new FormData();
            formData.append('logo', this.selectedFile);
            formData.append('primary_color', this.branding.primaryColor);
            formData.append('secondary_color', this.branding.SecondaryColor);
            formData.append('school_id', schoolId);
            try {
                await axiosClient.post('/storebranding',formData)
            } catch (error) {
                console.log(error)
            }
        },
    },
}

</script>