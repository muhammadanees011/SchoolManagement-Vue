<template>
    <div class="card">
    <div class="card-body pt-4 p-3">
    <div class="list-group">
      <div style="background-color: #F0F2F5 !important;" class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
        <div class="info-width d-flex flex-column">
          <div class="row">
          <div class="col-md-8 col-sm-8">
            <div>
            <div class="row">
                <div class="col-md-10 col-sm-10">
                    <span>
                        <h6 class="ms-3 text-dark text-capitalize">MANAGE ROLES & PERMISSIONS</h6>
                        <small class="ms-3 page-description">
                            In the Roles and Permissions section, you can manage user roles and can assign specific permissions to each role. This functionality ensures that users have the appropriate access levels based on their role, improving security and operational efficiency.
                        </small>
                    </span>
                    <form role="form">
                        <div class="mb-1">
                        <label class="input-label" for="name">Role Name</label>
                        <input v-model="roleName" class="input-box" id="name" type="text" placeholder="Role Name" name="name" />
                        <!-- <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["name"]!==""'>Name is required</small> -->
                        </div>
                    </form>
                </div>
                <div class="col-md-2 col-sm-2">
                    <button v-if="isEdit!=null && roleName!=''" @click="updateRole" style="font-size: 10px;margin-top: 32px; background-color: #573078;" class="btn ms-1 text-white fw-5 border-0 py-2 px-2 border-radius-lg"> Update </button>
                    <button v-if="roleName=='' || isEdit==null" @click="createRole" style="font-size: 10px;margin-top: 32px; background-color: #573078;" class="btn ms-1 text-white fw-5 border-0 py-2 px-2 border-radius-lg"> Save Role </button>
                </div>
            </div>
              <h6 class="mb-3 text-sm text-dark">
                Roles List
              </h6>
              <template v-for="(item,index) in allRoles" :key="index">
                <span v-if="item.name!=='Staff'" :class="{ 'selected-role': isSelected === item.id }" @click="toggleSelection(item.id,$event),getPermissionsOfRole(item.id)" class="mb-1 roles-list d-flex justify-content-between align-items-center text-dark font-weight-bold text-xs">
                    <span class="text-sm fw-5">{{item.name}}</span>
                    <span v-if="item.name=='super_admin'" class="text-dark ms-2 font-weight-bold">
                        <i @click="editRole(item.id)" class="material-icons-round opacity-10 fs-5 cursor-pointer">edit</i>
                        <i @click="deleteRole(item.id)" class="material-icons-round opacity-10 fs-5 cursor-pointer">delete</i>
                    </span>
                </span>
              </template>
            </div>
          </div>
          <div class="col-md-4 col-sm-4">
            <h6 class="mt-3 text-sm text-dark">
              ROLE  PERMISSIONS
            </h6>
            <small class="text-xs">This Role has following permissions</small>
            <div class="permissions-container mt-3">
                <template v-for="(item,index) in allPermissions" :key="index">
                    <span v-if="checkIfAdmin(item)" class="permission-info d-flex justify-content-between align-items-center text-dark font-weight-bold text-xs">
                        <div class="switch-container mt-2 me-5">
                        <input type="checkbox" @change="givePermission(item.name)" :checked="checkIfPermission(item.id)" :id="item.id" class="switch-input">
                        <label :for="item.id" class="switch-label"></label>
                        </div>
                        <span class="permissions text-uppercase">{{item.name}}</span>
                    </span>
                </template>
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
import cloneDeep from 'lodash/cloneDeep';

