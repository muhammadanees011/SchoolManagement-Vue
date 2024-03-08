<template>
    <div class="card">
      <div class="card-header pb-0 px-3">
        <div class="d-flex justify-content-between">
          <h6 class="mb-0">Trips</h6>
          <template v-if="userPermissions.create_trip" >
            <template v-if="user.role=='super_admin' || user.role=='organization_admin' || user.role=='staff'" >
              <button @click="redirectToAddTrips"  :to="{ name: 'add-trips' }" style="font-size: 12px; background-color: #573078;"  class="me-3 trips-btn w-10  text-white fw-5 p-2 border-radius-lg">Add Trips</button>
            </template>
          </template>
        </div>
      </div>
      <div class="card-body pt-1 p-3">
        <div class="container-fluid mt-1">
          <div v-for="(item,index) in allTrips" :key="index" class="row list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
              <div class="col-md-8">
                  <div class="d-flex flex-column">
                  <h6 class="mb-3 text-sm">{{ item.title }}</h6> 
                  <img src="@/assets/img/trip.jpg" alt="profile_image" class="shadow-sm w-30 h-20 border-radius-lg" />
                  <small class="trip-description mt-2">
                    {{ item.description }}
                  </small>
                  </div>
              </div>
              <div class="col-md-4">
                <div class="ms-auto text-start">
                  <span><small class="me-3 trip-dates">From {{ formatDateString(item.start_date) }} To {{formatDateString(item.end_date)}}</small></span>
                  <br>
                  <span><small class="me-3 trip-dates">Total Seats - {{ item.total_booking ? item.total_booking :0 }}</small></span>
                  <span><small class="me-3 trip-dates">Available Seats - {{  item.total_booking ? item.total_booking :0 }}</small></span>
                  <br>
                  <span><small class="me-3 trip-dates">Age Group - 16-20</small></span>
                  <span><small class="me-3 trip-dates">Booking Open</small></span>
                  <br>
                  <span><small class="me-3 trip-dates">{{ item.accomodation_details ? item.accomodation_details:'-' }}</small></span>
                  <br>
                  <span v-if="user.role=='super_admin'"><small class="me-3 trip-dates">Organization: {{ item.organization ? item.organization.name:'-' }}</small></span>
                <div class="d-flex  align-items-start text-danger text-gradient text-sm font-weight-bold" style="justify-content: flex-start;">
                  Trip Cost - £{{ formattedAmount(item.budget) }}
                </div>
                <br>
                <template  v-if="user.role=='super_admin' || user.role=='organization_admin' || user.role=='staff'">
                  <button @click="navLegacy('participants-trips',{id:item.id})" style="font-size: 12px; background-color: #F3F4F6; color: #573078 !important;" class="d-flex justify-content-around align-items-center me-3 trips-btn w-50  text-white fw-5 p-2 border-radius-lg"> Participants
                  <i class="material-icons-round opacity-10 fs-5 cursor-pointer">arrow_forward</i>
                  </button>
                  <br>
                  <div class="mt-0">
                  <button v-if="userPermissions.edit_trip" @click="editTrip(item.id)" style="font-size: 12px; background-color: #573078;" class="me-3 trips-btn w-25  text-white fw-5 p-2 border-radius-lg"> Edit </button>
                  <button v-if="userPermissions.delete_trip" @click="deleteTrip(item.id)" style="font-size: 12px; background-color: #573078;" class="me-3 trips-btn w-25  text-white fw-5 p-2 border-radius-lg"> Delete </button>
                  </div>             
                </template>
                <div class="mt-0" v-if="item.cart!==null && user.role=='student'">
                  <div class="cart-status">Added To Cart</div>
                </div>
                <div class="mt-0" v-if="item.cart==null && user.role=='student'">
                  <button @click="addTripToCart(item.id)" style="font-size: 12px; background-color: #573078;" class="me-3 trips-btn w-45  text-white fw-5 p-2 border-radius-lg"> Add To Cart </button>
                </div>
                <br>
                </div>
              </div>
          </div>
          <div v-if="allTrips.length==0" class="row list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
            <small class="d-flex justify-content-center">No trips found!</small>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axiosClient from '../../axios'
  import moment from 'moment';
  import { mapGetters,mapActions } from 'vuex'


  export default {
    name: "billing-card",
    data(){
      return{  
        user:'',
        allTrips:'',
      }
    },
    mounted(){
      this.getUser();
      this.getAllTrips();
    },
    updated(){
      if(this.user.role=='student'){
        return
      }else{
        this.$permissions.redirectIfNotAllowed('view_trip');
      }
    },
    watch:{
      getRemovedItem(newVal,oldVal){
        console.log(oldVal)
        if(newVal=='trip'){
          this.getAllTrips();
        }
      },
    },
    computed: {
      ...mapGetters(['getRemovedItem','getPermissions']),

      userPermissions() {
        return this.$permissions.userPermissions.value;
      },
    },
    methods:{
      ...mapActions(['updateRemovedItem']),
      //--------------TOAST MESSAGE--------------
      snackbarMsg(message) {
        this.$snackbar.add({
          type: 'success',
          text: message,
          background: 'white',
        })
      },
      //--------------NAVIGATE---------------
      navLegacy(routeName,routeParams){
        this.$router.push({name:routeName,params:routeParams})
      },
      //--------------FORMAT AMOUNT---------------
      formattedAmount(value){
        const formattedValue = parseFloat(value).toFixed(2);
        return formattedValue;
      },
      //-------------ADD TRIP TO CART---------------
      async addTripToCart(id){
        let data={
          trip_id:id
        }
        try {
        await axiosClient.post('/addTripToCart',data)
        await this.getAllTrips();
        this.snackbarMsg('Successfuly Added Trip To Cart')
        } catch (error) {
          console.log(error)
        }
      },
      //-------------GET LOGGEDIN USER---------------
      getUser(){
        const userData = localStorage.getItem('user');
        if (userData) {
          this.user = JSON.parse(userData);
        }
      },
      //-------------REDIRECT---------------
      redirectToAddTrips() {
        this.$router.push({ name: 'add-trips' });
      },
      //-------------GET ALL TRIPS---------------
      async getAllTrips(){
        try {
        const response=await axiosClient.get('/getAllTrips')
        this.allTrips=response.data
        this.updateRemovedItem(null);
        } catch (error) {
          console.log(error)
        }
      },
      //-------------DELETE TRIPS---------------
      async deleteTrip(id){
        try {
        await axiosClient.delete('/deleteTrip/'+id)
        this.removeTripFromList(id)
        this.snackbarMsg('Trip Deleted Successfuly')
        } catch (error) {
          console.log(error)
        }
      },
      //------------REMOVE TRIP FROM LIST-----------
      removeTripFromList(id) {
        const indexToRemove = this.allTrips.findIndex((item) => item.id === id)
        this.allTrips.splice(indexToRemove, 1)
      },
      //------------FORMAT DATE--------------
      formatDateString(dateString) {
        const parsedDate = moment(dateString);
        const formattedDate = parsedDate.format('DD MMMM YYYY');
        return formattedDate;
      },
      //------------REDIRECT TO EDIT-------------
      editTrip(id){
        this.$router.push(`/edit-trips/`+id)
      },
    }
  };
  </script>
<style>
.trip-dates{
    font-size: 11px;
}
.trip-description{
    font-size: 12px;
}
.trips-btn{
    border:1px solid grey !important;
}
.trips-btn:hover{
    border:1px solid black !important;
    background-color: #FFFFFF;
}
.cart-status{
  background-color: cadetblue;
  color: white;
  font-size: 11px;
  padding: 2px;
  border-radius: 5px;
  width: 100px;
  display: flex;
  justify-content: center;
}
</style>
  