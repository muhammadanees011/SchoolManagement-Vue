<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="d-flex justify-content-between bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
              <h6 class="text-white text-capitalize ps-3">Add School</h6>
              <router-link :to="{ name: 'list-schools' }">
                <button style="font-size: 12px" class="me-3 bg-gradient-white shadow-white text-dark fw-5 border-0 p-2 border-radius-lg"> Back </button>
              </router-link>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0">
              <div class="row py-2 bg-white form-data border-radius-lg">
                <div class="bg-white box-shadow-dark border-radius-lg col-xl-4 col-lg-4 col-md-4">
                  <div class="card card-plain">
                    <div class="card-body">
                      <form role="form">
                        <div class="mb-1">
                          <label class="input-label" for="name">Name</label>
                          <input class="input-box" id="name" type="text" placeholder="School Name" name="name" />
                        </div>
                        <div class="mb-1">
                          <label class="input-label" for="email">Email</label>
                          <input class="input-box" id="name" type="email" placeholder="Last Name" name="email" />
                        </div>
                        <div class="mb-1">
                          <label class="input-label" for="phone">Phone</label>
                          <input class="input-box" id="name" type="text" placeholder="Phone" name="phone" />
                        </div>
                        <div class="mb-1">
                          <label class="input-label" for="website">Website</label>
                          <input class="input-box" id="name" type="text" placeholder="Website" name="website" />
                        </div>
                        <div class="d-flex align-items-right">
                          <material-button class="mt-4" variant="gradient" color="success" size="sm">Save</material-button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div class="bg-white box-shadow-dark border-radius-lg col-xl-4 col-lg-4 col-md-4">
                  <div class="card card-plain">
                    <div class="card-body">
                      <form role="form">
                        <div class="mb-1">
                          <label class="input-label" for="address">Address</label>
                          <input class="input-box" id="name" type="text" placeholder="Address" name="address" />
                        </div>
                        <div class="mb-1">
                          <label class="input-label" for="last_name">Country</label>
                          <input class="input-box" id="name" type="text" placeholder="Country" name="country" />
                        </div>
                        <div class="mb-1">
                          <label class="input-label" for="state">State</label>
                          <input class="input-box" id="name" type="email" placeholder="State" name="state" />
                        </div>
                        <div class="mb-1">
                          <label class="input-label" for="email">City</label>
                          <input class="input-box" id="name" type="email" placeholder="City" name="city" />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div class="bg-white box-shadow-dark border-radius-lg col-xl-4 col-lg-4 col-md-4">
                  <div class="card card-plain">
                    <div class="card-body">
                      <form role="form">
                        <div class="mb-1">
                          <label class="input-label" for="phone">Zip Code</label>
                          <input class="input-box" id="name" type="text" placeholder="Zip Code" name="zip" />
                        </div>
                        <div class="mb-1">
                          <label class="input-label" for="tagLine">Tag Line</label>
                          <input class="input-box" id="name" type="text" placeholder="Tag Line" name="tagLine" />
                        </div>
                        <div class="mb-1">
                          <label class="input-label" for="description">Description</label>
                          <br />
                          <textarea class="text-area-box" id="name" type="text" placeholder="Description" name="description" />
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
import MaterialButton from '@/components/MaterialButton.vue'
export default {
  name: '',
  components: {
    MaterialButton,
  },
  data() {
    return {
      schools: ['Skills Academy', 'Stockton', 'Redcar', 'Bede', 'NETA'],
    }
  },
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
  width: 280px;
  height: 105px;
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
