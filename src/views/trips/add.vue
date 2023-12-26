<template>
    <div class="container-fluid py-4">
      <div class="row ">
        <div class="col-12">
          <div class="card my-4">
            <div class="d-flex justify-content-between  border-radius-lg pt-4 ">
                <h6 class="text-dark text-capitalize ps-3">Add Trips</h6>
                <router-link :to="{ name: 'list-trips' }">
                  <button style="font-size: 12px; background-color: #573078;" class="me-3 text-white fw-5 w-90 border-0 p-2 border-radius-lg"> Back </button>
                </router-link>
            </div>
            <div class="card-body px-0 pb-2">
              <div class="table-responsive p-0">
                <div class="row py-2 bg-white form-data border-radius-lg">
                  <div class="bg-white box-shadow-dark border-radius-lg col-xl-12 col-lg-12 col-md-12">
                    <div class="card card-plain">
                      <div class="card-body">
                        <form role="form">
                          <div class="row mb-1">
                          <div class="mb-1">
                            <label class="input-label" for="name">Trip Title</label>
                            <input class="input-box title-input" id="name" type="text" placeholder="Trip to Brazil" name="name" />
                          </div>
                          <div class="mb-1">
                            <label class="input-label" for="description">Description</label>
                            <br />
                            <textarea class="text-area-box text-area-trips"  id="name" type="text" placeholder="Description" name="description" />
                          </div>
                          </div>
                          <div class="row p-2">
                            <div class="col-xl-4 col-lg-4 col-md-4">
                            <div class="mb-1">
                                <label class="input-label" for="name">Total Seats</label>
                                <input class="input-box" id="name" type="text" placeholder="Total Seats" name="name" />
                            </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4">
                                <div class="mb-1">
                                    <label class="input-label" for="name">Available Seats</label>
                                    <input class="input-box" id="name" type="text" placeholder="Available Seats" name="name" />
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4">
                                <div class="mb-1">
                                    <label class="input-label" for="name">Accomodation and Meals</label>
                                    <input class="input-box" id="name" type="text" placeholder="Accomodation and Meals included" name="name" />
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4">
                                <div class="mb-1">
                                <label class="input-label" for="enrollment_date">Start Date</label>
                                <input class="input-box" id="enrollment_date"  type="date" placeholder="Enrollment Date" name="enrollment_date" />
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4">
                                <div class="mb-1">
                                <label class="input-label" for="enrollment_date">End Date</label>
                                <input class="input-box" id="enrollment_date"  type="date" placeholder="Enrollment Date" name="enrollment_date" />
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4">
                                <div class="mb-1">
                                    <label class="input-label" for="name">Total Funds</label>
                                    <input class="input-box" id="name" type="text" placeholder="funds" name="name" />
                                </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
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
  
  export default {
    name: '',
    components: {
    },
    mounted() {
  },
    data() {
      return {
  
      }
    },
    methods:{

    }
  }
  </script>
  
  <style scoped>
  .form-data {
    width: 100%;
  }
  .text-area-box {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
    font-size: 12px;
    width: 237px;
    height: 35px;
  }
  /* Hover effect */
  
  .text-area-box:hover {
    border-color: #6c757d; /* Change to your preferred hover color */
  }
  
  .select-box {
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    width: 100%;
    font-size: 12px;
    height: 35px;
  }
  .select-box:hover {
    border-color: #6c757d; /* Change to your preferred hover color */
  }
  .select-box:focus {
    outline: none;
    border-color: #4caf50; /* Change to your preferred focus color */
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.5); /* Change to your preferred shadow color */
  }
  /* Focus effect */
  
  .text-area-box:focus {
    outline: none;
    border-color: #4caf50; /* Change to your preferred focus color */
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.5); /* Change to your preferred shadow color */
  }
  .input-label {
    font-size: 12px;
  }
  /* Basic input styles */
  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    width: 100%;
    height: 35px;
    font-size: 12px;
  }
  .title-input{
    height: 55px;
  }
  .text-area-trips{
    width: 100%;
    height: 110px;
  }
  /* Hover effect */
  input:hover {
    border-color: #6c757d; /* Change to your preferred hover color */
  }
  
  /* Focus effect */
  input:focus {
    outline: none;
    border-color: #4caf50; /* Change to your preferred focus color */
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.5); /* Change to your preferred shadow color */
  }
  
  /* Placeholder text style */
  ::placeholder {
    color: #999;
  }
  
  /* Styling for disabled state */
  input:disabled {
    background-color: #f0f0f0;
    color: #999;
  }
  </style>
  