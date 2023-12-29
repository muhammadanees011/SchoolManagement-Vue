<template>
    <div class="card">
      <div class="card-header pb-0 px-3">
        <div class="d-flex justify-content-between">
          <h6 class="mb-0">Trips</h6>
          <button @click="redirectToAddTrips"  :to="{ name: 'add-trips' }" style="font-size: 12px; background-color: #573078;"  class="me-3 trips-btn w-10  text-white fw-5 p-2 border-radius-lg"> Add Trips </button>
        </div>
      </div>
      <div class="card-body pt-1 p-3">
        <div class="container-fluid mt-1">
          <div class="row list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
              <div class="col-md-8">
                  <div class="d-flex flex-column">
                  <h6 class="mb-3 text-sm">Private Trip to Brazil</h6> 
                  <img src="@/assets/img/trip.jpg" alt="profile_image" class="shadow-sm w-30 h-20 border-radius-lg" />
                  <small class="trip-description mt-2">
                      On the way to Yaxhá you will observe some in which in Mayan times they were used for fishing, commerce and as a water supply for the Mayan villages on its shores. Inside the Park you will observe birds, insects and reptiles within the green waters of the Yaxhá lagoon, on the highest temple of this place you will feel in the calmest place you have ever imagined, surrounded by pure air, nature, bird songs and the fantastic howl of the Monkeys.
                  </small>
                  </div>
              </div>
              <div class="col-md-4">
                <div class="ms-auto text-start">
                  <span><small class="me-3 trip-dates">From 23 - 30 March 2020 To 23 - 30 March 2020</small></span>
                  <br>
                  <span><small class="me-3 trip-dates">Total Seats - 50</small></span>
                  <span><small class="me-3 trip-dates">Available Seats - 07</small></span>
                  <br>
                  <span><small class="me-3 trip-dates">Age Group - 16-20</small></span>
                  <span><small class="me-3 trip-dates">Booking Open</small></span>
                  <br>
                  <span><small class="me-3 trip-dates">Accomodation and Meals Included</small></span>
                <div class="d-flex  align-items-start text-danger text-gradient text-sm font-weight-bold" style="justify-content: flex-start;">
                  Trip Funds - £ 500
                </div>
                <br>
                <div class="mt-5" v-if="user.role=='super_admin' || user.role=='school_user'">
                <button style="font-size: 12px; background-color: #573078;" class="me-3 trips-btn w-25  text-white fw-5 p-2 border-radius-lg"> Edit </button>
                <button style="font-size: 12px; background-color: #573078;" class="me-3 trips-btn w-25  text-white fw-5 p-2 border-radius-lg"> Delete </button>
                </div>
                <br>
                </div>
              </div>
          </div>
          <div class="row list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
              <div class="col-md-8">
                  <div class="d-flex flex-column">
                  <h6 class="mb-3 text-sm">Private Trip to Brazil</h6> 
                  <img src="@/assets/img/trip.jpg" alt="profile_image" class="shadow-sm w-30 h-20 border-radius-lg" />
                  <small class="trip-description mt-2">
                      On the way to Yaxhá you will observe some in which in Mayan times they were used for fishing, commerce and as a water supply for the Mayan villages on its shores. Inside the Park you will observe birds, insects and reptiles within the green waters of the Yaxhá lagoon, on the highest temple of this place you will feel in the calmest place you have ever imagined, surrounded by pure air, nature, bird songs and the fantastic howl of the Monkeys.
                  </small>
                  </div>
              </div>
              <div class="col-md-4">
                <div class="ms-auto text-start">
                  <span><small class="me-3 trip-dates">From 23 - 30 March 2020 To 23 - 30 March 2020</small></span>
                  <br>
                  <span><small class="me-3 trip-dates">Total Seats - 50</small></span>
                  <span><small class="me-3 trip-dates">Available Seats - 07</small></span>
                  <br>
                  <span><small class="me-3 trip-dates">Age Group - 16-20</small></span>
                  <span><small class="me-3 trip-dates">Booking Open</small></span>
                  <br>
                  <span><small class="me-3 trip-dates">Accomodation and Meals Included</small></span>
                <div class="d-flex  align-items-start text-danger text-gradient text-sm font-weight-bold" style="justify-content: flex-start;">
                  Trip Funds - £ 500
                </div>
                <br>
                <div class="mt-5" v-if="user.role=='super_admin' || user.role=='school_user'">
                <button style="font-size: 12px; background-color: #573078;" class="me-3 trips-btn w-25  text-white fw-5 p-2 border-radius-lg"> Edit </button>
                <button style="font-size: 12px; background-color: #573078;" class="me-3 trips-btn w-25  text-white fw-5 p-2 border-radius-lg"> Delete </button>
                </div>
                <br>
                </div>
              </div>
          </div>
          <div class="row list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
              <div class="col-md-8">
                  <div class="d-flex flex-column">
                  <h6 class="mb-3 text-sm">Private Trip to Brazil</h6> 
                  <img src="@/assets/img/trip.jpg" alt="profile_image" class="shadow-sm w-30 h-20 border-radius-lg" />
                  <small class="trip-description mt-2">
                      On the way to Yaxhá you will observe some in which in Mayan times they were used for fishing, commerce and as a water supply for the Mayan villages on its shores. Inside the Park you will observe birds, insects and reptiles within the green waters of the Yaxhá lagoon, on the highest temple of this place you will feel in the calmest place you have ever imagined, surrounded by pure air, nature, bird songs and the fantastic howl of the Monkeys.
                  </small>
                  </div>
              </div>
              <div class="col-md-4">
                <div class="ms-auto text-start">
                  <span><small class="me-3 trip-dates">From 23 - 30 March 2020 To 23 - 30 March 2020</small></span>
                  <br>
                  <span><small class="me-3 trip-dates">Total Seats - 50</small></span>
                  <span><small class="me-3 trip-dates">Available Seats - 07</small></span>
                  <br>
                  <span><small class="me-3 trip-dates">Age Group - 16-20</small></span>
                  <span><small class="me-3 trip-dates">Booking Open</small></span>
                  <br>
                  <span><small class="me-3 trip-dates">Accomodation and Meals Included</small></span>
                <div class="d-flex  align-items-start text-danger text-gradient text-sm font-weight-bold" style="justify-content: flex-start;">
                  Trip Funds - £ 500
                </div>
                <br>
                <div class="mt-5" v-if="user.role=='super_admin' || user.role=='school_user'">
                <button style="font-size: 12px; background-color: #573078;" class="me-3 trips-btn w-25  text-white fw-5 p-2 border-radius-lg"> Edit</button>
                <button style="font-size: 12px; background-color: #573078;" class="me-3 trips-btn w-25  text-white fw-5 p-2 border-radius-lg"> Delete </button>
                </div>
                <br>
                </div>
              </div>
          </div>
        </div>
      </div>
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
      const userData = localStorage.getItem('user');
      if (userData) {
        this.user = JSON.parse(userData);
      }
    },
    methods:{
      redirectToAddTrips() {
        this.$router.push({ name: 'add-trips' });
      }
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
</style>
  