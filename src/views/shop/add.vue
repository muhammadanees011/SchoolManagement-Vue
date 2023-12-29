<template>
    <div class="container-fluid py-4">
      <div class="row">
        <div class="col-12">
          <div class="card my-4">
            <div class="d-flex justify-content-between  border-radius-lg pt-4 pb-3">
                <h6 class="text-dark text-capitalize ps-3">Add Shop Item</h6>
              </div>
            <div class="card-body px-0 pb-2">
              <div class="table-responsive p-0">
                <div class="row py-2 bg-white form-data border-radius-lg">
                  <div class="bg-white box-shadow-dark border-radius-lg col-xl-6 col-lg-6 col-md-6">
                    <div class="card card-plain">
                      <div class="card-body">
                        <form role="form">
                          <div class="mb-1">
                            <label class="input-label" for="name"> Name</label>
                            <input class="input-box" id="name" v-model="newItem.name" type="text" placeholder=" Name" name="first_name" />
                          </div>
                          <div class="mb-1">
                            <label class="input-label" for="name">Price</label>
                            <input class="input-box" id="name" v-model="newItem.price" type="number" placeholder="Price" name="last_name" />
                          </div>
                          <div class="mb-1">
                            <label class="input-label" for="student_id">Quantity</label>
                            <input class="input-box" id="student_id" v-model="newItem.quantity" type="number" placeholder="quantity" name="student_id" />
                          </div>
                          <div class="mb-1">
                            <label class="input-label" for="email">Detail</label>
                            <input class="input-box" id="name" v-model="newItem.detail" type="text" placeholder="detail" name="detail" />
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="d-flex align-items-left bg-white box-shadow-dark border-radius-lg col-xl-4 col-lg-4 col-md-4">
                    <div class="">
                      <button @click="saveNewItem" style="font-size: 12px; background-color: #573078;" class="btn ms-3 text-white fw-5 border-0 py-2 px-5 border-radius-lg"> Save </button>
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
  // import MaterialButton from '@/components/MaterialButton.vue'
  import axiosClient from '../../axios'
  
  export default {
    name: '',
    components: {
      // MaterialButton,
    },
    mounted() {
  },
    data() {
      return {
        newItem: {
            name:'',
            price:'',
            quantity: '',
            detail:'',
        },
        availableStatus:['active','pending','blocked'],
        allSchools:'',
      }
    },
    methods:{
      snackbarMsg(message) {
        this.$snackbar.add({
          type: 'success',
          text: message,
          background: 'white',
        })
      },
      //------------SAVE STUDENT------------
      async saveNewItem() {
        try {
          await axiosClient.post('/addItem', this.newItem)
          this.$router.push({ name: 'shop-items' })
          this.snackbarMsg('Item Saved Successfuly')
        } catch (error) {
          console.log(error)
        }
      },
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
  