export default {
name: "billing-card",
mounted(){
this.getAllRoles();
this.getAllPermissions();
this.getUserPermissions();
this.$globalHelper.buttonColor();
},
updated(){
    this.$permissions.redirectIfNotAllowed('roles');
},
data() {
    return {
    permissionsOfRole:'',
    isSelected:'',
    isEdit:null,
    roleName:'',
    allRoles:[],
    allPermissions:'',
    userPermissions:[],
    };
},
watch:{
    allRoles(newVal,oldVal){
        console.log(newVal,oldVal)
        this.isSelected=newVal[0] ? newVal[0].id :''
        this.getPermissionsOfRole()
    }
},
computed:{
    checkPermissionsOfRole(){
        return this.permissionsOfRole;
    },
},
methods:{
snackbarMsg(message) {
    this.$snackbar.add({
    type: 'success',
    text: message,
    background: 'white',
    })
},
//---------------TOGGLE ROLES-----------
toggleSelection(id,event) {
    if (event.target.tagName.toLowerCase() === 'i') {
    return;
    }
    this.isSelected = id;
},
//-------------CHECK IF ROLE IS ADMIN--------------
checkIfAdmin(permission){
    let status=false;
    let adminPermissions=['create_admin','view_admin','edit_admin','delete_admin','roles'];
    // let AssociateAdminPermissions=['create_staff','delete_staff','view_staff','edit_staff'];
    let AssociateAdminPermissions=[];
    this.allRoles.filter((item)=>{
        if(item.id==this.isSelected){
            if(item.name=='Admin'){
                status=true;
            }else if(item.name=='Associate Admin'){
                if(adminPermissions.includes(permission.name)){
                    status=false;
                }else{
                    status=true;
                }
            }
            else{
                if(adminPermissions.includes(permission.name) 
                || AssociateAdminPermissions.includes(permission.name)){
                    status=false;
                }else{
                    status=true;
                }
            }
        }
    })
    return status;
},
//--------------GET ALL ROLES-------------
async getAllRoles(){
    try {
    const response= await axiosClient.get('getAllRoles')
    this.allRoles=response.data
    } catch (error) {
    console.log(error)
    }
},
//--------------CREATE ROLE-------------
async createRole(){
    let data={
        name:this.roleName,
    }
    try {
    await axiosClient.post('createRole',data)
    this.snackbarMsg('Role Created')
    this.getAllRoles();
    } catch (error) {
    console.log(error)
    }
},
//--------------CREATE ROLE-------------
async editRole(id){
    this.allRoles.filter((item)=>{
        if(item.id==id){
            this.roleName=item.name
            this.isEdit=id
        }
    })
},
//--------------UPDATE ROLE-------------
async updateRole(){
    let data={
        name:this.roleName,
    }
    try {
    await axiosClient.put('updateRole/'+this.isEdit,data)
    this.snackbarMsg('Role Updated')
    this.getAllRoles();
    this.isEdit=null
    this.roleName=''
    } catch (error) {
    console.log(error)
    }
},
//--------------DELETE ROLE-------------
async deleteRole(id){
    try {
    await axiosClient.delete('deleteRole/'+id)
    this.getAllRoles();
    this.snackbarMsg('Role Deleted')
    } catch (error) {
    console.log(error)
    }
},
//--------------GET ALL PERMISSIONS-------------
async getAllPermissions(){
    try {
    const response= await axiosClient.get('getAllPermissions')
    this.allPermissions=response.data
    } catch (error) {
    console.log(error)
    }
},
//--------------GET PERMISSIONS OF A ROLE-------------
async getPermissionsOfRole(id=null){
    if(id==null){
        id=this.isSelected
    }
    try {
    const response= await axiosClient.get('getPermissionsOfaRole/'+id)
    this.permissionsOfRole=response.data
    let temp=cloneDeep(this.allPermissions)
    this.allPermissions=null
    this.allPermissions=temp
    } catch (error) {
    console.log(error)
    }
},
//--------------GIVE PERMISSIONS TO A ROLE-------------
async givePermission(permission){
    let data={
        permission:permission
    }
    try {
    await axiosClient.post('givePermission/'+this.isSelected,data)
    } catch (error) {
    console.log(error)
    }
},
//--------------GET USER PERMISSIONS-------------
async getUserPermissions(){
    let id = this.$route.params.id
    try {
    const response= await axiosClient.get('getUserPermissions/'+id)
    this.userPermissions=response.data
    } catch (error) {
    console.log(error)
    }
},
//--------------CHECK USER PERMISSIONS-------------
checkIfPermission(id){
    return this.checkPermissionsOfRole.some(item => item.id === id);
},
//--------------UPDATE USER PERMISSIONS-------------
async updatePermission(id){
    let data={
    user_id:this.$route.params.id,
    permission_id:id
    }
    try {
    await axiosClient.post('updateUserPermissions',data)
    } catch (error) {
    console.log(error)
    }
}

}
};
</script>
<style>
.info-width{
width: 100% !important;
}
.permission-info{
background-color: rgba(253, 254, 254, 0.5);
padding: 0.2rem;
border-radius: 3px;
width: 100% !important; 
margin-bottom: 2px;
}
.roles-list {
background-color: #F7F8F9;
padding: 0.5rem;
border-radius: 2px;
width: 100% !important; 
margin-bottom: 0px;
}
.permissions-text{
font-size: 10px;
}
.permissions{
/* background-color:#4CAF50; */
border-radius: 10px;
color: dark !important;
font-size: 10px !important;
padding: 5px;
padding-left: 10px;
padding-right:10px ;
}
.permissions-container{
height: 20rem;
overflow-y: scroll;
}
.amount-radio{
width: 100px;
font-size: 12px;
}
.amount-radio input{
width: 15px;
height: 15px;
font-size: 12px;
background-color: #F0F2F5;
}
.selected {
background-color: #F0F2F5 !important; 
border: 2px solid #F0F2F5;
color: #010A21 !important;
}
.selected h6{
color: #010A21;
}
.card-height{
height: 100vh;
}
.btn-color{
background-color: #f513ca !important;
}
.top-up-row{
padding: 17px;
height: 50px;
width: 300px;
border-radius: 5px;
border: 1px solid black;
margin-bottom: 3px;
}
.amount-input{
width: 25.3em !important; 
height: 4em !important;
border: 1px solid black;
border-radius: 5px;
}
.amount-container{
width: 25.3em !important; 
height: 3.5em !important;
}
.top-up-btn{
margin-top: 4px;
width: 25.3em !important; 
height: 4em !important;
}
.add-card-btn{
height: 4em !important;
}


/* Switch Container Styles */
.switch-container {
position: relative;
display: inline-block;
}

/* Switch Input Styles - Hide default input */
.switch-input {
display: none;
}

/* Switch Label Styles */
.switch-label {
cursor: pointer;
display: block;
position: relative;
width: 40px; /* Adjust the width according to your preference */
height: 20px; /* Adjust the height according to your preference */
background-color: #ccc; /* Default background color */
border-radius: 10px; /* Half of the height for rounded corners */
transition: background-color 0.3s ease;
}

/* Checked State Styles */
.switch-input:checked + .switch-label {
background-color: #4CAF50; /* Background color when checked */
}

/* Toggle Animation - Optional */
.switch-label::before {
content: '';
position: absolute;
top: 2px;
left: 2px;
width: 16px;
height: 16px;
background-color: #fff; /* Circle color */
border-radius: 50%;
transition: transform 0.3s ease;
}

.switch-input:checked + .switch-label::before {
transform: translateX(20px); /* Move the circle to the right when checked */
}
.selected-role{
    border:1px solid #4CAF50;
}

</style>
