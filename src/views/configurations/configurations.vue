<template>
    <div>
        <div class="row">
            <div class="col-12 col-md-6 col-xl-6 position-relative">
            <div class="card card-plain h-100" style="background-color: white;">
                <div class="p-3 pb-0 card-header">
                <h6 class="mb-0">Microsoft Configurations</h6>
                </div>
                <div class="p-3 card-body">

                    
                <ul v-if="!isEditConfig" class="list-group">
                    <li class="px-0 mb-2 border-0 list-group-item d-flex align-items-center">
                    <div class="col-md-5 bg-white w-100 p-2">
                        <p class="config-title">Microsoft client id</p>
                        <small class="config-value">{{ configuration.ms_client_id }}</small>
                        <hr>
                        <p class="config-title">Microsoft client secret</p>
                        <small class="config-value">{{configuration.ms_client_secret}}</small>
                        <hr>
                        <p class="config-title">Microsoft tenant id</p>
                        <small class="config-value">{{ configuration.ms_tenent_id }}</small>
                        <hr>
                        <p class="config-title">Email sending account</p>
                        <small class="config-value">{{ configuration.ms_email_account }}</small>
                    </div>
                    </li>
                </ul>
                    <button @click="openEdit()" v-if="!isEditConfig" style="font-size: 12px; background-color: white; color: #573078; border: 1px solid #573078;" class=" p-2 fw-5 border-radius-lg">
                        <span class="d-flex align-items-center">
                        <i class="material-icons-round opacity-10 fs-6 me-1">settings</i>
                        Edit Microsoft Settings 
                        </span>
                    </button>

                <ul v-if="isEditConfig" class="list-group">
                    <li class="px-0 mb-2 border-0 list-group-item d-flex align-items-center">
                    <div class="col-md-5 bg-white new-pass p-2">
                        <label>Microsoft client id</label>
                        <input v-model="configuration.ms_client_id" id="card-holder-name" type="text" class="bg-white w-100  mb-2">
                        <br>
                        <label>Microsoft client secret</label>
                        <input v-model="configuration.ms_client_secret" id="card-holder-name" type="text" class="bg-white w-100  mb-2">
                        <br>
                        <label>Microsoft tenant id</label>
                        <input v-model="configuration.ms_tenent_id" id="card-holder-name" type="text" class="bg-white w-100  mb-2">
                        <br>
                        <label>Email sending account</label>
                        <input v-model="configuration.ms_email_account" id="card-holder-name" type="email" class="bg-white w-100  mb-2">
                        <br>
                        <button @click="updateConfigurations()" style="font-size: 12px; background-color: white; color: #573078; border: 1px solid #573078;" class=" p-2 fw-5 me-2 border-radius-lg">
                            <span class="d-flex align-items-center">
                            Save Settings
                            </span>
                        </button>
                        <button @click="isEditConfig=false" style="font-size: 12px; background-color: white; color: #573078; border: 1px solid #573078;" class=" p-2 fw-5 border-radius-lg">
                            <span class="d-flex align-items-center">
                            Cancel
                            </span>
                        </button>
                    </div>
                    </li>
                </ul>
                </div>
            </div>
            <hr class="vertical dark" />
            </div>
        </div>
    </div>
</template>

<script>
import axiosClient from '../../axios'
import { mapGetters } from 'vuex'

export default{
    mounted(){
        this.getConfigurations()
    },
    computed: {
        ...mapGetters(['getBrandingSetting']),
    },
    data(){
        return{
            isEditConfig:false,
            configuration:{
                ms_client_id:'',
                ms_client_secret:'',
                ms_tenent_id:'',
                ms_email_account:'',
            },
        }
    },
    methods:{

        //---------------OPEN EDIT FORM------------
        openEdit(){
            this.isEditConfig=true
        },

        //---------------GET CONFIGURATIONS------------
        async getConfigurations(){
            try {
                let response=await axiosClient.get('/getConfigurations')
                response=response.data
                this.configuration.ms_client_id=response.ms_client_id
                this.configuration.ms_client_secret=response.ms_client_secret
                this.configuration.ms_tenent_id=response.ms_tenent_id
                this.configuration.ms_email_account=response.ms_email_account
            } catch (error) {
                console.log(error)
            }
        },

        //----------------UPDATE CONFIGURATIONS----------------
        async updateConfigurations(){
            try {
                await axiosClient.post('/saveConfigurations',this.configuration)
                this.snackbarMsg('Saved Successfuly')
            } catch (error) {
                console.log(error)
            }
        },

        //----------------TOASTER----------------
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
.config-title{
    font-size:13px;
    font-weight: 500;
    line-height: 13px;
    margin-bottom: 0px;
}
.config-value{
    font-size:11px;
}
.add-payment-method{
    text-decoration: underline;
}
.add-payment-method:hover{
    color: blue;
    cursor: pointer;
}
</style>