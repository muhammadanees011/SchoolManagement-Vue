

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
                    <th class="align-middle text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      Type
                    </th>
                    <th class=" align-middle text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                      Amount
                    </th>
                    <th class="align-middle text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      Date
                    </th>
                    <th class="align-middle text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      Action
                    </th>                  
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,index) in transactionHistoryList" :key="index">
                    <td class="align-middle text-center">
                      <p class="text-xs text-secondary mb-0">{{ item.type }}</p>
                    </td>
                    <td class="align-middle text-center"> 
                      <span class="d-flex justify-content-center"> 
                      <i v-if="item.type=='top_up' || item.type=='admin_top_up'" class="fas fa-plus fa-xs text-success me-2" aria-hidden="true"></i>
                      <i v-else class="fas fa-minus fa-xs text-danger me-2" aria-hidden="true"></i>
                      <p class="text-xs text-secondary mb-0">£{{formattedPrice(item.amount) }}</p>
                      </span>
                    </td>
                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs "
                        >{{ item.created_at.toString().split("T")[0] }}</span
                      >
                    </td>
                    <td class="align-middle text-center text-sm">
                      <!-- <i class="material-icons-round opacity-10 fs-5 cursor-pointer">receipt</i> -->
                      <i @click="deleteTransactionHistory(item.id)" class="material-icons-round opacity-10 fs-5 cursor-pointer">delete</i>
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
import axiosClient from '../../axios'

export default {
  name: "tables",
  mounted(){
    this.getTransactionHistory();
    this.$globalHelper.buttonColor();
  },
  data(){
    return{
      transactionHistoryList:'',
      filterBy:'',
      allFields:['Clear','Account','Type','Amount','Date','Status'],
    }
  },
  methods:{
    formattedPrice(value){
      const formattedValue = parseFloat(value).toFixed(2);
      return formattedValue;
    },
    snackbarMsg(message) {
    this.$snackbar.add({
      type: 'success',
      text: message,
      background: 'white',
    })
  },
    //-----------GET ALL HISTORY-------------
    async getTransactionHistory(){
      let user;
      let user_id;
      if(this.$route.params.id){
        user_id=this.$route.params.id;
      }else{
        user=localStorage.getItem('user')
        user= JSON.parse(user)
        user_id=user.id;
      }
      let data={
        'user_id':user_id,
        'admin_id':null
      }
      try {
       const response= await axiosClient.post('/getTransactionHistory',data);
       this.transactionHistoryList=response.data;
      } catch (error) {
        console.log(error)
      }
    },
    //-----------DELETE RECORD--------------
    async deleteTransactionHistory(id){
        try {
         await axiosClient.delete('/deleteTransactionHistory/'+id);
         this.removeTransactionFromList(id);
         this.snackbarMsg('Deleted Successfully');
        } catch (error) {
          console.log(error)
        }
    },
    //------------REMOVE STUDENT FROM LIST-----------
      removeTransactionFromList(id) {
      const indexToRemove = this.transactionHistoryList.findIndex((item) => item.id === id)
      this.transactionHistoryList.splice(indexToRemove, 1)
    },
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

  