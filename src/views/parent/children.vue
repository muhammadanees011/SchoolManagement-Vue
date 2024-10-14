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
                <div class="col-md-9 col-sm-9">
                    <form role="form">
                        <div class="mb-1">
                        <label class="input-label" for="name">Student Email</label>
                        <input v-model="studentEmail" class="input-box" id="name" type="text" placeholder="Enter Student Email" name="student_email" />
                        <!-- <small class="text-danger error-txt" v-if='formValidation!=="" && formValidation["name"]!==""'>Name is required</small> -->
                        </div>
                    </form>
                </div>
                <div class="col-md-3 col-sm-3">
                    <button @click="addChildren" style="font-size: 10px;margin-top: 32px; background-color: #573078;" class="btn ms-1 text-white fw-5 border-0 py-2 px-2 border-radius-lg"> Save Student </button>
                </div>
            </div>
              <h6 class="mb-3 text-sm text-dark">
                Childrens
              </h6>
              <template v-for="(item,index) in childrens" :key="index">
                <span :class="{ 'selected-role': isSelected === item.id }" @click="toggleSelection(item.id,$event)" class="mb-1 roles-list d-flex justify-content-between align-items-center text-dark font-weight-bold text-xs">
                    <div>
                    <span class="text-sm fw-5">{{item.student.first_name}} {{item.student.last_name}}</span>
                    <br>
                    <p class="text-sm">{{item.student.email}}</p>
                    </div>
                    <span  class="text-dark ms-2 font-weight-bold">
                        <i @click="confirmDelete(item.student_id)" class="material-icons-round opacity-10 fs-5 cursor-pointer">delete</i>
                    </span>
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
import Swal from 'sweetalert2';

export default {
name: "billing-card",
mounted(){
this.getChildrens();
this.$globalHelper.buttonColor();
},
updated(){
},
data() {
    return {
    childrens:'',
    permissionsOfRole:'',
    isSelected:'',
    isEdit:null,
    studentEmail:'',
    roleName:'',
    allRoles:[],
    allPermissions:'',
    userPermissions:[],
    };
},
methods:{
snackbarMsg(message) {
    this.$snackbar.add({
    type: 'success',
    text: message,
    background: 'white',
    })
},

confirmDelete(id) {
    Swal.fire({
    title: 'Are you sure?',
    text: "Item will be archived and you will be able to revert this!",
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
        this.deleteChildren(id)
    }
    });
},
//---------------TOGGLE ROLES-----------
toggleSelection(id,event) {
    if (event.target.tagName.toLowerCase() === 'i') {
    return;
    }
    this.isSelected = id;
},

//--------------Add Children-------------
async addChildren(){
    let parentId=this.$route.params.id;
    let data={
        student_email:this.studentEmail,
        parent_id:parentId,
    }
    try {
    await axiosClient.post('/addStudentToParent',data)
    this.getChildrens()
    this.snackbarMsg('Children Added Successfully')
    } catch (error) {
    console.log(error)
    }
},

//--------------Get Childrens-------------
async getChildrens(){
    let parentId=this.$route.params.id;
    try {
    const response= await axiosClient.get('getChildrensOfParent/'+parentId)
    this.childrens=response.data
    } catch (error) {
    console.log(error)
    }
},

async deleteChildren(id){
    try {
    await axiosClient.get('deleteChildren/'+id)
    this.getChildrens()
    this.snackbarMsg('Children Removed Successfully')
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
